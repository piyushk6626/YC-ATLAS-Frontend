
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, TrendingUp, Users, Github, Linkedin, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [gradientPosition, setGradientPosition] = useState(0);

  // Create a subtle animation for the gradient background
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev >= 100 ? 0 : prev + 0.3));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const heroGradientStyle = {
    background: `linear-gradient(${gradientPosition}deg, #f46424 0%, #ff8c54 25%, #ff9e6d 50%, #ffa77a 75%, #ffb088 100%)`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Animated Gradient */}
      <div 
        className="relative overflow-hidden pt-20 pb-16"
        style={heroGradientStyle}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Cpath fill=%22%23fff%22 d=%22M0 4h4v4H0V4zm8 0h4v4H8V4zm8 0h4v4h-4V4zm8 0h4v4h-4V4zM4 8h4v4H4V8zm8 0h4v4h-4V8zm8 0h4v4h-4V8zM0 12h4v4H0v-4zm16 0h4v4h-4v-4zm8 0h4v4h-4v-4zM4 16h4v4H4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zM0 20h4v4H0v-4zm8 0h4v4H8v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zM4 24h4v4H4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4z%22/%3E%3C/svg%3E')]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              YC ATLAS
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Your comprehensive explorer for Y Combinator startups. Discover, research, and connect with 
              the most innovative companies shaping the future.
            </p>
            
            <Link to="/search">
              <Button size="lg" className="mx-auto bg-white hover:bg-white/90 text-[#f46424] rounded-full px-8 py-6 h-auto transition-all transform hover:scale-105 shadow-lg">
                <Search className="mr-2 h-5 w-5" />
                Explore Companies
              </Button>
            </Link>

            <div className="mt-16 flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white/90">
                <Star className="w-4 h-4 mr-2 text-white" /> 4000+ Companies
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white/90">
                <TrendingUp className="w-4 h-4 mr-2 text-white" /> Real-time Updates
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white/90">
                <Users className="w-4 h-4 mr-2 text-white" /> Company Information
              </div>
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
            <h3 className="font-bold text-xl mb-3">Deep Search</h3>
            <p className="text-gray-600">Best Search results by deploying multiple Quick Search queries and then integrating their results.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transform transition-transform hover:scale-105 hover:shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-[#f46424]" />
            </div>  
            <h3 className="font-bold text-xl mb-3">Company Insights</h3>
            <p className="text-gray-600">Gain in-depth knowledge about companies, including their mission, funding, and team.</p>
          </div>
        </div>
      </div>
      
      {/* GitHub Repo Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Open Source Project</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            YC ATLAS is open source and available on GitHub. Feel free to contribute, report issues, or fork the repository.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <a href="https://github.com/piyushk6626/yc-atlas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Github className="w-5 h-5 mr-2" /> Frontend Repository
            </a>
            <a href="https://github.com/piyushk6626/YCAtlas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Github className="w-5 h-5 mr-2" /> Backend Repository
            </a>
            <a href="https://github.com/piyushk6626/YC-ATLAS-Scraping" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Github className="w-5 h-5 mr-2" /> Data & Scraping Tool
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
            © {new Date().getFullYear()}  YC ATLAS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
