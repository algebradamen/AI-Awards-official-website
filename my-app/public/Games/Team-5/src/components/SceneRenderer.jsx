import React from 'react';
import { useStory } from '../contexts/StoryContext';
import {
  TextScene,
  ImageScene,
  VideoScene,
  ChoiceScene,
  GlitchScene,
  MontageScene,
  EndScene,
} from './scenes';

export default function SceneRenderer() {
  const { currentScene } = useStory();

  if (!currentScene) return null;

  const renderScene = () => {
    switch (currentScene.type) {
      case 'text':
        return <TextScene scene={currentScene} />;
      case 'image':
        return <ImageScene scene={currentScene} />;
      case 'video':
        return <VideoScene scene={currentScene} />;
      case 'choice':
        return <ChoiceScene scene={currentScene} />;
      case 'glitch':
        return <GlitchScene scene={currentScene} />;
      case 'montage':
        return <MontageScene scene={currentScene} />;
      case 'end':
        return <EndScene scene={currentScene} />;
      default:
        return <TextScene scene={currentScene} />;
    }
  };

  return (
    <div className="scene-wrapper" key={currentScene.id}>
      {renderScene()}
    </div>
  );
}
