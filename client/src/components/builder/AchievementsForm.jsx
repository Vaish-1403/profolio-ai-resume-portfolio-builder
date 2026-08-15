import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Trophy, Plus, Trash2, Calendar } from 'lucide-react';

export default function AchievementsForm() {
  const { profileData, addArrayItem, updateArrayItem, removeArrayItem } = useProfile();
  const list = profileData.achievements || [];

  const handleAdd = () => {
    addArrayItem('achievements', {
      title: '',
      organization: '',
      date: '',
      description: '',
      achievementType: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.heading}>Honors & Achievements</h3>
          <p style={styles.subtext}>Highlight awards, hackathon wins, scholarships, or academic honors.</p>
        </div>
        <Button variant="secondary" size="sm" icon={Plus} onClick={handleAdd}>
          Add Achievement
        </Button>
      </div>

      {list.map((ach, idx) => (
        <Card key={ach.id} variant="solid" padding="20px">
          <div style={styles.cardHeader}>
            <span style={styles.badge}>Achievement #{idx + 1}</span>
            {list.length > 1 && (
              <button style={styles.deleteBtn} onClick={() => removeArrayItem('achievements', ach.id)}>
                <Trash2 size={16} color="#EF4444" />
              </button>
            )}
          </div>

          <Input
            label="Achievement Title / Honor"
            value={ach.title}
            onChange={(e) => updateArrayItem('achievements', ach.id, { title: e.target.value })}
            placeholder="e.g. First Place Winner - Global AI Hackathon"
            required={true}
            icon={Trophy}
            style={{ marginBottom: '14px' }}
          />

          <div style={styles.grid}>
            <Input
              label="Organization / Event"
              value={ach.organization}
              onChange={(e) => updateArrayItem('achievements', ach.id, { organization: e.target.value })}
              placeholder="e.g. TechCrunch Disrupt"
            />

            <Input
              label="Date Received"
              type="month"
              value={ach.date}
              onChange={(e) => updateArrayItem('achievements', ach.id, { date: e.target.value })}
              icon={Calendar}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Achievement Type"
              value={ach.achievementType || ''}
              onChange={(e) => updateArrayItem('achievements', ach.id, { achievementType: e.target.value })}
              placeholder="e.g. Award, Publication"
            />

            <TextArea
              label="Description / Impact"
              value={ach.description}
              onChange={(e) => updateArrayItem('achievements', ach.id, { description: e.target.value })}
              placeholder="Awarded among 150+ teams for building an automated..."
              rows={2}
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
    color: '#D97706',
    background: '#FEF3C7',
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
