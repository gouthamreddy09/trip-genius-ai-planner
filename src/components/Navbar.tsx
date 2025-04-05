
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Plane } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-travel-blue to-travel-purple p-2 text-white">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">AI Itinerary</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-travel-blue transition-colors">
              Home
            </Link>
            <Link to="/create" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-travel-blue transition-colors">
              Plan Trip
            </Link>
            <Link to="/itineraries" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-travel-blue transition-colors">
              My Itineraries
            </Link>
            <Button className="bg-gradient-to-r from-travel-blue to-travel-purple text-white hover:opacity-90">
              Sign In
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-travel-blue"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/create"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue"
              onClick={() => setIsOpen(false)}
            >
              Plan Trip
            </Link>
            <Link 
              to="/itineraries"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue"
              onClick={() => setIsOpen(false)}
            >
              My Itineraries
            </Link>
            <Button 
              className="w-full bg-gradient-to-r from-travel-blue to-travel-purple text-white hover:opacity-90"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
