import React, { useEffect } from 'react';
import { useAudio } from '../../contexts/AudioContext';

export default function EndScene({ scene }) {
  const { playVoice, stopMusic } = useAudio();
  const content = scene.content;

  useEffect(() => {
    // Play final voice (single value)
    if (scene.audio?.voice) {
      playVoice(scene.audio.voice);
    }

    // Fade out music after a delay (10 seconds to let final scene breathe)
    const musicFadeTimer = setTimeout(() => {
      stopMusic(true);
    }, 10000);

    return () => clearTimeout(musicFadeTimer);
  }, [scene, playVoice, stopMusic]);

  return (
    <div className="end-screen">
      <p className="end-screen__tagline">{content.tagline}</p>
      <img
        src="assets/images/logo.jpg"
        alt="Logo"
        className="end-screen__logo"
      />
      <h1 className="end-screen__title">{content.title}</h1>
      <div className="end-screen__credits">
        <p>Team 5</p>
        <p>Tangen — 2025</p>
      </div>
    </div>
  );
}
