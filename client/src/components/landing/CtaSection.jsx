import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, Sparkles, FileText } from 'lucide-react';

export default function CtaSection({ onStart }) {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Card variant="gradient" padding="60px 40px" style={styles.card}>
          <div style={styles.content}>
            <div style={styles.badge}>
              <Sparkles size={14} color="#7C3AED" />
              <span>Get Started in 5 Minutes</span>
            </div>
            <h2 style={styles.heading}>
              Ready to Build Your AI-Powered <br />
              <span className="gradient-text">Resume & 3D Portfolio?</span>
            </h2>
            <p style={styles.subtext}>
              Transform your raw experience into recruiter-ready bullet points, ATS-scored resumes, and interactive portfolio websites.
            </p>
            <div style={styles.btnGroup}>
              <Button 
                variant="primary" 
                size="lg" 
                icon={FileText}
                onClick={() => onStart && onStart('builder')}
              >
                Build My Resume Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onStart && onStart('builder')}
              >
                Create Interactive Portfolio
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '80px 24px 40px 24px',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  card: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '32px',
  },
  content: {
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 16px',
    borderRadius: '20px',
    background: '#FFFFFF',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: '#171717',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  subtext: {
    fontSize: '1.1rem',
    color: '#4B5563',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  btnGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
  },
};
