import React from 'react';
import { useAudio } from '../contexts/AudioContext';
import { useStory } from '../contexts/StoryContext';

export default function LandingPage() {
  const { enableAudio } = useAudio();
  const { startStory } = useStory();

  const handleStart = () => {
    enableAudio();
    startStory();
  };

  return (
    <div className="landing">
      <img
        src="assets/images/logo.jpg"
        alt="Logo"
        className="landing__logo"
      />
      <h1 className="landing__title">AFTERTASTE</h1>
      <p className="landing__subtitle">
        An interactive experience about the future we're choosing.
      </p>
      <button className="landing__button" onClick={handleStart}>
        Begin
      </button>
      <div className="landing__headphones">
        <span>🎧 Headphones recommended</span>
      </div>
    </div>
  );
}
