import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { DestinationExplorer } from './components/discovery/DestinationExplorer';
import { DestinationDetailModal } from './components/discovery/DestinationDetailModal';
import { SmartTourismLoad } from './components/tourism/SmartTourismLoad';
import { AITripPlanner } from './components/planning/AITripPlanner';
import { DharoharPassSection } from './components/passport/DharoharPassSection';
import { ExperiencesSection } from './components/experiences/ExperiencesSection';
import { LocalImpactMeter } from './components/impact/LocalImpactMeter';
import { MarketplaceSection } from './components/marketplace/MarketplaceSection';
import { VRTourismSection } from './components/vr/VRTourismSection';
import { TravelBookingSection } from './components/travel/TravelBookingSection';
import { CommunityChallenges } from './components/community/CommunityChallenges';
import { DashboardsSection } from './components/dashboards/DashboardsSection';
import { Footer } from './components/layout/Footer';
import { DharoharAIChat } from './components/chat/DharoharAIChat';
import { GlobalSearchModal } from './components/community/GlobalSearchModal';
import { SOSModal } from './components/safety/SOSModal';
import { Destination } from './types';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanForDestination = (dest: Destination) => {
    scrollTo('ai-planner');
  };

  return (
    <div className='min-h-screen bg-[#07131D] text-[#EEF3F0] selection:bg-[#E5A93C]/30 selection:text-[#F3BA54] relative font-sans'>
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSOS={() => setIsSOSOpen(true)}
        onPlanTrip={() => scrollTo('ai-planner')}
        onExplore={() => scrollTo('destinations')}
      />

      {/* Hero Section with 3D Chhattisgarh Tourism World */}
      <HeroSection
        onSelectDestination={dest => setSelectedDestination(dest)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onPlanJourney={() => scrollTo('ai-planner')}
        onExploreDestinations={() => scrollTo('destinations')}
      />

      {/* Destination Discovery Explorer */}
      <DestinationExplorer
        onSelectDestination={dest => setSelectedDestination(dest)}
        onPlanForDestination={handlePlanForDestination}
      />

      {/* Smart Tourism Load & Carrying Capacity Analytics */}
      <SmartTourismLoad
        onSelectDestination={dest => setSelectedDestination(dest)}
      />

      {/* AI Travel Curator / Itinerary Engine */}
      <AITripPlanner />

      {/* Digital Heritage Passport (Dharohar Pass) */}
      <DharoharPassSection />

      {/* Community-Verified Local Experiences Marketplace */}
      <ExperiencesSection />

      {/* Signature Feature: Local Impact Meter (Rupee Retention) */}
      <LocalImpactMeter />

      {/* Local Artisan Marketplace & WebAR 3D Preview */}
      <MarketplaceSection />

      {/* 360° AR/VR Virtual Tourism Sanctuary */}
      <VRTourismSection />

      {/* Smart Logistics & Stay Booking (Transport, Guides, Homestays) */}
      <TravelBookingSection />

      {/* Responsible Tourism & Community Challenges (#DiscoverDharoharCG) */}
      <CommunityChallenges />

      {/* 4-in-1 Unified Stakeholder Dashboards (Admin, Tourist, Guide, Seller) */}
      <DashboardsSection />

      {/* Comprehensive Editorial Footer */}
      <Footer />

      {/* Floating Multilingual Dharohar AI Chatbot */}
      <DharoharAIChat />

      {/* Modals & Overlays */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTrip={handlePlanForDestination}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDestination={dest => setSelectedDestination(dest)}
      />

      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />
    </div>
  );
}