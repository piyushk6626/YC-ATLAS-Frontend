
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Linkedin, Twitter, Github, MapPin, Users, Calendar, Tag, Star } from "lucide-react";
import { CompanyDetails as CompanyDetailsType } from '@/types/company';
import { useToast } from "@/components/ui/use-toast";
import { getCompanyDetails } from '@/services/companyService';
import ReactMarkdown from 'react-markdown';

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getCompanyDetails(id);
        setCompany(data);
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
  }, [id, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f26522] mx-auto mb-4"></div>
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
              <Button className="bg-[#f26522] hover:bg-[#e05a1c]">
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" size="sm" className="border-[#f26522] text-[#f26522] hover:bg-[#fff8f6]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <Card className="max-w-4xl mx-auto border border-gray-200 shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
                <img 
                  src={logoPath || fallbackLogoPath} 
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackLogoPath;
                  }}
                />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-gray-800">{company.name}</CardTitle>
                <CardDescription className="text-lg mt-1 text-gray-600">{company.headline}</CardDescription>
              </div>
            </div>
            {company.website && (
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-[#f26522] hover:text-[#e05a1c]"
              >
                <span className="mr-1">Website</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {company.location && (
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p>{company.location}</p>
                </div>
              </div>
            )}
            
            {company.founded_date && (
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                  <p>{company.founded_date}</p>
                </div>
              </div>
            )}
            
            {company.team_size && (
              <div className="flex items-center text-gray-700">
                <Users className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Team Size</h3>
                  <p>{company.team_size} employees</p>
                </div>
              </div>
            )}
          </div>
          
          {company.batch && (
            <div className="flex items-center text-gray-700">
              <Tag className="h-5 w-5 mr-2 text-gray-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">YC Batch</h3>
                <p>{company.batch}</p>
              </div>
            </div>
          )}
          
          {tags && tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
            <div className="prose max-w-none text-gray-700">
              {company.generated_description && (
                <ReactMarkdown>{company.generated_description}</ReactMarkdown>
              )}
            </div>
          </div>

          {company.founders && company.founders.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Founders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.founders.map((founder, index) => (
                  <Card key={index} className="bg-gray-50 border border-gray-200">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{founder.name}</h3>
                      <p className="text-gray-700 mb-3">{founder.description}</p>
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#f26522] hover:text-[#e05a1c]"
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
              <h3 className="font-semibold mb-2 text-gray-700">Social Links</h3>
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
                      className="text-[#f26522] hover:text-[#e05a1c]"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Jobs section - mimicking the design in the screenshot */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Open Positions</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Full-Stack Software Engineer Intern (6 months)</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>SG</span>
                      <span>•</span>
                      <span>Intern</span>
                      <span>•</span>
                      <span>Any</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="bg-[#f26522] hover:bg-[#e05a1c]">View job</Button>
                    <Button variant="ghost" className="text-amber-400 hover:text-amber-500 p-2">
                      <Star className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Senior Software Engineer (Remote)</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>ID / VN / Remote</span>
                      <span>•</span>
                      <span>Fulltime</span>
                      <span>•</span>
                      <span>Any (New Grads Ok)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="bg-[#f26522] hover:bg-[#e05a1c]">View job</Button>
                    <Button variant="ghost" className="text-amber-400 hover:text-amber-500 p-2">
                      <Star className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <a href="#" className="text-[#f26522] hover:text-[#e05a1c] font-medium">
                See all 7 jobs
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsPage;
