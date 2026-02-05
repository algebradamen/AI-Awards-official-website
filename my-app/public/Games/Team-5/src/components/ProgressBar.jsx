import React from 'react';
import { useStory } from '../contexts/StoryContext';

export default function ProgressBar() {
  const { progress, isStarted, isEnded } = useStory();

  if (!isStarted || isEnded) return null;

  return (
    <div 
      className="progress-bar" 
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
