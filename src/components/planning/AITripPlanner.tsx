import React, { useState } from 'react';
import { AIItineraryPlan, AIItineraryRequest } from '../../types';
import { itineraryService } from '../../services/itineraryService';
import {
  Sparkles,
  Calendar,
  Wallet,
  Users,
  Compass,
  Check,
  RefreshCw,
  Clock,
  ShieldCheck,
  Utensils,
  MapPin,
  TrendingDown,
  Layers,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';

export const AITripPlanner: React.FC = () => {
  const [request, setRequest] = useState<AIItineraryRequest>({
    destinationRegion: 'Bastar & South',
    days: 3,
    budgetINR: 8000,
    travelGroup: 'Couple',
    interests: ['Nature', 'Tribal culture', 'Waterfalls', 'Food'],
    preferredSeason: 'Winter (Oct-Feb)',
    crowdPreference: 'Low Crowds (Offbeat)',
    travelStyle: 'Eco-conscious & Community',
    foodPreference: 'Authentic Chhattisgarhi',
    adventureLevel: 'Moderate'
  });

  const [currentPlan, setCurrentPlan] = useState<AIItineraryPlan | null>(() => {
    return itineraryService.generateItinerary({
      destinationRegion: 'Bastar & South',
      days: 3,
      budgetINR: 8000,
      travelGroup: 'Couple',
      interests: ['Nature', 'Tribal culture', 'Waterfalls', 'Food'],
      preferredSeason: 'Winter (Oct-Feb)',
      crowdPreference: 'Low Crowds (Offbeat)',
      travelStyle: 'Eco-conscious & Community',
      foodPreference: 'Authentic Chhattisgarhi',
      adventureLevel: 'Moderate'
    });
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const interestOptions = [
    'Nature',
    'Tribal culture',
    'Heritage',
    'Waterfalls',
    'Adventure',
    'Food',
    'Photography',
    'Wildlife',
    'Spiritual'
  ];

  const travelGroupOptions: ('Solo' | 'Couple' | 'Family' | 'Friends' | 'Student' | 'Senior')[] = [
    'Solo',
    'Couple',
    'Family',
    'Friends',
    'Student',
    'Senior'
  ];

  const toggleInterest = (interest: string) => {
    setRequest(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
      };
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = itineraryService.generateItinerary(request);
      setCurrentPlan(plan);
      setActiveDayIndex(0);
      setIsGenerating(false);
    }, 600);
  };

  const handleOptimize = (
    action: 'reduce_crowd' | 'more_nature' | 'more_culture' | 'adjust_budget' | 'regenerate'
  ) => {
    if (!currentPlan) return;
    setIsGenerating(true);
    setTimeout(() => {
      const optimized = itineraryService.optimizeItinerary(currentPlan, action);
      setCurrentPlan(optimized);
      setIsGenerating(false);
    }, 450);
  };

  return (
    <section id='ai-planner' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background ambient light */}
      <div className='absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='max-w-3xl mb-12'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
            <Sparkles className='w-3.5 h-3.5' />
            <span>AI Travel Curator • Chhattisgarh</span>
          </div>
          <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
            Bespoke Indigenous Itinerary Builder
          </h2>
          <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
            Powered by the Dharohar AI Engine. Enter your duration, budget, and travel preferences to generate a day-by-day plan with crowd optimization, local guide matching, and authentic tribal culinary stops.
          </p>
        </div>

        {/* Input Parameters Card */}
        <div className='glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 mb-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Region & Days */}
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-mono uppercase text-gray-400 mb-2'>
                  Region / Focus Area
                </label>
                <select
                  value={request.destinationRegion}
                  onChange={e => setRequest({ ...request, destinationRegion: e.target.value })}
                  className='w-full p-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:border-[#E5A93C] outline-none'
                >
                  <option value='All Chhattisgarh' className='bg-[#07131D]'>All Chhattisgarh (Full State)</option>
                  <option value='Bastar & South' className='bg-[#07131D]'>Bastar & South (Waterfalls & Dokra)</option>
                  <option value='Central Plains' className='bg-[#07131D]'>Central Plains (Sirpur & Bhoramdeo)</option>
                  <option value='North Chhattisgarh' className='bg-[#07131D]'>North Chhattisgarh (Mainpat & Surguja)</option>
                </select>
              </div>

              <div>
                <label className='block text-xs font-mono uppercase text-gray-400 mb-2'>
                  Duration: {request.days} Days
                </label>
                <input
                  type='range'
                  min={1}
                  max={7}
                  value={request.days}
                  onChange={e => setRequest({ ...request, days: Number(e.target.value) })}
                  className='w-full accent-[#E5A93C]'
                />
                <div className='flex justify-between text-[11px] font-mono text-gray-500 mt-1'>
                  <span>1 Day</span>
                  <span>3 Days (Recommended)</span>
                  <span>7 Days</span>
                </div>
              </div>
            </div>

            {/* Budget & Group */}
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-mono uppercase text-gray-400 mb-2'>
                  Total Budget: ₹{request.budgetINR.toLocaleString()}
                </label>
                <input
                  type='range'
                  min={3000}
                  max={40000}
                  step={1000}
                  value={request.budgetINR}
                  onChange={e => setRequest({ ...request, budgetINR: Number(e.target.value) })}
                  className='w-full accent-[#E5A93C]'
                />
                <div className='flex justify-between text-[11px] font-mono text-gray-500 mt-1'>
                  <span>₹3,000</span>
                  <span>₹8,000 (Ideal)</span>
                  <span>₹40,000</span>
                </div>
              </div>

              <div>
                <label className='block text-xs font-mono uppercase text-gray-400 mb-2'>
                  Travel Group
                </label>
                <div className='grid grid-cols-3 gap-2'>
                  {travelGroupOptions.map(g => (
                    <button
                      key={g}
                      onClick={() => setRequest({ ...request, travelGroup: g })}
                      className={`py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        request.travelGroup === g
                          ? 'bg-[#E5A93C] text-[#07131D] font-bold'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-mono uppercase text-gray-400 mb-2'>
                  Crowd Sensitivity
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {(['Low Crowds (Offbeat)', 'Balanced'] as const).map(pref => (
                    <button
                      key={pref}
                      onClick={() => setRequest({ ...request, crowdPreference: pref })}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-colors text-center cursor-pointer ${
                        request.crowdPreference === pref
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-xs font-mono uppercase text-gray-400 mb-2'>
                  Food Preference
                </label>
                <select
                  value={request.foodPreference}
                  onChange={e =>
                    setRequest({
                      ...request,
                      foodPreference: e.target.value as AIItineraryRequest['foodPreference']
                    })
                  }
                  className='w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:border-[#E5A93C] outline-none'
                >
                  <option value='Authentic Chhattisgarhi' className='bg-[#07131D]'>Authentic Chhattisgarhi (Chila, Fara, Bafauri)</option>
                  <option value='Vegetarian Only' className='bg-[#07131D]'>Pure Vegetarian Farm-Fresh</option>
                  <option value='Tribal Specialties' className='bg-[#07131D]'>Tribal Forest Delicacies (Amat, Angakar)</option>
                  <option value='Any' className='bg-[#07131D]'>Any Local Food</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interests Chips */}
          <div className='pt-2'>
            <label className='block text-xs font-mono uppercase text-gray-400 mb-2.5'>
              Travel Interests & Desires
            </label>
            <div className='flex flex-wrap gap-2'>
              {interestOptions.map(interest => {
                const isSelected = request.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5A93C] text-[#07131D] font-bold shadow-md shadow-[#E5A93C]/20'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isSelected && <Check className='w-3.5 h-3.5' />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <div className='pt-4 border-t border-white/10 flex justify-end'>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className='px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-[#E5A93C]/25'
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Curating AI Itinerary...' : 'Generate Itinerary'}</span>
            </button>
          </div>
        </div>

        {/* Generated Itinerary Display */}
        {currentPlan && (
          <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300'>
            {/* Plan Header Card */}
            <div className='glass-panel-warm p-6 sm:p-8 rounded-3xl border border-[#E5A93C]/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6'>
              <div>
                <span className='px-3 py-1 rounded-full bg-[#E5A93C]/20 text-[#F3BA54] font-mono text-xs font-bold uppercase tracking-wider'>
                  AI Curated Plan • {currentPlan.daysCount} Days
                </span>
                <h3 className='font-serif text-2xl sm:text-4xl font-bold text-white mt-2'>
                  {currentPlan.title}
                </h3>
                <p className='text-xs sm:text-sm text-gray-300 font-light mt-1.5 max-w-2xl'>
                  {currentPlan.summaryNote}
                </p>
              </div>

              {/* Cost & Local Impact Badge */}
              <div className='flex items-center gap-4 flex-shrink-0'>
                <div className='p-4 rounded-2xl bg-black/40 border border-white/10 text-center'>
                  <span className='text-[10px] font-mono text-gray-400 uppercase block'>Est. Cost</span>
                  <span className='font-display text-2xl font-bold text-white'>
                    ₹{currentPlan.totalEstimatedCostINR.toLocaleString()}
                  </span>
                </div>
                <div className='p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center'>
                  <span className='text-[10px] font-mono text-emerald-300 uppercase block'>Local Impact</span>
                  <span className='font-display text-2xl font-bold text-emerald-400'>
                    ₹{currentPlan.localEconomicImpactINR.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Optimize My Trip Toolbar */}
            <div className='glass-panel p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3'>
              <span className='text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5'>
                <Sparkles className='w-4 h-4 text-[#E5A93C]' />
                <span>Optimize My Trip:</span>
              </span>

              <div className='flex flex-wrap items-center gap-2'>
                <button
                  onClick={() => handleOptimize('reduce_crowd')}
                  className='px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-xs font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer'
                >
                  <TrendingDown className='w-3.5 h-3.5' />
                  <span>Reduce Crowds (Offbeat)</span>
                </button>
                <button
                  onClick={() => handleOptimize('more_nature')}
                  className='px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer'
                >
                  More Nature & Caves
                </button>
                <button
                  onClick={() => handleOptimize('more_culture')}
                  className='px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#F3BA54] border border-[#E5A93C]/30 transition-colors cursor-pointer'
                >
                  More Dokra Craft & Lore
                </button>
                <button
                  onClick={() => handleOptimize('adjust_budget')}
                  className='px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer'
                >
                  Economize Budget (-18%)
                </button>
                <button
                  onClick={() => handleOptimize('regenerate')}
                  className='p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer'
                  title='Regenerate Plan'
                >
                  <RefreshCw className='w-3.5 h-3.5' />
                </button>
              </div>
            </div>

            {/* Day Selector Tabs */}
            <div className='flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar'>
              {currentPlan.days.map((day, idx) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex-shrink-0 ${
                    activeDayIndex === idx
                      ? 'bg-[#E5A93C] text-[#07131D] shadow-lg shadow-[#E5A93C]/20'
                      : 'glass-panel text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  Day {day.dayNumber}: {day.theme.split('&')[0]}
                </button>
              ))}
            </div>

            {/* Active Day Itinerary Card */}
            {currentPlan.days[activeDayIndex] && (
              <div className='glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6'>
                <div className='flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4'>
                  <div>
                    <span className='font-mono text-xs uppercase text-[#E5A93C] font-semibold'>
                      Day {currentPlan.days[activeDayIndex].dayNumber} Schedule
                    </span>
                    <h4 className='font-serif text-2xl font-bold text-white mt-0.5'>
                      {currentPlan.days[activeDayIndex].theme}
                    </h4>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-gray-300 border border-white/10'>
                      Day Budget: ₹{currentPlan.days[activeDayIndex].dailyBudgetINR.toLocaleString()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        currentPlan.days[activeDayIndex].crowdScore === 'LOW'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {currentPlan.days[activeDayIndex].crowdScore} CROWD
                    </span>
                  </div>
                </div>

                {/* Slots: Morning, Afternoon, Evening */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  {/* Morning */}
                  <div className='p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 flex flex-col justify-between'>
                    <div>
                      <div className='flex items-center justify-between text-xs font-mono text-gray-400 mb-1'>
                        <span className='text-[#E5A93C] font-bold'>🌅 Morning</span>
                        <span>{currentPlan.days[activeDayIndex].morning.timeWindow}</span>
                      </div>
                      <h5 className='font-serif text-lg font-bold text-white'>
                        {currentPlan.days[activeDayIndex].morning.destination}
                      </h5>
                      <p className='text-xs text-gray-300 font-light mt-1.5 leading-relaxed'>
                        {currentPlan.days[activeDayIndex].morning.activity}
                      </p>
                    </div>

                    <div className='pt-3 border-t border-white/10 space-y-2 text-xs'>
                      <div className='flex items-center gap-1.5 text-gray-300'>
                        <Utensils className='w-3.5 h-3.5 text-[#E5A93C]' />
                        <span className='line-clamp-1'>{currentPlan.days[activeDayIndex].morning.foodSuggestion}</span>
                      </div>
                      <div className='flex items-center justify-between font-mono text-[11px] text-gray-400'>
                        <span>Cost: ₹{currentPlan.days[activeDayIndex].morning.approximateCostINR}</span>
                        <span>{currentPlan.days[activeDayIndex].morning.suggestedDuration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div className='p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 flex flex-col justify-between'>
                    <div>
                      <div className='flex items-center justify-between text-xs font-mono text-gray-400 mb-1'>
                        <span className='text-[#F3BA54] font-bold'>☀️ Afternoon</span>
                        <span>{currentPlan.days[activeDayIndex].afternoon.timeWindow}</span>
                      </div>
                      <h5 className='font-serif text-lg font-bold text-white'>
                        {currentPlan.days[activeDayIndex].afternoon.destination}
                      </h5>
                      <p className='text-xs text-gray-300 font-light mt-1.5 leading-relaxed'>
                        {currentPlan.days[activeDayIndex].afternoon.activity}
                      </p>
                    </div>

                    <div className='pt-3 border-t border-white/10 space-y-2 text-xs'>
                      <div className='flex items-center gap-1.5 text-gray-300'>
                        <Utensils className='w-3.5 h-3.5 text-[#F3BA54]' />
                        <span className='line-clamp-1'>{currentPlan.days[activeDayIndex].afternoon.foodSuggestion}</span>
                      </div>
                      <div className='flex items-center justify-between font-mono text-[11px] text-gray-400'>
                        <span>Cost: ₹{currentPlan.days[activeDayIndex].afternoon.approximateCostINR}</span>
                        <span>{currentPlan.days[activeDayIndex].afternoon.suggestedDuration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Evening */}
                  <div className='p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 flex flex-col justify-between'>
                    <div>
                      <div className='flex items-center justify-between text-xs font-mono text-gray-400 mb-1'>
                        <span className='text-rose-400 font-bold'>🌙 Evening</span>
                        <span>{currentPlan.days[activeDayIndex].evening.timeWindow}</span>
                      </div>
                      <h5 className='font-serif text-lg font-bold text-white'>
                        {currentPlan.days[activeDayIndex].evening.destination}
                      </h5>
                      <p className='text-xs text-gray-300 font-light mt-1.5 leading-relaxed'>
                        {currentPlan.days[activeDayIndex].evening.activity}
                      </p>
                    </div>

                    <div className='pt-3 border-t border-white/10 space-y-2 text-xs'>
                      <div className='flex items-center gap-1.5 text-gray-300'>
                        <Utensils className='w-3.5 h-3.5 text-rose-400' />
                        <span className='line-clamp-1'>{currentPlan.days[activeDayIndex].evening.foodSuggestion}</span>
                      </div>
                      <div className='flex items-center justify-between font-mono text-[11px] text-gray-400'>
                        <span>Cost: ₹{currentPlan.days[activeDayIndex].evening.approximateCostINR}</span>
                        <span>{currentPlan.days[activeDayIndex].evening.suggestedDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Responsible Tip Bar */}
                <div className='p-3.5 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/20 flex items-center gap-2.5 text-xs text-gray-200'>
                  <ShieldCheck className='w-4 h-4 text-[#F3BA54] flex-shrink-0' />
                  <span>
                    <strong>Responsible Traveler Tip:</strong> {currentPlan.days[activeDayIndex].responsibleTip}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};