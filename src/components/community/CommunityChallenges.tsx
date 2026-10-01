import React, { useState } from 'react';
import { COMMUNITY_CHALLENGES } from '../../data/challenges';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Flame,
  CheckCircle,
  Trees,
  Compass,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CommunityChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState(COMMUNITY_CHALLENGES);
  const [responsibleScore, setResponsibleScore] = useState(88); // 88/100

  const handleCompleteChallenge = (id: string) => {
    setChallenges(prev =>
      prev.map(c => (c.id === id ? { ...c, completed: true } : c))
    );
    setResponsibleScore(prev => Math.min(100, prev + 3));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id='community' className='py-20 bg-[#07131D] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background glow */}
      <div className='absolute top-1/3 left-10 w-96 h-96 bg-[#144A3A]/20 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='max-w-3xl mb-12'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3'>
            <Flame className='w-3.5 h-3.5' />
            <span>#DiscoverDharoharCG Movement</span>
          </div>
          <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
            Responsible Travel & Community Challenges
          </h2>
          <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
            Travel with intention. Honor tribal traditions, preserve pristine waterfalls from single-use plastics, complete cultural quests, and elevate your personal Responsible Traveler Score.
          </p>
        </div>

        {/* Responsible Traveler Score Bar */}
        <div className='glass-panel-warm p-6 sm:p-8 rounded-3xl border border-[#E5A93C]/30 shadow-2xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <ShieldCheck className='w-5 h-5 text-emerald-400' />
              <span className='font-mono text-xs uppercase text-[#F3BA54] font-bold'>
                App-Generated Sustainability Index
              </span>
            </div>
            <h3 className='font-serif text-2xl sm:text-3xl font-bold text-white'>
              Your Responsible Traveler Score
            </h3>
            <p className='text-xs text-gray-300 font-light mt-1'>
              Based on zero-waste pledges, artisan direct bookings, and low-crowd alternative choices. (App-generated metric).
            </p>
          </div>

          <div className='flex items-center gap-6'>
            <div className='text-center'>
              <span className='font-display text-4xl sm:text-5xl font-bold text-emerald-400'>
                {responsibleScore}
              </span>
              <span className='text-xs text-gray-400 font-mono block'>/ 100 Points</span>
            </div>
            <div className='w-32 h-3 bg-white/10 rounded-full overflow-hidden'>
              <div
                className='h-full bg-gradient-to-r from-[#E5A93C] to-emerald-400 rounded-full transition-all duration-500'
                style={{ width: `${responsibleScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {challenges.map(ch => (
            <div
              key={ch.id}
              className='glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#E5A93C]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between'
            >
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <span className='px-2.5 py-1 rounded-full bg-white/5 text-[#E5A93C] font-mono text-[10px] font-bold uppercase'>
                    {ch.tag}
                  </span>
                  <span className='font-mono text-xs text-emerald-400 font-bold'>
                    +{ch.points} Pts
                  </span>
                </div>

                <h4 className='font-serif text-xl font-bold text-white'>{ch.title}</h4>
                <p className='text-xs text-gray-300 font-light mt-1.5 leading-relaxed'>
                  {ch.description}
                </p>
              </div>

              <div className='pt-3 border-t border-white/10 flex items-center justify-between'>
                <span className='text-xs font-mono text-gray-400'>Reward: {ch.badgeReward}</span>

                {ch.completed ? (
                  <span className='px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1'>
                    <CheckCircle className='w-3.5 h-3.5' /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleCompleteChallenge(ch.id)}
                    className='px-4 py-1.5 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] font-mono text-xs font-bold transition-colors cursor-pointer'
                  >
                    Accept Quest
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
