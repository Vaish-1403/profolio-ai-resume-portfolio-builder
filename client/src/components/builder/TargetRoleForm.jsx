import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import { Target, Building2, Key, Sparkles } from 'lucide-react';

export default function TargetRoleForm() {
  const { profileData, updateSection } = useProfile();
  const data = profileData.targetRole;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('targetRole', { [name]: value });
  };

  const roleOptions = [
    {
      label: 'Technology & IT',
      options: [
        { value: 'Software Developer', label: 'Software Developer' },
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'Full Stack Developer', label: 'Full Stack Developer' },
        { value: 'Data Analyst', label: 'Data Analyst' },
        { value: 'Data Scientist', label: 'Data Scientist' },
        { value: 'AI/ML Engineer', label: 'AI/ML Engineer' },
        { value: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst' },
        { value: 'Cloud Engineer', label: 'Cloud Engineer' },
        { value: 'DevOps Engineer', label: 'DevOps Engineer' },
        { value: 'Network Engineer', label: 'Network Engineer' },
        { value: 'IT Support', label: 'IT Support' },
        { value: 'QA Engineer', label: 'QA Engineer' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Product Designer', label: 'Product Designer' },
      ],
    },
    {
      label: 'Business & Finance',
      options: [
        { value: 'Business Analyst', label: 'Business Analyst' },
        { value: 'Financial Analyst', label: 'Financial Analyst' },
        { value: 'Accountant', label: 'Accountant' },
        { value: 'Auditor', label: 'Auditor' },
        { value: 'Banker', label: 'Banker' },
        { value: 'Financial Advisor', label: 'Financial Advisor' },
        { value: 'Consultant', label: 'Consultant' },
        { value: 'Project Manager', label: 'Project Manager' },
        { value: 'Product Manager', label: 'Product Manager' },
        { value: 'Operations Manager', label: 'Operations Manager' },
        { value: 'Business Development', label: 'Business Development' },
        { value: 'Entrepreneur', label: 'Entrepreneur' },
        { value: 'Supply Chain Analyst', label: 'Supply Chain Analyst' },
      ],
    },
    {
      label: 'Marketing & Media',
      options: [
        { value: 'Marketing Executive', label: 'Marketing Executive' },
        { value: 'Digital Marketer', label: 'Digital Marketer' },
        { value: 'Social Media Manager', label: 'Social Media Manager' },
        { value: 'SEO Specialist', label: 'SEO Specialist' },
        { value: 'Content Writer', label: 'Content Writer' },
        { value: 'Copywriter', label: 'Copywriter' },
        { value: 'Brand Manager', label: 'Brand Manager' },
        { value: 'PR Specialist', label: 'PR Specialist' },
        { value: 'Journalist', label: 'Journalist' },
        { value: 'Editor', label: 'Editor' },
        { value: 'Communications Specialist', label: 'Communications Specialist' },
      ],
    },
    {
      label: 'Design & Creative',
      options: [
        { value: 'Graphic Designer', label: 'Graphic Designer' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Fashion Designer', label: 'Fashion Designer' },
        { value: 'Interior Designer', label: 'Interior Designer' },
        { value: 'Animator', label: 'Animator' },
        { value: '3D Artist', label: '3D Artist' },
        { value: 'Illustrator', label: 'Illustrator' },
        { value: 'Photographer', label: 'Photographer' },
        { value: 'Videographer', label: 'Videographer' },
        { value: 'Video Editor', label: 'Video Editor' },
        { value: 'Creative Director', label: 'Creative Director' },
      ],
    },
    {
      label: 'Healthcare',
      options: [
        { value: 'Doctor', label: 'Doctor' },
        { value: 'Dentist', label: 'Dentist' },
        { value: 'Nurse', label: 'Nurse' },
        { value: 'Pharmacist', label: 'Pharmacist' },
        { value: 'Physiotherapist', label: 'Physiotherapist' },
        { value: 'Nutritionist', label: 'Nutritionist' },
        { value: 'Dietitian', label: 'Dietitian' },
        { value: 'Medical Researcher', label: 'Medical Researcher' },
        { value: 'Psychologist', label: 'Psychologist' },
        { value: 'Healthcare Administrator', label: 'Healthcare Administrator' },
        { value: 'Public Health Professional', label: 'Public Health Professional' },
      ],
    },
    {
      label: 'Science & Research',
      options: [
        { value: 'Research Scientist', label: 'Research Scientist' },
        { value: 'Research Assistant', label: 'Research Assistant' },
        { value: 'Biologist', label: 'Biologist' },
        { value: 'Chemist', label: 'Chemist' },
        { value: 'Physicist', label: 'Physicist' },
        { value: 'Environmental Scientist', label: 'Environmental Scientist' },
        { value: 'Microbiologist', label: 'Microbiologist' },
        { value: 'Biotechnologist', label: 'Biotechnologist' },
        { value: 'Laboratory Technician', label: 'Laboratory Technician' },
      ],
    },
    {
      label: 'Engineering',
      options: [
        { value: 'Mechanical Engineer', label: 'Mechanical Engineer' },
        { value: 'Civil Engineer', label: 'Civil Engineer' },
        { value: 'Electrical Engineer', label: 'Electrical Engineer' },
        { value: 'Electronics Engineer', label: 'Electronics Engineer' },
        { value: 'Chemical Engineer', label: 'Chemical Engineer' },
        { value: 'Biomedical Engineer', label: 'Biomedical Engineer' },
        { value: 'Aerospace Engineer', label: 'Aerospace Engineer' },
        { value: 'Automotive Engineer', label: 'Automotive Engineer' },
        { value: 'Industrial Engineer', label: 'Industrial Engineer' },
        { value: 'Robotics Engineer', label: 'Robotics Engineer' },
        { value: 'Manufacturing Engineer', label: 'Manufacturing Engineer' },
      ],
    },
    {
      label: 'Other Roles',
      options: [
        { value: 'Freelancer', label: 'Freelancer' },
        { value: 'Consultant', label: 'Consultant' },
        { value: 'Entrepreneur', label: 'Entrepreneur' },
        { value: 'Intern', label: 'Intern' },
        { value: 'Student', label: 'Student' },
        { value: 'Recent Graduate', label: 'Recent Graduate' },
        { value: 'Career Changer', label: 'Career Changer' },
        { value: 'Other / Custom', label: 'Other / Custom' },
      ],
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Target Job Role & Career Preferences</h3>
      <p style={styles.subtext}>
        Specify your desired position and industry. In upcoming milestones, Google Gemini AI will use this to optimize ATS keyword density and action verbs.
      </p>

      <div style={styles.grid}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <Input 
              label="Target Role Title"
              name="roleTitle"
              value={data.roleTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Full-Stack Software Engineer"
              required={true}
              icon={Target}
            />
          </div>

          <div style={{ width: '320px' }}>
            <Select
              label="Suggested Role"
              name="suggestedRole"
              value={data.roleTitle}
              onChange={(e) => updateSection('targetRole', { roleTitle: e.target.value })}
              options={roleOptions}
              searchable={true}
            />
          </div>
        </div>

        <Input 
          label="Target Industry / Domain"
          name="industry"
          value={data.industry}
          onChange={handleChange}
          placeholder="e.g. Fintech, SaaS, HealthTech"
          icon={Building2}
        />
      </div>

      <Input 
        label="Target Companies / Dream Employers"
        name="targetCompanies"
        value={data.targetCompanies}
        onChange={handleChange}
        placeholder="e.g. Google, Stripe, Meta, OpenAI, Vercel"
        icon={Building2}
      />

      <TextArea 
        label="Key Target Keywords & Desired Skills"
        name="keywords"
        value={data.keywords}
        onChange={handleChange}
        placeholder="e.g. React, Node.js, GraphQL, Microservices, CI/CD, Distributed Systems..."
        rows={3}
      />

      <div style={styles.aiBanner}>
        <Sparkles size={20} color="#7C3AED" />
        <div>
          <strong style={{ fontSize: '0.9rem', color: '#7C3AED' }}>ATS Optimization Ready</strong>
          <p style={{ fontSize: '0.82rem', color: '#4B5563', marginTop: '2px' }}>
            When AI enhancement is activated, Gemini AI will tailor your experience bullet points to match keywords for "{data.roleTitle || 'Target Role'}".
          </p>
        </div>
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
  aiBanner: {
    background: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',
    border: '1px solid #A78BFA',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
};
