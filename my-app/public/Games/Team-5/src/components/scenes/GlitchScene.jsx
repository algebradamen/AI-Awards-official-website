import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { IMAGE_MANIFEST } from '../../data/storyData';

export default function GlitchScene({ scene }) {
  const { playSfx } = useAudio();
  const [showDystopia, setShowDystopia] = useState(false);
  const [utopiaError, setUtopiaError] = useState(false);
  const [dystopiaError, setDystopiaError] = useState(false);
  const timeoutRef = useRef(null);
  const isActiveRef = useRef(true);
  const content = scene.content;

  const utopiaPath = IMAGE_MANIFEST[content.utopia] || `assets/images/${content.utopia}`;
  const dystopiaPath = IMAGE_MANIFEST[content.dystopia] || `assets/images/${content.dystopia}`;

  const getRandomDelay = useCallback(() => {
    // Random delay between 100ms and 600ms
    return Math.random() * 150 + 50;
  }, []);

  useEffect(() => {
    isActiveRef.current = true;

    // Preload images
    const utopiaImg = new Image();
    utopiaImg.src = utopiaPath;
    utopiaImg.onerror = () => setUtopiaError(true);

    const dystopiaImg = new Image();
    dystopiaImg.src = dystopiaPath;
    dystopiaImg.onerror = () => setDystopiaError(true);

    // Play audio
    if (scene.audio?.sfx) {
      playSfx(scene.audio.sfx);
    }

    // Start random flickering
    const loopFlicker = () => {
      if (!isActiveRef.current) return;

      const delay = getRandomDelay();
      timeoutRef.current = setTimeout(() => {
        if (!isActiveRef.current) return;
        setShowDystopia(prev => !prev);
        loopFlicker();
      }, delay);
    };

    const startTimer = setTimeout(() => {
      loopFlicker();
    }, 300);

    return () => {
      isActiveRef.current = false;
      clearTimeout(startTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scene, playSfx, utopiaPath, dystopiaPath, getRandomDelay]);

  return (
    <div className="scene scene--glitch is-glitching">
      <div
        className="glitch__layer glitch__layer--utopia"
        style={utopiaError ? {} : { backgroundImage: `url(${utopiaPath})` }}
      >
        {utopiaError && <PlaceholderLayer type="utopia" label={content.utopia} />}
      </div>
      <div
        className="glitch__layer glitch__layer--dystopia"
        style={{
          ...(dystopiaError ? {} : { backgroundImage: `url(${dystopiaPath})` }),
          opacity: showDystopia ? 1 : 0,
        }}
      >
        {dystopiaError && <PlaceholderLayer type="dystopia" label={content.dystopia} />}
      </div>
    </div>
  );
}

const PlaceholderLayer = ({ type, label }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: type === 'utopia'
      ? 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)'
      : 'linear-gradient(135deg, #1a0a0a 0%, #742a2a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      opacity: 0.5,
    }}>
      [{type}] {label}
    </div>
  </div>
);
