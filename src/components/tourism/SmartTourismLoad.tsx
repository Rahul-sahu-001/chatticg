import React, { useState } from 'react';
import { tourismLoadService } from '../../services/tourismLoadService';
import { Destination, TourismLoadLevel } from '../../types';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, Clock, MapPin, Sparkles, TrendingUp, Users } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';

interface Props {
  onSelectDestination: (dest: Destination) => void;
}

export const SmartTourismLoad: React.FC<Props> = ({ onSelectDestination }) => {
  const loadDataList = tourismLoadService.getAllDestinationsLoad();
  const [activeTab, setActiveTab] = useState<'all' | 'LOW' | 'MODERATE' | 'HIGH'>('all');
  const [selectedLoadItem, setSelectedLoadItem] = useState(loadDataList[0]);
  const stats = tourismLoadService.calculateStatePressureStats();

  const filteredItems = activeTab === 'all' ? loadDataList : loadDataList.filter(d => d.currentLevel === activeTab);

  return (
    <section id='tourism-load' className='py-20 bg-[#061017] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background radial glow */}
      <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='max-w-3xl mb-12'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3'>
            <Activity className='w-3.5 h-3.5 animate-pulse' />
            <span>Real-time Tourism Telemetry</span>
          </div>
          <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
            Smart Tourism Load & Ecological Pressure Balancer
          </h2>
          <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
            Protecting fragile ecosystems and preventing over-tourism through live carrying capacity monitoring, automated crowd re-routing, and promoting untouched regional alternative destinations.
          </p>
        </div>

        {/* State-wide Pressure Metrics Dashboard */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10'>
          <div className='glass-panel p-5 rounded-2xl border border-white/10'>
            <span className='font-mono text-xs text-gray-400 uppercase block mb-1'>Live Footfall Across Sites</span>
            <div className='font-display text-3xl font-bold text-white'>{stats.totalCurrentVisitors}</div>
            <div className='text-xs text-gray-400 mt-1'>out of {stats.totalCapacity} total capacity</div>
          </div>

          <div className='glass-panel p-5 rounded-2xl border border-white/10'>
            <span className='font-mono text-xs text-gray-400 uppercase block mb-1'>Carrying Capacity Status</span>
            <div className='font-display text-3xl font-bold text-emerald-400'>{stats.utilizationPercentage}%</div>
            <div className='text-xs text-emerald-300/80 mt-1 flex items-center gap-1'>
              <CheckCircle2 className='w-3 h-3' /> State within safe threshold
            </div>
          </div>

          <div className='glass-panel p-5 rounded-2xl border border-white/10'>
            <span className='font-mono text-xs text-gray-400 uppercase block mb-1'>Low-Pressure Havens</span>
            <div className='font-display text-3xl font-bold text-emerald-400'>{stats.lowCount} Sites</div>
            <div className='text-xs text-gray-400 mt-1'>Prime serene visiting conditions</div>
          </div>

          <div className='glass-panel p-5 rounded-2xl border border-white/10'>
            <span className='font-mono text-xs text-gray-400 uppercase block mb-1'>High-Pressure Watchlist</span>
            <div className='font-display text-3xl font-bold text-rose-400'>{stats.highCount} Sites</div>
            <div className='text-xs text-rose-300/80 mt-1 flex items-center gap-1'>
              <AlertTriangle className='w-3 h-3' /> Alternative routes recommended
            </div>
          </div>
        </div>

        {/* Interactive Master-Detail Console */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Left Column: Filter Tabs & Destination List (5 cols) */}
          <div className='lg:col-span-5 space-y-4'>
            {/* Filter Tabs */}
            <div className='flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10'>
              {(['all', 'LOW', 'MODERATE', 'HIGH'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#E5A93C] text-[#07131D] shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'All Sites' : tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className='space-y-2.5 max-h-[520px] overflow-y-auto custom-scrollbar pr-1'>
              {filteredItems.map(item => {
                const isSelected = selectedLoadItem.destinationId === item.destinationId;
                const ratio = Math.round((item.currentVisitors / item.capacityLimit) * 100);
                return (
                  <div
                    key={item.destinationId}
                    onClick={() => setSelectedLoadItem(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-white/10 border-[#E5A93C] shadow-lg shadow-[#E5A93C]/10'
                        : 'glass-panel border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className='flex items-center gap-2'>
                        <h4 className='font-serif text-lg text-white font-semibold'>{item.destinationName}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                            item.currentLevel === 'LOW'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : item.currentLevel === 'MODERATE'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {item.currentLevel}
                        </span>
                      </div>
                      <span className='text-xs text-gray-400 font-mono'>{item.district}</span>
                    </div>

                    <div className='text-right'>
                      <div className='font-mono text-sm font-bold text-white'>
                        {item.currentVisitors} / {item.capacityLimit}
                      </div>
                      <div className='text-[10px] text-gray-400 font-mono'>{ratio}% Capacity</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Telemetry & Alternative Recommendation Engine (7 cols) */}
          <div className='lg:col-span-7 space-y-6'>
            <div className='glass-panel-warm p-6 sm:p-8 rounded-3xl border border-[#E5A93C]/30 shadow-2xl space-y-6'>
              {/* Header */}
              <div className='flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5'>
                <div>
                  <div className='flex items-center gap-2 mb-1'>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                        selectedLoadItem.currentLevel === 'LOW'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : selectedLoadItem.currentLevel === 'MODERATE'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      ● {selectedLoadItem.currentLevel} TOURISM LOAD
                    </span>
                    <span className='text-xs text-gray-400 font-mono'>{selectedLoadItem.district}</span>
                  </div>
                  <h3 className='font-serif text-3xl font-bold text-white'>{selectedLoadItem.destinationName}</h3>
                </div>

                <div className='text-right'>
                  <span className='text-xs font-mono text-gray-400 block'>Footfall Load Factor</span>
                  <span className='font-display text-3xl font-bold text-[#F3BA54]'>
                    {Math.round((selectedLoadItem.currentVisitors / selectedLoadItem.capacityLimit) * 100)}%
                  </span>
                </div>
              </div>

              {/* Status Advisory Banner */}
              <div
                className={`p-4 rounded-2xl flex items-start gap-3 border ${
                  selectedLoadItem.currentLevel === 'LOW'
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                    : selectedLoadItem.currentLevel === 'MODERATE'
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                }`}
              >
                <Clock className='w-5 h-5 flex-shrink-0 mt-0.5' />
                <div className='text-xs space-y-1'>
                  <span className='font-bold block text-sm'>{selectedLoadItem.statusText}</span>
                  <p className='opacity-90'>
                    Recommended visit window: <strong>{selectedLoadItem.recommendedHours}</strong>.
                  </p>
                </div>
              </div>

              {/* Hourly Trend Chart */}
              <div>
                <span className='font-mono text-xs uppercase tracking-wider text-gray-400 block mb-3'>
                  24-Hour Diurnal Crowd Curve
                </span>
                <div className='h-40 bg-black/40 rounded-2xl p-4 flex items-end justify-between gap-2 border border-white/5'>
                  {selectedLoadItem.hourlyTrend.map((h, i) => (
                    <div key={i} className='flex-1 flex flex-col items-center gap-2 h-full justify-end'>
                      <div
                        className={`w-full max-w-[28px] rounded-t-md transition-all duration-500 ${
                          h.level > 70 ? 'bg-rose-500' : h.level > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ height: `${h.level}%` }}
                        title={`${h.hour}: ${h.level}% load`}
                      />
                      <span className='text-[10px] font-mono text-gray-400'>{h.hour}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Alternative Destinations Section */}
              {selectedLoadItem.alternativeDestinations.length > 0 && (
                <div className='pt-2 space-y-3 border-t border-white/10'>
                  <div className='flex items-center gap-2'>
                    <Sparkles className='w-4 h-4 text-[#E5A93C]' />
                    <h4 className='text-xs font-mono font-bold uppercase tracking-wider text-white'>
                      Smart Eco-Routing: Nearby Low-Crowd Alternatives
                    </h4>
                  </div>
                  <p className='text-xs text-gray-400 font-light'>
                    Visiting alternative sites reduces environmental pressure on main hubs while creating distributed livelihood opportunities for remote villages.
                  </p>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {selectedLoadItem.alternativeDestinations.map(alt => {
                      const fullDest = DESTINATIONS.find(d => d.id === alt.id);
                      return (
                        <div
                          key={alt.id}
                          className='p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5A93C]/40 transition-colors flex items-center justify-between'
                        >
                          <div>
                            <span className='font-serif text-sm font-semibold text-white block'>{alt.name}</span>
                            <span className='text-[11px] text-gray-400 font-mono'>
                              ~{alt.distanceKm} km away • {alt.load} Load
                            </span>
                          </div>
                          {fullDest && (
                            <button
                              onClick={() => onSelectDestination(fullDest)}
                              className='p-2 rounded-xl bg-[#E5A93C] text-[#07131D] hover:bg-[#F3BA54] transition-colors cursor-pointer'
                              title='Explore this alternative'
                            >
                              <ArrowRight className='w-3.5 h-3.5' />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
