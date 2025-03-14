// src/services/companyService.ts
import { CompanyDetails } from '@/types/company';

export const getCompanyDetails = async (id: string): Promise<CompanyDetails> => {
  try {
    // Attempt to load the company data from the local file
    // Using dynamic import to load the JSON file based on the ID
    try {
      const companyData = await import(`../data/${id}.json`);
      return companyData.default as CompanyDetails;
    } catch (localError) {
      console.error('Could not load local company data:', localError);
      
      // If local file is not found, fallback to API
      const response = await fetch(`https://carterapi.onrender.com/company/${id}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching company details for ID ${id}:`, error);
    throw error;
  }
};