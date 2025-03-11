
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Linkedin, Twitter, Github } from "lucide-react";
import { CompanyDetails as CompanyDetailsType } from '@/types/company';
import { useToast } from "@/components/ui/use-toast";

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        
        // In a real application, you would fetch data from your API
        // const response = await fetch(`/api/companies/${id}`);
        // const data = await response.json();
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example data for demonstration
        const exampleData: CompanyDetailsType = {
          name: "SciPhi",
          headline: "SciPhi is building R2R, the most advanced retrieval system.",
          batch: "W24",
          founded_date: 2023,
          team_size: 2,
          location: "San Francisco",
          website: "https://www.sciphi.ai",
          description: "**SciPhi: Pioneering Advanced AI Retrieval**\n\nWelcome to SciPhi, a fresh face in the vibrant tech scene, founded in 2023 and already making waves as part of Y Combinator Batch W24. Situated in San Francisco and comprised of just two sharp minds, SciPhi is on a mission to redefine how we interact with data and AI through its groundbreaking retrieval system, known as R2R.\n\n### What's the Buzz About?\n\nSciPhi emerged with a clear focus: to create the most advanced Retrieval-Augmented Generation (RAG) system on the market. This isn't just tech jargon; R2R is designed to bridge the gap from RAG prototypes to robust production environments. By tackling challenges related to infrastructure, retrieval speed, and scalability, they aim to empower enterprises to build reliable, context-aware AI applications.",
          logo_path: "/placeholder.svg",
          links: "https://www.ycombinator.com/companies/sciphi",
          tags: "industry:artificial-intelligence; industry:search; industry:infrastructure; industry:ai; location:san-francisco-bay-area",
          generated_description: "SciPhi is a pioneering company in the advanced AI retrieval space, building R2R, the most advanced retrieval system on the market.",
          social_links: [
            "https://www.linkedin.com/company/sciphi-ai/",
            "https://github.com/SciPhi-AI"
          ],
          founders: [
            {
              name: "John Doe",
              description: "AI researcher and entrepreneur with a passion for retrieval systems",
              linkedin: "https://www.linkedin.com/in/johndoe/"
            },
            {
              name: "Jane Smith",
              description: "Machine learning expert specializing in large language models",
              linkedin: "https://www.linkedin.com/in/janesmith/"
            }
          ]
        };
        
        setCompany(exampleData);
        
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

    if (id) {
      fetchCompanyDetails();
    }
  }, [id, toast]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
        </Link>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
              <CardDescription className="text-lg mt-1">{company.headline}</CardDescription>
            </div>
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
              {company.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
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
