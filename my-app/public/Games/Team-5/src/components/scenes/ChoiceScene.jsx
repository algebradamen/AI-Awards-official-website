import React, { useState, useEffect } from 'react';
import { useStory } from '../../contexts/StoryContext';
import { useAudio } from '../../contexts/AudioContext';
import { IMAGE_MANIFEST } from '../../data/storyData';

export default function ChoiceScene({ scene }) {
  const { makeChoice } = useStory();
  const { playSfx } = useAudio();
  const content = scene.content;
  const [hoveredOption, setHoveredOption] = useState(null);

  const backgrounds = content.backgrounds || {};
  const defaultBg = IMAGE_MANIFEST[backgrounds.default] || `/assets/images/${backgrounds.default}`;
  const takeBg = IMAGE_MANIFEST[backgrounds.take] || `/assets/images/${backgrounds.take}`;
  const refuseBg = IMAGE_MANIFEST[backgrounds.refuse] || `/assets/images/${backgrounds.refuse}`;

  useEffect(() => {
    const bgs = scene.content.backgrounds || {};
    const d = IMAGE_MANIFEST[bgs.default] || `/assets/images/${bgs.default}`;
    const t = IMAGE_MANIFEST[bgs.take] || `/assets/images/${bgs.take}`;
    const r = IMAGE_MANIFEST[bgs.refuse] || `/assets/images/${bgs.refuse}`;

    // Preload images
    if (bgs.default) new Image().src = d;
    if (bgs.take) new Image().src = t;
    if (bgs.refuse) new Image().src = r;
  }, [scene]);

  const handleChoice = (choiceId) => {
    makeChoice(choiceId);
  };

  const handleMouseEnter = (optionId) => {
    setHoveredOption(optionId);

    if (optionId === 'take') {
      playSfx('alarm-notif');
    } else if (optionId === 'refuse') {
      playSfx('glitch-bio');
    }
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  return (
    <div className="scene scene--choice">
      {/* Background layers */}
      <div
        className="choice__background choice__background--default"
        style={{
          backgroundImage: `url(${defaultBg})`,
          opacity: hoveredOption === null ? 1 : 0,
        }}
      />
      <div
        className="choice__background choice__background--take"
        style={{
          backgroundImage: `url(${takeBg})`,
          opacity: hoveredOption === 'take' ? 1 : 0,
        }}
      />
      <div
        className="choice__background choice__background--refuse"
        style={{
          backgroundImage: `url(${refuseBg})`,
          opacity: hoveredOption === 'refuse' ? 1 : 0,
        }}
      />

      {/* Overlay for readability */}
      <div className="choice__overlay" />

      {/* Content */}
      <div className="choice__container">
        <h2 className="choice__question">{content.question}</h2>
        <div className="choice__buttons">
          {content.options.map((option) => (
            <button
              key={option.id}
              className={`choice__button choice__button--${option.id}`}
              onClick={() => handleChoice(option.id)}
              onMouseEnter={() => handleMouseEnter(option.id)}
              onMouseLeave={handleMouseLeave}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
