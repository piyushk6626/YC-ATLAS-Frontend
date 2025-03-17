
import { CompanyDetails, Company } from '@/types/company';
import { supabase } from '@/lib/supabase';

export const getCompanies = async (searchTerm?: string): Promise<Company[]> => {
  try {
    let query = supabase.from('companies').select('*');
    
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    const { data, error } = await query.limit(20);
    
    if (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
    
    return data.map(company => ({
      id: company.id,
      metadata: {
        name: company.name,
        headline: company.headline || '',
        website: company.website || '',
        description: company.description || '',
        location: company.location || '',
        logo_path: company.logo_path || '',
      }
    }));
  } catch (error) {
    console.error('Error in getCompanies:', error);
    throw error;
  }
};

export const getCompanyDetails = async (name: string): Promise<CompanyDetails> => {
  try {
    // First try to fetch from Supabase
    const { data, error } = await supabase
      .from('companies')
      .select('*, founders(*)')
      .eq('name', name)
      .single();
    
    if (data) {
      return {
        name: data.name,
        headline: data.headline || '',
        description: data.description || '',
        website: data.website || '',
        location: data.location || '',
        founded_date: data.founded_date,
        team_size: data.team_size,
        founders: data.founders || [],
        logo_path: data.logo_path || '',
      };
    }
    
    // Fallback to local file
    try {
      const companyData = await import(`../Data/Compay/${name}.json`);
      return companyData;
    } catch (localError) {
      console.error('Could not load local company data:', localError);
      
      // Fallback to API
      const response = await fetch(`https://carterapi.onrender.com/company/${encodeURIComponent(name)}`);

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
    console.error(`Error fetching company details for name ${name}:`, error);
    throw error;
  }
};
