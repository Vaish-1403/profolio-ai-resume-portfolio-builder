import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, Layout, Sparkles, Check } from 'lucide-react';

export default function TemplatesSection({ onSelectTemplate }) {
  const [activeTab, setActiveTab] = useState('all');

  const templates = [
    {
      id: 'modern-saas',
      title: 'Modern Tech & SaaS',
      tag: 'Most Popular',
      category: 'tech',
      description: 'Clean single-column resume paired with a glassmorphism 3D interactive web portfolio layout.',
      previewBg: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    },
    {
      id: 'minimal-exec',
      title: 'Minimalist Executive',
      tag: 'ATS Optimized',
      category: 'business',
      description: 'High-density layout designed specifically for senior engineering leads and enterprise recruiters.',
      previewBg: 'linear-gradient(135deg, #171717 0%, #374151 100%)',
    },
    {
      id: 'creative-dev',
      title: 'Creative 3D Portfolio',
      tag: 'Interactive',
      category: 'creative',
      description: 'Dynamic project showcase with floating tech stack pills, progress bars, and social links.',
      previewBg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    },
  ];

  return (
    <section id="templates" style={styles.section}>
      <div style={styles.container}>
        <SectionHeading 
          badge="Templates"
          title="Professional Resume & Portfolio"
          gradientText="Layouts."
          subtitle="Choose from recruiter-approved designs that seamlessly transition from printable PDFs into live interactive web showcases."
        />

        <div style={styles.grid}>
          {templates.map((tpl) => (
            <Card key={tpl.id} variant="solid" padding="0px" style={{ overflow: 'hidden' }}>
              <div style={{ ...styles.templateHeader, background: tpl.previewBg }}>
                <div style={styles.templateBadge}>
                  <Sparkles size={12} color="#4F46E5" /> {tpl.tag}
                </div>
                <div style={styles.miniMockup}>
                  <div style={styles.miniHeaderLine} />
                  <div style={styles.miniBodyLine} />
                  <div style={styles.miniBodyLine} style={{ width: '70%' }} />
                </div>
              </div>

              <div style={styles.templateContent}>
                <h3 style={styles.templateTitle}>{tpl.title}</h3>
                <p style={styles.templateDesc}>{tpl.description}</p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  icon={ArrowRight} 
                  iconPosition="right"
                  onClick={() => onSelectTemplate && onSelectTemplate(tpl.id)}
                  style={{ width: '100%' }}
                >
                  Use Template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '80px 24px',
    background: '#FFFFFF',
    borderTop: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  templateHeader: {
    height: '180px',
    padding: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  templateBadge: {
    alignSelf: 'flex-start',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#4F46E5',
    background: '#FFFFFF',
    padding: '4px 10px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  miniMockup: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '10px',
    padding: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
  miniHeaderLine: {
    height: '10px',
    width: '40%',
    background: '#4F46E5',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  miniBodyLine: {
    height: '6px',
    width: '90%',
    background: '#E5E7EB',
    borderRadius: '3px',
    marginBottom: '4px',
  },
  templateContent: {
    padding: '24px',
  },
  templateTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#171717',
    marginBottom: '8px',
  },
  templateDesc: {
    fontSize: '0.9rem',
    color: '#6B7280',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
};
