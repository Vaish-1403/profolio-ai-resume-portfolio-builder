import React from 'react';

export default function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  error = '',
  icon: Icon,
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

      <div style={styles.inputWrap}>
        {Icon && <Icon size={18} color="#9CA3AF" style={styles.inputIcon} />}
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            ...styles.input,
            paddingLeft: Icon ? '40px' : '14px',
            borderColor: error ? '#EF4444' : '#E5E7EB',
          }}
          {...props}
        />
      </div>

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
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    fontSize: '0.95rem',
    color: '#171717',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
  },
  errorText: {
    fontSize: '0.78rem',
    color: '#EF4444',
    fontWeight: '500',
  },
};
