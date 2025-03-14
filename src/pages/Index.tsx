// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">YC Company Explorer</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find and explore Y Combinator companies with our powerful search tool. 
          Get detailed information about startups, their founders, and more.
        </p>
        
        <div className="space-y-4">
          <Link to="/search">
            <Button size="lg" className="mx-auto">
              <Search className="mr-2 h-5 w-5" />
              Start Searching
            </Button>
          </Link>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Quick Search</h3>
              <p className="text-gray-600">Find companies by name, industry, or location quickly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Deep Search</h3>
              <p className="text-gray-600">Detailed research across company descriptions and more.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Company Details</h3>
              <p className="text-gray-600">Get comprehensive information about each company.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;