import React from 'react';
import { Sparkles, Heart, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <div style={styles.logoGroup}>
              <div style={styles.logoIcon}>
                <Sparkles size={18} color="#FFFFFF" />
              </div>
              <span style={styles.brandTitle}>
                ProFolio <span style={styles.aiTag}>AI</span>
              </span>
            </div>
            <p style={styles.brandDesc}>
              Where Your Resume Meets Your Portfolio, Powered by AI. Build ATS-ready resumes and sleek interactive 3D portfolios.
            </p>
          </div>

          {/* Navigation Links */}
          <div style={styles.linksCol}>
            <h4 style={styles.linkHeader}>Product</h4>
            <a
              href="#features"
              style={styles.footerLink}
              onClick={(e) => {
                e.preventDefault();
                try { sessionStorage.setItem('profolio_scroll_target', 'features'); sessionStorage.setItem('profolio_scroll_trigger', String(Date.now())); } catch (e) {}
                if (onNavigate) onNavigate('landing');
              }}
            >AI Resume Builder</a>

            <a
              href="#templates"
              style={styles.footerLink}
              onClick={(e) => {
                e.preventDefault();
                try { sessionStorage.setItem('profolio_scroll_target', 'templates'); sessionStorage.setItem('profolio_scroll_trigger', String(Date.now())); } catch (e) {}
                if (onNavigate) onNavigate('landing');
              }}
            >3D Portfolio Showcase</a>

            <a
              href="#ats-score"
              style={styles.footerLink}
              onClick={(e) => {
                e.preventDefault();
                try { sessionStorage.setItem('profolio_scroll_target', 'ats-score'); sessionStorage.setItem('profolio_scroll_trigger', String(Date.now())); } catch (e) {}
                if (onNavigate) onNavigate('landing');
              }}
            >ATS Score Analyzer</a>
            <button onClick={() => onNavigate && onNavigate('builder')} style={styles.buttonLink}>Start Builder</button>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.linkHeader}>Resources</h4>
            <a href="#faq" style={styles.footerLink}>Documentation</a>
            <a href="#privacy" style={styles.footerLink}>Privacy Policy</a>
            <a href="#terms" style={styles.footerLink}>Terms of Service</a>
            <a href="#support" style={styles.footerLink}>College Project Demo</a>
          </div>

          {/* Social Links */}
          <div style={styles.linksCol}>
            <h4 style={styles.linkHeader}>Connect</h4>
            <div style={styles.socialRow}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div style={styles.bottomRow}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} ProFolio AI. Built with React & Express.
          </p>
          <p style={styles.crafted}>
            Designed with <Heart size={14} color="#EF4444" style={{ display: 'inline', margin: '0 4px' }} /> for College Demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#FFFFFF',
    borderTop: '1px solid #E5E7EB',
    padding: '60px 24px 30px 24px',
    marginTop: '80px',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  topRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid #F3F4F6',
  },
  brandCol: {
    maxWidth: '340px',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#171717',
  },
  aiTag: {
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  brandDesc: {
    fontSize: '0.9rem',
    color: '#6B7280',
    lineHeight: '1.6',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  linkHeader: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#171717',
    marginBottom: '6px',
  },
  footerLink: {
    fontSize: '0.88rem',
    color: '#6B7280',
    transition: 'color 0.2s ease',
  },
  buttonLink: {
    fontSize: '0.88rem',
    color: '#4F46E5',
    fontWeight: '600',
    textAlign: 'left',
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: '#F3F4F6',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease, color 0.2s ease',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
    fontSize: '0.85rem',
    color: '#9CA3AF',
  },
  copyright: {},
  crafted: {
    display: 'flex',
    alignItems: 'center',
  },
};
