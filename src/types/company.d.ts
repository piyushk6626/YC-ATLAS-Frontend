
export interface Company {
  id: string;
  metadata: {
    name: string;
    headline: string;
    website?: string;
    description?: string;
    location?: string;
    logo_path?: string;
  };
}

export interface Founder {
  id: string;
  name: string;
  description: string;
  linkedin?: string;
  company_id: string;
}

export interface CompanyDetails {
  name: string;
  headline?: string;
  description?: string;
  website?: string;
  location?: string;
  founded_date?: number;
  team_size?: number;
  founders?: Founder[];
  logo_path?: string;
}
