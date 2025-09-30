import React from 'react';

const BorderAnimated = ({ children, className = '', ...props }) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <style>
        {`
          @keyframes gradient-border {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div
        className="absolute -inset-1 rounded-lg"
        style={{
          background: 'linear-gradient(45deg, #9333ea, #ec4899, #ef4444)',
          backgroundSize: '300% 300%',
          animation: 'gradient-border 3s ease infinite',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimated;