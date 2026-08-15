import React from 'react';

export default function Card({ 
  children, 
  variant = 'glass', 
  padding = '24px', 
  className = '', 
  style = {},
  hoverable = true,
  ...props 
}) {
  const variantStyles = {
    glass: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.95)',
      boxShadow: '0 20px 35px -10px rgba(79, 70, 229, 0.1)',
    },
    solid: {
      background: '#FFFFFF',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
    },
    gradient: {
      background: 'linear-gradient(135deg, rgba(237, 233, 254, 0.7) 0%, rgba(219, 234, 254, 0.7) 100%)',
      border: '1px solid rgba(167, 139, 250, 0.35)',
      boxShadow: '0 12px 24px -6px rgba(124, 58, 237, 0.12)',
    },
  };

  const baseStyle = {
    borderRadius: '20px',
    padding: padding,
    transition: hoverable ? 'transform 0.3s ease, box-shadow 0.3s ease' : 'none',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <div style={baseStyle} className={className} {...props}>
      {children}
    </div>
  );
}
