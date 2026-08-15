import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Code, Plus, Trash2 } from 'lucide-react';

export default function SkillsForm() {
  const { profileData, addArrayItem, updateArrayItem, removeArrayItem } = useProfile();
  const list = profileData.skills || [];
  const categoryOptions = [
    { value: 'Programming', label: 'Programming' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'Database', label: 'Database' },
    { value: 'Cloud', label: 'Cloud' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Networking', label: 'Networking' },
    { value: 'Testing', label: 'Testing' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'Design', label: 'Design' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Management', label: 'Management' },
    { value: 'Research', label: 'Research' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Languages', label: 'Languages' },
    { value: 'Creative Arts', label: 'Creative Arts' },
    { value: 'Business', label: 'Business' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Other', label: 'Other / Custom' },
  ];

  const skillLevelOptions = [
    { value: 20, label: 'Beginner' },
    { value: 35, label: 'Elementary' },
    { value: 50, label: 'Intermediate' },
    { value: 65, label: 'Upper Intermediate' },
    { value: 80, label: 'Advanced' },
    { value: 95, label: 'Expert' },
  ];

  const [showNew, setShowNew] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: categoryOptions[0].value, level: 80 });
  const [error, setError] = useState(null);

  const handleAdd = () => {
    setError(null);
    if (!newSkill.name.trim()) {
      setError('Please enter a skill name.');
      return;
    }

    addArrayItem('skills', {
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: Number(newSkill.level) || 80,
    });

    // reset new skill form and close
    setNewSkill({ name: '', category: categoryOptions[0].value, level: 80 });
    setShowNew(false);
  };

  const handleCancel = () => {
    setError(null);
    setNewSkill({ name: '', category: categoryOptions[0].value, level: 80 });
    setShowNew(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.heading}>Skills & Technical Proficiency</h3>
          <p style={styles.subtext}>Highlight key technologies, frameworks, and competencies.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {!showNew && (
            <Button variant="secondary" size="sm" icon={Plus} onClick={() => setShowNew(true)}>
              Add Skill
            </Button>
          )}
          {showNew && (
            <div style={styles.newForm}>
              <Input
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                style={{ marginRight: '8px', minWidth: '180px' }}
              />
              <Select
                value={newSkill.category}
                onChange={(e) => setNewSkill((s) => ({ ...s, category: e.target.value }))}
                options={categoryOptions}
                style={{ width: '160px', marginRight: '8px' }}
              />
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={newSkill.level}
                onChange={(e) => setNewSkill((s) => ({ ...s, level: Number(e.target.value) }))}
                style={{ width: '120px', marginRight: '8px' }}
              />
              <Button variant="primary" size="sm" onClick={handleAdd}>
                Add
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel} style={{ marginLeft: '6px' }}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.skillsGrid}>
        {list.map((skill) => (
          <Card key={skill.id} variant="solid" padding="16px">
            <div style={styles.cardHeader}>
              <Select
                value={skill.category}
                onChange={(e) => updateArrayItem('skills', skill.id, { category: e.target.value })}
                options={[{ value: skill.category, label: skill.category }, ...categoryOptions.filter((o) => o.value !== skill.category)]}
                style={{ width: '60%' }}
              />
              <button style={styles.deleteBtn} onClick={() => removeArrayItem('skills', skill.id)}>
                <Trash2 size={16} color="#EF4444" />
              </button>
            </div>

            <Input
              label="Skill Name"
              value={skill.name}
              onChange={(e) => updateArrayItem('skills', skill.id, { name: e.target.value })}
              placeholder="e.g. React.js, Python, System Architecture"
              required={true}
              icon={Code}
              style={{ marginBottom: '12px' }}
            />

              <div style={styles.sliderWrap}>
              <div style={styles.sliderHeader}>
                <span style={styles.sliderLabel}>Proficiency Level</span>
                <strong style={styles.sliderVal}>{skill.level}%</strong>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={skill.level || 80}
                  onChange={(e) => updateArrayItem('skills', skill.id, { level: Number(e.target.value) })}
                  style={{ ...styles.rangeInput, flex: 1 }}
                />
                <div style={{ width: '160px' }}>
                  <Select
                    value={skillLevelOptions.find((o) => (skill.level || 80) <= o.value)?.value || 80}
                    onChange={(e) => updateArrayItem('skills', skill.id, { level: Number(e.target.value) })}
                    options={skillLevelOptions.map((o) => ({ value: o.value, label: o.label }))}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
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
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  deleteBtn: {
    padding: '4px',
  },
  sliderWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.78rem',
    color: '#4B5563',
  },
  sliderLabel: {
    fontWeight: '500',
  },
  sliderVal: {
    color: '#7C3AED',
  },
  rangeInput: {
    width: '100%',
    accentColor: '#7C3AED',
    cursor: 'pointer',
  },
  newForm: {
    display: 'flex',
    alignItems: 'center',
  },
};
