import React, { useState } from 'react';
import { EXPERIENCES } from '../../data/experiences';
import { Experience } from '../../types';
import {
  ShieldCheck,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle,
  HeartHandshake,
  Calendar,
  X,
  CreditCard,
  PlusCircle
} from 'lucide-react';
import { bookingService } from '../../services/bookingService';
import confetti from 'canvas-confetti';

export const ExperiencesSection: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-10-20');
  const [travelersCount, setTravelersCount] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Community Submit State
  const [newTitle, setNewTitle] = useState('');
  const [newHost, setNewHost] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleBookNow = () => {
    if (!selectedExp) return;
    const totalAmount = selectedExp.priceINR * travelersCount;

    bookingService.createBooking(
      'experience',
      selectedExp.title,
      selectedExp.hostName,
      selectedExp.village + ', ' + selectedExp.district,
      bookingDate,
      travelersCount,
      totalAmount
    );

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedExp(null);
    }, 2800);
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setNewTitle('');
      setNewHost('');
      setNewVillage('');
    }, 2500);
  };

  return (
    <section id='experiences' className='py-20 bg-[#061017] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background radial highlight */}
      <div className='absolute bottom-10 left-10 w-96 h-96 bg-[#144A3A]/20 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3'>
              <ShieldCheck className='w-3.5 h-3.5' />
              <span>Community-Verified Experiences</span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
              Live & Breathe Rural Chhattisgarh
            </h2>
            <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
              Intimate workshops, cave explorations, and culinary journeys guided directly by indigenous clan custodians. 85%+ of each booking is retained in the host village.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className='px-6 py-3 rounded-full bg-white/10 hover:bg-[#E5A93C] hover:text-[#07131D] text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border border-white/20 shadow-md'
          >
            <PlusCircle className='w-4 h-4' />
            <span>Host a Community Experience</span>
          </button>
        </div>

        {/* Experience Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {EXPERIENCES.map(exp => (
            <div
              key={exp.id}
              className='glass-panel rounded-3xl border border-white/10 hover:border-[#E5A93C]/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group'
            >
              {/* Image & Verified Seal */}
              <div className='relative h-56 overflow-hidden'>
                <img
                  src={exp.image}
                  alt={exp.title}
                  className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#07131D] via-transparent to-black/30' />

                {/* Top left badge: Community Verified */}
                <div className='absolute top-3.5 left-3.5'>
                  <span className='px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 font-mono text-[10px] font-bold tracking-wider flex items-center gap-1.5 shadow-md'>
                    <ShieldCheck className='w-3.5 h-3.5 text-emerald-400' />
                    <span>{exp.verifiedStatus}</span>
                  </span>
                </div>

                {/* Top right: Category */}
                <div className='absolute top-3.5 right-3.5'>
                  <span className='px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-gray-300 border border-white/10'>
                    {exp.category}
                  </span>
                </div>

                {/* Price tag */}
                <div className='absolute bottom-3 right-4 font-mono text-base font-bold text-white bg-black/70 px-3 py-1 rounded-xl border border-white/15'>
                  ₹{exp.priceINR.toLocaleString()} <span className='text-xs text-gray-400 font-normal'>/ person</span>
                </div>
              </div>

              {/* Body */}
              <div className='p-6 flex-1 flex flex-col justify-between space-y-4'>
                <div>
                  <h3 className='font-serif text-xl font-bold text-white group-hover:text-[#F3BA54] transition-colors leading-snug'>
                    {exp.title}
                  </h3>
                  <p className='text-xs text-gray-300 font-light mt-2 line-clamp-2 leading-relaxed'>
                    {exp.subtitle}
                  </p>
                </div>

                {/* Host Info Row */}
                <div className='p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3'>
                  <img
                    src={exp.hostAvatar}
                    alt={exp.hostName}
                    className='w-10 h-10 rounded-xl object-cover border border-[#E5A93C]/40'
                  />
                  <div className='min-w-0 flex-1'>
                    <span className='font-serif text-sm font-semibold text-white block truncate'>
                      {exp.hostName}
                    </span>
                    <span className='text-[11px] text-gray-400 truncate block'>
                      {exp.hostRole}
                    </span>
                  </div>
                </div>

                {/* Meta details */}
                <div className='grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300 border-t border-white/10 pt-3'>
                  <div className='flex items-center gap-1.5'>
                    <Clock className='w-3.5 h-3.5 text-[#E5A93C]' />
                    <span>{exp.duration}</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <MapPin className='w-3.5 h-3.5 text-emerald-400' />
                    <span className='truncate'>{exp.village}</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <Users className='w-3.5 h-3.5 text-gray-400' />
                    <span>Max {exp.maxGroupSize} Guests</span>
                  </div>
                  <div className='flex items-center gap-1.5 text-emerald-300 font-bold'>
                    <HeartHandshake className='w-3.5 h-3.5 text-emerald-400' />
                    <span>{exp.impactShare.hostGuide}% to Host</span>
                  </div>
                </div>

                {/* Action button */}
                <div className='pt-2'>
                  <button
                    onClick={() => setSelectedExp(exp)}
                    className='w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md'
                  >
                    <span>Book Experience</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Checkout Modal */}
      {selectedExp && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200'>
          <div className='relative w-full max-w-lg rounded-3xl glass-panel-warm border border-[#E5A93C]/40 p-6 sm:p-8 bg-[#07131D]/98 text-white space-y-6 shadow-2xl'>
            <button
              onClick={() => setSelectedExp(null)}
              className='absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white'
            >
              <X className='w-4 h-4' />
            </button>

            {!bookingSuccess ? (
              <>
                <div>
                  <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold'>
                    COMMUNITY RESERVATION
                  </span>
                  <h3 className='font-serif text-2xl font-bold mt-1'>{selectedExp.title}</h3>
                  <p className='text-xs text-gray-400 mt-1'>
                    Host: {selectedExp.hostName} • {selectedExp.village}, {selectedExp.district}
                  </p>
                </div>

                <div className='space-y-4 text-xs font-mono'>
                  <div>
                    <label className='block text-gray-400 uppercase text-[10px] mb-1.5'>
                      Select Experience Date
                    </label>
                    <input
                      type='date'
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      className='w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-white outline-none focus:border-[#E5A93C]'
                    />
                  </div>

                  <div>
                    <label className='block text-gray-400 uppercase text-[10px] mb-1.5'>
                      Number of Travelers ({travelersCount})
                    </label>
                    <input
                      type='range'
                      min={1}
                      max={selectedExp.maxGroupSize}
                      value={travelersCount}
                      onChange={e => setTravelersCount(Number(e.target.value))}
                      className='w-full accent-[#E5A93C]'
                    />
                  </div>

                  {/* Impact Breakdown Preview */}
                  <div className='p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5'>
                    <div className='flex justify-between text-gray-300'>
                      <span>Subtotal ({travelersCount} x ₹{selectedExp.priceINR})</span>
                      <span className='font-bold text-white'>₹{(selectedExp.priceINR * travelersCount).toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-emerald-400 font-bold'>
                      <span>Direct Host Share ({selectedExp.impactShare.hostGuide}%)</span>
                      <span>₹{Math.round((selectedExp.priceINR * travelersCount * selectedExp.impactShare.hostGuide) / 100).toLocaleString()}</span>
                    </div>
                    <div className='text-[10px] text-gray-400 pt-1 border-t border-white/5'>
                      Adds +{Math.round(selectedExp.priceINR * travelersCount * 0.05)} Eco-Points to your Dharohar Pass.
                    </div>
                  </div>
                </div>

                {/* Mock Pay Button */}
                <button
                  onClick={handleBookNow}
                  className='w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg'
                >
                  <CreditCard className='w-4 h-4' />
                  <span>Confirm Reservation (₹{(selectedExp.priceINR * travelersCount).toLocaleString()} Demo Pay)</span>
                </button>
              </>
            ) : (
              <div className='py-8 text-center space-y-3'>
                <div className='w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto'>
                  <CheckCircle className='w-8 h-8' />
                </div>
                <h4 className='font-serif text-2xl font-bold'>Reservation Confirmed!</h4>
                <p className='text-xs text-gray-300 max-w-sm mx-auto'>
                  Your booking has been registered with host {selectedExp.hostName}. Your Dharohar Pass has been updated with your new impact record!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Community Host Submission Modal */}
      {isSubmitModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200'>
          <div className='relative w-full max-w-md rounded-3xl glass-panel-warm border border-[#E5A93C]/40 p-6 sm:p-8 bg-[#07131D]/98 text-white space-y-5 shadow-2xl'>
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className='absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white'
            >
              <X className='w-4 h-4' />
            </button>

            {!submitSuccess ? (
              <form onSubmit={handleCommunitySubmit} className='space-y-4'>
                <div>
                  <span className='px-2.5 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#F3BA54] font-mono text-[10px] font-bold uppercase'>
                    Community Creator Portal
                  </span>
                  <h3 className='font-serif text-2xl font-bold mt-1'>Host an Experience</h3>
                  <p className='text-xs text-gray-400 mt-1'>
                    Flow: Submit details → District Tourism Officer Verification → Admin Approval → Published to Global Travelers.
                  </p>
                </div>

                <div>
                  <label className='block text-xs font-mono uppercase text-gray-400 mb-1'>
                    Experience Title
                  </label>
                  <input
                    type='text'
                    required
                    placeholder='e.g., Traditional Karma Dance Masterclass'
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className='w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white outline-none focus:border-[#E5A93C]'
                  />
                </div>

                <div>
                  <label className='block text-xs font-mono uppercase text-gray-400 mb-1'>
                    Host Name / Collective
                  </label>
                  <input
                    type='text'
                    required
                    placeholder='e.g., Smt. Phoolmati & Village Self-Help Group'
                    value={newHost}
                    onChange={e => setNewHost(e.target.value)}
                    className='w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white outline-none focus:border-[#E5A93C]'
                  />
                </div>

                <div>
                  <label className='block text-xs font-mono uppercase text-gray-400 mb-1'>
                    Village & District
                  </label>
                  <input
                    type='text'
                    required
                    placeholder='e.g., Bhelvapadar, Kondagaon'
                    value={newVillage}
                    onChange={e => setNewVillage(e.target.value)}
                    className='w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white outline-none focus:border-[#E5A93C]'
                  />
                </div>

                <button
                  type='submit'
                  className='w-full py-3 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer'
                >
                  Submit for Community Verification
                </button>
              </form>
            ) : (
              <div className='py-6 text-center space-y-3'>
                <div className='w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto'>
                  <CheckCircle className='w-6 h-6' />
                </div>
                <h4 className='font-serif text-xl font-bold'>Application Submitted!</h4>
                <p className='text-xs text-gray-300'>
                  Your submission has entered the Verification queue. An admin will review your KYC and publish it to DharoharCG.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
