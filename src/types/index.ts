// DHAROHARCG Platform Type Definitions
// Smart Tourism & Cultural Heritage Platform for Chhattisgarh
// SIH Problem Statement ID: 26204 | Team Kshitij

export type DestinationCategory =
  | 'heritage'
  | 'nature'
  | 'waterfalls'
  | 'wildlife'
  | 'tribal'
  | 'adventure'
  | 'festivals'
  | 'food'
  | 'offbeat';

export type TourismLoadLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface Destination {
  id: string;
  name: string;
  nativeName?: string;
  district: string;
  region: 'North Chhattisgarh' | 'Central Plains' | 'Bastar & South';
  altitude: string;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // Percent X on custom 2D/3D map (0-100)
    mapY: number; // Percent Y on custom 2D/3D map (0-100)
  };
  community: string;
  description: string;
  whySpecial: string;
  bestTime: string;
  howToReach: {
    gateway: string;
    roadTransit: string;
    nearestAir: string;
    nearestRail: string;
  };
  tourismLoad: TourismLoadLevel;
  currentVisitors: number;
  capacityLimit: number;
  crowdTrend: number[]; // 24-hour crowd percentage [morning to night]
  recommendedTime: string;
  alternativeDestinations: string[]; // Lower-crowd alternatives
  nearbyExperiences: string[];
  festivals: string[];
  localFood: string[];
  homestaysCount: number;
  approximateBudget: string;
  localImpactRatio: number; // e.g., 0.88 means 88% stays in local economy
  difficulty: 'Easy' | 'Moderate' | 'Demanding' | 'Expedition';
  tags: string[];
  images: string[];
  responsibleGuidelines: string[];
  category: DestinationCategory;
  verifiedBadge: boolean;
  rating: number;
  reviewsCount: number;
}

export interface TourismLoadData {
  destinationId: string;
  destinationName: string;
  district: string;
  currentLevel: TourismLoadLevel;
  currentVisitors: number;
  capacityLimit: number;
  statusText: string;
  recommendedHours: string;
  alternativeDestinations: { id: string; name: string; load: TourismLoadLevel; distanceKm: number }[];
  hourlyTrend: { hour: string; level: number }[];
}

export interface DistrictInfo {
  id: string;
  name: string;
  headquarters: string;
  zone: 'Northern Highlands' | 'Central Plains' | 'Southern Bastar Plateau';
  tagline: string;
  elevationRange: string;
  nature: {
    waterfalls: string[];
    forests: string[];
    wildlife: string[];
    rivers: string[];
    caves?: string[];
  };
  culture: {
    tribes: string[];
    crafts: string[];
    architecture: string;
    musicDances: string[];
  };
  experiences: {
    title: string;
    category: string;
    description: string;
  }[];
  food: {
    dish: string;
    description: string;
    ingredients: string[];
  }[];
  festivals: {
    name: string;
    month: string;
    community: string;
    description: string;
  }[];
  heroImage: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  community: string;
  village: string;
  district: string;
  duration: string;
  priceINR: number;
  languages: string[];
  maxGroupSize: number;
  verifiedStatus: 'COMMUNITY VERIFIED' | 'PENDING' | 'VERIFIED';
  communityRating: number;
  reviewsCount: number;
  impactShare: {
    hostGuide: number; // Percentage
    artisanCommunity: number;
    villageFund: number;
  };
  category: 'Tribal Craft' | 'Forest & Nature' | 'Culinary' | 'Folk Culture' | 'Heritage Trail';
  description: string;
  inclusions: string[];
  prerequisites?: string[];
  image: string;
}

