
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSampleItineraries, Itinerary } from "@/utils/itineraryGenerator";
import { 
  Plus,
  Search,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Itineraries = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  
  useEffect(() => {
    // Get itineraries from localStorage or use sample ones
    const savedItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    const sampleItineraries = getSampleItineraries();
    
    // Combine saved and sample, avoiding duplicates by id
    const combinedItineraries = [...savedItineraries];
    
    // Only add sample itineraries that don't exist in saved ones
    sampleItineraries.forEach(sample => {
      if (!combinedItineraries.some(item => item.id === sample.id)) {
        combinedItineraries.push(sample);
      }
    });
    
    setItineraries(combinedItineraries);
    setFilteredItineraries(combinedItineraries);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = itineraries.filter(
        (itinerary) =>
          itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItineraries(filtered);
    } else {
      setFilteredItineraries(itineraries);
    }
  }, [searchTerm, itineraries]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Your Itineraries</h1>
              <p className="mt-1 text-lg text-gray-500">
                Manage and view your travel plans
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search itineraries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Link to="/create">
                <Button className="bg-gradient-to-r from-travel-blue to-travel-purple text-white hover:opacity-90 w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  New Itinerary
                </Button>
              </Link>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItineraries.length > 0 ? (
                  filteredItineraries.map((itinerary) => (
                    <Link to={`/itineraries/${itinerary.id}`} key={itinerary.id}>
                      <Card className="itinerary-card h-full flex flex-col">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{itinerary.destination}</CardTitle>
                              <CardDescription>
                                {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="space-y-4 flex-grow">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-travel-blue mr-2" />
                                <span className="text-sm">{itinerary.totalDays} Days</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 text-travel-blue mr-2" />
                                <span className="text-sm">{itinerary.travelers} Travelers</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-travel-blue mr-2" />
                                <span className="text-sm">${itinerary.totalCost}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-travel-blue mr-2" />
                                <span className="text-sm">{itinerary.days.length} Activities</span>
                              </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4">
                              <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                              <ul className="text-xs text-gray-500 space-y-1">
                                {itinerary.days[0].activities.slice(0, 2).map((activity, idx) => (
                                  <li key={idx} className="truncate">{activity.activity}</li>
                                ))}
                                {itinerary.days.length > 1 && (
                                  <li className="text-travel-blue">+ more activities</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-4">
                          <Button variant="ghost" className="w-full text-travel-blue flex items-center justify-center">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-travel-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No itineraries found</h3>
                    <p className="text-gray-500 mb-6">Create a new itinerary to get started.</p>
                    <Link to="/create">
                      <Button className="bg-travel-blue hover:bg-travel-blue/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Itinerary
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="text-center py-12">
                <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-travel-blue" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Filter by upcoming trips
                </h3>
                <p className="text-gray-500 mb-6">
                  This tab will show your future trips.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              <div className="text-center py-12">
                <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-travel-blue" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Filter by past trips
                </h3>
                <p className="text-gray-500 mb-6">
                  This tab will show your completed trips.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="drafts" className="mt-0">
              <div className="text-center py-12">
                <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-travel-blue" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Filter by draft itineraries
                </h3>
                <p className="text-gray-500 mb-6">
                  This tab will show your saved drafts.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Itineraries;
