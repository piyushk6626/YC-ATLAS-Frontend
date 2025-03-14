
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, TrendingUp, Users, Github, Linkedin, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f46424] to-[#ff8c54]">
            YC ATLAS
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Your comprehensive explorer for Y Combinator startups. Discover, research, and connect with 
            the most innovative companies shaping the future.
          </p>
          
          <Link to="/search">
            <Button size="lg" className="mx-auto bg-[#f46424] hover:bg-[#e05a1c] text-white rounded-full px-8 py-6 h-auto transition-all transform hover:scale-105">
              <Search className="mr-2 h-5 w-5" />
              Explore Companies
            </Button>
          </Link>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              <Star className="w-4 h-4 mr-2 text-[#f46424]" /> 4000+ Companies
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-2 text-[#f46424]" /> Real-time Updates
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-[#f46424]" /> Founder Information
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Search Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-[#f46424]" />
            </div>
            <h3 className="font-bold text-xl mb-3">Quick Search</h3>
            <p className="text-gray-600">Find companies by name, industry, or location with lightning-fast results.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-[#f46424]" />
            </div>
            <h3 className="font-bold text-xl mb-3">Deep Analytics</h3>
            <p className="text-gray-600">Explore detailed metrics and analysis across company descriptions and performance.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-[#f46424]" />
            </div>
            <h3 className="font-bold text-xl mb-3">Founder Insights</h3>
            <p className="text-gray-600">Get comprehensive information about founders, their background, and previous ventures.</p>
          </div>
        </div>
      </div>
      
      {/* GitHub Repo Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Open Source Project</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            YC Atlas is open source and available on GitHub. Feel free to contribute, report issues, or fork the repository.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <a href="https://github.com/piyushk6626/yc-atlas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Github className="w-5 h-5 mr-2" /> Frontend Repository
            </a>
            <a href="https://github.com/piyushk6626/YCAtlas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Github className="w-5 h-5 mr-2" /> Backend Repository
            </a>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#f46424] to-[#ff8c54] rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to discover the next unicorn?</h2>
          <p className="text-white opacity-90 mb-8 max-w-xl mx-auto">
            Start exploring the comprehensive database of Y Combinator companies and find the insights you need.
          </p>
          <Link to="/search">
            <Button size="lg" variant="outline" className="bg-white text-[#f46424] border-white hover:bg-transparent hover:text-white">
              Start Searching Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer with Contact Information */}
      <footer className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Created by Piyush Kulkarni</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/in/piyush-kulkarni-ai/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#f46424] transition-colors flex items-center">
                <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
              </a>
              <a href="https://github.com/piyushk6626" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#f46424] transition-colors flex items-center">
                <Github className="w-5 h-5 mr-2" /> GitHub
              </a>
              <a href="https://codefatherai.webflow.io/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#f46424] transition-colors flex items-center">
                <Globe className="w-5 h-5 mr-2" /> Portfolio
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} YC Atlas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
