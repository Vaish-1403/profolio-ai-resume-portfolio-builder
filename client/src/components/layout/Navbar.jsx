import React, { useEffect, useState } from 'react';
import { Sparkles, FileText, ArrowRight, Server, Wifi, WifiOff } from 'lucide-react';
import { checkBackendHealth } from '../../services/api';
import Button from '../ui/Button';

export default function Navbar({ onNavigate }) {
  const [healthStatus, setHealthStatus] = useState({ loading: true, online: false, data: null });

  useEffect(() => {
    async function verifyBackend() {
      const result = await checkBackendHealth();
      if (result.success) {
        setHealthStatus({ loading: false, online: true, data: result.data });
      } else {
        setHealthStatus({ loading: false, online: false, data: null });
      }
    }
    verifyBackend();
  }, []);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div
          style={{ ...styles.logoGroup, cursor: 'pointer' }}
          onClick={() => onNavigate && onNavigate('landing')}
        >
          <div style={styles.logoIcon}>
            <Sparkles size={20} color="#FFFFFF" />
          </div>
          <span style={styles.brandTitle}>
            ProFolio <span style={styles.aiTag}>AI</span>
          </span>
          
          {/* Live Backend Connection Indicator */}
          <div style={styles.healthBadge}>
            {healthStatus.loading ? (
              <span style={styles.statusLoading}>
                <Server size={12} style={{ animation: 'spin 1.5s linear infinite' }} /> Connecting...
              </span>
            ) : healthStatus.online ? (
              <span style={styles.statusOnline} title={`Connected to ${healthStatus.data?.app}`}>
                <Wifi size={12} color="#059669" /> API Online (v{healthStatus.data?.version})
              </span>
            ) : (
              <span style={styles.statusOffline}>
                <WifiOff size={12} color="#DC2626" /> API Offline
              </span>
            )}
          </div>
        </div>

        <div style={styles.navLinks}>
          <a
            href="#features"
            style={styles.link}
            onClick={(e) => {
              e.preventDefault();
              try { sessionStorage.setItem('profolio_scroll_target', 'features'); sessionStorage.setItem('profolio_scroll_trigger', String(Date.now())); } catch (e) {}
              if (onNavigate) onNavigate('landing');
              // If already on landing, attempt immediate scroll
              setTimeout(() => {
                try {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } catch (err) {}
              }, 120);
            }}
          >
            Features
          </a>

          <a
            href="#templates"
            style={styles.link}
            onClick={(e) => {
              e.preventDefault();
              try { sessionStorage.setItem('profolio_scroll_target', 'templates'); sessionStorage.setItem('profolio_scroll_trigger', String(Date.now())); } catch (e) {}
              if (onNavigate) onNavigate('landing');
              setTimeout(() => {
                try {
                  const el = document.getElementById('templates');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } catch (err) {}
              }, 120);
            }}
          >
            Templates
          </a>

          <a
            href="#ats-score"
            style={styles.link}
            onClick={(e) => {
              e.preventDefault();
              try { sessionStorage.setItem('profolio_scroll_target', 'ats-score'); sessionStorage.setItem('profolio_scroll_trigger', String(Date.now())); } catch (e) {}
              if (onNavigate) onNavigate('landing');
              setTimeout(() => {
                try {
                  const el = document.getElementById('ats-score');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } catch (err) {}
              }, 120);
            }}
          >
            ATS Analyzer
          </a>
        </div>

        <div style={styles.actionGroup}>
          <Button 
            variant="secondary" 
            size="sm" 
            icon={FileText}
            onClick={() => onNavigate && onNavigate('builder')}
          >
            Build Resume
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate && onNavigate('builder')}
          >
            Create Profile
          </Button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(247, 248, 252, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.6)',
    padding: '16px 24px',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
  },
  brandTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#171717',
    letterSpacing: '-0.02em',
  },
  aiTag: {
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  healthBadge: {
    marginLeft: '8px',
  },
  statusOnline: {
    fontSize: '0.72rem',
    fontWeight: '600',
    color: '#059669',
    background: '#D1FAE5',
    padding: '3px 8px',
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    border: '1px solid #A7F3D0',
  },
  statusOffline: {
    fontSize: '0.72rem',
    fontWeight: '600',
    color: '#DC2626',
    background: '#FEE2E2',
    padding: '3px 8px',
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    border: '1px solid #FCA5A5',
  },
  statusLoading: {
    fontSize: '0.72rem',
    fontWeight: '600',
    color: '#4F46E5',
    background: '#EDE9FE',
    padding: '3px 8px',
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
  },
  link: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#4B5563',
    transition: 'color 0.2s ease',
  },
  actionGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
};
