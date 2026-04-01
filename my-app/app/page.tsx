'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from "@/components/Navbar";
import Winners from "@/components/Winners";
import FloatingLines from "@/components/FloatingLines";


// Module-level variable to track if animation has played during the current session (SPA navigation)
// This resets on page reload, but persists when navigating between pages.
let hasIntroPlayed = false;

export default function Home() {
  /* const [videoOpacity, setVideoOpacity] = useState(1); */
  /* fade removed as per user request */
  const [animationStage, setAnimationStage] = useState<'initial' | 'text-visible' | 'final'>(hasIntroPlayed ? 'final' : 'initial');
  const [showLightRays, setShowLightRays] = useState(hasIntroPlayed);
  const [showButton, setShowButton] = useState(hasIntroPlayed);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Memoize ALL arrays/objects to prevent FloatingLines from recreating the entire scene
  const linesGradient = useMemo(() => [
    "#B2A7E7", // Lavender Blue (Light)
    "#93BBE7", // Soft Blue
    "#4D8EC3", // Steel Blue (Darker)
  ], []);

  const enabledWaves = useMemo(() => ['top', 'middle', 'bottom'] as Array<'top' | 'middle' | 'bottom'>, []);
  const lineCount = useMemo(() => [3, 3, 3], []);
  const lineDistance = useMemo(() => [4, 4, 4], []);

  // Intro Animation Sequence
  // Intro Animation Sequence
  useEffect(() => {
    // Check if animation has already played in this SPA session
    if (hasIntroPlayed) {
      return;
    }

    // Stage 1: Fade in text (start immediately)
    setTimeout(() => {
      setAnimationStage('text-visible');
    }, 100);

    // Stage 2: Move text down and show orb (after 2 seconds)
    setTimeout(() => {
      setAnimationStage('final');
    }, 1200);

    // Stage 3: Show Light Rays (after text settles)
    setTimeout(() => {
      setShowLightRays(true);
    }, 2000);

    // Stage 4: Show Button (after all animations complete)
    setTimeout(() => {
      setShowButton(true);
      // Mark as played ONLY after animation finishes to handle Strict Mode double-mount
      hasIntroPlayed = true;
    }, 3500);
  }, []);

  /* Video fade loop removed */

  return (
    <main className="h-[100dvh] w-full overflow-hidden relative bg-black text-white">
      {/* Navbar fades in only at the final stage */}
      <div className={`transition-opacity duration-1000 delay-500 ${animationStage === 'final' ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Glow - fades in at final stage */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-blue-900/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 delay-500 ${animationStage === 'final' ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Floating Lines Animation - Appears after everything settles */}
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

        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full -mt-20 md:-mt-10">

          {/* Orb Video Container */}
          {/* Layout is natural flex column. We offset positions to animate. */}
          {/* Orb Video Container */}
          {/* Layout is natural flex column. We offset positions to animate. */}
          <div
            className={`
              scale-100 transition-all duration-1000 ease-in-out relative
              ${animationStage === 'final' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            {/* Orb Video with Mask for seamless blending */}
            <div className="relative z-10" style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)' }}>
              <video
                key="orb-video-original"
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] object-contain transition-opacity duration-500"
              >
                <source src="/orb.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Subtle glow behind the orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[160px] md:h-[160px] bg-blue-500/20 blur-[40px] md:blur-[60px] rounded-full -z-10"></div>
          </div>

          {/* Text Container */}
          {/* initially offset UP to overlap the hidden orb space, then drops to 0 */}
          <div className={`
            flex flex-col items-center transition-all duration-1000 ease-in-out relative
            ${animationStage === 'initial' ? 'opacity-0 -translate-y-[80px] md:-translate-y-[160px]' : ''}
            ${animationStage === 'text-visible' ? 'opacity-100 -translate-y-[80px] md:-translate-y-[160px]' : ''}
            ${animationStage === 'final' ? 'opacity-100 translate-y-0' : ''}
          `}>
            <h2 className="font-serif text-3xl md:text-5xl mb-1 md:mb-2 font-light bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent">
              2026
            </h2>
            <h1 className="font-sans text-4xl md:text-5xl font-black tracking-widest text-white drop-shadow-[0_0_25px_rgba(77,142,195,0.4)]">
              TANGEN AI-AWARDS
            </h1>

            {/* Context & Quote */}
            <div className="mt-4 flex flex-col items-center gap-3 max-w-2xl px-4">
              <p className="text-gray-400 text-xs md:text-sm font-light tracking-wide leading-relaxed max-w-lg">
                Created in just 2 weeks, this project explores the boundaries of AI through the lens of environment and sustainability.
              </p>
              <p className="text-blue-200/80 text-base md:text-lg font-serif italic tracking-wider">
                “The only way to cheat, is by writing it yourself.”
              </p>
            </div>
          </div>

          {/* See Winners Button */}
          {/* Wrapper handles positioning, button handles visibility animation */}
          {/* Absolutely positioned to prevent layout shift and keep content centered */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 md:mt-12 w-max">
            {showButton && (
              <a
                href="/teams"
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#8B7BC4] via-[#6B9DD4] to-[#3B6FA3] rounded-full font-bold text-white text-base md:text-lg tracking-wide overflow-hidden transition-all duration-1000 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,123,196,0.6)] animate-pulse hover:animate-none opacity-0 flex items-center gap-2 block"
                style={{ animation: 'fadeIn 1s ease-in forwards' }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  See Winners
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>

                {/* Glow effect behind button */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8B7BC4] via-[#6B9DD4] to-[#3B6FA3] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </a>
            )}
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </section>
    </main >
  );
}
