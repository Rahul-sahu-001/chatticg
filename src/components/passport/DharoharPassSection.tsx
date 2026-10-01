import React, { useState } from 'react';
import { dharoharPassService } from '../../services/dharoharPassService';
import { DigitalCertificate } from '../../types';
import {
  Award,
  CheckCircle,
  Download,
  Share2,
  ShieldCheck,
  Sparkles,
  MapPin,
  ExternalLink,
  Flame,
  X,
  Compass,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DharoharPassSection: React.FC = () => {
  const [pass, setPass] = useState(() => dharoharPassService.getPass());
  const [selectedCert, setSelectedCert] = useState<DigitalCertificate | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleDownload = (cert: DigitalCertificate) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert(
      `[DEMO DOWNLOAD] Certificate "${cert.certificateNumber}" downloaded as PNG/PDF.\nTraveler: ${cert.travelerName}\nExperience: ${cert.experienceTitle}\n(Digital Achievement Record)`
    );
  };

  const handleShare = (cert: DigitalCertificate) => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <section id='dharohar-pass' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background glow */}
      <div className='absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='max-w-3xl mb-12'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
            <Award className='w-3.5 h-3.5' />
            <span>Digital Heritage Passport</span>
          </div>
          <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
            Dharohar Pass & Digital Achievements
          </h2>
          <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
            Your verified record of responsible travel in Chhattisgarh. Collect digital achievement badges, verify artisan workshop completions, track direct community economic impact, and earn heritage certificates.
          </p>
        </div>

        {/* The Digital Passport Visual Card + Stats (Grid 12) */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16'>
          {/* Left Column: Visual Passport Card (5 cols) */}
          <div className='lg:col-span-5'>
            <div className='relative rounded-3xl p-7 bg-gradient-to-br from-[#1A342B] via-[#0E201B] to-[#08120F] border-2 border-[#E5A93C]/60 shadow-2xl shadow-[#E5A93C]/15 overflow-hidden group'>
              {/* Gold foil watermark effect */}
              <div className='absolute -right-8 -bottom-8 w-48 h-48 rounded-full border-4 border-[#E5A93C]/15 pointer-events-none flex items-center justify-center'>
                <Compass className='w-28 h-28 text-[#E5A93C]/10' />
              </div>

              {/* Passport Header */}
              <div className='flex items-center justify-between border-b border-[#E5A93C]/30 pb-4 mb-5'>
                <div>
                  <span className='font-mono text-[9px] uppercase tracking-[0.25em] text-[#F3BA54] font-bold block'>
                    State Cultural Passport • Chhattisgarh
                  </span>
                  <h3 className='font-serif text-2xl font-bold tracking-wider text-white mt-0.5'>
                    DHAROHAR PASS
                  </h3>
                </div>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5A93C] to-[#C2593F] flex items-center justify-center font-serif text-xl font-bold text-[#07131D] shadow-md'>
                  CG
                </div>
              </div>

              {/* Traveler Identity */}
              <div className='flex items-center gap-4 mb-6'>
                <img
                  src={pass.travelerAvatar}
                  alt={pass.travelerName}
                  className='w-16 h-16 rounded-2xl object-cover border-2 border-[#E5A93C]/60 shadow-md'
                />
                <div>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-serif text-xl font-bold text-white'>{pass.travelerName}</h4>
                    <span className='p-0.5 rounded-full bg-emerald-400 text-[#07131D]' title='Verified Traveler'>
                      <CheckCircle className='w-3.5 h-3.5' />
                    </span>
                  </div>
                  <span className='font-mono text-xs text-[#E5A93C] font-semibold block mt-0.5'>
                    Level: {pass.level}
                  </span>
                  <span className='font-mono text-[10px] text-gray-400 block mt-0.5'>
                    ID: {pass.passNumber}
                  </span>
                </div>
              </div>

              {/* Visited Places Badges */}
              <div className='space-y-2 mb-6'>
                <span className='text-[10px] font-mono text-gray-400 uppercase tracking-wider block'>
                  Places Visited ({pass.placesVisited.length})
                </span>
                <div className='flex flex-wrap gap-1.5'>
                  {pass.placesVisited.map((place, i) => (
                    <span
                      key={i}
                      className='px-2.5 py-1 rounded-lg bg-black/40 border border-[#E5A93C]/20 text-xs font-mono text-gray-200 flex items-center gap-1'
                    >
                      <MapPin className='w-3 h-3 text-[#E5A93C]' />
                      <span>{place}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Passport Footer Telemetry */}
              <div className='pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center'>
                <div className='p-2 rounded-xl bg-black/30'>
                  <span className='text-[9px] font-mono text-gray-400 uppercase block'>Eco Points</span>
                  <span className='font-mono text-sm font-bold text-[#F3BA54]'>{pass.ecoPoints}</span>
                </div>
                <div className='p-2 rounded-xl bg-black/30'>
                  <span className='text-[9px] font-mono text-gray-400 uppercase block'>Streak</span>
                  <span className='font-mono text-sm font-bold text-emerald-400'>{pass.travelStreakDays} Days</span>
                </div>
                <div className='p-2 rounded-xl bg-black/30'>
                  <span className='text-[9px] font-mono text-gray-400 uppercase block'>Local Retention</span>
                  <span className='font-mono text-sm font-bold text-white'>₹{pass.impactScoreINR.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Unlocked Badges (7 cols) */}
          <div className='lg:col-span-7 space-y-4'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='font-serif text-2xl font-bold text-white flex items-center gap-2'>
                <Award className='w-5 h-5 text-[#E5A93C]' />
                <span>Earned Heritage Badges</span>
              </h3>
              <span className='text-xs font-mono text-gray-400'>
                {pass.badges.filter(b => b.unlocked).length} of {pass.badges.length} Unlocked
              </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
              {pass.badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    badge.unlocked
                      ? 'glass-panel-warm border-[#E5A93C]/40 shadow-lg'
                      : 'glass-panel opacity-60 border-white/5'
                  }`}
                >
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-[10px] font-mono uppercase text-[#F3BA54] font-bold'>
                      {badge.category}
                    </span>
                    {badge.unlocked && (
                      <span className='px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 font-bold'>
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <h4 className='font-serif text-lg font-bold text-white'>{badge.title}</h4>
                  <p className='text-xs text-gray-300 font-light mt-1'>{badge.description}</p>
                  <div className='mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400'>
                    <span>Criteria: {badge.criteria}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Digital Achievement Certificates (Prototype Record) */}
        <div>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4'>
            <div>
              <span className='text-xs font-mono text-[#E5A93C] uppercase tracking-wider block font-bold'>
                Community Verification Records
              </span>
              <h3 className='font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5'>
                Digital Achievement Certificates
              </h3>
            </div>
            <div className='p-2 px-3 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-gray-400'>
              Note: Digital achievement records for prototype validation. Not an official state document.
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {pass.certificates.map(cert => (
              <div
                key={cert.id}
                className='p-6 rounded-3xl glass-panel-warm border border-[#E5A93C]/30 shadow-xl space-y-4 hover:border-[#E5A93C]/60 transition-all'
              >
                <div className='flex items-center justify-between'>
                  <span className='px-3 py-1 rounded-full bg-[#E5A93C]/20 text-[#F3BA54] font-mono text-xs font-bold'>
                    {cert.category}
                  </span>
                  <span className='font-mono text-xs text-gray-400'>{cert.issueDate}</span>
                </div>

                <div>
                  <h4 className='font-serif text-xl font-bold text-white'>{cert.experienceTitle}</h4>
                  <p className='text-xs text-gray-300 font-light mt-1'>
                    Certified completion under master host: <strong>{cert.hostName}</strong> ({cert.district}).
                  </p>
                </div>

                <div className='p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-gray-400 space-y-1'>
                  <div className='flex justify-between'>
                    <span>Certificate No:</span>
                    <span className='text-white'>{cert.certificateNumber}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Ledger Hash:</span>
                    <span className='text-emerald-400 truncate max-w-[200px]'>{cert.verificationHash}</span>
                  </div>
                </div>

                <div className='pt-2 flex items-center gap-3'>
                  <button
                    onClick={() => handleDownload(cert)}
                    className='flex-1 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                  >
                    <Download className='w-3.5 h-3.5' />
                    <span>Download Certificate</span>
                  </button>

                  <button
                    onClick={() => handleShare(cert)}
                    className='p-2.5 rounded-xl glass-panel hover:bg-white/10 text-white border border-white/15 transition-colors cursor-pointer'
                    title='Share Certificate'
                  >
                    <Share2 className='w-4 h-4 text-[#E5A93C]' />
                  </button>
                </div>

                {shareSuccess && (
                  <div className='text-[11px] font-mono text-emerald-400 text-center animate-pulse'>
                    ✓ Link copied to clipboard! (Share with your friends)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
