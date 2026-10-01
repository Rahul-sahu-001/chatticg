import React, { useState, useMemo, useEffect } from 'react';
import { DESTINATIONS } from '../../data/destinations';
import { EXPERIENCES } from '../../data/experiences';
import { PRODUCTS } from '../../data/products';
import { Destination } from '../../types';
import {
  Search,
  X,
  MapPin,
  Sparkles,
  ShoppingBag,
  Compass,
  ArrowRight,
  Clock
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
}

export const GlobalSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectDestination
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Chitrakote Falls',
    'Dokra Bell Metal',
    'Sirpur Temple',
    'Mainpat Monasteries'
  ]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { destinations: [], experiences: [], products: [] };
    const q = query.toLowerCase();

    const matchedDestinations = DESTINATIONS.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );

    const matchedExperiences = EXPERIENCES.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.village.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );

    const matchedProducts = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.craftCategory.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q)
    );

    return {
      destinations: matchedDestinations,
      experiences: matchedExperiences,
      products: matchedProducts
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150'>
      <div className='relative w-full max-w-2xl rounded-3xl glass-panel-warm border border-[#E5A93C]/50 bg-[#07131D]/98 text-white shadow-2xl overflow-hidden'>
        {/* Search Input Bar */}
        <div className='p-4 sm:p-5 border-b border-white/10 flex items-center gap-3'>
          <Search className='w-5 h-5 text-[#E5A93C] flex-shrink-0' />
          <input
            type='text'
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search destinations, Dokra crafts, homestays, waterfalls...'
            className='w-full bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-gray-400 font-sans'
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className='p-1 rounded-lg text-gray-400 hover:text-white cursor-pointer'
            >
              <X className='w-4 h-4' />
            </button>
          )}
          <button
            onClick={onClose}
            className='px-3 py-1 rounded-xl bg-white/10 text-xs font-mono text-gray-300 hover:text-white cursor-pointer'
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className='p-5 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-6'>
          {/* Recent searches when query is empty */}
          {!query.trim() ? (
            <div className='space-y-3'>
              <span className='font-mono text-xs uppercase text-gray-400 tracking-wider flex items-center gap-1.5'>
                <Clock className='w-3.5 h-3.5 text-[#E5A93C]' />
                <span>Suggested & Recent Discoveries</span>
              </span>
              <div className='flex flex-wrap gap-2'>
                {recentSearches.map(item => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className='px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-xs text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer'
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Destinations Matches */}
              {searchResults.destinations.length > 0 && (
                <div className='space-y-2'>
                  <span className='font-mono text-xs uppercase text-[#E5A93C] tracking-wider block font-bold'>
                    Destinations ({searchResults.destinations.length})
                  </span>
                  <div className='space-y-1.5'>
                    {searchResults.destinations.map(dest => (
                      <div
                        key={dest.id}
                        onClick={() => {
                          onSelectDestination(dest);
                          onClose();
                        }}
                        className='p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#E5A93C]/40 flex items-center justify-between transition-all cursor-pointer'
                      >
                        <div className='flex items-center gap-3'>
                          <img
                            src={dest.images[0]}
                            alt={dest.name}
                            className='w-10 h-10 rounded-xl object-cover'
                          />
                          <div>
                            <span className='font-serif text-base font-bold text-white block'>{dest.name}</span>
                            <span className='text-xs text-gray-400 font-mono'>
                              {dest.district} • {dest.tourismLoad} Load
                            </span>
                          </div>
                        </div>
                        <ArrowRight className='w-4 h-4 text-gray-400' />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences Matches */}
              {searchResults.experiences.length > 0 && (
                <div className='space-y-2'>
                  <span className='font-mono text-xs uppercase text-emerald-400 tracking-wider block font-bold'>
                    Experiences ({searchResults.experiences.length})
                  </span>
                  <div className='space-y-1.5'>
                    {searchResults.experiences.map(exp => (
                      <div
                        key={exp.id}
                        onClick={onClose}
                        className='p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-all cursor-pointer'
                      >
                        <div>
                          <span className='font-serif text-sm font-bold text-white block'>{exp.title}</span>
                          <span className='text-xs text-gray-400 font-mono'>
                            Host: {exp.hostName} • ₹{exp.priceINR}
                          </span>
                        </div>
                        <span className='text-xs text-[#E5A93C] font-mono'>Book</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Matches */}
              {searchResults.products.length > 0 && (
                <div className='space-y-2'>
                  <span className='font-mono text-xs uppercase text-[#F3BA54] tracking-wider block font-bold'>
                    Marketplace Crafts ({searchResults.products.length})
                  </span>
                  <div className='space-y-1.5'>
                    {searchResults.products.map(prod => (
                      <div
                        key={prod.id}
                        onClick={onClose}
                        className='p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-all cursor-pointer'
                      >
                        <div>
                          <span className='font-serif text-sm font-bold text-white block'>{prod.name}</span>
                          <span className='text-xs text-gray-400 font-mono'>
                            ₹{prod.priceINR} • {prod.artisanName}
                          </span>
                        </div>
                        <span className='text-xs text-emerald-400 font-mono'>View 3D</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.destinations.length === 0 &&
                searchResults.experiences.length === 0 &&
                searchResults.products.length === 0 && (
                  <div className='py-8 text-center text-xs text-gray-400 font-mono'>
                    No direct matches for "{query}". Try searching "Bastar", "Chitrakote", "Dokra", or "Caves".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};