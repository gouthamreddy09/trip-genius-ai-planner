
interface Preference {
  id: string;
  name: string;
  selected: boolean;
}

export interface TripInfo {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelers: number;
  preferences: Preference[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    cost: number;
    weatherForecast?: string;
    notes?: string;
  }[];
}

export interface Itinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  budget: number;
  travelers: number;
  totalCost: number;
  days: ItineraryDay[];
}

// Simulated AI generation function
export const generateItinerary = (tripInfo: TripInfo): Promise<Itinerary> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const days = [];
      const startDate = new Date(tripInfo.startDate);
      const endDate = new Date(tripInfo.endDate);
      const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
      
      // Sample activity templates based on preferences
      const activityTemplates = {
        "Sightseeing": [
          { activity: "Visit [landmark]", cost: 20 },
          { activity: "Walking tour of [area]", cost: 15 },
          { activity: "Explore [museum]", cost: 25 }
        ],
        "Food & Dining": [
          { activity: "Breakfast at [cafe]", cost: 15 },
          { activity: "Lunch at local [cuisine] restaurant", cost: 25 },
          { activity: "Fine dining experience at [restaurant]", cost: 60 }
        ],
        "Nature & Outdoors": [
          { activity: "Hike at [trail/park]", cost: 0 },
          { activity: "Visit [garden/park]", cost: 5 },
          { activity: "Outdoor adventure: [activity]", cost: 45 }
        ],
        "Cultural Experiences": [
          { activity: "Attend [cultural event]", cost: 35 },
          { activity: "Visit [historical site]", cost: 20 },
          { activity: "Take a [cultural] class", cost: 50 }
        ],
        "Shopping": [
          { activity: "Shop at [market/mall]", cost: 0 },
          { activity: "Visit [boutique/specialty store]", cost: 0 },
          { activity: "Souvenir shopping at [location]", cost: 30 }
        ],
        "Relaxation": [
          { activity: "Spa day at [spa]", cost: 100 },
          { activity: "Relax at [beach/pool]", cost: 10 },
          { activity: "Leisure time at [location]", cost: 15 }
        ]
      };
      
      // Destination-specific landmarks and locations
      const destinationSpecifics: Record<string, any> = {
        "Paris": {
          landmarks: ["Eiffel Tower", "Arc de Triomphe", "Notre-Dame Cathedral"],
          museums: ["The Louvre", "Musée d'Orsay", "Centre Pompidou"],
          areas: ["Montmartre", "Le Marais", "Latin Quarter"],
          restaurants: ["Café de Flore", "Le Jules Verne", "L'Ambroisie"],
          parks: ["Luxembourg Gardens", "Tuileries Garden", "Parc des Buttes-Chaumont"],
          markets: ["Le Marché des Enfants Rouges", "Marché Bastille", "Saint-Ouen Flea Market"],
          activities: ["Seine River Cruise", "Wine Tasting", "Perfume Workshop"]
        },
        "Tokyo": {
          landmarks: ["Tokyo Tower", "Tokyo Skytree", "Senso-ji Temple"],
          museums: ["Tokyo National Museum", "Ghibli Museum", "Mori Art Museum"],
          areas: ["Shibuya", "Shinjuku", "Akihabara"],
          restaurants: ["Sukiyabashi Jiro", "Tsukiji Outer Market", "Gonpachi"],
          parks: ["Ueno Park", "Shinjuku Gyoen", "Yoyogi Park"],
          markets: ["Tsukiji Fish Market", "Ameyoko", "Nakamise Shopping Street"],
          activities: ["Tea Ceremony", "Sumo Tournament", "Karaoke Night"]
        },
        "New York": {
          landmarks: ["Statue of Liberty", "Empire State Building", "Brooklyn Bridge"],
          museums: ["MoMA", "Metropolitan Museum of Art", "Guggenheim Museum"],
          areas: ["Times Square", "SoHo", "Greenwich Village"],
          restaurants: ["Katz's Delicatessen", "Peter Luger Steakhouse", "Le Bernardin"],
          parks: ["Central Park", "The High Line", "Washington Square Park"],
          markets: ["Chelsea Market", "Grand Central Market", "Union Square Greenmarket"],
          activities: ["Broadway Show", "Helicopter Tour", "Harbor Cruise"]
        }
      };
      
      // Default to generic if destination not found
      const destinationData = destinationSpecifics[tripInfo.destination] || {
        landmarks: ["Famous Landmark", "Historic Site", "Monument"],
        museums: ["City Museum", "Art Gallery", "Science Center"],
        areas: ["Downtown", "Historic District", "Waterfront"],
        restaurants: ["Local Restaurant", "Famous Café", "Traditional Bistro"],
        parks: ["City Park", "Gardens", "Nature Reserve"],
        markets: ["Local Market", "Shopping District", "Artisan Shops"],
        activities: ["City Tour", "Local Experience", "Cultural Event"]
      };
      
      // Selected preferences
      const selectedPreferences = tripInfo.preferences
        .filter(pref => pref.selected)
        .map(pref => pref.name);
      
      // Generate days
      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const activities = [];
        
        // Morning activity
        const morningPref = selectedPreferences[i % selectedPreferences.length];
        const morningTemplate = activityTemplates[morningPref]?.[0] || 
                              activityTemplates["Sightseeing"][0];
        
        // Afternoon activity
        const afternoonPref = selectedPreferences[(i + 1) % selectedPreferences.length];
        const afternoonTemplate = activityTemplates[afternoonPref]?.[1] || 
                                activityTemplates["Cultural Experiences"][0];
        
        // Evening activity
        const eveningPref = selectedPreferences[(i + 2) % selectedPreferences.length];
        const eveningTemplate = activityTemplates[eveningPref]?.[2] || 
                              activityTemplates["Food & Dining"][2];
        
        // Replace placeholders with destination-specific content
        const morningActivity = {
          time: "9:00 AM",
          activity: morningTemplate.activity.replace(
            /\[(.*?)\]/g, 
            () => {
              if (morningPref === "Sightseeing") {
                return destinationData.landmarks[i % destinationData.landmarks.length];
              } else if (morningPref === "Cultural Experiences") {
                return destinationData.museums[i % destinationData.museums.length];
              } else {
                return destinationData.areas[i % destinationData.areas.length];
              }
            }
          ),
          location: destinationData.areas[i % destinationData.areas.length],
          cost: morningTemplate.cost * tripInfo.travelers,
          weatherForecast: i === 0 ? "Sunny, 72°F" : undefined
        };
        
        const afternoonActivity = {
          time: "2:00 PM",
          activity: afternoonTemplate.activity.replace(
            /\[(.*?)\]/g, 
            () => {
              if (afternoonPref === "Food & Dining") {
                return destinationData.restaurants[i % destinationData.restaurants.length];
              } else if (afternoonPref === "Nature & Outdoors") {
                return destinationData.parks[i % destinationData.parks.length];
              } else {
                return destinationData.activities[i % destinationData.activities.length];
              }
            }
          ),
          location: destinationData.areas[(i + 1) % destinationData.areas.length],
          cost: afternoonTemplate.cost * tripInfo.travelers
        };
        
        const eveningActivity = {
          time: "7:00 PM",
          activity: eveningTemplate.activity.replace(
            /\[(.*?)\]/g, 
            () => {
              if (eveningPref === "Food & Dining") {
                return destinationData.restaurants[(i + 1) % destinationData.restaurants.length];
              } else if (eveningPref === "Shopping") {
                return destinationData.markets[i % destinationData.markets.length];
              } else {
                return destinationData.activities[(i + 1) % destinationData.activities.length];
              }
            }
          ),
          location: eveningPref === "Food & Dining" 
            ? destinationData.restaurants[(i + 1) % destinationData.restaurants.length]
            : destinationData.areas[(i + 2) % destinationData.areas.length],
          cost: eveningTemplate.cost * tripInfo.travelers,
          notes: i === 0 ? "Reservation recommended" : undefined
        };
        
        activities.push(morningActivity, afternoonActivity, eveningActivity);
        
        days.push({
          day: i + 1,
          date: currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          }),
          activities
        });
      }
      
      const totalCost = days.reduce((sum, day) => 
        sum + day.activities.reduce((daySum, activity) => daySum + activity.cost, 0), 0
      );
      
      const itinerary: Itinerary = {
        id: `itin-${Date.now()}`,
        destination: tripInfo.destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalDays,
        budget: tripInfo.budget,
        travelers: tripInfo.travelers,
        totalCost,
        days
      };
      
      resolve(itinerary);
    }, 3000); // Simulate 3 second delay for AI processing
  });
};

