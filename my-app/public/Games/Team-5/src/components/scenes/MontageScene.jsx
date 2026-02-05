import React, { useEffect, useState } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { IMAGE_MANIFEST } from '../../data/storyData';

export default function MontageScene({ scene }) {
  const { playSfx } = useAudio();
  const [imageError, setImageError] = useState(false);
  const content = scene.content;

  const imagePath = IMAGE_MANIFEST[content.image] || `/assets/images/${content.image}`;

  useEffect(() => {
    // setImageError(false) - handled by key remount

    // Preload image
    const img = new Image();
    img.src = imagePath;
    img.onerror = () => setImageError(true);

    // Play audio (single value)
    if (scene.audio?.sfx) {
      playSfx(scene.audio.sfx);
    }
  }, [scene, playSfx, imagePath]);

  return (
    <div className="scene scene--montage scene--dystopia">
      <div
        className="montage__image is-active"
        style={imageError ? {
          background: 'linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } : {
          backgroundImage: `url(${imagePath})`,
        }}
      >
        {imageError && (
          <div style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            opacity: 0.5,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            [DYSTOPIA] {content.image.split('/').pop()}
          </div>
        )}
      </div>
      <div className="scene__overlay" />
      <div className="montage__data">
        {content.data}
      </div>
    </div>
  );
}
