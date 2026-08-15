import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { GraduationCap, Plus, Trash2, Award } from 'lucide-react';

export default function EducationForm() {
  const { profileData, addArrayItem, updateArrayItem, removeArrayItem } = useProfile();
  const list = profileData.education || [];

  const handleAdd = () => {
    addArrayItem('education', {
      educationLevel: '',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      gradYear: '',
      gpa: '',
      description: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.heading}>Education</h3>
          <p style={styles.subtext}>List your academic qualifications, degrees, and notable honors.</p>
        </div>
        <Button variant="secondary" size="sm" icon={Plus} onClick={handleAdd}>
          Add Degree
        </Button>
      </div>

      {list.map((edu, idx) => (
        <Card key={edu.id} variant="solid" padding="20px" style={{ position: 'relative' }}>
          <div style={styles.cardHeader}>
            <span style={styles.badge}>Degree #{idx + 1}</span>
            {list.length > 1 && (
              <button style={styles.deleteBtn} onClick={() => removeArrayItem('education', edu.id)}>
                <Trash2 size={16} color="#EF4444" />
              </button>
            )}
          </div>

          <div style={styles.grid}>
            <Input
              label="Institution / University"
              value={edu.institution}
              onChange={(e) => updateArrayItem('education', edu.id, { institution: e.target.value })}
              placeholder="e.g. Stanford University"
              required={true}
              icon={GraduationCap}
            />

              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => updateArrayItem('education', edu.id, { degree: e.target.value })}
                placeholder="e.g. Bachelor of Science"
                required={true}
              />
          </div>

          <div style={styles.grid3}>
            <Input
              label="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => updateArrayItem('education', edu.id, { fieldOfStudy: e.target.value })}
              placeholder="e.g. Computer Science"
            />

            <Select
              label="Education Level"
              value={edu.educationLevel || ''}
              onChange={(e) => updateArrayItem('education', edu.id, { educationLevel: e.target.value })}
              options={[
                { value: 'High School', label: 'High School' },
                { value: 'Higher Secondary', label: 'Higher Secondary' },
                { value: 'Diploma', label: 'Diploma' },
                { value: "Bachelor's", label: "Bachelor's" },
                { value: "Master's", label: "Master's" },
                { value: 'Doctorate/PhD', label: 'Doctorate/PhD' },
                { value: 'Professional Degree', label: 'Professional Degree' },
                { value: 'Certification', label: 'Certification' },
                { value: 'Other', label: 'Other / Custom' },
              ]}
            />

            <Input
              label="Graduation Year"
              value={edu.gradYear}
              onChange={(e) => updateArrayItem('education', edu.id, { gradYear: e.target.value })}
              placeholder="e.g. 2023"
            />

            <Input
              label="GPA / Honors"
              value={edu.gpa}
              onChange={(e) => updateArrayItem('education', edu.id, { gpa: e.target.value })}
              placeholder="e.g. 3.9 / 4.0"
              icon={Award}
            />
          </div>

          <TextArea
            label="Highlights & Achievements (Optional)"
            value={edu.description}
            onChange={(e) => updateArrayItem('education', edu.id, { description: e.target.value })}
            placeholder="Specialized coursework, Dean's Honor List, thesis project..."
            rows={2}
          />
        </Card>
      ))}

      {list.length === 0 && (
        <div style={styles.emptyBox} onClick={handleAdd}>
          <Plus size={24} color="#7C3AED" />
          <p>No education added yet. Click to add your first degree.</p>
        </div>
      )}
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
    borderRadius: '6px',
    transition: 'background 0.2s ease',
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
    marginBottom: '14px',
  },
  emptyBox: {
    border: '2px dashed #D1D5DB',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: '#6B7280',
  },
};
