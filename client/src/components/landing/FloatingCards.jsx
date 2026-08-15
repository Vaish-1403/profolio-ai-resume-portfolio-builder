import React from 'react';
import FloatingCard from '../ui/FloatingCard';
import { 
  CheckCircle2, 
  Award, 
  Linkedin, 
  Github, 
  BarChart3, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Code,
  Star
} from 'lucide-react';

export default function FloatingCards() {
  return (
    <div style={styles.floatingContainer} className="floating-container">
      {/* Background Soft Ambient 3D Gradient Blobs */}
      <div style={styles.ambientBlob1} className="animate-pulse-glow" />
      <div style={styles.ambientBlob2} className="animate-pulse-glow" />

      {/* Decorative 3D Floating Pill Shape */}
      <div style={styles.decorativeShape1} className="animate-float-subtle floating-hide-mobile">
        <Sparkles size={12} color="#7C3AED" />
        <span>Gemini 1.5 Pro</span>
      </div>

      {/* Main Central Resume & Portfolio Preview Card */}
      <div style={styles.mainCentralCard}>
        {/* Profile Card Header */}
        <div style={styles.cardHeader}>
          <div style={styles.avatarWrap}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="Alex Rivera Profile" 
              style={styles.avatarImg}
            />
          </div>
          <div>
            <h3 style={styles.profileName}>Alex Rivera</h3>
            <p style={styles.profileTitle}>Senior Full-Stack Engineer & UI/UX Designer</p>
          </div>
          <span style={styles.liveBadge}>
            <Sparkles size={12} color="#4F46E5" /> AI Tailored
          </span>
        </div>

        {/* Profile Card Body */}
        <div style={styles.cardBody}>
          <div style={styles.previewSection}>
            <h4 style={styles.sectionHeading}>
              <Briefcase size={14} style={{ marginRight: '6px' }} /> Experience
            </h4>
            <div style={styles.experienceItem}>
              <div style={styles.itemMeta}>
                <strong>Lead Frontend Architect</strong>
                <span>2022 - Present</span>
              </div>
              <p style={styles.itemDesc}>
                Architected React & Node.js micro-frontends, accelerating page rendering speed by 42% and serving over 1.2M active monthly users.
              </p>
            </div>
          </div>

          <div style={styles.previewSection}>
            <h4 style={styles.sectionHeading}>
              <Code size={14} style={{ marginRight: '6px' }} /> Core Skills & Stack
            </h4>
            <div style={styles.pillsRow}>
              <span style={styles.pill}>React.js</span>
              <span style={styles.pill}>Node.js / Express</span>
              <span style={styles.pill}>TypeScript</span>
              <span style={styles.pill}>UI/UX Design</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Card 1: ATS Match Score Widget (Top Right) */}
      <FloatingCard 
        animation="float" 
        top="-20px" 
        right="-20px" 
        width="170px" 
        zIndex={25}
        className="floating-card-reposition-mobile"
      >
        <div style={styles.atsHeader}>
          <BarChart3 size={16} color="#4F46E5" />
          <span style={styles.atsTitle}>ATS Resume Score</span>
        </div>
        <div style={styles.scoreRow}>
          <span style={styles.scoreNumber}>94%</span>
          <span style={styles.scoreTag}>Top 5% Match</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{ ...styles.progressBarFill, width: '94%' }} />
        </div>
      </FloatingCard>

      {/* Floating Card 2: Profile Complete Badge (Bottom Left) */}
      <FloatingCard 
        animation="float-reverse" 
        bottom="15px" 
        left="-30px" 
        width="190px" 
        zIndex={25}
        className="floating-card-reposition-mobile"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={styles.iconCircleSuccess}>
            <CheckCircle2 size={18} color="#10B981" />
          </div>
          <div>
            <div style={styles.widgetBold}>Profile 100% Complete</div>
            <div style={styles.widgetSub}>Portfolio ready to share</div>
          </div>
        </div>
      </FloatingCard>

      {/* Floating Card 3: Skills Card with Progress Indicators (Bottom Right) */}
      <FloatingCard 
        animation="float" 
        bottom="-15px" 
        right="5px" 
        width="185px" 
        zIndex={25}
        className="floating-hide-mobile"
      >
        <div style={styles.widgetHeader}>
          <Code size={15} color="#7C3AED" />
          <span style={styles.widgetTitle}>Skills Breakdown</span>
        </div>
        <div style={styles.skillBarItem}>
          <div style={styles.skillLabelRow}>
            <span>React & UI</span>
            <strong>95%</strong>
          </div>
          <div style={styles.skillBarBg}>
            <div style={{ ...styles.skillBarFill, width: '95%', background: '#4F46E5' }} />
          </div>
        </div>
        <div style={styles.skillBarItem}>
          <div style={styles.skillLabelRow}>
            <span>Node / Express</span>
            <strong>88%</strong>
          </div>
          <div style={styles.skillBarBg}>
            <div style={{ ...styles.skillBarFill, width: '88%', background: '#7C3AED' }} />
          </div>
        </div>
      </FloatingCard>

      {/* Floating Card 4: Education Card (Slightly Layered Behind Top Left) */}
      <FloatingCard 
        animation="float-subtle" 
        top="-35px" 
        left="-25px" 
        width="200px" 
        zIndex={12}
        className="floating-hide-mobile"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={styles.eduIconBg}>
            <GraduationCap size={18} color="#4F46E5" />
          </div>
          <div>
            <div style={styles.widgetBold}>Stanford University</div>
            <div style={styles.widgetSub}>B.S. Computer Science</div>
          </div>
        </div>
      </FloatingCard>

      {/* Floating Card 5: Certifications Card (Middle Left) */}
      <FloatingCard 
        animation="float-reverse" 
        top="140px" 
        left="-45px" 
        width="190px" 
        zIndex={22}
        className="floating-hide-mobile"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={styles.certIconBg}>
            <Award size={18} color="#7C3AED" />
          </div>
          <div>
            <div style={styles.widgetBold}>AWS Architect</div>
            <div style={styles.widgetSub}>Verified Certification</div>
          </div>
        </div>
      </FloatingCard>

      {/* Floating Card 6: LinkedIn Icon Badge */}
      <FloatingCard 
        animation="float" 
        top="210px" 
        right="-35px" 
        zIndex={20}
        className="floating-hide-mobile"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Linkedin size={18} color="#0A66C2" />
          <span style={styles.socialText}>in/alexrivera</span>
        </div>
      </FloatingCard>

      {/* Floating Card 7: GitHub Icon Badge */}
      <FloatingCard 
        animation="float-reverse" 
        top="280px" 
        right="-25px" 
        zIndex={20}
        className="floating-hide-mobile"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Github size={18} color="#171717" />
          <span style={styles.socialText}>github/alexr</span>
        </div>
      </FloatingCard>
    </div>
  );
}