// List of sample destinations
export const popularDestinations = [
  "Paris", "Tokyo", "New York", "Rome", "Bangkok", "Istanbul", 
  "London", "Dubai", "Singapore", "Barcelona", "San Francisco", 
  "Sydney", "Hong Kong", "Rio de Janeiro", "Amsterdam", "Prague"
];

// List of interest preferences
export const interestPreferences = [
  { id: "pref-1", name: "Sightseeing", selected: true },
  { id: "pref-2", name: "Food & Dining", selected: true },
  { id: "pref-3", name: "Nature & Outdoors", selected: false },
  { id: "pref-4", name: "Cultural Experiences", selected: true },
  { id: "pref-5", name: "Shopping", selected: false },
  { id: "pref-6", name: "Relaxation", selected: false }
];

// Sample saved itineraries for demo
export const getSampleItineraries = (): Itinerary[] => {
  return [
    {
      id: "itin-1",
      destination: "Paris",
      startDate: "2025-06-15T00:00:00.000Z",
      endDate: "2025-06-20T00:00:00.000Z",
      totalDays: 6,
      budget: 2000,
      travelers: 2,
      totalCost: 1650,
      days: [
        {
          day: 1,
          date: "Monday, June 15, 2025",
          activities: [
            {
              time: "9:00 AM",
              activity: "Visit Eiffel Tower",
              location: "Montmartre",
              cost: 40,
              weatherForecast: "Sunny, 72°F"
            },
            {
              time: "2:00 PM",
              activity: "Lunch at local French restaurant",
              location: "Le Marais",
              cost: 50
            },
            {
              time: "7:00 PM",
              activity: "Seine River Cruise",
              location: "Seine River",
              cost: 90,
              notes: "Reservation recommended"
            }
          ]
        },
        {
          day: 2,
          date: "Tuesday, June 16, 2025",
          activities: [
            {
              time: "9:00 AM",
              activity: "Explore The Louvre",
              location: "Le Marais",
              cost: 50
            },
            {
              time: "2:00 PM",
              activity: "Visit Luxembourg Gardens",
              location: "Latin Quarter",
              cost: 0
            },
            {
              time: "7:00 PM",
              activity: "Fine dining experience at Le Jules Verne",
              location: "Le Jules Verne",
              cost: 120
            }
          ]
        }
      ]
    },
    {
      id: "itin-2",
      destination: "Tokyo",
      startDate: "2025-07-10T00:00:00.000Z",
      endDate: "2025-07-17T00:00:00.000Z",
      totalDays: 8,
      budget: 3000,
      travelers: 2,
      totalCost: 2400,
      days: [
        {
          day: 1,
          date: "Thursday, July 10, 2025",
          activities: [
            {
              time: "9:00 AM",
              activity: "Visit Tokyo Tower",
              location: "Shibuya",
              cost: 40,
              weatherForecast: "Partly Cloudy, 80°F"
            },
            {
              time: "2:00 PM",
              activity: "Explore Senso-ji Temple",
              location: "Asakusa",
              cost: 0
            },
            {
              time: "7:00 PM",
              activity: "Dinner at Sukiyabashi Jiro",
              location: "Sukiyabashi Jiro",
              cost: 300,
              notes: "Reservation required months in advance"
            }
          ]
        }
      ]
    }
  ];
};
