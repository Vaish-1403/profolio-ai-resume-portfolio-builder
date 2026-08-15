import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';

export default function ContactInfoForm() {
  const { profileData, updateSection } = useProfile();
  const data = profileData.contactInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('contactInfo', { [name]: value });
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Contact Information</h3>
      <p style={styles.subtext}>Provide accurate contact details so recruiters and potential employers can reach you.</p>

      <div style={styles.grid}>
        <Input 
          label="Email Address"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="alex@example.com"
          required={true}
          icon={Mail}
        />

        <Input 
          label="Phone Number"
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          required={true}
          icon={Phone}
        />
      </div>

      <Input 
        label="Personal Portfolio / Website"
        type="url"
        name="website"
        value={data.website}
        onChange={handleChange}
        placeholder="https://yourdomain.com"
        icon={Globe}
      />

      <div style={styles.grid}>
        <Input 
          label="LinkedIn Profile URL"
          type="url"
          name="linkedin"
          value={data.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          icon={Linkedin}
        />

        <Input 
          label="GitHub Profile URL"
          type="url"
          name="github"
          value={data.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
          icon={Github}
        />
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
