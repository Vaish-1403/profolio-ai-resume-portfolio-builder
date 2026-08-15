import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'profolio_user_profile_v1';

const initialProfileState = {
  personalInfo: {
    fullName: 'Alex Rivera',
    title: 'Senior Full-Stack Engineer & UI/UX Designer',
    bio: 'Passionate software engineer with 5+ years of experience building high-performance web applications, micro-services, and design systems.',
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  contactInfo: {
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 234-5678',
    website: 'https://alexrivera.dev',
    linkedin: 'https://linkedin.com/in/alexrivera',
    github: 'https://github.com/alexrivera',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      gradYear: '2022',
      gpa: '3.9 / 4.0',
      description: 'Specialized in Artificial Intelligence and Human-Computer Interaction. Dean’s Honor List.',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'React.js', category: 'Frontend', level: 95 },
    { id: 'sk-2', name: 'Node.js & Express', category: 'Backend', level: 90 },
    { id: 'sk-3', name: 'TypeScript', category: 'Languages', level: 85 },
    { id: 'sk-4', name: 'UI/UX & Glassmorphism Design', category: 'Design', level: 92 },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'ProFolio AI Platform',
      description: 'Full-stack AI resume and 3D portfolio builder built with React, Node.js, and Google Gemini API.',
      techStack: 'React, Node.js, Express, CSS3 3D Transforms',
      liveUrl: 'https://profolio-ai.demo',
      githubUrl: 'https://github.com/alexrivera/profolio-ai',
      highlights: 'Reduced portfolio creation time by 80% while ensuring 94%+ ATS keyword alignment.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Frontend Engineer',
      company: 'Vanguard Tech Labs',
      location: 'San Francisco, CA',
      startDate: '2022-06',
      endDate: 'Present',
      isCurrent: true,
      description: 'Architected high-throughput React micro-frontends serving over 1.2M monthly active users. Reduced bundle size by 38%.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-04',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'First Place Winner - Global AI Hackathon 2024',
      organization: 'TechCrunch Disrupt',
      date: '2024-03',
      description: 'Awarded 1st place among 150+ international teams for developing an automated zero-hallucination document optimizer.',
    },
  ],
  targetRole: {
    roleTitle: 'Senior Full-Stack Software Engineer',
    industry: 'Technology / SaaS',
    targetCompanies: 'Google, Meta, Stripe, OpenAI',
    keywords: 'React, Node.js, System Architecture, AI Integration, Performance Optimization',
  },
};

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProfileState;
    } catch (e) {
      console.warn('Failed to load profile from localStorage:', e);
      return initialProfileState;
    }
  });

  const [formErrors, setFormErrors] = useState({});

  // Auto-save to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profileData]);

  // Update Section State
  const updateSection = (sectionKey, data) => {
    setProfileData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...data,
      },
    }));
  };

  // Add Dynamic Array Item
  const addArrayItem = (arrayKey, newItem) => {
    setProfileData((prev) => ({
      ...prev,
      [arrayKey]: [...(prev[arrayKey] || []), { id: `${arrayKey}-${Date.now()}`, ...newItem }],
    }));
  };

  // Update Dynamic Array Item
  const updateArrayItem = (arrayKey, itemId, updatedFields) => {
    setProfileData((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].map((item) =>
        item.id === itemId ? { ...item, ...updatedFields } : item
      ),
    }));
  };

  // Remove Dynamic Array Item
  const removeArrayItem = (arrayKey, itemId) => {
    setProfileData((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((item) => item.id !== itemId),
    }));
  };

  // Reset Profile to Defaults
  const resetProfile = () => {
    setProfileData(initialProfileState);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Calculate Profile Completion Percentage
  const calculateCompletion = () => {
    let completedSections = 0;
    const totalSections = 9;

    if (profileData.personalInfo.fullName && profileData.personalInfo.title) completedSections++;
    if (profileData.contactInfo.email && profileData.contactInfo.phone) completedSections++;
    if (profileData.education && profileData.education.length > 0 && profileData.education[0].institution) completedSections++;
    if (profileData.skills && profileData.skills.length > 0) completedSections++;
    if (profileData.projects && profileData.projects.length > 0 && profileData.projects[0].title) completedSections++;
    if (profileData.experience && profileData.experience.length > 0 && profileData.experience[0].company) completedSections++;
    if (profileData.certifications && profileData.certifications.length > 0) completedSections++;
    if (profileData.achievements && profileData.achievements.length > 0) completedSections++;
    if (profileData.targetRole.roleTitle) completedSections++;

    return Math.round((completedSections / totalSections) * 100);
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        updateSection,
        addArrayItem,
        updateArrayItem,
        removeArrayItem,
        resetProfile,
        calculateCompletion,
        formErrors,
        setFormErrors,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
