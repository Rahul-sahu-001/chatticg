import React from 'react';
import {
  Compass,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Github
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className='bg-[#040B10] text-[#EEF3F0] border-t border-white/10 pt-16 pb-12 relative overflow-hidden'>
      {/* Background glow */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-[#144A3A]/25 blur-[120px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10'>
          {/* Col 1: Brand & SIH Context */}
          <div className='lg:col-span-2 space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E5A93C] via-[#C2593F] to-[#0F3D30] flex items-center justify-center shadow-lg font-serif text-xl font-black text-[#07131D]'>
                ध
              </div>
              <div>
                <span className='font-display tracking-wider text-xl font-extrabold text-white'>
                  DHAROHAR<span className='text-[#E5A93C]'>CG</span>
                </span>
                <span className='font-mono text-[9px] uppercase tracking-[0.2em] text-[#F3BA54] block leading-none font-semibold'>
                  Smart Tourism Platform • Chhattisgarh
                </span>
              </div>
            </div>

            <p className='text-xs text-gray-400 font-light leading-relaxed max-w-sm'>
              A state-of-the-art immersive tourism platform specifically designed for Chhattisgarh. Built for the Smart India Hackathon (Problem Statement ID: 26204, Theme: Travel & Tourism, Category: Software) by <strong>Team Kshitij</strong>.
            </p>

            <div className='pt-2 flex items-center gap-3 text-xs font-mono text-gray-400'>
              <span className='px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400'>
                ● 100% Offline Demo Ready
              </span>
              <span className='px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#F3BA54]'>
                Team Kshitij
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className='space-y-3'>
            <h4 className='font-mono text-xs uppercase tracking-wider text-[#E5A93C] font-bold'>
              Platform Corridors
            </h4>
            <ul className='space-y-2 text-xs font-mono text-gray-300'>
              <li>
                <button onClick={() => scrollTo('destinations')} className='hover:text-white transition-colors cursor-pointer'>
                  Destination Explorer
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('ai-planner')} className='hover:text-white transition-colors cursor-pointer'>
                  AI Travel Curator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('tourism-load')} className='hover:text-white transition-colors cursor-pointer'>
                  Smart Tourism Load
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('dharohar-pass')} className='hover:text-white transition-colors cursor-pointer'>
                  Digital Dharohar Pass
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experiences')} className='hover:text-white transition-colors cursor-pointer'>
                  Community Experiences
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Artisan & Culture */}
          <div className='space-y-3'>
            <h4 className='font-mono text-xs uppercase tracking-wider text-[#F3BA54] font-bold'>
              Living Heritage
            </h4>
            <ul className='space-y-2 text-xs font-mono text-gray-300'>
              <li>
                <button onClick={() => scrollTo('marketplace')} className='hover:text-white transition-colors cursor-pointer'>
                  Dokra & Handicrafts
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('ar-vr')} className='hover:text-white transition-colors cursor-pointer'>
                  360° Virtual Tours
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('travel-booking')} className='hover:text-white transition-colors cursor-pointer'>
                  Homestays & Green Cabs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('impact-meter')} className='hover:text-white transition-colors cursor-pointer'>
                  Local Impact Meter
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('community')} className='hover:text-white transition-colors cursor-pointer'>
                  #DiscoverDharoharCG
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: State & Governance */}
          <div className='space-y-3'>
            <h4 className='font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold'>
              Governance & SOS
            </h4>
            <ul className='space-y-2 text-xs font-mono text-gray-300'>
              <li>
                <button onClick={() => scrollTo('dashboards')} className='hover:text-white transition-colors cursor-pointer'>
                  State Analytics Portal
                </button>
              </li>
              <li>
                <span className='text-gray-400 block'>Tourist Police: 112 / +91-771-4224600</span>
              </li>
              <li>
                <span className='text-gray-400 block'>Kanger Ranger Outpost: 24x7</span>
              </li>
              <li>
                <span className='text-gray-400 block'>Paryatan Bhawan, Raipur</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500'>
          <p>
            © 2026 DHAROHARCG — Smart Tourism & Cultural Heritage Platform for Chhattisgarh. All Rights Reserved.
          </p>
          <div className='flex items-center gap-4 text-[11px]'>
            <span>Problem Statement ID: 26204</span>
            <span>•</span>
            <span>Team Kshitij</span>
          </div>
        </div>
      </div>
    </footer>
  );
};