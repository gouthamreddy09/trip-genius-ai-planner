
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Globe className="h-24 w-24 text-travel-blue opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-10 w-10 text-travel-blue" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
          <p className="mt-2 text-2xl font-bold text-gray-900">Destination Not Found</p>
          <p className="mt-4 max-w-lg mx-auto text-lg text-gray-600">
            It seems like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-10">
            <Link to="/">
              <Button className="bg-travel-blue hover:bg-travel-blue/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-travel-blue hover:shadow-md transition-all">
                Home
              </Link>
              <Link to="/create" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-travel-blue hover:shadow-md transition-all">
                Create Itinerary
              </Link>
              <Link to="/itineraries" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-travel-blue hover:shadow-md transition-all">
                My Itineraries
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
