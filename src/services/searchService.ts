// Import required libraries
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import winston from 'winston';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

// Load environment variables
dotenv.config({ override: true });
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize clients
const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// Define prompts
const SystemPrompt = `Write a concise description to help the user find a company based on their query. Ensure the description incorporates the following points:

- **Mission of the company**: Clearly articulate the company's mission.
- **Tech Stack of the company**: Highlight the technologies the company utilizes.

Your writing should be clear, engaging, and in the tone of Paul Graham—direct, insightful, and slightly conversational.

# Steps

1. Analyze the user's query to understand their needs.
2. Identify the key aspects of the company's mission and tech stack.
3. Write a clear, concise, and engaging description that reflects these aspects.
4. Ensure the tone is direct, insightful, and conversational, resembling Paul Graham's style.

# Output Format

- A short paragraph comprising 100-150 words.
- Ensure the language is clear and easy to understand.
- Use a tone that is direct, insightful, and slightly conversational.

# Examples

**Input**: User is looking for a company that has a strong mission related to sustainability and uses innovative technology.

**Output Example**: "a company passionately driven to make the world sustainable by integrating cutting-edge technology into everyday life. Their mission is simple yet powerful: to reduce carbon footprints globally. Leveraging a multi-faceted tech stack that includes AI-driven solutions and IoT devices, they are continuously innovating to create more sustainable practices. It's all about impact here—transforming our planet for the better, one tech solution at a time."

(Note: The output should be tailored according to the specific company's mission and tech stack, ensuring it reflects the tone and style specified above.)`;

const SystemPrompt_Question = "You will be given a query. Generate a list of related questions similar to the query that will help identify the most relevant companies in the same space as the company segments mentioned in the user query.";

// Define response format schema (equivalent to Pydantic model)
const QuestionGeneration = {
  type: "json_schema",
  json_schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["questions"]
  }
};

// Configure logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} - ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'restaurant_process.log' }),
    new winston.transports.Console()
  ]
});

/**
 * Normalize the data returned from Pinecone
 * @param {Object|Array} result - The result from Pinecone query
 * @returns {Array} Normalized array of items
 */
function normalizeData(result) {
  // If the result object has a 'matches' property, use it
  let data;
  if (result.matches) {
    data = result.matches;
  }
  // Alternatively, if it's an object with a "matches" key, use that
  else if (typeof result === 'object' && "matches" in result) {
    data = result.matches;
  }
  else {
    data = result; // Assume result is already an array
  }

  const normalizedData = [];
  for (const item of data) {
    // Convert to a standard object format
    const normalizedItem = {
      id: item.id,
      score: parseFloat(item.score), // Convert score to float for JSON serialization
      metadata: item.metadata
    };
    normalizedData.push(normalizedItem);
  }

  return normalizedData;
}

/**
 * Generate embeddings using OpenAI API
 * @param {string} content - The content to embed
 * @returns {Array|null} The embedding vector or null if there's an error
 */
async function createEmbeddings(content) {
  try {
    const response = await client.embeddings.create({
      model: "text-embedding-3-large",
      input: content
    });
    return response.data[0].embedding;
  } catch (error) {
    logger.error(`Error generating embeddings: ${error}`);
    return null;
  }
}

/**
 * Load environment variables, initialize the Pinecone client, and return the index.
 * @returns {Object} The Pinecone index
 */
function getIndex() {
  // Load environment variables
  dotenv.config();

  // Retrieve Pinecone API key and host URL from environment variables
  const pineconeApiKey = process.env.PINECONE_API_KEY;
  const pineconeHost = process.env.PINECONE_HOST_URL;

  // Initialize the Pinecone client with the API key
  const pc = new Pinecone({ apiKey: pineconeApiKey });

  // Create and return the index using the host URL
  const index = pc.Index(pineconeHost);
  return index;
}

/**
 * Query the Pinecone index
 * @param {Object} index - The Pinecone index
 * @param {Array} queryVector - The vector to query with
 * @param {number} numberOfResults - The number of results to return
 * @returns {Array} The matches from the query
 */
