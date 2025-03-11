
import { Company } from '@/types/company';

// Simulated API endpoints for search functions
// In a real app, these would connect to your backend API
export const searchCompanies = async (query: string): Promise<Company[]> => {
  if (!query.trim()) {
    return [];
  }

  // This is a simulation of the Python code's search_companies function
  try {
    // In production, this would be an API call to your backend
    // const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    // return await response.json();
    
    console.log('Searching for companies with query:', query);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulated data - this would come from your Pinecone/vector search backend
    const simulatedResults: Company[] = [
      {
        id: "SciPhi_W24",
        score: 0.6567634344100952,
        metadata: {
          batch: "W24",
          founded_date: 2023,
          generated_description: "**SciPhi: Pioneering Advanced AI Retrieval**\n\nWelcome to SciPhi, a fresh face in the vibrant tech scene, founded in 2023 and already making waves as part of Y Combinator Batch W24. Situated in San Francisco and comprised of just two sharp minds, SciPhi is on a mission to redefine how we interact with data and AI through its groundbreaking retrieval system, known as R2R.",
          headline: "SciPhi is building R2R, the most advanced retrieval system.",
          links: "https://www.ycombinator.com/companies/sciphi",
          location: "San Francisco",
          logo_path: "data/logos\\SciPhi_logo.png",
          name: "SciPhi",
          social_links: "[\"https://www.linkedin.com/company/sciphi-ai/\", \"https://github.com/SciPhi-AI\"]",
          tags: "industry:artificial-intelligence; industry:search; industry:infrastructure; industry:ai; location:san-francisco-bay-area",
          team_size: 2,
          website: "https://www.sciphi.ai"
        }
      },
      {
        id: "Ragas_W24",
        score: 0.6302037835121155,
        metadata: {
          batch: "W24",
          founded_date: 2023,
          generated_description: "**Company Overview: Ragas**\n\nFounded in 2023 and based in San Francisco, Ragas is on a mission to establish an open-source standard for evaluating large language model (LLM) applications.",
          headline: "Building the open source standard for evaluating LLM Applications",
          links: "https://www.ycombinator.com/companies/ragas",
          location: "San Francisco",
          logo_path: "data/logos\\Ragas_logo.png",
          name: "Ragas",
          social_links: "[\"https://www.linkedin.com/company/ragas/\", \"https://twitter.com/ragas_io\", \"https://github.com/explodinggradients\"]",
          tags: "industry:developer-tools; industry:generative-ai; industry:open-source; industry:ai; location:san-francisco-bay-area",
          team_size: 2,
          website: "https://www.ragas.io"
        }
      }
    ];
    
    return simulatedResults;
  } catch (error) {
    console.error('Error searching companies:', error);
    throw new Error('Failed to search companies');
  }
};

export const deepSearchCompanies = async (query: string): Promise<Company[]> => {
  if (!query.trim()) {
    return [];
  }

  // This is a simulation of the Python code's deep_research function
  try {
    // In production, this would be an API call to your backend
    // const response = await fetch(`/api/deep-search?query=${encodeURIComponent(query)}`);
    // return await response.json();
    
    console.log('Deep searching for companies with query:', query);
    
    // Simulate longer network delay for deep search
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulated deep search data - with more comprehensive results
    const simulatedResults: Company[] = [
      {
        id: "SciPhi_W24",
        score: 0.8267634344100952, // Higher score in deep search
        metadata: {
          batch: "W24",
          founded_date: 2023,
          generated_description: "**SciPhi: Pioneering Advanced AI Retrieval**\n\nWelcome to SciPhi, a fresh face in the vibrant tech scene, founded in 2023 and already making waves as part of Y Combinator Batch W24. Situated in San Francisco and comprised of just two sharp minds, SciPhi is on a mission to redefine how we interact with data and AI through its groundbreaking retrieval system, known as R2R.",
          headline: "SciPhi is building R2R, the most advanced retrieval system.",
          links: "https://www.ycombinator.com/companies/sciphi",
          location: "San Francisco",
          logo_path: "data/logos\\SciPhi_logo.png",
          name: "SciPhi",
          social_links: "[\"https://www.linkedin.com/company/sciphi-ai/\", \"https://github.com/SciPhi-AI\"]",
          tags: "industry:artificial-intelligence; industry:search; industry:infrastructure; industry:ai; location:san-francisco-bay-area",
          team_size: 2,
          website: "https://www.sciphi.ai"
        }
      },
      {
        id: "Ragas_W24",
        score: 0.7902037835121155, // Higher score in deep search
        metadata: {
          batch: "W24",
          founded_date: 2023,
          generated_description: "**Company Overview: Ragas**\n\nFounded in 2023 and based in San Francisco, Ragas is on a mission to establish an open-source standard for evaluating large language model (LLM) applications.",
          headline: "Building the open source standard for evaluating LLM Applications",
          links: "https://www.ycombinator.com/companies/ragas",
          location: "San Francisco",
          logo_path: "data/logos\\Ragas_logo.png",
          name: "Ragas",
          social_links: "[\"https://www.linkedin.com/company/ragas/\", \"https://twitter.com/ragas_io\", \"https://github.com/explodinggradients\"]",
          tags: "industry:developer-tools; industry:generative-ai; industry:open-source; industry:ai; location:san-francisco-bay-area",
          team_size: 2,
          website: "https://www.ragas.io"
        }
      },
      {
        id: "VectorShift_W24", // Additional result found through deep search
        score: 0.6853492105723461,
        metadata: {
          batch: "W24",
          founded_date: 2022,
          generated_description: "**VectorShift: Accelerating Vector Search for AI Applications**\n\nVectorShift is a promising startup founded in 2022, specializing in high-performance vector database solutions for AI applications. Their technology enables lightning-fast similarity searches across billions of vectors, making it ideal for RAG systems, recommendation engines, and AI-powered search applications.",
          headline: "Building the fastest vector search engine for AI applications",
          links: "https://www.ycombinator.com/companies/vectorshift",
          location: "Berkeley",
          logo_path: "data/logos\\VectorShift_logo.png",
          name: "VectorShift",
          social_links: "[\"https://www.linkedin.com/company/vectorshift/\", \"https://github.com/VectorShiftAI\"]",
          tags: "industry:artificial-intelligence; industry:database; industry:infrastructure; industry:ai; location:san-francisco-bay-area",
          team_size: 5,
          website: "https://www.vectorshift.ai"
        }
      }
    ];
    
    return simulatedResults;
  } catch (error) {
    console.error('Error deep searching companies:', error);
    throw new Error('Failed to perform deep search');
  }
};
