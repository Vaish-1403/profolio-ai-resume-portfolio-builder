import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { User, Briefcase, MapPin, Image } from 'lucide-react';

export default function PersonalInfoForm() {
  const { profileData, updateSection } = useProfile();
  const data = profileData.personalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('personalInfo', { [name]: value });
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Personal Information</h3>
      <p style={styles.subtext}>Tell us about yourself. This information will form the primary header of your resume and portfolio.</p>

      <div style={styles.grid}>
        <Input 
          label="Full Name"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="e.g. Alex Rivera"
          required={true}
          icon={User}
        />

        <Input 
          label="Professional Title"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="e.g. Senior Full-Stack Engineer"
          required={true}
          icon={Briefcase}
        />
      </div>

      <div style={styles.grid}>
        <Input 
          label="Location (City, Country)"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="e.g. San Francisco, CA"
          icon={MapPin}
        />

        <Input 
          label="Photo / Avatar URL"
          name="avatarUrl"
          value={data.avatarUrl}
          onChange={handleChange}
          placeholder="https://..."
          icon={Image}
        />
      </div>

      <TextArea 
        label="Professional Bio / Executive Summary"
        name="bio"
        value={data.bio}
        onChange={handleChange}
        placeholder="Briefly describe your career background, core strengths, and passion..."
        rows={4}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#171717',
  },
  subtext: {
    fontSize: '0.88rem',
    color: '#6B7280',
    marginBottom: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
};
