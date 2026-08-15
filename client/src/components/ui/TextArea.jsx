import React from 'react';

export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  required = false,
  error = '',
  style = {},
  className = '',
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }} className={className}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={styles.requiredStar}>*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        style={{
          ...styles.textarea,
          borderColor: error ? '#EF4444' : '#E5E7EB',
        }}
        {...props}
      />

      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
}

const styles = {
  label: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#374151',
  },
  requiredStar: {
    color: '#EF4444',
    marginLeft: '2px',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    fontSize: '0.95rem',
    color: '#171717',
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: '1.5',
    resize: 'vertical',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
  },
  errorText: {
    fontSize: '0.78rem',
    color: '#EF4444',
    fontWeight: '500',
  },
};
