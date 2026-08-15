import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionHeading({
  badge,
  title,
  gradientText,
  subtitle,
  align = 'center',
  style = {},
  className = '',
}) {
  const alignStyles = {
    center: { textAlign: 'center', alignItems: 'center' },
    left: { textAlign: 'left', alignItems: 'flex-start' },
    right: { textAlign: 'right', alignItems: 'flex-end' },
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '48px',
        ...alignStyles[align],
        ...style,
      }} 
      className={className}
    >
      {badge && (
        <div style={styles.badge}>
          <Sparkles size={12} color="#7C3AED" />
          <span>{badge}</span>
        </div>
      )}
      <h2 style={styles.title}>
        {title}{' '}
        {gradientText && <span className="gradient-text">{gradientText}</span>}
      </h2>
      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    background: 'rgba(124, 58, 237, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: '12px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#171717',
    lineHeight: '1.2',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#6B7280',
    maxWidth: '600px',
    lineHeight: '1.6',
  },
};
