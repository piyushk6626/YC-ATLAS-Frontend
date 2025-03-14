
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import CompanyDetails from "./pages/CompanyDetails";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const Header = () => (
  <header className="border-b border-gray-200 bg-white">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/3343ee9c-dfb7-4411-9453-5e8527f9498e.png" 
          alt="Company Logo" 
          className="h-10 w-10 mr-3" 
        />
        <h1 className="text-xl font-bold">Company Explorer</h1>
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/search" className="text-gray-800 hover:text-[#f26522]">
              Search
            </Link>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-[#f26522]">
              Discover
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-[#f26522]">
              My Saved
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-[#f9f9f9]">
        <BrowserRouter>
          <Header />
          <main className="py-6">
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/search" element={<Search />} />
              <Route path="/company/:id" element={<CompanyDetails />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