const styles = {
  floatingContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '560px',
    height: '520px',
    margin: '0 auto',
    perspective: '1200px',
    pointerEvents: 'none',
  },
  mainCentralCardWrap: {
    pointerEvents: 'auto',
  },
  ambientBlob1: {
    position: 'absolute',
    top: '-40px',
    right: '-30px',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.35) 0%, rgba(79, 70, 229, 0.08) 70%, transparent 100%)',
    filter: 'blur(40px)',
    zIndex: 1,
  },
  ambientBlob2: {
    position: 'absolute',
    bottom: '-20px',
    left: '-40px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(219, 234, 254, 0.6) 0%, rgba(124, 58, 237, 0.1) 70%, transparent 100%)',
    filter: 'blur(35px)',
    zIndex: 1,
  },
  decorativeShape1: {
    position: 'absolute',
    top: '30px',
    right: '-50px',
    background: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',
    border: '1px solid rgba(167, 139, 250, 0.4)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#7C3AED',
    zIndex: 5,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 8px 16px rgba(124, 58, 237, 0.12)',
  },
  mainCentralCard: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.88)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.95)',
    boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
    padding: '24px',
    transform: 'rotateY(-5deg) rotateX(3deg)',
    transition: 'transform 0.5s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(229, 231, 235, 0.6)',
  },
  avatarWrap: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #4F46E5',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#171717',
  },
  profileTitle: {
    fontSize: '0.78rem',
    color: '#6B7280',
  },
  liveBadge: {
    marginLeft: 'auto',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#4F46E5',
    background: '#EDE9FE',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  cardBody: {
    paddingTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  previewSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionHeading: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4B5563',
    display: 'flex',
    alignItems: 'center',
  },
  experienceItem: {
    background: '#F7F8FC',
    borderRadius: '12px',
    padding: '12px',
    border: '1px solid #E5E7EB',
  },
  itemMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    marginBottom: '4px',
    color: '#171717',
  },
  itemDesc: {
    fontSize: '0.75rem',
    color: '#6B7280',
    lineHeight: '1.4',
  },
  pillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  pill: {
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: '8px',
    background: '#EDE9FE',
    color: '#4F46E5',
    fontWeight: '500',
  },
  atsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '6px',
  },
  atsTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#374151',
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  scoreNumber: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#4F46E5',
  },
  scoreTag: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#059669',
    background: '#D1FAE5',
    padding: '2px 6px',
    borderRadius: '6px',
  },
  progressBarBg: {
    height: '6px',
    background: '#E5E7EB',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    borderRadius: '4px',
  },
  iconCircleSuccess: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#ECFDF5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetBold: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#171717',
  },
  widgetSub: {
    fontSize: '0.68rem',
    color: '#6B7280',
  },
  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  },
  widgetTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#374151',
  },
  skillBarItem: {
    fontSize: '0.68rem',
    color: '#4B5563',
    marginBottom: '6px',
  },
  skillLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.68rem',
    marginBottom: '2px',
  },
  skillBarBg: {
    height: '4px',
    background: '#E5E7EB',
    borderRadius: '4px',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: '4px',
  },
  eduIconBg: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#EEF2FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certIconBg: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#F3E8FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#374151',
  },
};
