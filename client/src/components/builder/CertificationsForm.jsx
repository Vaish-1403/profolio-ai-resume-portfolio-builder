import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Award, Plus, Trash2, Calendar, Link } from 'lucide-react';

export default function CertificationsForm() {
  const { profileData, addArrayItem, updateArrayItem, removeArrayItem } = useProfile();
  const list = profileData.certifications || [];

  const handleAdd = () => {
    addArrayItem('certifications', {
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
      certCategory: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.heading}>Certifications & Credentials</h3>
          <p style={styles.subtext}>Add professional certifications, digital badges, and licenses.</p>
        </div>
        <Button variant="secondary" size="sm" icon={Plus} onClick={handleAdd}>
          Add Certification
        </Button>
      </div>

      {list.map((cert, idx) => (
        <Card key={cert.id} variant="solid" padding="20px">
          <div style={styles.cardHeader}>
            <span style={styles.badge}>Certification #{idx + 1}</span>
            {list.length > 1 && (
              <button style={styles.deleteBtn} onClick={() => removeArrayItem('certifications', cert.id)}>
                <Trash2 size={16} color="#EF4444" />
              </button>
            )}
          </div>

          <div style={styles.grid}>
            <Input
              label="Certification Name"
              value={cert.name}
              onChange={(e) => updateArrayItem('certifications', cert.id, { name: e.target.value })}
              placeholder="e.g. AWS Certified Solutions Architect"
              required={true}
              icon={Award}
            />

            <Input
              label="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => updateArrayItem('certifications', cert.id, { issuer: e.target.value })}
              placeholder="e.g. Amazon Web Services, Google, Coursera"
              required={true}
            />
          </div>

          <div style={styles.grid}>
            <Input
              label="Issue Date"
              type="month"
              value={cert.issueDate}
              onChange={(e) => updateArrayItem('certifications', cert.id, { issueDate: e.target.value })}
              icon={Calendar}
            />

            <Input
              label="Credential / Verification URL"
              type="url"
              value={cert.credentialUrl}
              onChange={(e) => updateArrayItem('certifications', cert.id, { credentialUrl: e.target.value })}
              placeholder="https://..."
              icon={Link}
            />
          </div>

          <div style={{ marginTop: '12px' }}>
            <Select
              label="Certification Category"
              value={cert.certCategory || ''}
              onChange={(e) => updateArrayItem('certifications', cert.id, { certCategory: e.target.value })}
              options={[
                { value: 'Programming', label: 'Programming' },
                { value: 'Cloud', label: 'Cloud' },
                { value: 'AI/ML', label: 'AI/ML' },
                { value: 'Data Science', label: 'Data Science' },
                { value: 'Cybersecurity', label: 'Cybersecurity' },
                { value: 'Networking', label: 'Networking' },
                { value: 'Database', label: 'Database' },
                { value: 'DevOps', label: 'DevOps' },
                { value: 'Project Management', label: 'Project Management' },
                { value: 'UI/UX', label: 'UI/UX' },
                { value: 'Business', label: 'Business' },
                { value: 'Finance', label: 'Finance' },
                { value: 'Marketing', label: 'Marketing' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'Education', label: 'Education' },
                { value: 'Engineering', label: 'Engineering' },
                { value: 'Professional Development', label: 'Professional Development' },
                { value: 'Other', label: 'Other / Custom' },
              ]}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#171717',
  },
  subtext: {
    fontSize: '0.88rem',
    color: '#6B7280',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#7C3AED',
    background: '#F3E8FF',
    padding: '3px 8px',
    borderRadius: '8px',
  },
  deleteBtn: {
    padding: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
    marginBottom: '14px',
  },
};
