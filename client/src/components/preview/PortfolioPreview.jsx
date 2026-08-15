import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  Trophy, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  ExternalLink,
  Send,
  UserCheck
} from 'lucide-react';

export default function PortfolioPreview({ profile, aiData }) {
  const { personalInfo, contactInfo, education, skills, projects, experience, certifications, achievements } = profile;

  // AI-generated portfolio copy with fallbacks
  const heroHeadline = aiData?.heroHeadline || `Hi, I'm ${personalInfo?.fullName || 'Alex Rivera'}`;
  const heroTagline = aiData?.heroTagline || personalInfo?.title || 'Senior Full-Stack Engineer & UI/UX Designer';
  const portfolioBio = aiData?.portfolioBio || personalInfo?.bio || 'Building high-performance software applications with clean architecture and beautiful design.';
  const featuredProjects = aiData?.featuredProjects || projects;

  return (
    <div style={styles.portfolioWrap} className="portfolio-printable-doc">
      {/* 1. PORTFOLIO HERO SECTION */}
      <div style={styles.heroBanner} className="glass-card">
        <div style={styles.heroContent}>
          <div style={styles.avatarWrap}>
            <img 
              src={personalInfo?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
              alt={personalInfo?.fullName} 
              style={styles.avatarImg}
            />
            <span style={styles.onlineStatusDot} />
          </div>

          <div style={styles.heroTextCol}>
            <div style={styles.badgeTag}>
              <Sparkles size={13} color="#7C3AED" />
              <span>Available for Hire & Projects</span>
            </div>
            <h1 style={styles.heroTitle}>{heroHeadline}</h1>
            <h2 style={styles.heroSubtitle}>{heroTagline}</h2>

            <div style={styles.heroBtnGroup}>
              <Button 
                variant="primary" 
                size="sm" 
                icon={Mail} 
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
              {contactInfo?.github && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={Github}
                  onClick={() => window.open(contactInfo.github, '_blank')}
                >
                  GitHub
                </Button>
              )}
              {contactInfo?.linkedin && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  icon={Linkedin}
                  onClick={() => window.open(contactInfo.linkedin, '_blank')}
                >
                  LinkedIn
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. ABOUT ME SECTION */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <UserCheck size={18} color="#4F46E5" />
          <h3 style={styles.sectionTitle}>About Me</h3>
        </div>
        <Card variant="solid" padding="24px">
          <p style={styles.bioText}>{portfolioBio}</p>

          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{experience?.length || 1}+</span>
              <span style={styles.statLabel}>Years Experience</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{projects?.length || 1}+</span>
              <span style={styles.statLabel}>Projects Built</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>{certifications?.length || 1}</span>
              <span style={styles.statLabel}>Certifications</span>
            </div>
          </div>
        </Card>
      </section>

      {/* 3. SKILLS SHOWCASE */}
      {skills && skills.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <Code size={18} color="#7C3AED" />
            <h3 style={styles.sectionTitle}>Skills & Expertise</h3>
          </div>
          <div style={styles.skillsGrid}>
            {skills.map((skill, idx) => (
              <Card key={skill.id || idx} variant="glass" padding="16px" style={styles.skillCard}>
                <div style={styles.skillCardHeader}>
                  <strong style={styles.skillName}>
  {typeof skill === 'object' ? (skill?.name || 'Unnamed Skill') : String(skill)}
</strong>
                  <span style={styles.skillLevel}>{skill.level || 85}%</span>
                </div>
                <div style={styles.skillBarBg}>
                  <div style={{ ...styles.skillBarFill, width: `${skill.level || 85}%` }} />
                </div>
                <span style={styles.categoryBadge}>{skill.category || 'Technical'}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 4. FEATURED PROJECTS GRID */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <FolderGit2 size={18} color="#4F46E5" />
            <h3 style={styles.sectionTitle}>Featured Projects</h3>
          </div>
          <div style={styles.projectsGrid}>
            {featuredProjects.map((proj, idx) => (
              <Card key={proj.id || idx} variant="solid" padding="24px" style={styles.projectCard}>
                <div style={styles.projHeader}>
                  <h4 style={styles.projTitle}>{proj.title}</h4>
                  <div style={styles.projLinks}>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={styles.iconLink}>
                        <Github size={16} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={styles.iconLink}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <p style={styles.projDesc}>{proj.summary || proj.description}</p>

                {proj.techPills && Array.isArray(proj.techPills) ? (
                  <div style={styles.pillsRow}>
                    {proj.techPills.map((tech, tIdx) => (
                      <span key={tIdx} style={styles.techPill}>{tech}</span>
                    ))}
                  </div>
                ) : proj.techStack ? (
                  <div style={styles.pillsRow}>
                    {proj.techStack.split(',').map((tech, tIdx) => (
                      <span key={tIdx} style={styles.techPill}>{tech.trim()}</span>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 5. EXPERIENCE TIMELINE */}
      {experience && experience.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <Briefcase size={18} color="#4F46E5" />
            <h3 style={styles.sectionTitle}>Work Experience</h3>
          </div>
          <div style={styles.timelineList}>
            {experience.map((exp, idx) => (
              <Card key={exp.id || idx} variant="glass" padding="20px" style={styles.timelineCard}>
                <div style={styles.timelineHeader}>
                  <div>
                    <h4 style={styles.expTitle}>{exp.title}</h4>
                    <span style={styles.expCompany}>{exp.company} {exp.location ? `• ${exp.location}` : ''}</span>
                  </div>
                  <span style={styles.dateBadge}>
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={styles.expDesc}>{exp.description}</p>}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 6. EDUCATION & CERTIFICATIONS GRID */}
      {((education && education.length > 0) || (certifications && certifications.length > 0)) && (
        <section style={styles.section}>
          <div style={styles.twoColGrid}>
            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <div style={styles.sectionHeader}>
                  <GraduationCap size={18} color="#7C3AED" />
                  <h3 style={styles.sectionTitle}>Education</h3>
                </div>
                {education.map((edu, idx) => (
                  <Card key={edu.id || idx} variant="solid" padding="18px" style={{ marginBottom: '12px' }}>
                    <h4 style={styles.eduDegree}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</h4>
                    <div style={styles.eduInst}>{edu.institution} ({edu.gradYear})</div>
                    {edu.gpa && <span style={styles.gpaBadge}>GPA: {edu.gpa}</span>}
                  </Card>
                ))}
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div>
                <div style={styles.sectionHeader}>
                  <Award size={18} color="#7C3AED" />
                  <h3 style={styles.sectionTitle}>Certifications</h3>
                </div>
                {certifications.map((cert, idx) => (
                  <Card key={cert.id || idx} variant="solid" padding="18px" style={{ marginBottom: '12px' }}>
                    <h4 style={styles.eduDegree}>{cert.name}</h4>
                    <div style={styles.eduInst}>{cert.issuer} ({cert.issueDate})</div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. CONTACT SECTION */}
      <section id="contact-section" style={styles.section}>
        <div style={styles.sectionHeader}>
          <Mail size={18} color="#4F46E5" />
          <h3 style={styles.sectionTitle}>Get In Touch</h3>
        </div>
        <Card variant="gradient" padding="32px" style={styles.contactCard}>
          <div style={styles.contactContentGrid}>
            <div>
              <h4 style={styles.contactHeading}>Let's Connect & Work Together</h4>
              <p style={styles.contactSub}>
                Feel free to reach out for career opportunities, freelance work, or open-source collaboration.
              </p>

              <div style={styles.contactDetailsList}>
                {contactInfo?.email && (
                  <div style={styles.contactDetailItem}>
                    <Mail size={16} color="#4F46E5" />
                    <span>{contactInfo.email}</span>
                  </div>
                )}
                {contactInfo?.phone && (
                  <div style={styles.contactDetailItem}>
                    <Phone size={16} color="#4F46E5" />
                    <span>{contactInfo.phone}</span>
                  </div>
                )}
                {personalInfo?.location && (
                  <div style={styles.contactDetailItem}>
                    <MapPin size={16} color="#4F46E5" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Message Mockup Form */}
            <div style={styles.messageFormBox}>
              <input type="text" placeholder="Your Name" style={styles.inputField} />
              <input type="email" placeholder="Your Email Address" style={styles.inputField} />
              <textarea placeholder="Your Message..." rows={3} style={styles.textareaField} />
              <Button variant="primary" size="sm" icon={Send} iconPosition="right" style={{ width: '100%' }}>
                Send Direct Message
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

const styles = {
  portfolioWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxWidth: '960px',
    margin: '0 auto',
    width: '100%',
  },
  heroBanner: {
    padding: '36px',
    borderRadius: '24px',
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
  },
  avatarWrap: {
    position: 'relative',
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    border: '3px solid #4F46E5',
    overflow: 'hidden',
    flexShrink: 0,
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  onlineStatusDot: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: '#10B981',
    border: '2px solid #FFFFFF',
  },
  heroTextCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  badgeTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#7C3AED',
    background: '#EDE9FE',
    padding: '4px 10px',
    borderRadius: '12px',
    marginBottom: '10px',
  },
  heroTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#171717',
    marginBottom: '4px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: '16px',
  },
  heroBtnGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#171717',
  },
  bioText: {
    fontSize: '0.98rem',
    color: '#374151',
    lineHeight: '1.65',
    marginBottom: '20px',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    borderTop: '1px solid #F3F4F6',
    paddingTop: '16px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNum: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: '0.78rem',
    color: '#6B7280',
    fontWeight: '500',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  skillCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
  },
  skillName: {
    fontWeight: '700',
    color: '#171717',
  },
  skillLevel: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: '0.8rem',
  },
  skillBarBg: {
    height: '6px',
    background: '#E5E7EB',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    borderRadius: '4px',
  },
  categoryBadge: {
    fontSize: '0.68rem',
    color: '#6B7280',
    alignSelf: 'flex-start',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  projectCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  projHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  projTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#171717',
  },
  projLinks: {
    display: 'flex',
    gap: '8px',
  },
  iconLink: {
    color: '#6B7280',
    transition: 'color 0.2s ease',
  },
  projDesc: {
    fontSize: '0.88rem',
    color: '#4B5563',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  pillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  techPill: {
    fontSize: '0.72rem',
    padding: '3px 8px',
    borderRadius: '6px',
    background: '#EDE9FE',
    color: '#4F46E5',
    fontWeight: '600',
  },
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  timelineCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  timelineHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#171717',
  },
  expCompany: {
    fontSize: '0.85rem',
    color: '#6B7280',
  },
  dateBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#4F46E5',
    background: '#EEF2FF',
    padding: '3px 8px',
    borderRadius: '8px',
  },
  expDesc: {
    fontSize: '0.85rem',
    color: '#4B5563',
    lineHeight: '1.5',
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  eduDegree: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#171717',
  },
  eduInst: {
    fontSize: '0.82rem',
    color: '#6B7280',
    marginTop: '2px',
  },
  gpaBadge: {
    fontSize: '0.72rem',
    color: '#059669',
    fontWeight: '600',
    marginTop: '4px',
    display: 'inline-block',
  },
  contactCard: {
    borderRadius: '24px',
  },
  contactContentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  contactHeading: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#171717',
    marginBottom: '8px',
  },
  contactSub: {
    fontSize: '0.9rem',
    color: '#4B5563',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  contactDetailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  contactDetailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.88rem',
    color: '#374151',
    fontWeight: '500',
  },
  messageFormBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputField: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    fontSize: '0.88rem',
    outline: 'none',
  },
  textareaField: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #E5E7EB',
    background: '#FFFFFF',
    fontSize: '0.88rem',
    outline: 'none',
    fontFamily: 'inherit',
  },
};
