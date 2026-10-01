import React, { useState } from 'react';
import { DISTRICTS } from '../../data/districts';
import { DistrictInfo } from '../../types';
import { Trees, Feather, Compass, Utensils, Flame, MapPin } from 'lucide-react';

export const DistrictExplorer: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(DISTRICTS[0].id);
  const [activeTab, setActiveTab] = useState<'nature' | 'culture' | 'experiences' | 'food' | 'festivals'>('nature');

  const currentDistrict = DISTRICTS.find(d => d.id === selectedDistrictId) || DISTRICTS[0];

  const tabs = [
    { id: 'nature', label: 'Nature & Wildlife', icon: Trees },
    { id: 'culture', label: 'Living Culture & Tribes', icon: Feather },
    { id: 'experiences', label: 'Community Experiences', icon: Compass },
    { id: 'food', label: 'Local Food & Brews', icon: Utensils },
    { id: 'festivals', label: 'Festival Calendar', icon: Flame }
  ];

  return (
    <section id='districts-explorer' className='py-24 bg-[#07131D] text-[#EEF3F0] relative border-t border-white/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-10'>
          <span className='font-mono text-xs uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-2'>
            TERRITORIAL DISCOVERY
          </span>
          <h2 className='font-serif text-3xl sm:text-5xl font-light text-white leading-tight'>
            Explore Arunachal District by District
          </h2>
          <p className='text-sm text-[#98A7A0] max-w-xl mt-2 font-light'>
            Each district is an independent universe of indigenous languages, textile patterns, architecture, and sacred river basins.
          </p>
        </div>

        {/* District Selector Chips */}
        <div className='flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8'>
          {DISTRICTS.map(district => (
            <button
              key={district.id}
              onClick={() => setSelectedDistrictId(district.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDistrictId === district.id
                  ? 'bg-[#E5A93C] text-[#07131D] shadow-lg shadow-[#E5A93C]/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{district.name}</span>
              <span className='ml-2 font-mono text-[10px] opacity-70'>({district.zone})</span>
            </button>
          ))}
        </div>

        {/* Active District Banner */}
        <div className='rounded-3xl bg-[#091824] border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-10 space-y-8'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10'>
            <div>
              <div className='flex items-center gap-2 font-mono text-xs text-[#F3BA54] mb-1'>
                <MapPin className='w-4 h-4' /> Headquarters: {currentDistrict.headquarters} | Elevation: {currentDistrict.elevationRange}
              </div>
              <h3 className='font-serif text-3xl sm:text-4xl text-white font-light'>
                {currentDistrict.name}
              </h3>
              <p className='text-sm text-gray-300 mt-1 font-light max-w-2xl'>
                {currentDistrict.tagline}
              </p>
            </div>

            {/* Tabs Selector */}
            <div className='flex flex-wrap items-center gap-2'>
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-[#C2593F] text-white shadow-md'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className='w-3.5 h-3.5' />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Tab Panels */}
          <div className='animate-fade-in'>
            {activeTab === 'nature' && (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className='p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2'>
                  <h4 className='font-mono text-xs uppercase text-[#E5A93C] font-semibold'>Mountain Ridges</h4>
                  <ul className='space-y-1 text-xs text-gray-300'>
                    {(currentDistrict.nature.mountains || []).map((m: string, i: number) => <li key={i}>• {m}</li>)}
                  </ul>
                </div>
                <div className='p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2'>
                  <h4 className='font-mono text-xs uppercase text-[#38BDF8] font-semibold'>Rivers & Confluences</h4>
                  <ul className='space-y-1 text-xs text-gray-300'>
                    {currentDistrict.nature.rivers.map((r, i) => <li key={i}>• {r}</li>)}
                  </ul>
                </div>
                <div className='p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2'>
                  <h4 className='font-mono text-xs uppercase text-emerald-400 font-semibold'>Forests & Protected Wildlife</h4>
                  <p className='text-xs text-gray-400 font-light mb-2'>{currentDistrict.nature.forests.join(', ')}</p>
                  <div className='flex flex-wrap gap-1'>
                    {currentDistrict.nature.wildlife.map((w, i) => (
                      <span key={i} className='px-2 py-0.5 rounded bg-black/40 text-[11px] text-[#E8DCC9]'>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'culture' && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3'>
                  <h4 className='font-mono text-xs uppercase text-[#F3BA54] font-semibold'>Tribal Traditions & Architecture</h4>
                  <p className='text-xs text-gray-300 font-light leading-relaxed'>
                    <strong className='text-white'>Indigenous Tribes:</strong> {currentDistrict.culture.tribes.join(', ')}
                  </p>
                  <p className='text-xs text-gray-300 font-light leading-relaxed'>
                    <strong className='text-white'>Traditional Architecture:</strong> {currentDistrict.culture.architecture}
                  </p>
                  <p className='text-xs text-gray-300 font-light leading-relaxed'>
                    <strong className='text-white'>Traditional Clothing:</strong> {currentDistrict.culture.clothing || 'Traditional tribal attire'}
                  </p>
                </div>
                <div className='p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3'>
                  <h4 className='font-mono text-xs uppercase text-[#F3BA54] font-semibold'>Crafts, Music & Dances</h4>
                  <div className='space-y-2 text-xs text-gray-300'>
                    <div><strong className='text-white'>Master Crafts:</strong> {currentDistrict.culture.crafts.join(' • ')}</div>
                    <div><strong className='text-white'>Folk Rhapsodies & Dances:</strong> {currentDistrict.culture.musicDances.join(' • ')}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                {currentDistrict.experiences.map((exp, i) => (
                  <div key={i} className='p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-[#E5A93C]/40 transition-colors'>
                    <span className='px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#F3BA54] font-mono text-[10px] uppercase font-bold'>
                      {exp.category}
                    </span>
                    <h5 className='font-serif text-lg text-white font-normal pt-1'>{exp.title}</h5>
                    <p className='text-xs text-gray-400 font-light leading-relaxed'>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'food' && (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {currentDistrict.food.map((f, i) => (
                  <div key={i} className='p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2'>
                    <h5 className='font-serif text-xl text-white'>{f.dish}</h5>
                    <p className='text-xs text-gray-300 font-light leading-relaxed'>{f.description}</p>
                    <div className='flex flex-wrap gap-1 pt-1'>
                      {f.ingredients.map((ing, idx) => (
                        <span key={idx} className='px-2 py-0.5 rounded bg-black/40 text-[10px] text-[#E8DCC9] font-mono'>
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'festivals' && (
              <div className='space-y-4'>
                {currentDistrict.festivals.map((fest, i) => (
                  <div key={i} className='p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                      <div className='font-mono text-[11px] text-[#E5A93C] uppercase'>
                        {fest.month} • {fest.community} Community
                      </div>
                      <h5 className='font-serif text-2xl text-white'>{fest.name}</h5>
                      <p className='text-xs text-gray-300 mt-1 font-light max-w-xl'>{fest.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};