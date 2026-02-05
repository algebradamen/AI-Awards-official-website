import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { AUDIO_MANIFEST } from '../data/storyData';

const AudioContext = createContext(null);

const FADE_DURATION = 800; // ms

export function AudioProvider({ children }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentMusicId, setCurrentMusicId] = useState(null);

  const musicRef = useRef(null);
  const sfxRef = useRef(null);
  const voiceRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Fade out audio element
  const fadeOutAudio = useCallback((audio, onComplete) => {
    if (!audio) {
      if (onComplete) onComplete();
      return;
    }

    const startVolume = audio.volume;
    const steps = 20;
    const stepDuration = FADE_DURATION / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    // Clear any existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(0, startVolume - (volumeStep * currentStep));
      audio.volume = newVolume;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audio.pause();
        audio.src = '';
        if (onComplete) onComplete();
      }
    }, stepDuration);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
      if (sfxRef.current) {
        sfxRef.current.pause();
        sfxRef.current = null;
      }
      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current = null;
      }
    };
  }, []);

  const enableAudio = useCallback(() => {
    setIsAudioEnabled(true);
  }, []);

  const playMusic = useCallback((trackId, { loop = true } = {}) => {
    if (!isAudioEnabled) {
      console.log('Audio not enabled yet');
      return;
    }

    const src = AUDIO_MANIFEST.music?.[trackId];
    if (!src) {
      console.warn(`Music track not found: ${trackId}`);
      return;
    }

    // Don't restart if same track is already playing
    if (currentMusicId === trackId && musicRef.current && !musicRef.current.paused) {
      console.log(`Music ${trackId} already playing, skipping`);
      return;
    }

    console.log(`Playing music: ${trackId}`);

    // Fade out current music, then play new one
    const oldMusic = musicRef.current;

    const startNewMusic = () => {
      const audio = new Audio(src);
      audio.loop = loop;
      audio.volume = 0.6;
      musicRef.current = audio;
      setCurrentMusicId(trackId);

      audio.play()
        .then(() => {
          console.log(`Music ${trackId} started playing`);
        })
        .catch(err => {
          console.warn(`Failed to play music ${trackId}:`, err.message);
        });
    };

    if (oldMusic && !oldMusic.paused) {
      // Fade out old music, then start new
      fadeOutAudio(oldMusic, startNewMusic);
    } else {
      // No current music, start immediately
      if (oldMusic) {
        oldMusic.pause();
        oldMusic.src = '';
      }
      startNewMusic();
    }
  }, [isAudioEnabled, currentMusicId, fadeOutAudio]);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      fadeOutAudio(musicRef.current, () => {
        musicRef.current = null;
      });
    }
    setCurrentMusicId(null);
  }, [fadeOutAudio]);

  const playSfx = useCallback((sfxId) => {
    if (!isAudioEnabled) return;

    const src = AUDIO_MANIFEST.sfx?.[sfxId];
    if (!src) {
      console.warn(`SFX not found: ${sfxId}`);
      return;
    }

    // Stop previous SFX
    if (sfxRef.current) {
      sfxRef.current.pause();
      sfxRef.current.src = '';
    }

    const audio = new Audio(src);
    audio.volume = 0.8;
    sfxRef.current = audio;

    audio.play().catch(err => {
      console.warn(`Failed to play SFX ${sfxId}:`, err.message);
    });
  }, [isAudioEnabled]);

  const playVoice = useCallback((voiceId) => {
    if (!isAudioEnabled) return;

    const src = AUDIO_MANIFEST.voice?.[voiceId];
    if (!src) {
      console.warn(`Voice not found: ${voiceId}`);
      return;
    }

    // Stop previous voice
    if (voiceRef.current) {
      voiceRef.current.pause();
      voiceRef.current.src = '';
    }

    const audio = new Audio(src);
    audio.volume = 1;
    voiceRef.current = audio;

    audio.play().catch(err => {
      console.warn(`Failed to play voice ${voiceId}:`, err.message);
    });
  }, [isAudioEnabled]);

  const stopAllAudio = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.src = '';
      musicRef.current = null;
    }
    if (sfxRef.current) {
      sfxRef.current.pause();
      sfxRef.current.src = '';
      sfxRef.current = null;
    }
    if (voiceRef.current) {
      voiceRef.current.pause();
      voiceRef.current.src = '';
      voiceRef.current = null;
    }
    setCurrentMusicId(null);
  }, []);

  const value = {
    isAudioEnabled,
    enableAudio,
    currentMusic: currentMusicId,
    playMusic,
    stopMusic,
    playSfx,
    playVoice,
    stopAllAudio,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
