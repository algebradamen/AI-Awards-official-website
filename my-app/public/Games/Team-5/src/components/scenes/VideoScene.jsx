import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { VIDEO_MANIFEST } from '../../data/storyData';

export default function VideoScene({ scene }) {
  const { playSfx, playMusic } = useAudio();
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const content = scene.content;

  const videoPath = VIDEO_MANIFEST[content.video] || `assets/videos/${content.video}`;

  useEffect(() => {
    // setVideoError(false) - handled by key remount

    // Play audio (single values)
    if (scene.audio?.music) {
      playMusic(scene.audio.music);
    }
    if (scene.audio?.sfx) {
      playSfx(scene.audio.sfx);
    }

    // Play video (looping since user controls progression)
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, [scene, playMusic, playSfx]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const isDystopia = scene.isDystopia;
  const effectClasses = (scene.effects || []).map(e => `effect-${e} is-active`).join(' ');

  return (
    <div className={`scene scene--video ${isDystopia ? 'scene--dystopia' : ''} ${effectClasses}`}>
      {videoError ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDystopia
            ? 'linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 100%)'
            : 'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 100%)',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderTop: '15px solid transparent',
              borderBottom: '15px solid transparent',
              borderLeft: '25px solid rgba(255,255,255,0.5)',
              marginLeft: '5px',
            }} />
          </div>
          <div style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            opacity: 0.5,
            marginBottom: '0.5rem',
          }}>
            [VIDEO]
          </div>
          <div style={{
            fontSize: '1rem',
            opacity: 0.7,
          }}>
            {content.video.replace('.mp4', '').replace(/-/g, ' ')}
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoPath}
          muted
          playsInline
          loop
          onError={handleVideoError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
          }}
        />
      )}

      {content.caption && (
        <div className="scene__caption">
          <p className="scene__caption-text">{content.caption}</p>
        </div>
      )}
    </div>
  );
}
