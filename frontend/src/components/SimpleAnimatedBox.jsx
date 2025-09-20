import React from 'react';

const SimpleAnimatedBox = () => {
  return (
    <div
      style={{
        width: '128px',
        height: '128px',
        background: 'linear-gradient(45deg, #9333ea, #ec4899, #ef4444)',
        backgroundSize: '300% 300%',
        animation: 'gradient 3s ease infinite',
        borderRadius: '8px'
      }}
    />
  );
};

export default SimpleAnimatedBox;