import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import { 
  Sparkles, 
  BarChart2, 
  Globe, 
  Target, 
  Download, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      color: '#4F46E5',
      bg: '#EDE9FE',
      title: 'Factual Zero-Hallucination AI',
      description: 'Your career data is respected. Gemini AI enhances grammar, action verbs, and structure without inventing false companies or experience.',
    },
    {
      icon: BarChart2,
      color: '#7C3AED',
      bg: '#F3E8FF',
      title: 'ATS Keyword Scoring',
      description: 'Instant analysis against target job descriptions to ensure your resume scores 90%+ on applicant tracking systems.',
    },
    {
      icon: Globe,
      color: '#059669',
      bg: '#D1FAE5',
      title: 'Interactive 3D Portfolio',
      description: 'Turn your static resume into a modern web portfolio with dynamic project cards, interactive skills, and social badges.',
    },
    {
      icon: Target,
      color: '#D97706',
      bg: '#FEF3C7',
      title: 'Target Role Alignment',
      description: 'Tailor bullet points specifically to match developer, designer, manager, or data science position requirements.',
    },
    {
      icon: Download,
      color: '#2563EB',
      bg: '#DBEAFE',
      title: 'One-Click PDF Export',
      description: 'Clean, printable CSS styles formatted precisely for recruiter review and single-page ATS standards.',
    },
    {
      icon: Eye,
      color: '#EC4899',
      bg: '#FCE7F3',
      title: 'Instant Side-by-Side Preview',
      description: 'See every text edit and AI enhancement update in real-time with instant layout rendering.',
    },
  ];

  return (
    <section id="features" style={styles.section}>
      <div style={styles.container}>
        <SectionHeading 
          badge="Features"
          title="Everything You Need to"
          gradientText="Stand Out."
          subtitle="ProFolio AI blends advanced Google Gemini intelligence with state-of-the-art 3D web design to present your credentials at their absolute best."
        />

        <div style={styles.grid}>
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Card key={idx} variant="glass" padding="28px" hoverable={true}>
                <div style={{ ...styles.iconBox, background: item.bg }}>
                  <IconComp size={24} color={item.color} />
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '80px 24px',
    position: 'relative',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '28px',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#171717',
    marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '0.92rem',
    color: '#6B7280',
    lineHeight: '1.6',
  },
};
