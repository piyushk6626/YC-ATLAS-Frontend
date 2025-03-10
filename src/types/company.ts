
export interface Company {
  id: string;
  score: number;
  metadata: {
    batch: string;
    founded_date: number;
    generated_description: string;
    headline: string;
    links: string;
    location: string;
    logo_path: string;
    name: string;
    social_links: string;
    tags: string;
    team_size: number;
    website: string;
  };
}

export interface CompanyDetails extends Omit<Company['metadata'], 'social_links'> {
  description: string;
  founders: Array<{
    name: string;
    description: string;
    linkedin: string;
  }>;
  social_links: string[];
}
