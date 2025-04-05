
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { getSampleItineraries } from "@/utils/itineraryGenerator";
import { 
  Brain, 
  TrendingUp, 
  Umbrella, 
  DollarSign, 
  Map, 
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const sampleItinerary = getSampleItineraries()[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Smart Travel Planning with AI
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Our AI-powered travel planner learns your preferences to create the perfect itinerary.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<Brain className="h-6 w-6" />}
                title="AI-Powered Recommendations"
                description="Our intelligent system analyzes thousands of options to create personalized itineraries based on your unique preferences."
              />
              <FeatureCard 
                icon={<TrendingUp className="h-6 w-6" />}
                title="Real-Time Adjustments"
                description="Itineraries automatically adapt to changing conditions like weather, closures, or delays to keep your trip on track."
              />
              <FeatureCard 
                icon={<Umbrella className="h-6 w-6" />}
                title="Weather Integration"
                description="Stay prepared with up-to-date weather forecasts and receive alerts for potential travel disruptions."
              />
              <FeatureCard 
                icon={<DollarSign className="h-6 w-6" />}
                title="Budget Optimization"
                description="Track expenses and get cost-saving recommendations to make the most of your travel budget."
              />
              <FeatureCard 
                icon={<Map className="h-6 w-6" />}
                title="Interactive Maps"
                description="Visualize your daily routes and activities with detailed maps that help you navigate efficiently."
              />
              <FeatureCard 
                icon={<Calendar className="h-6 w-6" />}
                title="Local Event Discovery"
                description="Discover events, festivals, and activities happening during your trip that match your interests."
              />
            </div>
          </div>
        </section>
        
        {/* Sample Itinerary Preview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                See How It Works
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Preview a sample AI-generated itinerary for Paris.
              </p>
            </div>
            
            <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{sampleItinerary.destination}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(sampleItinerary.startDate).toLocaleDateString()} - {new Date(sampleItinerary.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-travel-blue text-white px-4 py-2 rounded-full text-sm font-medium">
                    ${sampleItinerary.totalCost} total
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Day 1 Highlights:</h4>
                  <div className="space-y-4">
                    {sampleItinerary.days[0].activities.map((activity, idx) => (
                      <div key={idx} className="flex">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-travel-blue">
                          {idx === 0 ? (
                            <Calendar className="h-5 w-5" />
                          ) : idx === 1 ? (
                            <Map className="h-5 w-5" />
                          ) : (
                            <Sparkles className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-4">
                          <h5 className="text-base font-medium text-gray-900">{activity.time}</h5>
                          <p className="text-base text-gray-500">{activity.activity}</p>
                          {activity.weatherForecast && (
                            <p className="text-sm text-travel-blue">
                              <Umbrella className="inline-block h-4 w-4 mr-1" />
                              {activity.weatherForecast}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4">
                <div className="text-right">
                  <Link to="/itineraries/itin-1">
                    <Button className="inline-flex items-center text-travel-blue">
                      View Complete Itinerary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/create">
                <Button className="bg-gradient-to-r from-travel-blue to-travel-purple text-white hover:opacity-90 text-lg py-6 px-8">
                  Create Your Own Itinerary
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Our Users Say
              </h2>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User" 
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Sarah K.</h4>
                    <p className="text-gray-500">Adventure Traveler</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "This app saved me hours of planning for my Europe trip. The AI suggested places I would never have discovered on my own!"
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User" 
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Michael T.</h4>
                    <p className="text-gray-500">Business Traveler</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "As a frequent business traveler, I love how this app balances my work schedule with local experiences in each city."
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User" 
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">David L.</h4>
                    <p className="text-gray-500">Family Vacationer</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "Planning a trip with kids was always stressful until I found this app. Now we have perfect family-friendly itineraries every time!"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-travel-blue to-travel-purple">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Plan Your Dream Trip?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-white/80">
              Let our AI create the perfect itinerary based on your preferences.
            </p>
            <div className="mt-8">
              <Link to="/create">
                <Button className="bg-white text-travel-blue hover:bg-white/90 text-lg py-6 px-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