export interface Product {
  id: string;
  name: string;
  artisanName: string;
  artisanVillage: string;
  district: string;
  community: string;
  craftCategory: 'Tribal Art' | 'Handicrafts' | 'Textiles' | 'Local Food' | 'Decor' | 'Jewellery' | 'Souvenirs';
  priceINR: number;
  originalPriceINR?: number;
  inStock: boolean;
  stockCount: number;
  verifiedArtisan: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  model3dType?: 'dokra_deer' | 'iron_mask' | 'terracotta_horse' | 'kosa_shawl' | 'honey_jar';
  materials: string[];
  originStory: string;
  artisanStory: string;
  impactContribution: number; // Percentage that goes directly to artisan
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Badge {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  criteria: string;
}

export interface DigitalCertificate {
  id: string;
  certificateNumber: string;
  experienceTitle: string;
  travelerName: string;
  issueDate: string;
  verificationHash: string;
  isDemo: boolean;
  hostName: string;
  district: string;
  category: string;
}

export interface DharoharPass {
  travelerId: string;
  travelerName: string;
  travelerAvatar: string;
  passNumber: string;
  level: 'Explorer' | 'Custodian' | 'Heritage Ambassador';
  placesVisited: string[];
  experiencesCompleted: string[];
  badges: Badge[];
  certificates: DigitalCertificate[];
  impactScoreINR: number;
  travelStreakDays: number;
  ecoPoints: number;
  issueDate: string;
}

export interface Booking {
  id: string;
  bookingType: 'experience' | 'homestay' | 'guide' | 'transport';
  title: string;
  providerName: string;
  location: string;
  date: string;
  travelers: number;
  amountINR: number;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
  impactBreakdown: {
    guide: number;
    homestay: number;
    food: number;
    artisan: number;
    transport: number;
    community: number;
  };
  qrCode: string;
  createdAt: string;
}

export interface Homestay {
  id: string;
  name: string;
  host: string;
  village: string;
  district: string;
  community: string;
  roomType: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  badges: string[];
  meals: string[];
  experiences: string[];
  sustainability: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  verifiedBadge: boolean;
}

export interface LocalDish {
  id: string;
  name: string;
  nativeName: string;
  community: string;
  region: string;
  description: string;
  ingredients: string[];
  story: string;
  preparation: string;
  whereToTry: string;
  localHost: string;
  image: string;
  isCookingWorkshopAvailable: boolean;
  spiciness: 'Mild' | 'Medium' | 'Fiery';
}

export interface Festival {
  id: string;
  name: string;
  nativeName?: string;
  location: string;
  district: string;
  community: string;
  month: number;
  monthName: string;
  approximateDate: string;
  status: 'Confirmed' | 'Expected' | 'To be announced';
  type: 'Tribal Cultural' | 'Harvest / Folk' | 'Spiritual' | 'Arts & Music';
  culturalMeaning: string;
  duration: string;
  travelerExperience: string;
  etiquette: string[];
  photographyRule: string;
  image: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  storyteller: string;
  role: string;
  village: string;
  district: string;
  community: string;
  readTime: string;
  audioDuration: string;
  coverImage: string;
  ambientSound: 'waterfall' | 'forest' | 'mandar' | 'temple';
  excerpt: string;
  content: string[];
  quote: string;
  gallery: string[];
}

export interface ItinerarySlot {
  timeWindow: string;
  destination: string;
  activity: string;
  travelTime: string;
  approximateCostINR: number;
  suggestedDuration: string;
  crowdLevel: TourismLoadLevel;
  localExperience: string;
  foodSuggestion: string;
  safetyNotes: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  morning: ItinerarySlot;
  afternoon: ItinerarySlot;
  evening: ItinerarySlot;
  dailyBudgetINR: number;
  crowdScore: TourismLoadLevel;
  responsibleTip: string;
}

export interface AIItineraryPlan {
  id: string;
  title: string;
  destinationRegion: string;
  daysCount: number;
  travelGroup: string;
  interests: string[];
  totalEstimatedCostINR: number;
  localEconomicImpactINR: number;
  days: ItineraryDay[];
  summaryNote: string;
  createdAt: string;
}

export interface AIItineraryRequest {
  destinationRegion: string;
  days: number;
  budgetINR: number;
  travelGroup: 'Solo' | 'Couple' | 'Family' | 'Friends' | 'Student' | 'Senior';
  interests: string[];
  preferredSeason: 'Winter (Oct-Feb)' | 'Monsoon (Jul-Sep)' | 'Summer (Mar-Jun)';
  crowdPreference: 'Low Crowds (Offbeat)' | 'Balanced' | 'All Highlights';
  travelStyle: 'Eco-conscious & Community' | 'Balanced Heritage' | 'Adventure & Wilderness';
  foodPreference: 'Authentic Chhattisgarhi' | 'Vegetarian Only' | 'Tribal Specialties' | 'Any';
  adventureLevel: 'Gentle' | 'Moderate' | 'High Adventure';
}

export type UserRole = 'tourist' | 'guide' | 'seller' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  verified: boolean;
  kycStatus: 'Verified' | 'Pending' | 'Rejected' | 'Not Submitted';
  bio?: string;
  rating?: number;
  earningsINR?: number;
  completedBookingsCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  language: 'en' | 'hi' | 'ch';
  timestamp: string;
  suggestions?: string[];
}

export interface CommunityChallenge {
  id: string;
  title: string;
  tag: string;
  description: string;
  points: number;
  badgeReward: string;
  completed: boolean;
  actionUrl?: string;
}

export interface VRScene {
  id: string;
  title: string;
  location: string;
  district: string;
  panoramaImage: string;
  ambientSound: 'waterfall' | 'forest' | 'temple';
  description: string;
  hotspots: {
    pitch: number;
    yaw: number;
    title: string;
    text: string;
    audioCaption?: string;
  }[];
}