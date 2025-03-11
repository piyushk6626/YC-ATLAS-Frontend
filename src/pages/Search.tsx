
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Company } from '@/types/company';
import { useToast } from "@/components/ui/use-toast";

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
      // For demonstration, we're using a simulated API response
      // In a real application, you would call your actual search API here
      // e.g., const response = await fetch('/api/search?query=' + encodeURIComponent(query) + '&deep=' + isDeepSearch);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example data for demonstration
      const exampleData: Company[] = [
        {
          id: "SciPhi_W24",
          score: 0.6567634344100952,
          metadata: {
            batch: "W24",
            founded_date: 2023,
            generated_description: "**SciPhi: Pioneering Advanced AI Retrieval**\n\nWelcome to SciPhi, a fresh face in the vibrant tech scene, founded in 2023 and already making waves as part of Y Combinator Batch W24. Situated in San Francisco and comprised of just two sharp minds, SciPhi is on a mission to redefine how we interact with data and AI through its groundbreaking retrieval system, known as R2R.",
            headline: "SciPhi is building R2R, the most advanced retrieval system.",
            links: "https://www.ycombinator.com/companies/sciphi",
            location: "San Francisco",
            logo_path: "data/logos\\SciPhi_logo.png",
            name: "SciPhi",
            social_links: "[\"https://www.linkedin.com/company/sciphi-ai/\", \"https://github.com/SciPhi-AI\"]",
            tags: "industry:artificial-intelligence; industry:search; industry:infrastructure; industry:ai; location:san-francisco-bay-area",
            team_size: 2,
            website: "https://www.sciphi.ai"
          }
        },
        {
          id: "Ragas_W24",
          score: 0.6302037835121155,
          metadata: {
            batch: "W24",
            founded_date: 2023,
            generated_description: "**Company Overview: Ragas**\n\nFounded in 2023 and based in San Francisco, Ragas is on a mission to establish an open-source standard for evaluating large language model (LLM) applications.",
            headline: "Building the open source standard for evaluating LLM Applications",
            links: "https://www.ycombinator.com/companies/ragas",
            location: "San Francisco",
            logo_path: "data/logos\\Ragas_logo.png",
            name: "Ragas",
            social_links: "[\"https://www.linkedin.com/company/ragas/\", \"https://twitter.com/ragas_io\", \"https://github.com/explodinggradients\"]",
            tags: "industry:developer-tools; industry:generative-ai; industry:open-source; industry:ai; location:san-francisco-bay-area",
            team_size: 2,
            website: "https://www.ragas.io"
          }
        }
      ];
      
      setResults(exampleData);
      
      toast({
        title: isDeepSearch ? "Deep Search Complete" : "Quick Search Complete",
        description: `Found ${exampleData.length} results for "${query}"`,
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(false);
              }
            }}
          />
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => handleSearch(false)}
              disabled={isLoading}
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
          {results.length > 0 ? (
            results.map((company) => (
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
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              {isLoading ? 
                "Searching for companies..." : 
                "No results yet. Try searching for a company."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
