import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Bookmark, BookmarkPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getCompanies } from '@/services/companyService';
import { Company } from '@/types/company';
import { useAuth } from '@/contexts/AuthContext';
import { saveCompany, unsaveCompany, isCompanySaved } from '@/services/savedCompanyService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const [savingCompany, setSavingCompany] = useState(false);
  const [companyToSave, setCompanyToSave] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedCompanies = async () => {
      if (user) {
        try {
          const saved = await getCompanies();
          setSavedCompanies(saved.map(company => company.id));
        } catch (error) {
          console.error("Error fetching saved companies:", error);
          toast({
            title: "Error",
            description: "Failed to load saved companies.",
            variant: "destructive"
          });
        }
      } else {
        setSavedCompanies([]);
      }
    };

    fetchSavedCompanies();
  }, [user, toast]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await getCompanies(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to retrieve search results. Please try again.",
        variant: "destructive"
      });
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const isSaved = (companyId: string): boolean => {
    return savedCompanies.includes(companyId);
  };

  const toggleSaveCompany = async (companyId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must sign in to save companies.",
      });
      return;
    }

    setSavingCompany(true);
    setCompanyToSave(companyId);
    try {
      if (isSaved(companyId)) {
        await unsaveCompany(companyId);
        setSavedCompanies(savedCompanies.filter(id => id !== companyId));
        toast({
          title: "Company Unsaved",
          description: "The company has been removed from your saved list."
        });
      } else {
        await saveCompany(companyId);
        setSavedCompanies([...savedCompanies, companyId]);
        toast({
          title: "Company Saved",
          description: "The company has been added to your saved list."
        });
      }
    } catch (error) {
      console.error("Error saving/unsaving company:", error);
      toast({
        title: "Error",
        description: "Failed to save/unsave the company. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSavingCompany(false);
      setCompanyToSave(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Input
          type="text"
          placeholder="Search for companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-4"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          ) : (
            <>
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((company) => (
            <Card key={company.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{company.metadata.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaveCompany(company.id)}
                    disabled={savingCompany && companyToSave !== company.id}
                  >
                    {savingCompany && companyToSave === company.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : isSaved(company.id) ? (
                      <Bookmark className="h-5 w-5 fill-current" aria-label="Unsave company" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5" aria-label="Save company" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{company.metadata.headline}</CardDescription>
                <Link to={`/company/${company.metadata.name}`} className="text-blue-500 hover:text-blue-700">
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No companies found. Please refine your search.</p>
      )}
    </div>
  );
};

export default Search;
