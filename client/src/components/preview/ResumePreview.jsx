import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  Trophy 
} from 'lucide-react';

export default function ResumePreview({ profile, aiData }) {
  const { personalInfo, contactInfo, education, skills, projects, experience, certifications, achievements, targetRole } = profile;

  // Use AI refined summary if available, else fall back to personalInfo.bio
  const summary = aiData?.profileSummary || personalInfo?.bio;

  // Use AI refined experience bullets if available
  const displayExperience = aiData?.experience || experience;

  // ATS data from AI
  const ats = aiData?.scoreBreakdown || null;
  const atsRecommendations = aiData?.atsRecommendations || [];
  const displaySkills = aiData?.skills?.length ? aiData.skills : skills;

  return (
    <div style={styles.resumeContainer} className="resume-printable-doc">
      <style>{`
        @page { size: A4 portrait; margin: 12mm; }
        @media print {
          /* Reset page defaults */
          html, body { height: auto; margin: 0 !important; padding: 0 !important; }

          /* Hide everything by default, then reveal the print-clone element (top-level) */
          body * { display: none !important; }
          .print-clone, .print-clone * { display: initial !important; visibility: visible !important; }

          /* Root printable clone styles - full A4 width and centered */
          .print-clone {
            box-sizing: border-box !important;
            display: block !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 210mm !important;
            max-width: 210mm !important;
            min-width: 0 !important;
            margin: 0 auto !important;
            padding: 12mm !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: inherit !important;
            transform: none !important;
            overflow: visible !important;
          }

          /* Remove helper UI that should not print */
          .no-print { display: none !important; }

          /* Avoid breaking important blocks across pages when possible */
          .print-clone section,
          .print-clone .itemBlock,
          .print-clone .itemHeader,
          .print-clone .listWrap {
            break-inside: avoid;
            page-break-inside: avoid;
            -webkit-column-break-inside: avoid;
          }

          /* Ensure images and floated elements don't overflow the page */
          .print-clone img,
          .print-clone .floating {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

      {/* Document Header */}
      <header style={styles.header}>
        <h1 style={styles.fullName}>{personalInfo?.fullName || 'Your Name'}</h1>
        <h2 style={styles.jobTitle}>{personalInfo?.title || 'Professional Title'}</h2>
        {ats && (
          <div className="no-print" style={styles.atsCard}>
            <div style={styles.atsScore}>{ats.overallScore || Math.round((ats.keywordRelevance || 0 + ats.skillsRelevance || 0) / 2)}</div>
            <div style={styles.atsLabel}>ATS Score</div>
            <div style={styles.atsSub}>Keyword: {ats.keywordRelevance ?? '—'}%</div>
          </div>
        )}

        {/* Contact Links Bar */}
        <div style={styles.contactBar}>
          {contactInfo?.email && (
            <span style={styles.contactItem}>
              <Mail size={12} /> {contactInfo.email}
            </span>
          )}
          {contactInfo?.phone && (
            <span style={styles.contactItem}>
              <Phone size={12} /> {contactInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span style={styles.contactItem}>
              <MapPin size={12} /> {personalInfo.location}
            </span>
          )}
          {contactInfo?.website && (
            <span style={styles.contactItem}>
              <Globe size={12} /> {contactInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
          {contactInfo?.linkedin && (
            <span style={styles.contactItem}>
              <Linkedin size={12} /> {contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
            </span>
          )}
          {contactInfo?.github && (
            <span style={styles.contactItem}>
              <Github size={12} /> {contactInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github/')}
            </span>
          )}
        </div>
      </header>

      <div style={styles.divider} />

      {/* Professional Summary */}
      {summary && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <Briefcase size={15} color="#4F46E5" /> Professional Summary
          </h3>
          <p style={styles.summaryText}>{summary}</p>
        </section>
      )}

      {/* ATS Recommendations */}
      {atsRecommendations && atsRecommendations.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <Award size={15} color="#4F46E5" /> ATS Recommendations
          </h3>
          <ul style={styles.recommendationList}>
            {atsRecommendations.map((rec, idx) => (
              <li key={idx} style={styles.bulletItem}>{rec}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Work Experience */}
      {displayExperience && displayExperience.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <Briefcase size={15} color="#4F46E5" /> Work Experience
          </h3>
          <div style={styles.listWrap}>
            {displayExperience.map((exp, idx) => (
              <div key={exp.id || idx} style={styles.itemBlock}>
                <div style={styles.itemHeader}>
                  <div>
                    <strong style={styles.itemTitle}>{exp.title}</strong>
                    <span style={styles.itemCompany}> — {exp.company}</span>
                  </div>
                  <span style={styles.itemDates}>
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && Array.isArray(exp.bullets) ? (
                  <ul style={styles.bulletList}>
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={styles.bulletItem}>{b}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p style={styles.itemDesc}>{exp.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {displaySkills && displaySkills.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <Code size={15} color="#4F46E5" /> Core Skills & Competencies
          </h3>
          <div style={styles.skillsRow}>
            {displaySkills.map((skill, idx) => (
              <span key={skill.id || idx} style={styles.skillPill}>
                {typeof skill === 'object' ? (skill.name || skill.category || JSON.stringify(skill)) : String(skill)}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <FolderGit2 size={15} color="#4F46E5" /> Key Projects
          </h3>
          <div style={styles.listWrap}>
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} style={styles.itemBlock}>
                <div style={styles.itemHeader}>
                  <strong style={styles.itemTitle}>{proj.title}</strong>
                  {proj.techStack && <span style={styles.techTag}>[{proj.techStack}]</span>}
                </div>
                {proj.description && <p style={styles.itemDesc}>{proj.description}</p>}
                {proj.highlights && <p style={styles.highlightDesc}>• {proj.highlights}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <GraduationCap size={15} color="#4F46E5" /> Education
          </h3>
          <div style={styles.listWrap}>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} style={styles.itemBlock}>
                <div style={styles.itemHeader}>
                  <div>
                    <strong style={styles.itemTitle}>{edu.degree} in {edu.fieldOfStudy || 'CS'}</strong>
                    <span style={styles.itemCompany}> — {edu.institution}</span>
                  </div>
                  <span style={styles.itemDates}>{edu.gradYear}</span>
                </div>
                {edu.gpa && <p style={styles.itemSubDesc}>GPA: {edu.gpa}</p>}
                {edu.description && <p style={styles.itemDesc}>{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
        <section style={styles.section}>
          <h3 style={styles.sectionHeader}>
            <Award size={15} color="#4F46E5" /> Certifications & Achievements
          </h3>
          <div style={styles.twoColGrid}>
            {certifications && certifications.map((cert, idx) => (
              <div key={cert.id || idx} style={styles.certItem}>
                <Award size={14} color="#7C3AED" />
                <div>
                  <strong>{cert.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{cert.issuer} ({cert.issueDate})</div>
                </div>
              </div>
            ))}

            {achievements && achievements.map((ach, idx) => (
              <div key={ach.id || idx} style={styles.certItem}>
                <Trophy size={14} color="#D97706" />
                <div>
                  <strong>{ach.title}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{ach.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Print helper: clone the resume preview to a top-level element before printing
// This isolates the printable document from parent layout/transforms that affect screen layout.
// It only runs in the browser environment.
if (typeof window !== 'undefined') {
  (function setupPrintClone() {
    let cloneNode = null;
    function beforePrint() {
      try {
        const original = document.querySelector('.resume-printable-doc');
        if (!original) return;
          cloneNode = original.cloneNode(true);
          cloneNode.classList.add('print-clone');
          // Remove any interactive-only helpers
          cloneNode.querySelectorAll('.no-print').forEach((n) => n.remove());
          // Remove style/script tags from the clone so CSS text doesn't render in print preview
          cloneNode.querySelectorAll('style, script').forEach((n) => n.remove());

          // Force the cloned node to use A4 width and remove inline max-width constraints
          try {
            cloneNode.style.width = '210mm';
            cloneNode.style.maxWidth = '210mm';
            cloneNode.style.minWidth = '0';
            cloneNode.style.margin = '0 auto';
            cloneNode.style.padding = '12mm';
            cloneNode.style.boxSizing = 'border-box';
            cloneNode.style.position = 'relative';
            cloneNode.style.left = 'auto';
            cloneNode.style.top = 'auto';
            cloneNode.style.transform = 'none';

            // Remove problematic inline styles from children that may cause overflow/offset
            cloneNode.querySelectorAll('[style]').forEach((el) => {
              try {
                el.style.maxWidth = '';
                el.style.minWidth = '';
                if (el.style.width && el.style.width.indexOf('100vw') !== -1) el.style.width = '';
                el.style.left = '';
                el.style.right = '';
                el.style.transform = '';
              } catch (e) {}
            });
          } catch (e) {}

          document.body.appendChild(cloneNode);
      } catch (e) {
        // ignore
      }
    }

    function afterPrint() {
      try {
        if (cloneNode && cloneNode.parentNode) cloneNode.parentNode.removeChild(cloneNode);
        cloneNode = null;
      } catch (e) {}
    }

    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
  })();
}

const styles = {
  resumeContainer: {
    background: '#FFFFFF',
    padding: '36px',
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    maxWidth: '800px',
    margin: '0 auto',
    color: '#171717',
    fontFamily: 'Inter, sans-serif',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  fullName: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#171717',
    letterSpacing: '-0.02em',
    marginBottom: '2px',
  },
  jobTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: '10px',
  },
  contactBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '14px',
    fontSize: '0.78rem',
    color: '#4B5563',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  divider: {
    height: '2px',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    margin: '16px 0 20px 0',
    borderRadius: '1px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionHeader: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#171717',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: '4px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  summaryText: {
    fontSize: '0.88rem',
    color: '#374151',
    lineHeight: '1.6',
  },
  listWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  itemBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
  },
  itemTitle: {
    fontWeight: '700',
    color: '#171717',
  },
  itemCompany: {
    color: '#4B5563',
    fontWeight: '500',
  },
  itemDates: {
    fontSize: '0.78rem',
    color: '#6B7280',
    fontWeight: '500',
  },
  itemDesc: {
    fontSize: '0.82rem',
    color: '#4B5563',
    lineHeight: '1.5',
    marginTop: '2px',
  },
  highlightDesc: {
    fontSize: '0.82rem',
    color: '#4F46E5',
    fontWeight: '500',
  },
  itemSubDesc: {
    fontSize: '0.78rem',
    color: '#6B7280',
  },
  bulletList: {
    paddingLeft: '16px',
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  bulletItem: {
    fontSize: '0.82rem',
    color: '#374151',
    lineHeight: '1.45',
  },
  skillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  skillPill: {
    fontSize: '0.78rem',
    padding: '4px 10px',
    borderRadius: '6px',
    background: '#F3F4F6',
    color: '#374151',
    fontWeight: '600',
  },
  techTag: {
    fontSize: '0.75rem',
    color: '#7C3AED',
    marginLeft: '6px',
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  certItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.82rem',
    background: '#F9FAFB',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  atsCard: {
    position: 'absolute',
    right: '36px',
    top: '24px',
    background: '#fff',
    border: '1px solid #E5E7EB',
    padding: '10px 14px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
  },
  atsScore: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#7C3AED',
  },
  atsLabel: {
    fontSize: '0.75rem',
    color: '#6B7280',
    marginTop: '4px',
  },
  atsSub: {
    fontSize: '0.78rem',
    color: '#4B5563',
    marginTop: '6px',
  },
  recommendationList: {
    paddingLeft: '16px',
    marginTop: '8px',
  },
};
