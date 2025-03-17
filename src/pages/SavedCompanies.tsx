
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getSavedCompanies, unsaveCompany } from '@/services/savedCompanyService';
import { Company } from '@/types/company';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const SavedCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchSavedCompanies = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await getSavedCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching saved companies:', error);
        toast({
          title: 'Error',
          description: 'Failed to load saved companies. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchSavedCompanies();
    }
  }, [user, authLoading, toast]);

  const handleUnsave = async (companyId: string) => {
    try {
      await unsaveCompany(companyId);
      setCompanies(companies.filter(company => company.id !== companyId));
      toast({
        title: 'Company Unsaved',
        description: 'The company has been removed from your saved list.',
      });
    } catch (error) {
      console.error('Error removing company:', error);
      toast({
        title: 'Error',
        description: 'Failed to unsave the company. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" />;
  }

  // Function to get company logo path
  const getLogoPath = (company: Company): string => {
    const formattedName = company.metadata.name.replace(/\s+/g, '_');
    return `data\\logos\\${formattedName}_logo.png`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-8">Saved Companies</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="mb-4">You haven't saved any companies yet.</p>
          <Link to="/search">
            <Button>
              Search Companies
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map(company => (
            <Card key={company.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={getLogoPath(company)}
                      alt={`${company.metadata.name} logo`}
                      className="w-10 h-10 object-contain mr-3 rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                    <CardTitle className="text-xl truncate">{company.metadata.name}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleUnsave(company.id)}
                    title="Unsave company"
                  >
                    <Bookmark className="h-5 w-5 fill-current" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="py-4 flex-grow">
                <p className="text-sm text-gray-500 mb-2">
                  {company.metadata.location} • {company.metadata.founded_date && `Founded ${company.metadata.founded_date}`}
                </p>
                <p className="text-sm line-clamp-3 mb-4">{company.metadata.headline}</p>
                
                <div className="mt-auto pt-4 flex justify-between">
                  <Link to={`/company/${encodeURIComponent(company.metadata.name)}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  
                  {company.metadata.website && (
                    <a 
                      href={company.metadata.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCompanies;
