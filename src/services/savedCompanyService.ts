
import { supabase } from '@/lib/supabase';
import { Company } from '@/types/company';

export const saveCompany = async (companyId: string) => {
  try {
    const { error } = await supabase
      .from('saved_companies')
      .insert([{ company_id: companyId }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving company:', error);
    throw error;
  }
};

export const unsaveCompany = async (companyId: string) => {
  try {
    const { error } = await supabase
      .from('saved_companies')
      .delete()
      .eq('company_id', companyId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing saved company:', error);
    throw error;
  }
};

export const getSavedCompanies = async (): Promise<Company[]> => {
  try {
    const { data: savedCompaniesData, error: savedError } = await supabase
      .from('saved_companies')
      .select('company_id');

    if (savedError) throw savedError;

    if (!savedCompaniesData || savedCompaniesData.length === 0) {
      return [];
    }

    const companyIds = savedCompaniesData.map(item => item.company_id);

    const { data: companiesData, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .in('id', companyIds);

    if (companiesError) throw companiesError;

    // Transform to match the Company type
    return (companiesData || []).map(company => ({
      id: company.id,
      metadata: {
        name: company.name,
        headline: company.headline,
        batch: company.batch,
        founded_date: company.founded_date,
        team_size: company.team_size,
        location: company.location,
        website: company.website,
        description: company.description,
        logo_path: company.logo_path,
        links: company.links,
        tags: company.tags,
        generated_description: company.generated_description,
      }
    }));
  } catch (error) {
    console.error('Error getting saved companies:', error);
    throw error;
  }
};

export const isCompanySaved = async (companyId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('saved_companies')
      .select('id')
      .eq('company_id', companyId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is fine
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking if company is saved:', error);
    return false;
  }
};
