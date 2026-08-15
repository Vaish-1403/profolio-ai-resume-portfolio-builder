import React from 'react';

export default function FloatingCard({ 
  children, 
  animation = 'float', 
  top, 
  bottom, 
  left, 
  right, 
  width,
  zIndex = 20,
  style = {},
  className = '',
  ...props 
}) {
  const animClass = animation === 'float' 
    ? 'animate-float' 
    : animation === 'float-reverse' 
    ? 'animate-float-reverse' 
    : '';

  const floatingStyle = {
    position: 'absolute',
    top: top !== undefined ? top : 'auto',
    bottom: bottom !== undefined ? bottom : 'auto',
    left: left !== undefined ? left : 'auto',
    right: right !== undefined ? right : 'auto',
    width: width || 'auto',
    zIndex: zIndex,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.85)',
    boxShadow: '0 15px 35px rgba(79, 70, 229, 0.14)',
    padding: '14px',
    ...style,
  };

  return (
    <div style={floatingStyle} className={`${animClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
