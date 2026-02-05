import React from 'react';
import { useStory } from '../contexts/StoryContext';

export default function ScrollHint() {
  const { isStarted, isEnded, currentScene } = useStory();

  // Don't show on landing, end, or choice scenes
  const isVisible = isStarted && 
                    !isEnded && 
                    currentScene?.type !== 'choice' &&
                    currentScene?.type !== 'end';

  return (
    <div className={`scroll-hint ${isVisible ? 'is-visible' : ''}`}>
      <div className="scroll-hint__arrow" />
    </div>
  );
}
