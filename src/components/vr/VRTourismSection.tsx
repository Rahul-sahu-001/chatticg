import React, { useState, useRef, useEffect } from 'react';
import { VR_SCENES } from '../../data/vrScenes';
import { VRScene } from '../../types';
import {
  Compass,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  RotateCw,
  Eye,
  Headphones,
  Maximize2
} from 'lucide-react';

export const VRTourismSection: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const activeScene = VR_SCENES[activeSceneIndex];
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<VRScene['hotspots'][0] | null>(null);

  // 360 pan simulation state
  const [panOffset, setPanOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setPanOffset(prev => prev + delta * 0.15);
    startX.current = e.clientX;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // Continuous subtle auto-pan when not dragging
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) {
        setPanOffset(prev => prev + 0.12);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id='ar-vr' className='py-20 bg-[#061017] text-[#EEF3F0] relative overflow-hidden'>
      {/* Background ambient */}
      <div className='absolute top-1/3 right-10 w-96 h-96 bg-[#144A3A]/20 rounded-full blur-[140px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#F3BA54] font-mono text-xs uppercase tracking-widest mb-3'>
              <Headphones className='w-3.5 h-3.5' />
              <span>Immersive 360° AR/VR Sanctuary</span>
            </div>
            <h2 className='font-serif text-3xl sm:text-5xl font-light text-white tracking-tight'>
              Virtual Heritage & Nature Expeditions
            </h2>
            <p className='text-sm sm:text-base text-gray-400 font-light mt-3 leading-relaxed'>
              Step inside 360° panoramic virtual sanctums. Drag to look around, listen to spatial soundscapes, and click glowing story nodes to uncover millennia of tribal folklore.
            </p>
          </div>

          {/* Scene selector tabs */}
          <div className='flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar'>
            {VR_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex-shrink-0 ${
                  activeSceneIndex === idx
                    ? 'bg-[#E5A93C] text-[#07131D] font-bold shadow-md shadow-[#E5A93C]/20'
                    : 'glass-panel text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                {scene.district}: {scene.title.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 360° Panorama Viewer Container */}
        <div
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className='relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden border border-[#E5A93C]/30 shadow-2xl bg-black cursor-grab active:cursor-grabbing select-none group'
        >
          {/* Panoramic Image layer with infinite wrapped background offset */}
          <div
            className='absolute inset-0 w-full h-full bg-cover bg-center transition-transform'
            style={{
              backgroundImage: `url(${activeScene.panoramaImage})`,
              backgroundPosition: `${panOffset}% center`,
              backgroundRepeat: 'repeat-x'
            }}
          />

          {/* Cinematic Vignettes */}
          <div className='absolute inset-0 bg-gradient-to-t from-[#07131D] via-transparent to-black/40 pointer-events-none' />

          {/* Top Header Overlay in 360 viewer */}
          <div className='absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none'>
            <div className='pointer-events-auto glass-panel px-4 py-2 rounded-2xl backdrop-blur-md border border-white/15 flex items-center gap-2.5'>
              <Sparkles className='w-4 h-4 text-[#E5A93C]' />
              <div>
                <span className='font-serif text-sm font-bold text-white block leading-tight'>
                  {activeScene.title}
                </span>
                <span className='text-[10px] font-mono text-gray-400 block'>{activeScene.location}</span>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className='pointer-events-auto p-3 rounded-2xl glass-panel hover:bg-white/15 border border-white/20 text-white transition-all flex items-center gap-2 cursor-pointer'
              title='Toggle Ambient Spatial Soundscape'
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className='w-4 h-4 text-[#E5A93C]' />
                  <span className='text-xs font-mono text-[#F3BA54] hidden sm:inline'>Soundscape Active</span>
                </>
              ) : (
                <>
                  <VolumeX className='w-4 h-4 text-gray-400' />
                  <span className='text-xs font-mono text-gray-400 hidden sm:inline'>Play Soundscape</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Clickable Hotspots inside 360 viewer */}
          <div className='absolute inset-0 pointer-events-none z-10'>
            {activeScene.hotspots.map((hotspot, i) => {
              // Calculate screen horizontal placement relative to current panOffset
              const leftPercent = ((i * 30 + 20 + (panOffset * 0.4)) % 100 + 100) % 100;
              const topPercent = 40 + (i % 2) * 15;

              return (
                <div
                  key={i}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  className='absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2'
                >
                  <button
                    onClick={() => setActiveHotspot(hotspot)}
                    className='relative p-3 rounded-full bg-[#E5A93C]/80 hover:bg-[#E5A93C] text-[#07131D] shadow-xl shadow-[#E5A93C]/40 border-2 border-white transition-transform hover:scale-125 cursor-pointer animate-pulse'
                    title={hotspot.title}
                  >
                    <Info className='w-4 h-4' />
                    <span className='absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white border border-white/10'>
                      {hotspot.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Drag Instruction Banner (Bottom Left) */}
          <div className='absolute bottom-6 left-6 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-gray-300'>
            <RotateCw className='w-3.5 h-3.5 text-[#E5A93C] animate-spin' />
            <span>Click & drag to explore 360° panorama • Click glowing nodes</span>
          </div>

          {/* Active Hotspot Modal Story Card (Bottom Center / Right) */}
          {activeHotspot && (
            <div className='absolute bottom-6 right-6 max-w-sm z-30 animate-in fade-in slide-in-from-bottom-2 duration-200'>
              <div className='glass-panel-warm p-5 rounded-2xl backdrop-blur-xl border border-[#E5A93C]/50 shadow-2xl space-y-2.5'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-[10px] uppercase text-[#F3BA54] font-bold tracking-wider'>
                    Cultural Folklore Node
                  </span>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className='text-gray-400 hover:text-white text-xs font-mono cursor-pointer'
                  >
                    ✕
                  </button>
                </div>

                <h4 className='font-serif text-lg font-bold text-white'>{activeHotspot.title}</h4>
                <p className='text-xs text-gray-200 leading-relaxed font-light'>{activeHotspot.text}</p>

                {activeHotspot.audioCaption && (
                  <div className='pt-2 border-t border-white/10 flex items-start gap-2 text-[11px] font-mono text-emerald-300'>
                    <Headphones className='w-3.5 h-3.5 flex-shrink-0 mt-0.5' />
                    <span>{activeHotspot.audioCaption}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
