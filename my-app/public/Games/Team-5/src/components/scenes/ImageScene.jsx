import React, { useEffect, useState } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { IMAGE_MANIFEST } from '../../data/storyData';

function getImageType(imagePath) {
  if (imagePath.includes('utopia')) return 'utopia';
  if (imagePath.includes('glitch')) return 'glitch';
  if (imagePath.includes('dystopia')) return 'dystopia';
  if (imagePath.includes('reality')) return 'reality';
  return 'utopia';
}

function getPlaceholderColor(type) {
  const colors = {
    utopia: { bg: '#1a365d', accent: '#4299e1' },
    glitch: { bg: '#2d1f47', accent: '#9f7aea' },
    dystopia: { bg: '#1a0a0a', accent: '#c53030' },
    reality: { bg: '#1a202c', accent: '#718096' },
  };
  return colors[type] || colors.utopia;
}

export default function ImageScene({ scene }) {
  const { playSfx, playVoice, playMusic } = useAudio();
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const content = scene.content;

  const imagePath = IMAGE_MANIFEST[content.image] || `assets/images/${content.image}`;
  const imageType = getImageType(content.image);
  const placeholderColors = getPlaceholderColor(imageType);

  useEffect(() => {
    // setImageError(false) - handled by key remount
    // setIsLoaded(false) - handled by key remount

    // Play audio (single values)
    if (scene.audio?.music) {
      playMusic(scene.audio.music);
    }
    if (scene.audio?.sfx) {
      playSfx(scene.audio.sfx);
    }
    if (scene.audio?.voice) {
      playVoice(scene.audio.voice);
    }

    // Preload image
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      if (img.naturalWidth > 10 && img.naturalHeight > 10) {
        setIsLoaded(true);
      } else {
        setImageError(true);
        setIsLoaded(true);
      }
    };
    img.onerror = () => {
      setImageError(true);
      setIsLoaded(true);
    };
  }, [scene, playMusic, playSfx, playVoice, imagePath]);

  const isDystopia = scene.isDystopia;
  const effectClasses = (scene.effects || []).map(e => `effect-${e} is-active`).join(' ');

  const placeholderStyle = imageError ? {
    background: `linear-gradient(135deg, ${placeholderColors.bg} 0%, ${placeholderColors.accent}22 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } : {};

  return (
    <div
      className={`scene scene--image ${isDystopia ? 'scene--dystopia' : ''} ${effectClasses}`}
      style={{
        backgroundImage: imageError ? 'none' : `url(${imagePath})`,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        ...placeholderStyle,
      }}
    >
      {imageError && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
        }}>
          <div style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            opacity: 0.5,
            marginBottom: '1rem',
          }}>
            [{imageType}]
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 300,
            opacity: 0.7,
            textAlign: 'center',
            padding: '0 2rem',
          }}>
            {content.image.split('/').pop().replace('.jpg', '').replace(/-/g, ' ')}
          </div>
        </div>
      )}

      <div className="scene__overlay" />

      {content.location && (
        <div className="scene__location">
          {content.location}
        </div>
      )}

      {content.caption && (
        <div className="scene__caption">
          <p className="scene__caption-text">{content.caption}</p>
        </div>
      )}
    </div>
  );
}
