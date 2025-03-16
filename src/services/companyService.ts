import { CompanyDetails } from '@/types/company';

export const getCompanyDetails = async (id: string): Promise<CompanyDetails> => {
  try {
    // Attempt to load the company data from the local file
    try {
      const companyData = await import(`../Data/Compay/${id}.json`);
      
    } catch (localError) {
      console.error('Could not load local company data:', localError);
      
      // Fallback to API
      const response = await fetch(`https://carterapi.onrender.com/company/${id}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        // If response is a string, return an object with a placeholder field
        const textResponse = await response.text();
        return { name: textResponse } as unknown as CompanyDetails;
      }
    }
  } catch (error) {
    console.error(`Error fetching company details for ID ${id}:`, error);
    throw error;
  }
};
