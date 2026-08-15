import React from 'react';
import Button from '../ui/Button';
import { Award, ArrowRight } from 'lucide-react';

export default function ATSSection({ onStart }) {
  return (
    <section id="ats-score" style={styles.section}>
      <div style={styles.inner}>
        <div>
          <h2 style={styles.title}><Award size={18} color="#7C3AED" /> ATS Score Analyzer</h2>
          <p style={styles.lead}>
            Analyze your resume content for ATS keyword relevance, structure, and recruiter-friendly phrasing. Get instant recommendations to improve your match rate.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            onClick={() => {
              try {
                sessionStorage.setItem('profolio_auto_analyze', 'resume');
              } catch (e) {}
              onStart && onStart('ats');
            }}
          >
            Try Analyzer
          </Button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '44px 24px',
    background: '#FFFFFF',
    borderTop: '1px solid #F3F4F6',
    borderBottom: '1px solid #F3F4F6',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#171717',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  lead: {
    marginTop: '6px',
    color: '#4B5563',
    fontSize: '0.95rem',
    maxWidth: '720px',
  },
};
