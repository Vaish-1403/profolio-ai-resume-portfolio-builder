import React from 'react';
import { Sparkles, FileText, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import FloatingCards from './FloatingCards';

export default function HeroSection({ onStart }) {
  return (
    <section style={styles.heroSection}>
      <div style={styles.container} className="hero-grid">
        {/* Left Column: Headlines & Call to Actions */}
        <div style={styles.contentCol}>
          <div style={styles.badgeWrap}>
            <Sparkles size={14} color="#7C3AED" />
            <span style={styles.badgeText}>Where Your Resume Meets Your Portfolio</span>
          </div>

          <h1 style={styles.headline} className="hero-headline">
            Build a Profile That <span className="gradient-text">Gets Noticed.</span>
          </h1>

          <p style={styles.subtext} className="hero-subtext">
            ProFolio AI transforms your raw experience, skills, and projects into ATS-ready resumes and sleek interactive 3D web portfolios in minutes—powered by Google Gemini AI.
          </p>

          <div style={styles.ctaGroup}>
            <Button 
              variant="primary" 
              size="lg" 
              icon={FileText} 
              iconPosition="left"
              onClick={() => onStart && onStart('builder')}
            >
              Build My Resume
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              icon={UserCheck} 
              iconPosition="left"
              onClick={() => onStart && onStart('builder')}
            >
              Create My Profile
            </Button>
          </div>

          <div style={styles.featurePills}>
            <div style={styles.featurePillItem}>
              <CheckCircle size={15} color="#10B981" />
              <span>Zero-Hallucination AI</span>
            </div>
            <div style={styles.featurePillItem}>
              <CheckCircle size={15} color="#10B981" />
              <span>90%+ ATS Score Optimization</span>
            </div>
            <div style={styles.featurePillItem}>
              <CheckCircle size={15} color="#10B981" />
              <span>Print PDF & Live 3D Web Link</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Floating Interactive Composition */}
        <div style={styles.visualCol}>
          <FloatingCards />
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    padding: '80px 24px 100px 24px',
    overflow: 'hidden',
    position: 'relative',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    alignItems: 'center',
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  badgeWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    borderRadius: '20px',
    background: 'rgba(124, 58, 237, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    marginBottom: '24px',
  },
  badgeText: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#7C3AED',
  },
  headline: {
    fontSize: '3.6rem',
    fontWeight: '800',
    lineHeight: '1.15',
    marginBottom: '20px',
    color: '#171717',
  },
  subtext: {
    fontSize: '1.15rem',
    color: '#4B5563',
    lineHeight: '1.65',
    marginBottom: '36px',
    maxWidth: '560px',
  },
  ctaGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '36px',
  },
  featurePills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '18px',
  },
  featurePillItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.88rem',
    color: '#374151',
    fontWeight: '500',
  },
  visualCol: {
    display: 'flex',
    justifyContent: 'center',
  },
};
