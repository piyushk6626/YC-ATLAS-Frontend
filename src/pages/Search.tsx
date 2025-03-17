
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookmarkPlus, ExternalLink } from "lucide-react";
import { Company } from '@/types/company';
import { useToast } from "@/components/ui/use-toast";
import { searchCompanies, deepSearchCompanies } from '@/services/searchService';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { saveCompany, unsaveCompany, isCompanySaved } from '@/services/savedCompanyService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCompanies, setSavedCompanies] = useState<Record<string, boolean>>({});
  const [savingCompany, setSavingCompany] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Check which companies are saved
  useEffect(() => {
    const checkSavedCompanies = async () => {
      if (!user || results.length === 0) return;
      
      const savedStatus: Record<string, boolean> = {};
      
      // Process in batches to avoid too many concurrent requests
      for (const company of results) {
        try {
          savedStatus[company.id] = await isCompanySaved(company.id);
        } catch (error) {
          console.error(`Error checking saved status for ${company.id}:`, error);
        }
      }
      
      setSavedCompanies(savedStatus);
    };

    checkSavedCompanies();
  }, [results, user]);

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" />;
  }

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

  const handleSaveCompany = async (companyId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setSavingCompany(companyId);
    try {
      if (savedCompanies[companyId]) {
        await unsaveCompany(companyId);
        toast({
          title: "Company Unsaved",
          description: "The company has been removed from your saved list."
        });
        setSavedCompanies(prev => ({ ...prev, [companyId]: false }));
      } else {
        await saveCompany(companyId);
        toast({
          title: "Company Saved",
          description: "The company has been added to your saved list."
        });
        setSavedCompanies(prev => ({ ...prev, [companyId]: true }));
      }
    } catch (error) {
      console.error("Error saving/unsaving company:", error);
      toast({
        title: "Error",
        description: "Failed to save/unsave the company. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSavingCompany(null);
    }
  };

  // Function to get company logo path
  const getLogoPath = (company: Company): string => {
    const formattedName = company.metadata.name.replace(/\s+/g, '_');
    return `data\\logos\\${formattedName}_logo.png`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <Link to="/saved">
            <Button variant="outline" className="mb-4">
              <Bookmark className="mr-2 h-4 w-4" />
              View Saved Companies
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8">Company Search</h1>
        
        <div className="space-y-4">
          <Input 
            type="text" 
            placeholder="Enter your search query..." 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            className="w-full" 
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch(false);
              }
            }}
          />
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => handleSearch(false)} 
              disabled={isLoading} 
              className="text-slate-50 bg-[#f26522]"
            >
              {isLoading ? "Searching..." : "Quick Search"}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleSearch(true)} 
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Deep Search"}
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-4 max-h-[600px] overflow-y-auto rounded-lg p-1">
          {results.length > 0 ? results.map(company => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                  <img 
                    src={getLogoPath(company)} 
                    alt={`${company.metadata.name} logo`} 
                    className="w-10 h-10 object-contain mr-3 rounded-md" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.png';
                    }}
                  />
                  <CardTitle className="text-xl font-semibold">
                    {company.metadata.name}
                  </CardTitle>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSaveCompany(company.id)}
                    disabled={savingCompany === company.id}
                    className="mr-2"
                  >
                    {savingCompany === company.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : savedCompanies[company.id] ? (
                      <Bookmark className="h-5 w-5 fill-current" title="Unsave company" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5" title="Save company" />
                    )}
                  </Button>
                  <Link 
                    to={`/company/${encodeURIComponent(company.metadata.name)}`} 
                    className="text-blue-500"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  {company.metadata.location} • Founded {company.metadata.founded_date}
                </p>
                <p className="text-sm">{company.metadata.headline}</p>
              </CardContent>
            </Card>
          )) : (
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
