import React from 'react';

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = '',
  style = {},
  className = '',
  searchable = false,
  ...props
}) {
  // normalize options for datalist when searchable
  const flatOptions = [];
  options.forEach((opt) => {
    if (opt.options && Array.isArray(opt.options)) {
      opt.options.forEach((o) => flatOptions.push(o));
    } else {
      flatOptions.push(opt);
    }
  });

  const datalistId = `${name || 'select'}-datalist`;

  const handleInputChange = (e) => {
    // keep signature similar to native select
    if (onChange) onChange({ target: { name, value: e.target.value } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }} className={className}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={styles.requiredStar}>*</span>}
        </label>
      )}

      {searchable ? (
        <>
          <input
            list={datalistId}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            style={{
              ...styles.select,
              borderColor: error ? '#EF4444' : '#E5E7EB',
            }}
            {...props}
          />
          <datalist id={datalistId}>
            {flatOptions.map((opt) => (
              <option key={opt.value} value={opt.label} />
            ))}
          </datalist>
        </>
      ) : (
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          style={{
            ...styles.select,
            borderColor: error ? '#EF4444' : '#E5E7EB',
          }}
          {...props}
        >
          {options.map((opt) => {
            if (opt.options && Array.isArray(opt.options)) {
              return (
                <optgroup key={opt.label} label={opt.label}>
                  {opt.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </optgroup>
              );
            }
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      )}

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
  select: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    fontSize: '0.95rem',
    color: '#171717',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
  },
  errorText: {
    fontSize: '0.78rem',
    color: '#EF4444',
    fontWeight: '500',
  },
};
