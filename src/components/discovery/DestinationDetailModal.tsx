import React from 'react';
import { Destination } from '../../types';
import {
  X,
  MapPin,
  Clock,
  Compass,
  Car,
  Plane,
  Train,
  ShieldCheck,
  Sparkles,
  Users,
  Activity,
  Trees,
  Utensils,
  AlertTriangle,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { tourismLoadService } from '../../services/tourismLoadService';

interface Props {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (dest: Destination) => void;
}

export const DestinationDetailModal: React.FC<Props> = ({
  destination,
  onClose,
  onPlanTrip
}) => {
  if (!destination) return null;

  const loadData = tourismLoadService.getDestinationLoad(destination.id);
  const alternatives = tourismLoadService.getAlternativeDestinations(destination.id);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200'>
      <div className='relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel-warm border border-[#E5A93C]/40 shadow-2xl text-[#EEF3F0] custom-scrollbar bg-[#07131D]/98'>
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className='absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#E5A93C] text-white hover:text-[#07131D] transition-colors border border-white/20'
          title='Close'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Hero Gallery Banner */}
        <div className='relative h-72 sm:h-96 w-full overflow-hidden'>
          <img
            src={destination.images[0]}
            alt={destination.name}
            className='w-full h-full object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#07131D] via-[#07131D]/40 to-transparent' />

          <div className='absolute bottom-6 left-6 right-6'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='px-3 py-1 rounded-full bg-[#E5A93C] text-[#07131D] font-mono text-xs font-bold uppercase tracking-wider'>
                {destination.category}
              </span>
              <span className='px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white flex items-center gap-1'>
                <MapPin className='w-3.5 h-3.5 text-[#E5A93C]' />
                <span>{destination.district}, {destination.region}</span>
              </span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-bold text-white'>
              {destination.name}
            </h2>
            {destination.nativeName && (
              <span className='font-serif text-base text-[#F3BA54] block mt-1'>
                {destination.nativeName}
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className='p-6 sm:p-8 space-y-8'>
          {/* Quick Metrics Bar */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10'>
            <div>
              <span className='text-[10px] font-mono text-gray-400 uppercase block'>Current Footfall</span>
              <span className='text-sm sm:text-base font-bold text-white flex items-center gap-1.5 mt-0.5'>
                <span
                  className={`w-2 h-2 rounded-full ${
                    destination.tourismLoad === 'LOW'
                      ? 'bg-emerald-400'
                      : destination.tourismLoad === 'MODERATE'
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                />
                {destination.currentVisitors} / {destination.capacityLimit} visitors
              </span>
            </div>
            <div>
              <span className='text-[10px] font-mono text-gray-400 uppercase block'>Best Season</span>
              <span className='text-xs sm:text-sm font-medium text-gray-200 mt-0.5 block truncate'>
                {destination.bestTime}
              </span>
            </div>
            <div>
              <span className='text-[10px] font-mono text-gray-400 uppercase block'>Est. Daily Budget</span>
              <span className='text-xs sm:text-sm font-mono text-[#F3BA54] font-bold mt-0.5 block'>
                {destination.approximateBudget}
              </span>
            </div>
            <div>
              <span className='text-[10px] font-mono text-gray-400 uppercase block'>Local Rupee Retention</span>
              <span className='text-xs sm:text-sm font-mono text-emerald-400 font-bold mt-0.5 block'>
                {Math.round(destination.localImpactRatio * 100)}% to Community
              </span>
            </div>
          </div>

          {/* Description & Cultural Significance */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='md:col-span-2 space-y-4'>
              <h3 className='font-serif text-xl text-white font-semibold flex items-center gap-2'>
                <Compass className='w-4 h-4 text-[#E5A93C]' />
                <span>Overview & Cultural Soul</span>
              </h3>
              <p className='text-sm text-gray-300 font-light leading-relaxed'>
                {destination.description}
              </p>

              <div className='p-4 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/25'>
                <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-[#F3BA54] mb-1'>
                  Why It’s Extraordinary
                </h4>
                <p className='text-xs text-gray-200 leading-relaxed font-light'>
                  {destination.whySpecial}
                </p>
              </div>

              {/* How to Reach Guide */}
              <div className='pt-2 space-y-3'>
                <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-gray-400'>
                  How to Reach
                </h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs'>
                  <div className='p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5'>
                    <Car className='w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5' />
                    <div>
                      <span className='font-semibold text-white block'>Road & Gateway</span>
                      <span className='text-gray-300'>{destination.howToReach.roadTransit}</span>
                    </div>
                  </div>
                  <div className='p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5'>
                    <Plane className='w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5' />
                    <div>
                      <span className='font-semibold text-white block'>Nearest Airport & Rail</span>
                      <span className='text-gray-300'>{destination.howToReach.nearestAir}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Smart Tourism Load & Alternatives */}
            <div className='space-y-4'>
              <div className='p-4 rounded-2xl glass-panel border border-white/10 space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-mono font-bold uppercase text-gray-400 flex items-center gap-1.5'>
                    <Activity className='w-3.5 h-3.5 text-[#E5A93C]' />
                    <span>Smart Tourism Load</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      destination.tourismLoad === 'LOW'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : destination.tourismLoad === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {destination.tourismLoad}
                  </span>
                </div>

                <p className='text-xs text-gray-300 leading-relaxed'>
                  {loadData?.statusText}
                </p>

                <div className='text-xs text-gray-400 pt-1'>
                  <span className='font-semibold text-white'>Recommended Window:</span> {destination.recommendedTime}
                </div>

                {/* Hourly Trend Micro-bars */}
                <div className='pt-2'>
                  <span className='text-[10px] font-mono text-gray-400 uppercase block mb-1.5'>24h Crowd Trend</span>
                  <div className='flex items-end gap-1 h-12 bg-black/30 p-2 rounded-lg'>
                    {destination.crowdTrend.map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-sm ${
                          val > 70 ? 'bg-rose-500' : val > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ height: `${val}%` }}
                        title={`Slot ${idx + 1}: ${val}% capacity`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Crowd Alternative Gems */}
              {alternatives.length > 0 && (
                <div className='p-4 rounded-2xl glass-panel border border-[#E5A93C]/20 space-y-2.5'>
                  <span className='text-xs font-mono font-bold uppercase text-[#F3BA54] flex items-center gap-1.5'>
                    <Trees className='w-3.5 h-3.5' />
                    <span>Offbeat Alternatives</span>
                  </span>
                  <p className='text-[11px] text-gray-400 leading-normal'>
                    Help distribute tourism pressure by exploring these nearby lower-footfall gems:
                  </p>
                  <div className='space-y-1.5'>
                    {alternatives.map(alt => (
                      <div
                        key={alt.id}
                        className='p-2 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-xs transition-colors'
                      >
                        <span className='text-white font-medium'>{alt.name}</span>
                        <span className='px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 font-bold'>
                          {alt.tourismLoad}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Responsible Tourism Code of Ethics */}
          <div className='p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2'>
            <h4 className='text-xs font-mono font-bold uppercase text-gray-300 flex items-center gap-1.5'>
              <ShieldCheck className='w-4 h-4 text-emerald-400' />
              <span>Responsible Traveler Guidelines for {destination.name}</span>
            </h4>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 font-light'>
              {destination.responsibleGuidelines.map((guideline, i) => (
                <li key={i} className='flex items-start gap-2'>
                  <span className='text-[#E5A93C] font-bold'>•</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className='pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3'>
            <button
              onClick={onClose}
              className='px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer'
            >
              Back to Explorer
            </button>
            <button
              onClick={() => {
                onClose();
                onPlanTrip(destination);
              }}
              className='px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E5A93C]/20'
            >
              <Sparkles className='w-4 h-4' />
              <span>Plan AI Itinerary Around This</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
