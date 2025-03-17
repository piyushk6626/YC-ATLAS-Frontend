
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Bookmark, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Company Database</h1>
        <p className="text-xl mb-8">Search and explore companies, save your favorites</p>
        
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <Link to="/search">
            <Button className="text-slate-50 bg-[#f26522] gap-2">
              <Search className="h-5 w-5" />
              Search Companies
            </Button>
          </Link>
          
          {user ? (
            <>
              <Link to="/saved">
                <Button variant="outline" className="gap-2">
                  <Bookmark className="h-5 w-5" />
                  Saved Companies
                </Button>
              </Link>
              
              <Button variant="ghost" onClick={signOut} className="gap-2">
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={signIn} className="gap-2">
              <LogIn className="h-5 w-5" />
              Sign In
            </Button>
          )}
        </div>
        
        {!user && (
          <div className="p-4 bg-amber-50 rounded-md mb-8 max-w-lg mx-auto">
            <p className="text-amber-800">
              Sign in to save companies and access personalized features.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard 
            title="Search Companies" 
            description="Find companies using quick or deep search capabilities"
            icon={<Search className="h-10 w-10 text-[#f26522]" />}
            link="/search"
          />
          <FeatureCard 
            title="Save Favorites" 
            description="Bookmark companies to revisit them later"
            icon={<Bookmark className="h-10 w-10 text-[#f26522]" />}
            link="/saved"
          />
          <FeatureCard 
            title="Detailed Profiles" 
            description="View comprehensive information about each company"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-[#f26522]"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 9h.01" /><path d="M15 9h.01" /><path d="M9 15h.01" /><path d="M15 15h.01" /></svg>}
            link="/search"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard = ({ title, description, icon, link }: FeatureCardProps) => (
  <Link to={link} className="block">
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

export default Index;