async function queryIndex(index, queryVector, numberOfResults) {
  // Query the index
  const response = await index.queryNamespaces({
    vector: queryVector,
    namespaces: [""],       // Search in the default namespace
    metric: "cosine",       // Use cosine similarity
    topK: numberOfResults,
    includeValues: false,
    includeMetadata: true,
    showProgress: false,
  });

  // Handle the response format
  if (response.matches) {
    return response.matches;
  } else if (typeof response === 'object' && "matches" in response) {
    return response.matches;
  } else {
    return response;
  }
}

/**
 * Explain the user query using OpenAI
 * @param {string} query - The user query
 * @returns {string} The explained query
 */
async function explainUserQuery(query) {
  const messages = [
    { role: "system", content: SystemPrompt },
    { role: "user", content: query }
  ];

  const explainedQuery = await client.chat.completions.create({
    messages: messages as OpenAI.ChatCompletionMessageParam[],
    model: "gpt-4o-mini",
    temperature: 0.9
  });

  return explainedQuery.choices[0].message.content;
}

/**
 * Search for companies based on a query string
 * @param {string} query - The query string
 * @returns {Promise<Array>} A list of search results
 */
async function searchCompanies(query) {
  const numberOfResults = 30;
  
  // Get the Pinecone index
  const index = getIndex();

  // Update the query based on given format
  const explainedQuery = await explainUserQuery(query);
  
  // Generate vector embeddings for the query string
  const vector = await createEmbeddings(explainedQuery);

  // Query the Pinecone index with the generated embeddings
  const results = await queryIndex(index, vector, numberOfResults);

  // Return the normalized data
  return normalizeData(results);
}

/**
 * Generate a list of questions based on the query
 * @param {string} query - The query string
 * @returns {Promise<Array>} A list of generated questions
 */
async function deepQuestion(query) {
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
    {
      role: "system",
      content: SystemPrompt_Question
    },
    {
      role: "user",
      content: query
    }
  ],
  function_call: {
    name: "generate_questions",
    arguments: JSON.stringify({ query: query })
  }
});

if (completion.choices && completion.choices[0] && completion.choices[0].message && completion.choices[0].message.function_call) {
  const parsedResponse = JSON.parse(completion.choices[0].message.function_call.arguments);
  return parsedResponse.questions;
} else {
  return [];
}
}

/**
 * Perform deep research by generating questions and searching for each
 * @param {string} query - The query string
 * @returns {Promise<Array>} A list of search results
 */
async function deepSearchCompanies(query) {
  const questions = await deepQuestion(query);
  let dataFinal = [];
  
  // Process each question in parallel using Promise.all
  const searchPromises = questions.map(question => searchCompanies(question));
  const resultsArray = await Promise.all(searchPromises);
  
  // Process all results
  for (const data of resultsArray) {
    for (const item of data) {
      // Check if an item with the same ID exists in dataFinal
      const existingItemIndex = dataFinal.findIndex(x => x.id === item.id);
      
      if (existingItemIndex === -1) {
        dataFinal.push(item);
      } else {
        // Add the scores for items with matching IDs
        dataFinal[existingItemIndex].score += item.score;
      }
    }
  }
  
  // Sort the list based on the score attribute
  dataFinal.sort((a, b) => b.score - a.score);
  return dataFinal;
}

// Main function for node.js environment
async function main() {
  try {
    // Sample usage
    const output = await deepSearchCompanies("Company that Works in RAG (retrieval-augmented generation) using AI");
    
    // Save output to JSON file
    fs.writeFileSync(
      'search_results.json', 
      JSON.stringify(output, null, 4), 
      { encoding: 'utf-8' }
    );
    
    console.log("Results saved to search_results.json");
  } catch (error) {
    logger.error(`Error in main function: ${error}`);
  }
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}

// Export functions for use in other modules
export {
  normalizeData,
  createEmbeddings,
  getIndex,
  queryIndex,
  explainUserQuery,
  searchCompanies,
  deepQuestion,
  deepSearchCompanies
};