import React, { useState } from 'react';
import { impactService } from '../../services/impactService';
import {
  HeartHandshake,
  TrendingUp,
  DollarSign,
  Users,
  Home,
  Utensils,
  Car,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const LocalImpactMeter: React.FC = () => {
  const [spendingAmount, setSpendingAmount] = useState(2500);
  const breakdown = impactService.calculateBreakdown(spendingAmount);
  const platformStats = impactService.getPlatformImpactStats();

  const presets = [1000, 2500, 5000, 10000];

  return (
    <section id='impact-meter' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background radial glow */}
      <div className='absolute top-1/2 right-1/4 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='max-w-3xl mb-12'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs uppercase tracking-widest mb-3'>
            <HeartHandshake className='w-3.5 h-3.5' />
            <span>Signature Economic Architecture</span>
          </div>
          <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
            The Local Impact Meter
          </h2>
          <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
            See exactly where every rupee of your travel spending goes. In conventional mass tourism, up to 78% leaks out to multinational booking portals. On DharoharCG, 88%+ directly enriches rural guides, artisans, and family homestays.
          </p>
        </div>

        {/* Interactive Rupee Retention Calculator (Grid 12) */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16'>
          {/* Left Column: Interactive Slider Console (5 cols) */}
          <div className='lg:col-span-5 glass-panel-warm p-6 sm:p-8 rounded-3xl border border-[#E5A93C]/30 shadow-2xl space-y-6'>
            <div>
              <span className='font-mono text-xs uppercase text-[#F3BA54] font-bold block mb-1'>
                Interactive Spending Simulator
              </span>
              <h3 className='font-serif text-2xl font-bold text-white'>Calculate Your Rural Impact</h3>
            </div>

            {/* Slider */}
            <div>
              <div className='flex justify-between items-baseline mb-2'>
                <span className='text-xs font-mono text-gray-400'>Trip Spending Input:</span>
                <span className='font-display text-3xl font-bold text-[#E5A93C]'>
                  ₹{spendingAmount.toLocaleString()}
                </span>
              </div>
              <input
                type='range'
                min={500}
                max={20000}
                step={500}
                value={spendingAmount}
                onChange={e => setSpendingAmount(Number(e.target.value))}
                className='w-full accent-[#E5A93C] cursor-pointer'
              />
              <div className='flex justify-between text-[11px] font-mono text-gray-500 mt-1'>
                <span>₹500</span>
                <span>₹10,000</span>
                <span>₹20,000</span>
              </div>
            </div>

            {/* Preset buttons */}
            <div className='flex items-center gap-2 pt-1'>
              {presets.map(val => (
                <button
                  key={val}
                  onClick={() => setSpendingAmount(val)}
                  className={`flex-1 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                    spendingAmount === val
                      ? 'bg-[#E5A93C] text-[#07131D] font-bold'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  ₹{val}
                </button>
              ))}
            </div>

            {/* Total Outcome Callout */}
            <div className='p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1'>
              <span className='text-[10px] font-mono uppercase text-emerald-300 tracking-wider block font-bold'>
                Direct Rural Community Retention
              </span>
              <div className='font-display text-3xl sm:text-4xl font-bold text-emerald-400'>
                ₹{breakdown.localRetentionTotal.toLocaleString()}
              </div>
              <p className='text-xs text-emerald-200/90 font-light'>
                <strong>{breakdown.retentionPercentage}%</strong> of your trip funds remain within the Chhattisgarh rural ecosystem!
              </p>
            </div>
          </div>

          {/* Right Column: Visual Breakdown Bars (7 cols) */}
          <div className='lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5'>
            <div className='flex items-center justify-between border-b border-white/10 pb-4'>
              <h4 className='font-serif text-xl font-bold text-white flex items-center gap-2'>
                <DollarSign className='w-5 h-5 text-[#E5A93C]' />
                <span>Micro-Livelihood Allocation</span>
              </h4>
              <span className='text-xs font-mono text-emerald-400 font-bold'>
                ₹{breakdown.spendingTotal.toLocaleString()} Total Spend
              </span>
            </div>

            <div className='space-y-4'>
              {/* Local Guide */}
              <div>
                <div className='flex justify-between text-xs font-mono mb-1.5'>
                  <span className='text-gray-300 flex items-center gap-1.5'>
                    <Users className='w-4 h-4 text-[#E5A93C]' /> Certified Tribal Guides (35%)
                  </span>
                  <span className='font-bold text-white'>₹{breakdown.localGuide.toLocaleString()}</span>
                </div>
                <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden'>
                  <div className='h-full bg-[#E5A93C] rounded-full transition-all duration-300' style={{ width: '35%' }} />
                </div>
              </div>

              {/* Homestay */}
              <div>
                <div className='flex justify-between text-xs font-mono mb-1.5'>
                  <span className='text-gray-300 flex items-center gap-1.5'>
                    <Home className='w-4 h-4 text-emerald-400' /> Village Homestay Families (25%)
                  </span>
                  <span className='font-bold text-white'>₹{breakdown.homestay.toLocaleString()}</span>
                </div>
                <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden'>
                  <div className='h-full bg-emerald-400 rounded-full transition-all duration-300' style={{ width: '25%' }} />
                </div>
              </div>

              {/* Local Food */}
              <div>
                <div className='flex justify-between text-xs font-mono mb-1.5'>
                  <span className='text-gray-300 flex items-center gap-1.5'>
                    <Utensils className='w-4 h-4 text-[#F3BA54]' /> Rural Kitchens & Millets (17%)
                  </span>
                  <span className='font-bold text-white'>₹{breakdown.localFood.toLocaleString()}</span>
                </div>
                <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden'>
                  <div className='h-full bg-[#F3BA54] rounded-full transition-all duration-300' style={{ width: '17%' }} />
                </div>
              </div>

              {/* Artisans */}
              <div>
                <div className='flex justify-between text-xs font-mono mb-1.5'>
                  <span className='text-gray-300 flex items-center gap-1.5'>
                    <Layers className='w-4 h-4 text-rose-400' /> Dokra & Terracotta Artisans (12%)
                  </span>
                  <span className='font-bold text-white'>₹{breakdown.artisan.toLocaleString()}</span>
                </div>
                <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden'>
                  <div className='h-full bg-rose-400 rounded-full transition-all duration-300' style={{ width: '12%' }} />
                </div>
              </div>

              {/* Transport */}
              <div>
                <div className='flex justify-between text-xs font-mono mb-1.5'>
                  <span className='text-gray-300 flex items-center gap-1.5'>
                    <Car className='w-4 h-4 text-sky-400' /> Green Local Transport (7%)
                  </span>
                  <span className='font-bold text-white'>₹{breakdown.transport.toLocaleString()}</span>
                </div>
                <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden'>
                  <div className='h-full bg-sky-400 rounded-full transition-all duration-300' style={{ width: '7%' }} />
                </div>
              </div>

              {/* Village Fund */}
              <div>
                <div className='flex justify-between text-xs font-mono mb-1.5'>
                  <span className='text-gray-300 flex items-center gap-1.5'>
                    <ShieldCheck className='w-4 h-4 text-purple-400' /> Van Suraksha Community Fund (4%)
                  </span>
                  <span className='font-bold text-white'>₹{breakdown.communityFund.toLocaleString()}</span>
                </div>
                <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden'>
                  <div className='h-full bg-purple-400 rounded-full transition-all duration-300' style={{ width: '4%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Platform Impact Dashboard */}
        <div className='p-8 rounded-3xl glass-panel-warm border border-[#E5A93C]/30 shadow-2xl'>
          <div className='flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6'>
            <div>
              <span className='text-xs font-mono text-[#E5A93C] uppercase font-bold tracking-wider'>
                Aggregate State Footprint
              </span>
              <h3 className='font-serif text-2xl sm:text-3xl font-bold text-white mt-1'>
                Collective Chhattisgarh Tourism Impact
              </h3>
            </div>
            <span className='px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold'>
              {platformStats.retentionMultiplier}
            </span>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-5 gap-4 text-center'>
            <div className='p-4 rounded-2xl bg-black/40 border border-white/10'>
              <span className='font-mono text-[10px] text-gray-400 uppercase block'>Rural Income</span>
              <span className='font-display text-2xl sm:text-3xl font-bold text-white mt-1 block'>
                ₹42.8L+
              </span>
              <span className='text-[10px] text-emerald-400 font-mono mt-0.5 block'>Direct Disbursed</span>
            </div>

            <div className='p-4 rounded-2xl bg-black/40 border border-white/10'>
              <span className='font-mono text-[10px] text-gray-400 uppercase block'>Artisans</span>
              <span className='font-display text-2xl sm:text-3xl font-bold text-[#E5A93C] mt-1 block'>
                {platformStats.artisansSupported}
              </span>
              <span className='text-[10px] text-gray-400 font-mono mt-0.5 block'>Craft Lineages</span>
            </div>

            <div className='p-4 rounded-2xl bg-black/40 border border-white/10'>
              <span className='font-mono text-[10px] text-gray-400 uppercase block'>Guides</span>
              <span className='font-display text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 block'>
                {platformStats.guidesSupported}
              </span>
              <span className='text-[10px] text-gray-400 font-mono mt-0.5 block'>Certified Custodians</span>
            </div>

            <div className='p-4 rounded-2xl bg-black/40 border border-white/10'>
              <span className='font-mono text-[10px] text-gray-400 uppercase block'>Homestays</span>
              <span className='font-display text-2xl sm:text-3xl font-bold text-sky-400 mt-1 block'>
                {platformStats.homestaysSupported}
              </span>
              <span className='text-[10px] text-gray-400 font-mono mt-0.5 block'>Rural Families</span>
            </div>

            <div className='p-4 rounded-2xl bg-black/40 border border-white/10 col-span-2 md:col-span-1'>
              <span className='font-mono text-[10px] text-gray-400 uppercase block'>Plastic Prevented</span>
              <span className='font-display text-2xl sm:text-3xl font-bold text-purple-400 mt-1 block'>
                12,600 kg
              </span>
              <span className='text-[10px] text-purple-300 font-mono mt-0.5 block'>Zero-Waste Refills</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
