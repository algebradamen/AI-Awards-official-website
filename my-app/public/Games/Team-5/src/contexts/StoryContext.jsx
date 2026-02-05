import React, { createContext, useContext, useState, useCallback } from 'react';
import { STORY_SCENES } from '../data/storyData';

const StoryContext = createContext(null);

export function StoryProvider({ children }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [userChoice, setUserChoice] = useState(null);

  const currentScene = STORY_SCENES[currentSceneIndex];
  const totalScenes = STORY_SCENES.length;
  const progress = ((currentSceneIndex + 1) / totalScenes) * 100;

  const startStory = useCallback(() => {
    setIsStarted(true);
    setCurrentSceneIndex(0);
  }, []);

  const nextScene = useCallback(() => {
    if (currentSceneIndex < totalScenes - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setIsEnded(true);
    }
  }, [currentSceneIndex, totalScenes]);

  const previousScene = useCallback(() => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  }, [currentSceneIndex]);

  const goToScene = useCallback((sceneId) => {
    const index = STORY_SCENES.findIndex(s => s.id === sceneId);
    if (index !== -1) {
      setCurrentSceneIndex(index);
    }
  }, []);

  const makeChoice = useCallback((choiceId) => {
    setUserChoice(choiceId);
    nextScene();
  }, [nextScene]);

  const resetStory = useCallback(() => {
    setCurrentSceneIndex(0);
    setIsStarted(false);
    setIsEnded(false);
    setUserChoice(null);
  }, []);

  const value = {
    currentScene,
    currentSceneIndex,
    totalScenes,
    progress,
    isStarted,
    isEnded,
    userChoice,
    startStory,
    nextScene,
    previousScene,
    goToScene,
    makeChoice,
    resetStory,
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
}
