import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FolderGit2, Plus, Trash2, Globe, Github } from 'lucide-react';

export default function ProjectsForm() {
  const { profileData, addArrayItem, updateArrayItem, removeArrayItem } = useProfile();
  const list = profileData.projects || [];

  const handleAdd = () => {
    addArrayItem('projects', {
      title: '',
      description: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      highlights: '',
      projectType: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.heading}>Projects & Portfolio Showcase</h3>
          <p style={styles.subtext}>Showcase key software projects, open source contributions, or design work.</p>
        </div>
        <Button variant="secondary" size="sm" icon={Plus} onClick={handleAdd}>
          Add Project
        </Button>
      </div>

      {list.map((proj, idx) => (
        <Card key={proj.id} variant="solid" padding="20px">
          <div style={styles.cardHeader}>
            <span style={styles.badge}>Project #{idx + 1}</span>
            {list.length > 1 && (
              <button style={styles.deleteBtn} onClick={() => removeArrayItem('projects', proj.id)}>
                <Trash2 size={16} color="#EF4444" />
              </button>
            )}
          </div>

          <div style={styles.grid}>
            <Input
              label="Project Title"
              value={proj.title}
              onChange={(e) => updateArrayItem('projects', proj.id, { title: e.target.value })}
              placeholder="e.g. ProFolio AI Platform"
              required={true}
              icon={FolderGit2}
            />

            <Input
              label="Tech Stack (Comma Separated)"
              value={proj.techStack}
              onChange={(e) => updateArrayItem('projects', proj.id, { techStack: e.target.value })}
              placeholder="e.g. React, Node.js, Express, MongoDB"
            />
          </div>

          <Select
            label="Project Type"
            value={proj.projectType || ''}
            onChange={(e) => updateArrayItem('projects', proj.id, { projectType: e.target.value })}
            options={[
              { value: 'Academic', label: 'Academic' },
              { value: 'Web', label: 'Web' },
              { value: 'Mobile', label: 'Mobile' },
              { value: 'AI/ML', label: 'AI/ML' },
              { value: 'Data Science', label: 'Data Science' },
              { value: 'IoT', label: 'IoT' },
              { value: 'Cloud', label: 'Cloud' },
              { value: 'Cybersecurity', label: 'Cybersecurity' },
              { value: 'Blockchain', label: 'Blockchain' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Research', label: 'Research' },
              { value: 'Business', label: 'Business' },
              { value: 'Marketing', label: 'Marketing' },
              { value: 'Design', label: 'Design' },
              { value: 'Healthcare', label: 'Healthcare' },
              { value: 'Social Impact', label: 'Social Impact' },
              { value: 'Creative', label: 'Creative' },
              { value: 'Open Source', label: 'Open Source' },
              { value: 'Other', label: 'Other / Custom' },
            ]}
          />

          <div style={styles.grid}>
            <Input
              label="Live Project URL"
              type="url"
              value={proj.liveUrl}
              onChange={(e) => updateArrayItem('projects', proj.id, { liveUrl: e.target.value })}
              placeholder="https://..."
              icon={Globe}
            />

            <Input
              label="GitHub Repository URL"
              type="url"
              value={proj.githubUrl}
              onChange={(e) => updateArrayItem('projects', proj.id, { githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              icon={Github}
            />
          </div>

          <TextArea
            label="Project Description"
            value={proj.description}
            onChange={(e) => updateArrayItem('projects', proj.id, { description: e.target.value })}
            placeholder="Describe what problem the project solves, system architecture, and your role..."
            rows={3}
          />

          <TextArea
            label="Key Metrics & Impact Highlights"
            value={proj.highlights}
            onChange={(e) => updateArrayItem('projects', proj.id, { highlights: e.target.value })}
            placeholder="e.g. Reduced portfolio creation time by 80%, handled 50k requests..."
            rows={2}
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
