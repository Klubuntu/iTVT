'use client';

import React from 'react';

const LoadingBar = () => {
  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    zIndex: 9999,
  };

  const barStyle = {
    width: '85px',
    height: '85px',
    border: '4px solid #ffffff',
    borderRadius: '8px',
    animation: 'loadingBorderAnimation 2s linear infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes loadingBorderAnimation {
          0% {
            border-color: #ffffff;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          }
          25% {
            border-top-color: #ffffff;
            border-right-color: rgba(255, 255, 255, 0.3);
            border-bottom-color: rgba(255, 255, 255, 0.3);
            border-left-color: rgba(255, 255, 255, 0.3);
          }
          50% {
            border-right-color: #ffffff;
            border-top-color: rgba(255, 255, 255, 0.3);
            border-bottom-color: rgba(255, 255, 255, 0.3);
            border-left-color: rgba(255, 255, 255, 0.3);
          }
          75% {
            border-bottom-color: #ffffff;
            border-top-color: rgba(255, 255, 255, 0.3);
            border-right-color: rgba(255, 255, 255, 0.3);
            border-left-color: rgba(255, 255, 255, 0.3);
          }
          100% {
            border-left-color: #ffffff;
            border-top-color: rgba(255, 255, 255, 0.3);
            border-right-color: rgba(255, 255, 255, 0.3);
            border-bottom-color: rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
      <div style={barStyle}>
        <span style={textStyle}>iTVT</span>
      </div>
    </div>
  );
};

export default LoadingBar;
