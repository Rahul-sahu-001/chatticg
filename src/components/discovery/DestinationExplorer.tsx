import React, { useState, useMemo } from 'react';
import { DESTINATIONS } from '../../data/destinations';
import { Destination, DestinationCategory, TourismLoadLevel } from '../../types';
import {
  Compass,
  Filter,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Heart,
  ChevronRight,
  Flame,
  Droplets,
  Trees,
  Layers,
  Utensils,
  Landmark
} from 'lucide-react';

interface Props {
  onSelectDestination: (dest: Destination) => void;
  onPlanForDestination: (dest: Destination) => void;
}

export const DestinationExplorer: React.FC<Props> = ({
  onSelectDestination,
  onPlanForDestination
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLoadFilter, setSelectedLoadFilter] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Categories', icon: Compass },
    { id: 'waterfalls', label: 'Waterfalls', icon: Droplets },
    { id: 'heritage', label: 'Ancient Heritage', icon: Landmark },
    { id: 'nature', label: 'Highland Nature', icon: Trees },
    { id: 'wildlife', label: 'Wildlife & Caves', icon: Trees },
    { id: 'tribal', label: 'Tribal Arts & Crafts', icon: Layers },
    { id: 'offbeat', label: 'Hidden Gems', icon: Sparkles }
  ];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      // Category filter
      if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
        return false;
      }
      // Load filter
      if (selectedLoadFilter !== 'all' && dest.tourismLoad !== selectedLoadFilter) {
        return false;
      }
      // Region filter
      if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dest.name.toLowerCase().includes(q) ||
          dest.district.toLowerCase().includes(q) ||
          dest.community.toLowerCase().includes(q) ||
          dest.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, selectedLoadFilter, selectedRegion, searchQuery]);

  return (
    <section id='destinations' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Decorative background glow */}
      <div className='absolute top-1/2 left-0 w-96 h-96 bg-[#144A3A]/20 rounded-full blur-[120px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
              <Compass className='w-3.5 h-3.5' />
              <span>Dharohar Destination Discovery</span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
              Explore Chhattisgarh’s Sacred Landscapes & Ancient Sites
            </h2>
            <p className='text-sm sm:text-base text-gray-400 font-light mt-3'>
              From the roaring horseshoe of Chitrakote and 1,000-year-old brick temples of Sirpur, to sacred Dokra craft villages and high Maikal valleys.
            </p>
          </div>

          {/* Quick Search */}
          <div className='w-full md:w-80'>
            <div className='glass-panel px-4 py-2.5 rounded-full border border-white/10 flex items-center gap-2.5 focus-within:border-[#E5A93C]/50 transition-colors'>
              <Compass className='w-4 h-4 text-[#E5A93C]' />
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search Bastar, Sirpur, caves...'
                className='w-full bg-transparent border-none outline-none text-xs text-white placeholder-gray-400 font-sans'
              />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className='space-y-4 mb-10'>
          {/* Categories */}
          <div className='flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar'>
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#E5A93C] text-[#07131D] font-bold shadow-lg shadow-[#E5A93C]/20'
                      : 'glass-panel text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className='w-3.5 h-3.5' />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-filters: Region & Tourism Load */}
          <div className='flex flex-wrap items-center gap-3 pt-2 text-xs'>
            <span className='font-mono text-[11px] uppercase tracking-wider text-gray-400 flex items-center gap-1.5'>
              <Filter className='w-3 h-3 text-[#E5A93C]' /> Filter by Load:
            </span>

            {['all', 'LOW', 'MODERATE', 'HIGH'].map(load => (
              <button
                key={load}
                onClick={() => setSelectedLoadFilter(load)}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                  selectedLoadFilter === load
                    ? 'bg-white/20 text-white font-bold border border-white/40'
                    : 'bg-white/5 text-gray-400 hover:text-gray-200 border border-white/5'
                }`}
              >
                {load === 'all' ? 'All Crowd Levels' : `${load} LOAD`}
              </button>
            ))}

            <span className='font-mono text-[11px] uppercase tracking-wider text-gray-400 ml-auto'>
              Showing {filteredDestinations.length} Destinations
            </span>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredDestinations.map(dest => (
            <div
              key={dest.id}
              className='group rounded-3xl glass-panel border border-white/10 hover:border-[#E5A93C]/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between'
            >
              {/* Image & Top Badges */}
              <div className='relative h-60 overflow-hidden'>
                <img
                  src={dest.images[0]}
                  alt={dest.name}
                  className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#07131D] via-transparent to-black/30' />

                {/* Top left badge: Verified & District */}
                <div className='absolute top-3.5 left-3.5 flex items-center gap-2'>
                  <span className='px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white flex items-center gap-1'>
                    <MapPin className='w-3 h-3 text-[#E5A93C]' />
                    <span>{dest.district}</span>
                  </span>
                  {dest.verifiedBadge && (
                    <span className='p-1 rounded-full bg-emerald-500/80 text-white' title='Community Verified Destination'>
                      <ShieldCheck className='w-3.5 h-3.5' />
                    </span>
                  )}
                </div>

                {/* Top right: Tourism Load Indicator */}
                <div className='absolute top-3.5 right-3.5'>
                  <span
                    className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider backdrop-blur-md shadow-md ${
                      dest.tourismLoad === 'LOW'
                        ? 'bg-emerald-950/85 text-emerald-300 border border-emerald-500/40'
                        : dest.tourismLoad === 'MODERATE'
                        ? 'bg-amber-950/85 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-950/85 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    ● {dest.tourismLoad} LOAD
                  </span>
                </div>

                {/* Bottom of image: Native Name */}
                {dest.nativeName && (
                  <div className='absolute bottom-3 left-4 right-4'>
                    <span className='font-serif text-xs text-[#E5A93C] tracking-wide block'>
                      {dest.nativeName}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className='p-6 flex-1 flex flex-col justify-between space-y-4'>
                <div>
                  <div className='flex items-center justify-between mb-1.5'>
                    <span className='text-xs text-[#E5A93C] font-mono tracking-wider uppercase'>
                      {dest.category}
                    </span>
                    <span className='text-xs text-white font-mono flex items-center gap-1'>
                      <span className='text-[#E5A93C]'>★</span> {dest.rating} ({dest.reviewsCount})
                    </span>
                  </div>

                  <h3 className='font-serif text-2xl font-semibold text-white group-hover:text-[#F3BA54] transition-colors'>
                    {dest.name}
                  </h3>

                  <p className='text-xs text-gray-300 font-light line-clamp-2 mt-2 leading-relaxed'>
                    {dest.description}
                  </p>
                </div>

                {/* Meta Attributes Strip */}
                <div className='pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs'>
                  <div>
                    <span className='text-gray-400 block text-[10px] font-mono uppercase'>Best Season</span>
                    <span className='text-gray-200 font-medium truncate block'>{dest.bestTime.split('(')[0]}</span>
                  </div>
                  <div>
                    <span className='text-gray-400 block text-[10px] font-mono uppercase'>Local Impact</span>
                    <span className='text-emerald-400 font-mono font-bold block'>
                      {Math.round(dest.localImpactRatio * 100)}% Retained
                    </span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className='pt-4 flex items-center gap-2.5'>
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className='flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-[#E5A93C] hover:text-[#07131D] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer'
                  >
                    <span>View Heritage Dossier</span>
                    <ChevronRight className='w-3.5 h-3.5' />
                  </button>

                  <button
                    onClick={() => onPlanForDestination(dest)}
                    className='p-2.5 rounded-xl glass-panel hover:bg-white/15 text-[#E5A93C] hover:text-white border border-[#E5A93C]/30 transition-colors cursor-pointer'
                    title='Plan AI Itinerary with this Destination'
                  >
                    <Sparkles className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
