'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import FloatingLines from "@/components/FloatingLines";
import { YEARS } from '@/data/years/index';

let hasIntroPlayed = false;

export default function Home() {
  const [animationStage, setAnimationStage] = useState<'initial' | 'text-visible' | 'final'>(hasIntroPlayed ? 'final' : 'initial');
  const [showScrollHint, setShowScrollHint] = useState(hasIntroPlayed);
  const [showLightRays, setShowLightRays] = useState(hasIntroPlayed);
  const [scrollY, setScrollY] = useState(0);

  const yearSectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const linesGradient = useMemo(() => ["#B2A7E7", "#93BBE7", "#4D8EC3"], []);
  const enabledWaves = useMemo(() => ['top', 'middle', 'bottom'] as Array<'top' | 'middle' | 'bottom'>, []);
  const lineCount = useMemo(() => [3, 3, 3], []);
  const lineDistance = useMemo(() => [4, 4, 4], []);

  useEffect(() => {
    if (hasIntroPlayed) return;
    setTimeout(() => setAnimationStage('text-visible'), 100);
    setTimeout(() => setAnimationStage('final'), 1200);
    setTimeout(() => setShowLightRays(true), 2000);
    setTimeout(() => {
      setShowScrollHint(true);
      hasIntroPlayed = true;
    }, 2500);
  }, []);

  // Track scroll for parallax
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToYears = () => {
    yearSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax values based on scroll
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0003;
  const heroTranslate = scrollY * 0.4;

  return (
    <main ref={mainRef} className="w-full h-[100dvh] overflow-y-auto overflow-x-hidden relative bg-black text-white scroll-smooth snap-y snap-mandatory">
      <div className={`transition-opacity duration-1000 delay-500 ${animationStage === 'final' ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden snap-start">
        {/* Background Glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-blue-900/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 delay-500 ${animationStage === 'final' ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translate(-50%, -50%) translateY(${heroTranslate * 0.2}px)` }}
        />

        {/* Floating Lines Background */}
        <div className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out z-0 ${showLightRays ? 'opacity-100' : 'opacity-0'}`}>
          <FloatingLines
            enabledWaves={enabledWaves}
            lineCount={lineCount}
            lineDistance={lineDistance}
            bendRadius={2}
            bendStrength={0.5}
            interactive={true}
            parallax={true}
            parallaxStrength={0.1}
            animationSpeed={0.3}
            linesGradient={linesGradient}
          />
        </div>

        <div
          className="relative z-10 flex flex-col items-center text-center px-4 w-full"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslate}px) scale(${heroScale})`,
          }}
        >
          {/* Video Orb */}
          <div className={`transition-all duration-1000 ease-in-out ${animationStage === 'final' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex items-center justify-center pointer-events-none select-none">
              {/* Glow behind orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 opacity-20 blur-3xl animate-pulse"></div>
              {/* Orb video */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.25)]">
                <video
                  className="w-full h-full object-cover rounded-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/media/2026/orb.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Shine ring */}
              <div className="absolute inset-0 rounded-full ring-1 ring-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.08)]"></div>
            </div>
          </div>

          {/* Title */}
          <div className={`
            flex flex-col items-center transition-all duration-1000 ease-in-out relative mt-4
            ${animationStage === 'initial' ? 'opacity-0 -translate-y-[80px] md:-translate-y-[160px]' : ''}
            ${animationStage === 'text-visible' ? 'opacity-100 -translate-y-[80px] md:-translate-y-[160px]' : ''}
            ${animationStage === 'final' ? 'opacity-100 translate-y-0' : ''}
          `}>
            <h2 className="font-serif text-3xl md:text-5xl mb-1 md:mb-2 font-light bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent">
              IM Tangens
            </h2>
            <h1 className="font-sans text-4xl md:text-5xl font-black tracking-widest text-white drop-shadow-[0_0_25px_rgba(77,142,195,0.4)]">
              AI-AWARDS
            </h1>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToYears}
          aria-label="Scroll to year selector"
          className={`
            absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2
            transition-opacity duration-1000 cursor-pointer group
            ${showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          <span className="text-gray-400 text-sm tracking-wide group-hover:text-gray-200 transition-colors">
            Scroll down
          </span>
          <svg
            className="w-5 h-5 text-gray-400 animate-bounce group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ─── Year Selector Section ─── */}
      <section
        ref={yearSectionRef}
        className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-24 gap-8 snap-start"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="font-serif text-3xl md:text-5xl font-light bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent">
            IM Tangens
          </h2>
          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-widest text-white">
            AI-AWARDS
          </h1>
        </div>

        {/* Year buttons */}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs mt-4">
          {YEARS.map((entry, i) => {
            const gradients = [
              'bg-gradient-to-r from-[#C9A04E] via-[#D4A843] to-[#8B6914]',
              'bg-gradient-to-r from-[#7B5EA7] via-[#6C7EC7] to-[#4D8EC3]',
            ];
            return (
              <Link
                key={entry.year}
                href={`/years/${entry.year}`}
                className={`
                  w-full py-3 rounded-full text-center text-white font-bold text-sm tracking-widest
                  ${gradients[i] || gradients[gradients.length - 1]}
                  hover:scale-105 hover:shadow-[0_0_30px_rgba(139,123,196,0.3)]
                  transition-all duration-300
                `}
              >
                {entry.label}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
