import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  iconPosition = 'left',
  onClick, 
  className = '', 
  disabled = false,
  style = {},
  ...props 
}) {
  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '0.85rem', borderRadius: '10px' },
    md: { padding: '12px 24px', fontSize: '0.95rem', borderRadius: '12px' },
    lg: { padding: '15px 30px', fontSize: '1.05rem', borderRadius: '14px' },
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      color: '#FFFFFF',
      boxShadow: '0 8px 20px -4px rgba(79, 70, 229, 0.35)',
      border: 'none',
    },
    secondary: {
      background: 'rgba(79, 70, 229, 0.08)',
      color: '#4F46E5',
      border: '1px solid rgba(79, 70, 229, 0.18)',
    },
    outline: {
      background: '#FFFFFF',
      color: '#171717',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
    },
    ghost: {
      background: 'transparent',
      color: '#4B5563',
      border: 'none',
    },
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    userSelect: 'none',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button 
      style={baseStyle} 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} style={{ marginRight: '8px', flexShrink: 0 }} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} style={{ marginLeft: '8px', flexShrink: 0 }} />
      )}
    </button>
  );
}
