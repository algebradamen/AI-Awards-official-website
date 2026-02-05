import React, { useEffect, useState } from 'react';
import { useAudio } from '../../contexts/AudioContext';

export default function TextScene({ scene }) {
  const { playSfx, playVoice, playMusic } = useAudio();
  const [isVisible, setIsVisible] = useState(false);
  const content = scene.content;

  useEffect(() => {
    // Play audio (now single values, not arrays)
    if (scene.audio?.music) {
      playMusic(scene.audio.music);
    }
    if (scene.audio?.sfx) {
      playSfx(scene.audio.sfx);
    }
    if (scene.audio?.voice) {
      playVoice(scene.audio.voice);
    }

    // Fade in text
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [scene, playMusic, playSfx, playVoice]);

  const getTextClass = (style) => {
    switch (style) {
      case 'thought':
        return 'scene__text scene__thought';
      case 'distorted':
        return 'scene__text scene__text--distorted';
      case 'professor':
        return 'scene__text scene__text--professor';
      case 'data':
        return 'scene__text scene__text--data';
      default:
        return 'scene__text';
    }
  };

  const isDystopia = scene.isDystopia;

  return (
    <div className={`scene scene--text ${isDystopia ? 'scene--dystopia' : ''}`}>
      <p
        className={getTextClass(content.style)}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}
      >
        {content.text}
      </p>
    </div>
  );
}
