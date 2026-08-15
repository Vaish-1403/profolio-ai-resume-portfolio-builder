import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // still log for diagnostics
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      const err = this.state.error || {};
      const message = String(err.message || err || 'Unknown error');
      const stack = String(err.stack || 'No stack available');
      return (
        <div style={{ padding: 24, maxWidth: 900, margin: '24px auto', background: '#FFF1F2', border: '1px solid #FCA5A5', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0, color: '#991B1B' }}>Something went wrong rendering this page.</h3>
          <div style={{ marginTop: 8, color: '#6B7280', whiteSpace: 'pre-wrap' }}>{message}</div>
          <pre style={{ marginTop: 12, background: '#FFF', padding: 12, borderRadius: 6, overflow: 'auto', maxHeight: 260 }}>{stack}</pre>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={() => window.location.reload()} style={{ padding: '8px 12px', borderRadius: 6, border: 0, background: '#4F46E5', color: '#fff' }}>Reload App</button>
            <button onClick={() => { navigator.clipboard?.writeText(message + '\n\n' + stack); }} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff' }}>Copy details</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
