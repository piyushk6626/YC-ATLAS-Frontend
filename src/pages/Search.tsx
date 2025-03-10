
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Company } from '@/types/company';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);

  const handleSearch = async (isDeepSearch: boolean) => {
    // Simulating API call with example data
    setResults([
      // ... example data structure
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Company Search</h1>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          
          <div className="flex gap-4 justify-center">
            <Button onClick={() => handleSearch(false)}>
              Quick Search
            </Button>
            <Button variant="secondary" onClick={() => handleSearch(true)}>
              Deep Search
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-4 max-h-[600px] overflow-y-auto">
          {results.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {company.metadata.name}
                </CardTitle>
                <a
                  href={`/company/${company.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  {company.metadata.location} • Founded {company.metadata.founded_date}
                </p>
                <p className="text-sm">{company.metadata.headline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
