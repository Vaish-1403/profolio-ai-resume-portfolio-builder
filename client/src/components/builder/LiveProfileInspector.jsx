import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Card from '../ui/Card';
import { CheckCircle2, Code2, Eye, RefreshCw, FileText } from 'lucide-react';

export default function LiveProfileInspector() {
  const { profileData, calculateCompletion, resetProfile } = useProfile();
  const [viewMode, setViewMode] = useState('summary'); // 'summary' | 'json'

  const completion = calculateCompletion();

  return (
    <Card variant="solid" padding="24px" style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Profile Data State</h3>
          <span style={styles.sub}>Real-time React state collector</span>
        </div>
        <div style={styles.btnGroup}>
          <button 
            style={{ ...styles.tabBtn, ...(viewMode === 'summary' ? styles.activeTab : {}) }} 
            onClick={() => setViewMode('summary')}
          >
            <Eye size={14} /> Summary
          </button>
          <button 
            style={{ ...styles.tabBtn, ...(viewMode === 'json' ? styles.activeTab : {}) }} 
            onClick={() => setViewMode('json')}
          >
            <Code2 size={14} /> JSON State
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressWrap}>
        <div style={styles.progressRow}>
          <span>Profile Completion</span>
          <strong>{completion}% Completed</strong>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{ ...styles.progressBarFill, width: `${completion}%` }} />
        </div>
      </div>

      {/* Content View */}
      {viewMode === 'summary' ? (
        <div style={styles.summaryList}>
          <div style={styles.summaryItem}>
            <strong>Personal:</strong> {profileData.personalInfo.fullName || 'Not provided'} ({profileData.personalInfo.title || 'No title'})
          </div>
          <div style={styles.summaryItem}>
            <strong>Contact:</strong> {profileData.contactInfo.email || 'No email'} | {profileData.contactInfo.phone || 'No phone'}
          </div>
          <div style={styles.summaryItem}>
            <strong>Education:</strong> {profileData.education.length} degree(s) added
          </div>
          <div style={styles.summaryItem}>
            <strong>Skills:</strong> {profileData.skills.length} skill(s) listed
          </div>
          <div style={styles.summaryItem}>
            <strong>Projects:</strong> {profileData.projects.length} project(s) showcase
          </div>
          <div style={styles.summaryItem}>
            <strong>Experience:</strong> {profileData.experience.length} position(s)
          </div>
          <div style={styles.summaryItem}>
            <strong>Certifications:</strong> {profileData.certifications.length} certification(s)
          </div>
          <div style={styles.summaryItem}>
            <strong>Achievements:</strong> {profileData.achievements.length} honor(s)
          </div>
          <div style={styles.summaryItem}>
            <strong>Target Role:</strong> {profileData.targetRole.roleTitle || 'Not specified'}
          </div>
        </div>
      ) : (
        <pre style={styles.jsonBox}>
          {JSON.stringify(profileData, null, 2)}
        </pre>
      )}

      <div style={styles.footerRow}>
        <button style={styles.resetBtn} onClick={resetProfile}>
          <RefreshCw size={14} /> Reset Profile Draft
        </button>
      </div>
    </Card>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12px',
    borderBottom: '1px solid #F3F4F6',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#171717',
  },
  sub: {
    fontSize: '0.75rem',
    color: '#6B7280',
  },
  btnGroup: {
    display: 'flex',
    gap: '6px',
  },
  tabBtn: {
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#6B7280',
    background: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  activeTab: {
    background: '#EDE9FE',
    color: '#4F46E5',
  },
  progressWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  progressRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#374151',
  },
  progressBarBg: {
    height: '8px',
    background: '#E5E7EB',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  summaryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.85rem',
    color: '#4B5563',
    background: '#F9FAFB',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
  },
  summaryItem: {
    paddingBottom: '6px',
    borderBottom: '1px border-dash #E5E7EB',
  },
  jsonBox: {
    background: '#1E293B',
    color: '#38BDF8',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    maxHeight: '320px',
    overflowY: 'auto',
    fontFamily: 'monospace',
  },
  footerRow: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  resetBtn: {
    fontSize: '0.78rem',
    color: '#EF4444',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '600',
  },
};
