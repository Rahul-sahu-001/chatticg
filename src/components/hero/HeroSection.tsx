import React, { useState } from 'react';
import { Chhattisgarh3DWorld } from './Chhattisgarh3DWorld';
import { Destination } from '../../types';
import { Compass, Sparkles, ShieldCheck, Users, MapPin, Activity, ArrowRight, Search, Trees } from 'lucide-react';
import { tourismLoadService } from '../../services/tourismLoadService';

interface HeroProps {
  onSelectDestination: (dest: Destination) => void;
  onOpenSearch: () => void;
  onPlanJourney: () => void;
  onExploreDestinations: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({
  onSelectDestination,
  onOpenSearch,
  onPlanJourney,
  onExploreDestinations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const stats = tourismLoadService.calculateStatePressureStats();

  return (
    <section className='relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#07131D] text-[#EEF3F0]'>
      {/* Background radial ambient gradients */}
      <div className='absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#144A3A]/25 rounded-full blur-[140px] pointer-events-none' />
      <div className='absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[130px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10'>
        {/* Top Header Block */}
        <div className='max-w-3xl space-y-6 pt-4'>
          {/* SIH Hackathon & Smart Tourism Tag */}
          <div className='inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E5A93C]/20 to-[#C2593F]/20 border border-[#E5A93C]/35 backdrop-blur-md'>
            <span className='w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse' />
            <span className='font-mono text-[11px] uppercase tracking-[0.22em] text-[#F3BA54] font-bold'>
              Smart Tourism & Cultural Heritage Platform • Chhattisgarh
            </span>
          </div>

          {/* Main Headline */}
          <h1 className='font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08]'>
            Discover Chhattisgarh.{' '}
            <span className='italic font-normal text-[#F3BA54] underline decoration-[#E5A93C]/40 decoration-2 underline-offset-8 block mt-1'>
              Experience its Dharohar.
            </span>
          </h1>

          {/* Subtitle */}
          <p className='text-base sm:text-lg text-[#EEF3F0]/85 font-light leading-relaxed max-w-2xl'>
            Step into India’s emerald heartland. An AI-powered responsible tourism ecosystem connecting travelers to sacred waterfalls, ancient brick monasteries, and 4,000-year-old lost-wax Dokra crafts—retaining 88% of travel spending directly in tribal hands.
          </p>

          {/* Primary CTA Buttons */}
          <div className='pt-2 flex flex-wrap items-center gap-4'>
            <button
              onClick={onPlanJourney}
              className='px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#E5A93C]/20 hover:scale-[1.02] hover:shadow-[#E5A93C]/35 transition-all flex items-center gap-2.5 group cursor-pointer'
            >
              <Sparkles className='w-4 h-4 text-[#07131D]' />
              <span>Plan My Journey</span>
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>

            <button
              onClick={onExploreDestinations}
              className='px-7 py-3.5 rounded-full glass-panel hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest border border-white/20 transition-all flex items-center gap-2.5 cursor-pointer'
            >
              <Compass className='w-4 h-4 text-[#E5A93C]' />
              <span>Explore Destinations</span>
            </button>
          </div>
        </div>

        {/* Live Visual Indicators Banner */}
        <div className='mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
          <div className='glass-panel p-4 rounded-2xl border border-white/10 hover:border-[#E5A93C]/40 transition-colors'>
            <div className='flex items-center gap-2 text-[#E5A93C] mb-1'>
              <ShieldCheck className='w-4 h-4' />
              <span className='font-mono text-[11px] uppercase tracking-wider text-gray-400'>Experiences</span>
            </div>
            <div className='font-display text-2xl sm:text-3xl font-bold text-white'>128+</div>
            <div className='text-xs text-gray-400 mt-0.5'>Community Verified</div>
          </div>

          <div className='glass-panel p-4 rounded-2xl border border-white/10 hover:border-[#E5A93C]/40 transition-colors'>
            <div className='flex items-center gap-2 text-emerald-400 mb-1'>
              <MapPin className='w-4 h-4' />
              <span className='font-mono text-[11px] uppercase tracking-wider text-gray-400'>Destinations</span>
            </div>
            <div className='font-display text-2xl sm:text-3xl font-bold text-white'>42</div>
            <div className='text-xs text-gray-400 mt-0.5'>Curated Heritage Sites</div>
          </div>

          <div className='glass-panel p-4 rounded-2xl border border-white/10 hover:border-[#E5A93C]/40 transition-colors'>
            <div className='flex items-center gap-2 text-[#F3BA54] mb-1'>
              <Users className='w-4 h-4' />
              <span className='font-mono text-[11px] uppercase tracking-wider text-gray-400'>Partners</span>
            </div>
            <div className='font-display text-2xl sm:text-3xl font-bold text-white'>1,240</div>
            <div className='text-xs text-gray-400 mt-0.5'>Local Artisans & Guides</div>
          </div>

          <div className='glass-panel-warm p-4 rounded-2xl border border-[#E5A93C]/30'>
            <div className='flex items-center gap-2 text-emerald-400 mb-1'>
              <Activity className='w-4 h-4 animate-pulse' />
              <span className='font-mono text-[11px] uppercase tracking-wider text-[#F3BA54] font-bold'>
                Tourism Intelligence
              </span>
            </div>
            <div className='font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5'>
              <span className='w-2.5 h-2.5 rounded-full bg-emerald-400' />
              <span>{stats.utilizationPercentage}% Capacity</span>
            </div>
            <div className='text-xs text-emerald-300/80 mt-0.5 font-mono'>
              Safe Eco Footfall ({stats.greenIndexScore}/100 Green Index)
            </div>
          </div>
        </div>

        {/* 3D Tourism World Hero Experience */}
        <div className='mt-10'>
          <div className='flex items-center justify-between mb-3 px-1'>
            <div className='flex items-center gap-2'>
              <Trees className='w-4 h-4 text-[#E5A93C]' />
              <h2 className='font-mono text-xs uppercase tracking-widest text-gray-400 font-bold'>
                Interactive 3D Chhattisgarh Tourism World
              </h2>
            </div>
            <span className='text-xs font-mono text-[#F3BA54] hidden sm:inline'>
              WebGL • Live Tourism Corridor • Click pins to inspect
            </span>
          </div>

          <Chhattisgarh3DWorld
            onSelectDestination={onSelectDestination}
          />
        </div>
      </div>
    </section>
  );
};