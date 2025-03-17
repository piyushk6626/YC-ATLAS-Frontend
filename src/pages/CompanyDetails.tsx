
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Linkedin, Twitter, Github, Bookmark, BookmarkPlus } from "lucide-react";
import { CompanyDetails as CompanyDetailsType } from '@/types/company';
import { useToast } from "@/components/ui/use-toast";
import { getCompanyDetails } from '@/services/companyService';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/contexts/AuthContext';
import { saveCompany, unsaveCompany, isCompanySaved } from '@/services/savedCompanyService';

const CompanyDetailsPage = () => {
  const { name } = useParams();
  const [company, setCompany] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!name) return;
      
      try {
        setLoading(true);
        const data = await getCompanyDetails(name);
        setCompany(data);
        
        // Check if company is saved
        if (user) {
          const saved = await isCompanySaved(data.name);
          setIsSaved(saved);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
        toast({
          title: "Error",
          description: "Failed to load company details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchCompanyDetails();
  }, [name, toast, user]);

  const handleSaveCompany = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!company) return;

    setSavingCompany(true);
    try {
      if (isSaved) {
        await unsaveCompany(company.name);
        toast({
          title: "Company Unsaved",
          description: "The company has been removed from your saved list."
        });
        setIsSaved(false);
      } else {
        await saveCompany(company.name);
        toast({
          title: "Company Saved",
          description: "The company has been added to your saved list."
        });
        setIsSaved(true);
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
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Company Not Found</h2>
            <p className="mb-6">The company you're looking for could not be found.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse tags into a more readable format
  const tags = company.tags?.split(';').map(tag => tag.trim().split(':')[1] || tag.trim());

  // Create logo path based on the example provided
  const logoPath = company.logo_path ? `/${company.logo_path.replace('\\', '/')}` : null;
  const fallbackLogoPath = '/placeholder.png';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link to="/saved">
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Saved Companies
          </Button>
        </Link>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <img 
                src={logoPath || fallbackLogoPath} 
                alt={`${company.name} logo`}
                className="w-16 h-16 object-contain mr-4 rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackLogoPath;
                }}
              />
              <div>
                <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
                <CardDescription className="text-lg mt-1">{company.headline}</CardDescription>
              </div>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSaveCompany}
                disabled={savingCompany}
                className="mr-2"
              >
                {savingCompany ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : isSaved ? (
                  <Bookmark className="h-5 w-5 fill-current" title="Unsave company" />
                ) : (
                  <BookmarkPlus className="h-5 w-5" title="Save company" />
                )}
              </Button>
              {company.website && (
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <span className="mr-1">Website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-gray-500">Location</h3>
              <p>{company.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">Founded</h3>
              <p>{company.founded_date}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">Team Size</h3>
              <p>{company.team_size} employees</p>
            </div>
          </div>
          
          {company.batch && (
            <div>
              <h3 className="font-semibold text-gray-500">YC Batch</h3>
              <p>{company.batch}</p>
            </div>
          )}
          
          {tags && tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div className="prose max-w-none">
              {company.generated_description && (
                <ReactMarkdown>{company.generated_description}</ReactMarkdown>
              )}
            </div>
          </div>

          {company.founders && company.founders.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Founders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.founders.map((founder, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2">{founder.name}</h3>
                      <p className="text-gray-700 mb-3">{founder.description}</p>
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Linkedin className="h-4 w-4 mr-1" />
                          LinkedIn Profile
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {company.social_links && company.social_links.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Social Links</h3>
              <div className="flex gap-3">
                {company.social_links.map((link, index) => {
                  let icon = <ExternalLink className="h-5 w-5" />;
                  if (link.includes('linkedin')) icon = <Linkedin className="h-5 w-5" />;
                  if (link.includes('twitter')) icon = <Twitter className="h-5 w-5" />;
                  if (link.includes('github')) icon = <Github className="h-5 w-5" />;
                  
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsPage;
