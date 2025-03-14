import { Company } from '@/types/company';

const API_BASE_URL = 'https://carterapi.onrender.com';

/**
 * Performs a quick search for companies based on the provided query
 * using the /search_companies endpoint
 */
export const searchCompanies = async (query: string): Promise<Company[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/search_companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

/**
 * Performs a deep search for companies based on the provided query 
 * using the /deep_research endpoint
 */
export const deepSearchCompanies = async (query: string): Promise<Company[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/deep_research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Deep search API error:', error);
    throw error;
  }
};
