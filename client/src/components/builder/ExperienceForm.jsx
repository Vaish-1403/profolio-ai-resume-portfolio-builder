import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Briefcase, Plus, Trash2, Building, MapPin, Calendar } from 'lucide-react';

export default function ExperienceForm() {
  const { profileData, addArrayItem, updateArrayItem, removeArrayItem } = useProfile();
  const list = profileData.experience || [];

  const handleAdd = () => {
    addArrayItem('experience', {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      experienceType: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.heading}>Work & Internship Experience</h3>
          <p style={styles.subtext}>List your professional positions, roles, and key contributions.</p>
        </div>
        <Button variant="secondary" size="sm" icon={Plus} onClick={handleAdd}>
          Add Experience
        </Button>
      </div>

      {list.map((exp, idx) => (
        <Card key={exp.id} variant="solid" padding="20px">
          <div style={styles.cardHeader}>
            <span style={styles.badge}>Position #{idx + 1}</span>
            {list.length > 1 && (
              <button style={styles.deleteBtn} onClick={() => removeArrayItem('experience', exp.id)}>
                <Trash2 size={16} color="#EF4444" />
              </button>
            )}
          </div>

          <div style={styles.grid}>
            <Input
              label="Job Title / Role"
              value={exp.title}
              onChange={(e) => updateArrayItem('experience', exp.id, { title: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              required={true}
              icon={Briefcase}
            />

            <Input
              label="Company / Organization"
              value={exp.company}
              onChange={(e) => updateArrayItem('experience', exp.id, { company: e.target.value })}
              placeholder="e.g. Vanguard Tech Labs"
              required={true}
              icon={Building}
            />
          </div>

          <div style={styles.grid3}>
            <Input
              label="Location"
              value={exp.location}
              onChange={(e) => updateArrayItem('experience', exp.id, { location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              icon={MapPin}
            />

            <Select
              label="Experience Type"
              value={exp.experienceType || ''}
              onChange={(e) => updateArrayItem('experience', exp.id, { experienceType: e.target.value })}
              options={[
                { value: 'Full-Time', label: 'Full-Time' },
                { value: 'Part-Time', label: 'Part-Time' },
                { value: 'Internship', label: 'Internship' },
                { value: 'Freelance', label: 'Freelance' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Apprenticeship', label: 'Apprenticeship' },
                { value: 'Volunteer', label: 'Volunteer' },
                { value: 'Research', label: 'Research' },
                { value: 'Self-Employed', label: 'Self-Employed' },
                { value: 'Entrepreneurship', label: 'Entrepreneurship' },
                { value: 'Other', label: 'Other / Custom' },
              ]}
            />

            <Input
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(e) => updateArrayItem('experience', exp.id, { startDate: e.target.value })}
              required={true}
              icon={Calendar}
            />

            <Input
              label="End Date"
              type="month"
              value={exp.endDate}
              onChange={(e) => updateArrayItem('experience', exp.id, { endDate: e.target.value })}
              disabled={exp.isCurrent}
              placeholder={exp.isCurrent ? 'Present' : ''}
              icon={Calendar}
            />
          </div>

          <div style={styles.checkboxRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={exp.isCurrent || false}
                onChange={(e) => updateArrayItem('experience', exp.id, { isCurrent: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                style={{ accentColor: '#4F46E5' }}
              />
              <span>I currently work in this role</span>
            </label>
          </div>

          <TextArea
            label="Key Responsibilities & Impact Achievements"
            value={exp.description}
            onChange={(e) => updateArrayItem('experience', exp.id, { description: e.target.value })}
            placeholder="Architected micro-frontends, led cross-functional team of 6 engineers..."
            rows={4}
          />
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
    color: '#4F46E5',
    background: '#EDE9FE',
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
  grid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '14px',
    marginBottom: '10px',
  },
  checkboxRow: {
    marginBottom: '14px',
  },
  checkboxLabel: {
    fontSize: '0.85rem',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
};
