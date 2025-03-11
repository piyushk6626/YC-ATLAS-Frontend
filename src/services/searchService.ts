
import { Company } from '@/types/company';

// Sample company data for demo purposes
const sampleCompanies: Company[] = [
  {
    id: "1",
    score: 0.92,
    metadata: {
      name: "AI Innovations",
      headline: "Revolutionizing industries with cutting-edge AI solutions",
      location: "San Francisco, CA",
      founded_date: "2018"
    }
  },
  {
    id: "2",
    score: 0.87,
    metadata: {
      name: "DataSphere",
      headline: "Turning complex data into actionable insights",
      location: "New York, NY",
      founded_date: "2015"
    }
  },
  {
    id: "3",
    score: 0.82,
    metadata: {
      name: "TechFusion",
      headline: "Bridging the gap between technology and human experience",
      location: "Austin, TX",
      founded_date: "2019"
    }
  },
  {
    id: "4",
    score: 0.78,
    metadata: {
      name: "Quantum Computing Labs",
      headline: "Pushing the boundaries of quantum computing applications",
      location: "Boston, MA",
      founded_date: "2017"
    }
  },
  {
    id: "5",
    score: 0.76,
    metadata: {
      name: "NeuralWorks",
      headline: "Building the future of neural networks and deep learning",
      location: "Seattle, WA",
      founded_date: "2016"
    }
  }
];

/**
 * Performs a basic search for companies based on the query
 */
export const searchCompanies = async (query: string): Promise<Company[]> => {
  console.log("Performing regular search for:", query);
  
  // In a real implementation, this would call an API with your query
  // For now, we'll simulate a search by filtering our sample data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter companies based on query (case-insensitive)
  const lowercaseQuery = query.toLowerCase();
  return sampleCompanies.filter(company => 
    company.metadata.name.toLowerCase().includes(lowercaseQuery) ||
    company.metadata.headline.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Performs a more thorough, "deep" search for companies
 */
export const deepSearchCompanies = async (query: string): Promise<Company[]> => {
  console.log("Performing deep search for:", query);
  
  // Simulate a more thorough search with a longer delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return all sample companies with slightly adjusted scores for demonstration
  return sampleCompanies.map(company => ({
    ...company,
    score: company.score * (Math.random() * 0.2 + 0.9) // Slightly randomize scores
  }));
};
