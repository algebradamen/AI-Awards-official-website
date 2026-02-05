import React, { useState, useEffect } from 'react';
import { useStory } from '../contexts/StoryContext';

export default function FlashEffect() {
  const { currentScene } = useStory();
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // Check if current scene has a flash effect
    if (currentScene?.effects?.includes('flash') ||
      currentScene?.effects?.includes('flash-end') ||
      currentScene?.transition === 'flash') {
      setTimeout(() => setIsFlashing(true), 0);
      const timer = setTimeout(() => setIsFlashing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  return (
    <div className={`effect-flash ${isFlashing ? 'is-active' : ''}`} />
  );
}
