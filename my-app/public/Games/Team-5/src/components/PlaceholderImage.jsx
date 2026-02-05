import React from 'react';

export default function PlaceholderImage({ name, type = 'utopia' }) {
  const colors = {
    utopia: { bg: '#e0f4ff', text: '#2c5282', border: '#4299e1' },
    glitch: { bg: '#2d1f47', text: '#e9d5ff', border: '#9f7aea' },
    dystopia: { bg: '#1a0a0a', text: '#feb2b2', border: '#c53030' },
    reality: { bg: '#f7fafc', text: '#2d3748', border: '#718096' },
  };

  const color = colors[type] || colors.utopia;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: color.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: `4px dashed ${color.border}`,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: color.text,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '1rem',
        }}
      >
        [{type}]
      </div>
      <div
        style={{
          fontSize: '1rem',
          color: color.text,
          opacity: 0.8,
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        {name}
      </div>
    </div>
  );
}
