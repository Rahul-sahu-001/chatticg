import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import {
  Compass,
  Sparkles,
  Award,
  ShieldCheck,
  ShoppingBag,
  Camera,
  Car,
  Users,
  Search,
  Menu,
  X,
  AlertTriangle,
  LayoutDashboard
} from 'lucide-react';

interface Props {
  onOpenSearch: () => void;
  onOpenSOS: () => void;
  onPlanTrip: () => void;
  onExplore: () => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenSearch,
  onOpenSOS,
  onPlanTrip,
  onExplore
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07131D]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#07131D]/95 via-[#07131D]/60 to-transparent py-4'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        {/* Brand Logo: DHAROHARCG */}
        <a href='#' className='flex items-center gap-3 group'>
          <div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E5A93C] via-[#C2593F] to-[#0F3D30] flex items-center justify-center shadow-lg shadow-[#E5A93C]/20 border border-[#F3BA54]/40 group-hover:scale-105 transition-transform'>
            <span className='font-serif text-xl font-black text-[#07131D]'>ध</span>
          </div>
          <div>
            <div className='flex items-baseline gap-1'>
              <span className='font-display tracking-wider text-xl font-extrabold text-white'>
                DHAROHAR<span className='text-[#E5A93C]'>CG</span>
              </span>
            </div>
            <span className='font-mono text-[9px] uppercase tracking-[0.2em] text-[#F3BA54] block leading-none font-semibold'>
              Smart Tourism • Chhattisgarh
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className='hidden xl:flex items-center gap-5 text-xs font-mono font-medium text-gray-300'>
          <button
            onClick={() => scrollTo('destinations')}
            className='hover:text-[#F3BA54] transition-colors cursor-pointer'
          >
            Explore
          </button>
          <button
            onClick={() => scrollTo('ai-planner')}
            className='hover:text-[#F3BA54] transition-colors flex items-center gap-1 cursor-pointer text-[#E5A93C] font-semibold'
          >
            <Sparkles className='w-3.5 h-3.5' /> AI Trip
          </button>
          <button
            onClick={() => scrollTo('dharohar-pass')}
            className='hover:text-[#F3BA54] transition-colors cursor-pointer'
          >
            Dharohar Pass
          </button>
          <button
            onClick={() => scrollTo('experiences')}
            className='hover:text-[#F3BA54] transition-colors cursor-pointer'
          >
            Experiences
          </button>
          <button
            onClick={() => scrollTo('marketplace')}
            className='hover:text-[#F3BA54] transition-colors cursor-pointer'
          >
            Marketplace
          </button>
          <button
            onClick={() => scrollTo('ar-vr')}
            className='hover:text-[#F3BA54] transition-colors cursor-pointer'
          >
            AR/VR
          </button>
          <button
            onClick={() => scrollTo('travel-booking')}
            className='hover:text-[#F3BA54] transition-colors cursor-pointer'
          >
            Travel
          </button>
          <button
            onClick={() => scrollTo('impact-meter')}
            className='hover:text-emerald-400 text-emerald-300 transition-colors font-semibold cursor-pointer'
          >
            Impact
          </button>
          <button
            onClick={() => scrollTo('dashboards')}
            className='hover:text-[#F3BA54] transition-colors flex items-center gap-1 cursor-pointer'
          >
            <LayoutDashboard className='w-3.5 h-3.5' /> Dashboards
          </button>
        </nav>

        {/* Right Action Icons & Primary Buttons */}
        <div className='flex items-center gap-2.5'>
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className='p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer'
            title='Global Search (Ctrl+K)'
          >
            <Search className='w-4 h-4 text-[#E5A93C]' />
            <span className='hidden sm:inline font-mono text-[11px]'>Search</span>
            <kbd className='hidden sm:inline bg-black/40 px-1.5 py-0.5 rounded text-[9px] font-mono border border-white/10 text-gray-400'>
              ⌘K
            </kbd>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSOS}
            className='px-3 py-1.5 rounded-full bg-rose-600/25 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md'
            title='Emergency SOS Protocol'
          >
            <AlertTriangle className='w-3.5 h-3.5' />
            <span className='hidden sm:inline'>SOS</span>
          </button>

          {/* Plan My Journey CTA */}
          <button
            onClick={onPlanTrip}
            className='hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#E5A93C]/20 hover:brightness-110 transition-all cursor-pointer'
          >
            <Sparkles className='w-3.5 h-3.5' />
            <span>Plan Journey</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='xl:hidden p-2 text-gray-300 hover:text-white cursor-pointer'
          >
            {mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className='xl:hidden bg-[#07131D]/98 border-b border-white/10 px-6 py-6 space-y-4'>
          <div className='grid grid-cols-2 gap-3 text-xs font-mono'>
            <button
              onClick={() => scrollTo('destinations')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • Explore
            </button>
            <button
              onClick={() => scrollTo('ai-planner')}
              className='text-left py-2 text-[#E5A93C] font-bold'
            >
              • AI Trip Planner
            </button>
            <button
              onClick={() => scrollTo('dharohar-pass')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • Dharohar Pass
            </button>
            <button
              onClick={() => scrollTo('experiences')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • Experiences
            </button>
            <button
              onClick={() => scrollTo('marketplace')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • Marketplace & AR
            </button>
            <button
              onClick={() => scrollTo('ar-vr')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • AR/VR 360
            </button>
            <button
              onClick={() => scrollTo('travel-booking')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • Travel & Stays
            </button>
            <button
              onClick={() => scrollTo('dashboards')}
              className='text-left py-2 text-gray-300 hover:text-[#E5A93C]'
            >
              • Dashboards
            </button>
          </div>

          <div className='pt-4 border-t border-white/10 flex gap-2'>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSOS();
              }}
              className='flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5'
            >
              <AlertTriangle className='w-4 h-4' /> SOS Help
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTrip();
              }}
              className='flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-mono text-xs font-bold flex items-center justify-center gap-1.5'
            >
              <Sparkles className='w-4 h-4' /> Plan Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
};