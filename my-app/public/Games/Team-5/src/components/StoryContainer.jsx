import React, { useEffect, useRef, useState } from 'react';
import { useStory } from '../contexts/StoryContext';
import { STORY_SCENES } from '../data/storyData';
import SceneRenderer from './SceneRenderer';

export default function StoryContainer() {
  const { currentSceneIndex, nextScene, isEnded } = useStory();
  const containerRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const lastScrollTime = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      // Throttle scroll to prevent rapid scene changes
      if (now - lastScrollTime.current < 800) return;
      if (isScrolling.current) return;
      
      // Detect scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - next scene
        isScrolling.current = true;
        lastScrollTime.current = now;
        nextScene();
        
        // Hide scroll hint after first scroll
        if (showScrollHint) {
          setShowScrollHint(false);
        }
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    const handleKeyDown = (e) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        lastScrollTime.current = now;
        nextScene();
        
        if (showScrollHint) {
          setShowScrollHint(false);
        }
      }
    };

    const handleTouch = (() => {
      let touchStartY = 0;
      
      return {
        start: (e) => {
          touchStartY = e.touches[0].clientY;
        },
        end: (e) => {
          const touchEndY = e.changedTouches[0].clientY;
          const deltaY = touchStartY - touchEndY;
          
          const now = Date.now();
          if (now - lastScrollTime.current < 800) return;
          
          // Swipe up to go to next scene
          if (deltaY > 50) {
            lastScrollTime.current = now;
            nextScene();
            
            if (showScrollHint) {
              setShowScrollHint(false);
            }
          }
        }
      };
    })();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouch.start, { passive: true });
      container.addEventListener('touchend', handleTouch.end, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouch.start);
        container.removeEventListener('touchend', handleTouch.end);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextScene, showScrollHint]);

  // Get current scene info
  const currentScene = STORY_SCENES[currentSceneIndex];
  const isChoiceScene = currentScene?.type === 'choice';
  const isEndScene = currentScene?.type === 'end';

  return (
    <div 
      ref={containerRef} 
      className="story-container"
      style={{ 
        height: '100vh', 
        overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      <SceneRenderer />
      
      {/* Scroll Hint - only show initially, hide after first scroll, and hide on choice/end */}
      {showScrollHint && !isChoiceScene && !isEndScene && !isEnded && (
        <div className="scroll-hint is-visible">
          <div className="scroll-hint__arrow" />
        </div>
      )}
    </div>
  );
}
