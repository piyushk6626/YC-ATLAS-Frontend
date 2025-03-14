// src/types/company.ts

export interface CompanyMetadata {
  name: string;
  headline: string;
  batch?: string;
  founded_date?: number;
  team_size?: number;
  location?: string;
  website?: string;
  description?: string;
  logo_path?: string;
  links?: string;
  tags?: string;
  generated_description?: string;
  social_links?: string[];
}

export interface Company {
  id: string;
  metadata: CompanyMetadata;
  content?: string;
  score?: number;
}

export interface Founder {
  name: string;
  description: string;
  linkedin?: string;
}

export interface CompanyDetails extends CompanyMetadata {
  founders?: Founder[];
}