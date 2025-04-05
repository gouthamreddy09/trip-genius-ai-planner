import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSampleItineraries, Itinerary } from "@/utils/itineraryGenerator";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Umbrella,
  FileText,
  Share2,
  Download,
  Pencil,
  CloudSun,
  UtensilsCrossed,
  Hotel,
  Bus,
  Taxi,
  Bookmark,
  Car
} from "lucide-react";

const ItineraryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch itinerary data from localStorage or samples
    const savedItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    const sampleItineraries = getSampleItineraries();
    const allItineraries = [...savedItineraries, ...sampleItineraries];
    
    const foundItinerary = allItineraries.find(item => item.id === id);
    
    if (foundItinerary) {
      setItinerary(foundItinerary);
    }
    
    setLoading(false);
  }, [id]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 bg-travel-blue rounded-full animate-pulse" />
                <div className="h-4 w-4 bg-travel-blue rounded-full animate-pulse delay-150" />
                <div className="h-4 w-4 bg-travel-blue rounded-full animate-pulse delay-300" />
              </div>
              <p className="mt-4 text-gray-500">Loading itinerary...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!itinerary) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Itinerary not found</h2>
              <p className="text-gray-500 mb-6">The itinerary you are looking for doesn't exist or has been deleted.</p>
              <Link to="/itineraries">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Itineraries
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb and Back link */}
          <div className="mb-6">
            <Link to="/itineraries" className="text-travel-blue flex items-center hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Itineraries
            </Link>
          </div>
          
          {/* Itinerary Header */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{itinerary.destination}</h1>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-travel-blue mr-1" />
                    <span className="text-gray-600">
                      {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button className="bg-travel-blue hover:bg-travel-blue/90 flex items-center">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full p-2 bg-blue-100 mr-4">
                      <Calendar className="h-5 w-5 text-travel-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{itinerary.totalDays} Days</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full p-2 bg-blue-100 mr-4">
                      <Users className="h-5 w-5 text-travel-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Travelers</p>
                      <p className="font-medium">{itinerary.travelers} People</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full p-2 bg-blue-100 mr-4">
                      <DollarSign className="h-5 w-5 text-travel-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">${itinerary.budget}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full p-2 bg-blue-100 mr-4">
                      <DollarSign className="h-5 w-5 text-travel-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Cost</p>
                      <p className="font-medium">${itinerary.totalCost}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Budget Utilization</p>
                  <p className="text-sm font-medium">
                    ${itinerary.totalCost} of ${itinerary.budget}
                  </p>
                </div>
                <Progress 
                  value={(itinerary.totalCost / itinerary.budget) * 100} 
                  className="h-2"
                />
                {itinerary.totalCost > itinerary.budget ? (
                  <p className="text-xs text-red-500 mt-1">
                    Over budget by ${itinerary.totalCost - itinerary.budget}
                  </p>
                ) : (
                  <p className="text-xs text-green-500 mt-1">
                    Under budget by ${itinerary.budget - itinerary.totalCost}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Itinerary Content */}
          <Tabs defaultValue="day-by-day" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="day-by-day">Day by Day</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="transportation">Transportation</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="day-by-day" className="mt-0">
              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  {itinerary.days.map((day) => (
                    <AccordionItem key={day.day} value={`day-${day.day}`} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                          <div className="flex items-center">
                            <div className="rounded-full bg-travel-blue text-white p-2 w-10 h-10 flex items-center justify-center mr-4">
                              <span className="font-bold">{day.day}</span>
                            </div>
                            <div className="text-left">
                              <h3 className="text-lg font-semibold">{day.date}</h3>
                            </div>
                          </div>
                          {day.day === 1 && (
                            <Badge className="bg-blue-100 text-travel-blue hover:bg-blue-100 ml-14 sm:ml-0 mt-2 sm:mt-0">
                              <CloudSun className="h-3 w-3 mr-1" />
                              Today's Weather
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2">
                        <div className="space-y-6">
                          {day.day === 1 && (
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                              <div className="flex items-center">
                                <CloudSun className="h-6 w-6 text-travel-blue mr-2" />
                                <h4 className="font-medium">Weather Forecast</h4>
                              </div>
                              <p className="mt-2 text-gray-600">Sunny, 72°F with a light breeze. Perfect weather for exploring!</p>
                            </div>
                          )}
                          
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                              <div className="flex items-start">
                                <div className="bg-gray-100 text-gray-700 p-2 rounded">
                                  <Clock className="h-5 w-5" />
                                </div>
                                <div className="ml-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <h4 className="font-medium text-gray-900">{activity.time}</h4>
                                    {activity.cost > 0 && (
                                      <Badge variant="outline" className="flex items-center mt-1 sm:mt-0 sm:ml-2">
                                        <DollarSign className="h-3 w-3 mr-1" />
                                        ${activity.cost}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-700 mt-1">{activity.activity}</p>
                                  <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {activity.location}
                                  </div>
                                  {activity.weatherForecast && (
                                    <div className="flex items-center mt-2 text-sm text-blue-600">
                                      <Umbrella className="h-4 w-4 mr-1" />
                                      {activity.weatherForecast}
                                    </div>
                                  )}
                                  {activity.notes && (
                                    <div className="flex items-center mt-2 text-sm text-amber-600">
                                      <FileText className="h-4 w-4 mr-1" />
                                      {activity.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="accommodations" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Hotel className="h-5 w-5 mr-2" />
                    Accommodations
                  </CardTitle>
                  <CardDescription>Places to stay during your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <Hotel className="h-6 w-6 text-travel-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Coming Soon
                    </h3>
                    <p className="text-gray-500">
                      We're working on adding hotel and accommodation booking features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transportation" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bus className="h-5 w-5 mr-2" />
                    Transportation
                  </CardTitle>
                  <CardDescription>Getting around during your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <Car className="h-6 w-6 text-travel-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Coming Soon
                    </h3>
                    <p className="text-gray-500">
                      We're working on adding transportation booking and planning features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Expenses
                  </CardTitle>
                  <CardDescription>Track your trip expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mx-auto rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-travel-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Coming Soon
                    </h3>
                    <p className="text-gray-500">
                      We're working on adding detailed expense tracking and budgeting features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItineraryDetail;
