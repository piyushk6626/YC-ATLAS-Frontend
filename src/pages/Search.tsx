
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin, Users, Tag, Search as SearchIcon } from "lucide-react";
import { Company } from '@/types/company';
import { useToast } from "@/components/ui/use-toast";
import { searchCompanies, deepSearchCompanies } from '@/services/searchService';
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (isDeepSearch: boolean) => {
    if (!query.trim()) {
      toast({
        title: "Empty search query",
        description: "Please enter a search term",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // Call the appropriate search function based on the search type
      const searchResults = isDeepSearch ? await deepSearchCompanies(query) : await searchCompanies(query);
      setResults(searchResults);
      toast({
        title: isDeepSearch ? "Deep Search Complete" : "Quick Search Complete",
        description: `Found ${searchResults.length} results for "${query}"`
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format company ID properly for the URL
  const formatCompanyIdForUrl = (id: string) => {
    return id.replace(/-/g, '_');
  };

  // Function to get company logo path
  const getLogoPath = (company: Company): string => {
    const formattedName = company.metadata.name.replace(/\s+/g, '_');
    return `data\\logos\\${formattedName}_logo.png`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Company Search</h1>
        
        <div className="space-y-4">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Enter your search query..." 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 bg-white shadow-sm" 
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch(false);
                }
              }}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => handleSearch(false)} 
              disabled={isLoading} 
              className="bg-[#f26522] hover:bg-[#e05a1c] text-white px-6"
            >
              {isLoading ? "Searching..." : "Quick Search"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSearch(true)} 
              disabled={isLoading}
              className="border-[#f26522] text-[#f26522] hover:bg-[#fff8f6] px-6"
            >
              {isLoading ? "Searching..." : "Deep Search"}
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-4 max-h-[600px] overflow-y-auto rounded-lg p-1">
          {results.length > 0 ? (
            results.map(company => (
              <Link 
                to={`/company/${formatCompanyIdForUrl(company.id)}`} 
                key={company.id} 
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3 bg-gray-100 flex items-center justify-center">
                        <img 
                          src={getLogoPath(company)} 
                          alt={`${company.metadata.name} logo`} 
                          className="w-full h-full object-contain" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.png';
                          }}
                        />
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {company.metadata.name}
                        {company.metadata.batch && (
                          <span className="ml-2 text-xs text-gray-500">({company.metadata.batch})</span>
                        )}
                      </CardTitle>
                    </div>
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      {company.metadata.headline}
                    </p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                      {company.metadata.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{company.metadata.location}</span>
                        </div>
                      )}
                      
                      {company.metadata.team_size && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{company.metadata.team_size} employees</span>
                        </div>
                      )}
                      
                      {company.metadata.tags && (
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{company.metadata.tags.split(';')[0].split(':')[1]}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              {isLoading ? "Searching for companies..." : "No results yet. Try searching for a company."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
