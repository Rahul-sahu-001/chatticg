import React, { useState } from 'react';
import { EMERGENCY_CONTACTS, SAFETY_TIPS } from '../../data/emergency';
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  ShieldAlert,
  X,
  CheckCircle,
  Share2,
  Radio,
  ExternalLink
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [locationShared, setLocationShared] = useState(false);
  const [activeCallNotice, setActiveCallNotice] = useState<string | null>(null);

  const handleShareLocation = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 4000);
  };

  const handleCall = (name: string, number: string) => {
    setActiveCallNotice(`[DEMO PROTOCOL] Triggered emergency dispatch to ${name} (${number}). Nearest patrol notified.`);
    setTimeout(() => setActiveCallNotice(null), 4500);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200'>
      <div className='relative w-full max-w-2xl rounded-3xl glass-panel-warm border-2 border-rose-500/60 bg-[#07131D]/98 text-white p-6 sm:p-8 space-y-6 shadow-2xl'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Header */}
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400'>
            <AlertTriangle className='w-6 h-6 animate-bounce' />
          </div>
          <div>
            <span className='px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold uppercase tracking-wider'>
              EMERGENCY PROTOCOL (DEMO ENVIRONMENT)
            </span>
            <h3 className='font-serif text-2xl sm:text-3xl font-bold mt-1 text-white'>
              Safety & Rapid SOS Assistance
            </h3>
          </div>
        </div>

        {activeCallNotice && (
          <div className='p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/60 text-xs font-mono text-rose-200 animate-pulse'>
            {activeCallNotice}
          </div>
        )}

        {/* GPS Live Location Broadcast Card */}
        <div className='p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold'>
              <Radio className='w-4 h-4 animate-ping' />
              <span>Simulated GPS: 19.2015° N, 81.7108° E</span>
            </div>
            <span className='text-xs text-gray-300 block'>
              Nearest Post: Bastar Tourist Assistance Post, Jagdalpur (4.2 km)
            </span>
          </div>

          <button
            onClick={handleShareLocation}
            className='px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md'
          >
            <Share2 className='w-3.5 h-3.5' />
            <span>{locationShared ? '✓ Coordinates Dispatched' : 'Broadcast My GPS'}</span>
          </button>
        </div>

        {/* Emergency Helplines Grid */}
        <div className='space-y-3'>
          <h4 className='font-mono text-xs uppercase tracking-wider text-gray-400'>
            Immediate Response Contacts
          </h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {EMERGENCY_CONTACTS.map(contact => (
              <div
                key={contact.id}
                className='p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/40 transition-colors flex items-center justify-between'
              >
                <div>
                  <span className='text-xs font-serif font-bold text-white block'>{contact.name}</span>
                  <span className='font-mono text-sm text-[#F3BA54] font-bold block mt-0.5'>
                    {contact.number}
                  </span>
                  <span className='text-[10px] text-gray-400 block mt-0.5 line-clamp-1'>
                    {contact.description}
                  </span>
                </div>

                <button
                  onClick={() => handleCall(contact.name, contact.number)}
                  className='p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-md flex-shrink-0 ml-3'
                  title={`Call ${contact.name}`}
                >
                  <PhoneCall className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Guidelines */}
        <div className='p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2'>
          <span className='text-xs font-mono font-bold text-[#E5A93C] uppercase flex items-center gap-1.5'>
            <ShieldAlert className='w-4 h-4' />
            <span>Essential Forest & Heritage Safety Rules</span>
          </span>
          <ul className='space-y-1 text-xs text-gray-300 font-light'>
            {SAFETY_TIPS.map((tip, i) => (
              <li key={i} className='flex items-start gap-2'>
                <span className='text-rose-400'>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
