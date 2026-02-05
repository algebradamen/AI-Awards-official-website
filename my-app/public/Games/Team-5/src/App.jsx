import React from 'react';
import { AudioProvider } from './contexts/AudioContext';
import { StoryProvider, useStory } from './contexts/StoryContext';
import LandingPage from './components/LandingPage';
import StoryContainer from './components/StoryContainer';
import ProgressBar from './components/ProgressBar';
import FlashEffect from './components/FlashEffect';
import './styles/index.css';
import './styles/scenes.css';
import './styles/effects.css';
import './styles/components.css';

function StoryApp() {
  const { isStarted } = useStory();

  return (
    <div className="app">
      <ProgressBar />
      <FlashEffect />
      
      {!isStarted ? (
        <LandingPage />
      ) : (
        <StoryContainer />
      )}
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <StoryProvider>
        <StoryApp />
      </StoryProvider>
    </AudioProvider>
  );
}

export default App;
