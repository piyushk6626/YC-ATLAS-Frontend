
export interface Company {
  id: string;
  score: number;
  metadata: {
    name: string;
    headline: string;
    location: string;
    founded_date: string;
    [key: string]: any;
  };
}
