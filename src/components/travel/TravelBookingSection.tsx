import React, { useState } from 'react';
import { TRANSPORT_OPTIONS, TransportOption, bookingService } from '../../services/bookingService';
import { HOMESTAYS } from '../../data/homestays';
import { Homestay } from '../../types';
import {
  Car,
  Home,
  Users,
  Compass,
  Sparkles,
  Calendar,
  CheckCircle,
  CreditCard,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TravelBookingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transport' | 'homestays' | 'guides'>('transport');
  const [bookingItem, setBookingItem] = useState<{
    type: 'transport' | 'homestay' | 'guide';
    title: string;
    provider: string;
    price: number;
    location: string;
  } | null>(null);

  const [travelDate, setTravelDate] = useState('2026-10-22');
  const [passengers, setPassengers] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const guides = [
    {
      id: 'guide-01',
      name: 'Sukhdev Baghel',
      specialty: 'Kanger Valley & Subterranean Speleology',
      district: 'Bastar (Kotamsar)',
      languages: ['Hindi', 'Halbi', 'English'],
      dailyRateINR: 1500,
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: 'Senior Forest Custodian'
    },
    {
      id: 'guide-02',
      name: 'Arvind Netam',
      specialty: 'Sirpur Buddhist Archaeology & Epigraphy',
      district: 'Mahasamund (Sirpur)',
      languages: ['Hindi', 'Chhattisgarhi', 'English'],
      dailyRateINR: 1400,
      rating: 4.92,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      badge: 'ASI Certified Storyteller'
    },
    {
      id: 'guide-03',
      name: 'Babulal Baiga',
      specialty: 'Maikal Hills Herbal Forest Trail & Bhoramdeo Lore',
      district: 'Kabirdham (Kawardha)',
      languages: ['Hindi', 'Baiga Dialect'],
      dailyRateINR: 1200,
      rating: 4.89,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      badge: 'Indigenous Plant Master'
    }
  ];

  const handleConfirmBooking = () => {
    if (!bookingItem) return;
    const totalAmount = bookingItem.price * passengers;

    bookingService.createBooking(
      bookingItem.type === 'homestay' ? 'homestay' : bookingItem.type === 'guide' ? 'guide' : 'transport',
      bookingItem.title,
      bookingItem.provider,
      bookingItem.location,
      travelDate,
      passengers,
      totalAmount
    );

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });

    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingItem(null);
    }, 2800);
  };

  return (
    <section id='travel-booking' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background ambient light */}
      <div className='absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
              <Compass className='w-3.5 h-3.5' />
              <span>Smart Travel & Logistics</span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
              Book Verified Green Transport, Stays & Guides
            </h2>
            <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
              Seamless coordination across electric vehicles, AC sleeper buses, certified local tribal guides, and authentic eco-homestays with instant transparent booking.
            </p>
          </div>

          {/* Category Tabs */}
          <div className='flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10'>
            <button
              onClick={() => setActiveTab('transport')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'transport'
                  ? 'bg-[#E5A93C] text-[#07131D] shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Car className='w-4 h-4' />
              <span>Transport</span>
            </button>
            <button
              onClick={() => setActiveTab('homestays')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'homestays'
                  ? 'bg-[#E5A93C] text-[#07131D] shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Home className='w-4 h-4' />
              <span>Homestays</span>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'guides'
                  ? 'bg-[#E5A93C] text-[#07131D] shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Users className='w-4 h-4' />
              <span>Guides</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Transport Grid */}
        {activeTab === 'transport' && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {TRANSPORT_OPTIONS.map(tr => (
              <div
                key={tr.id}
                className='glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-[#E5A93C]/40 transition-all shadow-xl flex flex-col justify-between space-y-4'
              >
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='px-3 py-1 rounded-full bg-white/5 text-[#E5A93C] font-mono text-[10px] uppercase font-bold border border-white/10'>
                      {tr.type.toUpperCase()} • {tr.provider}
                    </span>
                    {tr.isGreenEco && (
                      <span className='px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold'>
                        🌱 ZERO-EMISSION
                      </span>
                    )}
                  </div>
                  <h3 className='font-serif text-2xl font-bold text-white'>{tr.name}</h3>

                  <div className='mt-4 p-3 rounded-2xl bg-white/5 border border-white/5 grid grid-cols-2 gap-2 text-xs'>
                    <div>
                      <span className='text-[10px] font-mono text-gray-400 uppercase block'>Origin & Destination</span>
                      <span className='text-white font-medium block truncate'>{tr.from} → {tr.to}</span>
                    </div>
                    <div>
                      <span className='text-[10px] font-mono text-gray-400 uppercase block'>Duration & Departure</span>
                      <span className='text-white font-medium block'>{tr.duration} ({tr.departureTime})</span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                  <div>
                    <span className='text-[10px] font-mono text-gray-400 uppercase block'>Standard Fare</span>
                    <span className='font-mono text-2xl font-bold text-white'>
                      ₹{tr.fareINR.toLocaleString()}{' '}
                      <span className='text-xs text-gray-400 font-normal'>/ vehicle</span>
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setBookingItem({
                        type: 'transport',
                        title: tr.name,
                        provider: tr.provider,
                        price: tr.fareINR,
                        location: `${tr.from} to ${tr.to}`
                      })
                    }
                    className='px-6 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md'
                  >
                    Select Transport
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Homestays Grid */}
        {activeTab === 'homestays' && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {HOMESTAYS.map(home => (
              <div
                key={home.id}
                className='glass-panel rounded-3xl border border-white/10 hover:border-[#E5A93C]/40 overflow-hidden shadow-xl transition-all flex flex-col justify-between group'
              >
                <div className='relative h-48 overflow-hidden'>
                  <img
                    src={home.images[0]}
                    alt={home.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#07131D] via-transparent to-black/30' />
                  <div className='absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white'>
                    {home.district}
                  </div>
                </div>

                <div className='p-5 space-y-3 flex-1 flex flex-col justify-between'>
                  <div>
                    <h3 className='font-serif text-lg font-bold text-white group-hover:text-[#F3BA54] transition-colors'>
                      {home.name}
                    </h3>
                    <p className='text-xs text-gray-400 font-mono mt-0.5'>Host: {home.host}</p>
                    <p className='text-xs text-gray-300 font-light mt-1.5 line-clamp-2'>{home.roomType}</p>
                  </div>

                  <div className='pt-3 border-t border-white/10 flex items-center justify-between'>
                    <div>
                      <span className='font-mono text-lg font-bold text-white'>
                        ₹{home.pricePerNight.toLocaleString()}
                      </span>
                      <span className='text-[10px] text-gray-400 block'>/ night</span>
                    </div>

                    <button
                      onClick={() =>
                        setBookingItem({
                          type: 'homestay',
                          title: home.name,
                          provider: home.host,
                          price: home.pricePerNight,
                          location: home.village + ', ' + home.district
                        })
                      }
                      className='px-4 py-2 rounded-xl bg-white/10 hover:bg-[#E5A93C] hover:text-[#07131D] text-xs font-bold font-mono transition-all cursor-pointer'
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Certified Guides Grid */}
        {activeTab === 'guides' && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {guides.map(guide => (
              <div
                key={guide.id}
                className='glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#E5A93C]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className='w-16 h-16 rounded-2xl object-cover border border-[#E5A93C]/40'
                  />
                  <div>
                    <div className='flex items-center gap-1.5'>
                      <h3 className='font-serif text-xl font-bold text-white'>{guide.name}</h3>
                      <ShieldCheck className='w-4 h-4 text-emerald-400' />
                    </div>
                    <span className='text-xs font-mono text-[#E5A93C] block mt-0.5'>{guide.badge}</span>
                    <span className='text-[11px] text-gray-400 block'>{guide.district}</span>
                  </div>
                </div>

                <div className='space-y-2 text-xs'>
                  <div className='p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 font-mono text-[11px] text-gray-300'>
                    <div>Expertise: <span className='text-white'>{guide.specialty}</span></div>
                    <div>Languages: <span className='text-[#F3BA54]'>{guide.languages.join(', ')}</span></div>
                  </div>
                </div>

                <div className='pt-3 border-t border-white/10 flex items-center justify-between'>
                  <div>
                    <span className='font-mono text-xl font-bold text-white'>
                      ₹{guide.dailyRateINR.toLocaleString()}
                    </span>
                    <span className='text-[10px] text-gray-400 block'>/ full day</span>
                  </div>

                  <button
                    onClick={() =>
                      setBookingItem({
                        type: 'guide',
                        title: `Guide Services: ${guide.name}`,
                        provider: guide.name,
                        price: guide.dailyRateINR,
                        location: guide.district
                      })
                    }
                    className='px-5 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md'
                  >
                    Hire Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingItem && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200'>
          <div className='relative w-full max-w-md rounded-3xl glass-panel-warm border border-[#E5A93C]/40 p-6 sm:p-8 bg-[#07131D]/98 text-white space-y-5 shadow-2xl'>
            <button
              onClick={() => setBookingItem(null)}
              className='absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white'
            >
              <X className='w-4 h-4' />
            </button>

            {!bookingConfirmed ? (
              <>
                <div>
                  <span className='px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#F3BA54] font-mono text-[10px] font-bold uppercase'>
                    Dharohar Direct Booking
                  </span>
                  <h3 className='font-serif text-2xl font-bold mt-1'>{bookingItem.title}</h3>
                  <p className='text-xs text-gray-400 mt-0.5'>{bookingItem.location}</p>
                </div>

                <div className='space-y-3 font-mono text-xs'>
                  <div>
                    <label className='block text-gray-400 uppercase text-[10px] mb-1'>Date</label>
                    <input
                      type='date'
                      value={travelDate}
                      onChange={e => setTravelDate(e.target.value)}
                      className='w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-[#E5A93C]'
                    />
                  </div>

                  <div>
                    <label className='block text-gray-400 uppercase text-[10px] mb-1'>
                      Passengers / Guests ({passengers})
                    </label>
                    <input
                      type='range'
                      min={1}
                      max={6}
                      value={passengers}
                      onChange={e => setPassengers(Number(e.target.value))}
                      className='w-full accent-[#E5A93C]'
                    />
                  </div>

                  <div className='p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5'>
                    <div className='flex justify-between text-gray-400'>
                      <span>Rate per unit:</span>
                      <span className='text-white'>₹{bookingItem.price.toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-base font-bold text-white pt-1 border-t border-white/5'>
                      <span>Total Amount:</span>
                      <span className='text-[#E5A93C]'>₹{(bookingItem.price * passengers).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className='w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg'
                >
                  <CreditCard className='w-4 h-4' />
                  <span>Confirm Booking (Demo Pay)</span>
                </button>
              </>
            ) : (
              <div className='py-8 text-center space-y-3'>
                <div className='w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto'>
                  <CheckCircle className='w-8 h-8' />
                </div>
                <h4 className='font-serif text-2xl font-bold'>Booking Confirmed!</h4>
                <p className='text-xs text-gray-300 max-w-sm mx-auto'>
                  Your voucher has been created and verified. You can view it under your Tourist Dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
