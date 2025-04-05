
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  CalendarIcon, 
  Loader2,
  Brain,
  Globe,
  Users,
  DollarSign
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  generateItinerary, 
  popularDestinations, 
  interestPreferences,
  TripInfo
} from "@/utils/itineraryGenerator";

const CreateItinerary = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [budget, setBudget] = useState(1000);
  const [travelers, setTravelers] = useState(2);
  const [preferences, setPreferences] = useState(interestPreferences);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handlePreferenceChange = (id: string) => {
    setPreferences(
      preferences.map(pref => 
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };
  
  const handleCreateItinerary = async () => {
    // Basic validation
    if (!destination) {
      toast({
        title: "Destination required",
        description: "Please select a destination.",
        variant: "destructive"
      });
      return;
    }
    
    if (!startDate || !endDate) {
      toast({
        title: "Dates required",
        description: "Please select your travel dates.",
        variant: "destructive"
      });
      return;
    }
    
    if (startDate > endDate) {
      toast({
        title: "Invalid dates",
        description: "Start date must be before end date.",
        variant: "destructive"
      });
      return;
    }
    
    if (!preferences.some(pref => pref.selected)) {
      toast({
        title: "Preferences required",
        description: "Please select at least one preference.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate itinerary
    setIsGenerating(true);
    
    try {
      const tripInfo: TripInfo = {
        destination,
        startDate,
        endDate,
        budget,
        travelers,
        preferences
      };
      
      const itinerary = await generateItinerary(tripInfo);
      
      // Store itinerary in localStorage (in a real app, this would go to a database)
      const savedItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
      localStorage.setItem('itineraries', JSON.stringify([...savedItineraries, itinerary]));
      
      toast({
        title: "Itinerary created!",
        description: `Your ${destination} trip plan is ready to view.`,
      });
      
      navigate(`/itineraries/${itinerary.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Create Your AI Travel Itinerary
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Tell us about your trip and preferences, and our AI will plan the perfect itinerary for you.
            </p>
          </div>
          
          <Card className="p-6 shadow-lg border-none">
            {/* Destination */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="destination" className="text-base">Destination</Label>
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-travel-blue" />
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularDestinations.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">
                Can't find your destination? Type in any city.
              </p>
            </div>
            
            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-base">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-base">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="end-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => 
                        (startDate ? date < startDate : false) || 
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Budget */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="budget" className="text-base">Budget (USD)</Label>
                <span className="font-medium text-travel-blue">${budget}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-travel-blue" />
                <Slider
                  id="budget"
                  min={500}
                  max={10000}
                  step={100}
                  value={[budget]}
                  onValueChange={([value]) => setBudget(value)}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>$500</span>
                <span>$10,000</span>
              </div>
            </div>
            
            {/* Travelers */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="travelers" className="text-base">Number of Travelers</Label>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-travel-blue" />
                <Select
                  value={travelers.toString()}
                  onValueChange={(value) => setTravelers(parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="space-y-2 mb-6">
              <Label className="text-base">Travel Preferences</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {preferences.map((preference) => (
                  <div key={preference.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={preference.id}
                      checked={preference.selected}
                      onCheckedChange={() => handlePreferenceChange(preference.id)}
                    />
                    <Label 
                      htmlFor={preference.id} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {preference.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="additional-info" className="text-base">Additional Information</Label>
              <Textarea
                id="additional-info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any specific requirements or information for your trip? (Optional)"
                className="resize-none"
                rows={3}
              />
            </div>
            
            {/* Create Button */}
            <Button 
              onClick={handleCreateItinerary}
              className="w-full bg-gradient-to-r from-travel-blue to-travel-purple text-white hover:opacity-90 py-6"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating your personalized itinerary...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-5 w-5" />
                  Generate AI Itinerary
                </>
              )}
            </Button>
            
            {isGenerating && (
              <div className="mt-4 text-center text-sm text-gray-500">
                Our AI is creating your personalized itinerary based on your preferences.
                This may take a moment...
              </div>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateItinerary;
