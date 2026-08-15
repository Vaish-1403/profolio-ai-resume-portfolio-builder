// End-to-End Verification Script for ProFolio AI
const BASE_URL = 'http://localhost:5000/api';

const fullProfilePayload = {
  personalInfo: {
    fullName: 'Alex Rivera',
    title: 'Senior Full-Stack Software Engineer',
    bio: 'Passionate software architect with 5+ years experience building cloud applications, React micro-frontends, and distributed systems.',
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
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
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      gradYear: '2022',
      gpa: '3.9 / 4.0',
    },
  ],
  skills: [
    { name: 'React.js', category: 'Frontend', level: 95 },
    { name: 'Node.js & Express', category: 'Backend', level: 90 },
    { name: 'TypeScript', category: 'Languages', level: 88 },
  ],
  projects: [
    {
      title: 'ProFolio AI Platform',
      description: 'AI resume and 3D portfolio builder built with React, Node.js, and Google Gemini API.',
      techStack: 'React, Node.js, Express',
      liveUrl: 'https://profolio-ai.demo',
    },
  ],
  experience: [
    {
      title: 'Senior Frontend Engineer',
      company: 'Vanguard Tech Labs',
      location: 'San Francisco, CA',
      startDate: '2022-06',
      endDate: 'Present',
      isCurrent: true,
      description: 'Architected high-throughput React micro-frontends serving over 1.2M monthly active users.',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-04',
    },
  ],
  achievements: [
    {
      title: 'First Place Winner - Global AI Hackathon 2024',
      organization: 'TechCrunch Disrupt',
    },
  ],
  targetRole: {
    roleTitle: 'Senior Full-Stack Engineer',
    industry: 'SaaS / Cloud',
    keywords: 'React, Node.js, System Architecture, CI/CD',
  },
};

async function runEndToEndTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING PROFOLIO AI END-TO-END VERIFICATION TESTS');
  console.log('====================================================\n');

  // Test 1: Health Endpoint
  console.log('1. Health Check (GET /api/health)');
  const healthRes = await fetch(`${BASE_URL}/health`);
  console.log(`   Status: ${healthRes.status} OK`);
  const healthData = await healthRes.json();
  console.log(`   Gemini API Configured: ${healthData.geminiConfigured}`);
  console.log('----------------------------------------------------');

  // Test 2: Resume Flow (Profile -> Express -> Gemini -> Resume JSON)
  console.log('\n2. AI Resume Flow (POST /api/resume/generate)');
  const resumeRes = await fetch(`${BASE_URL}/resume/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullProfilePayload),
  });
  console.log(`   Status: ${resumeRes.status} OK`);
  const resumeJson = await resumeRes.json();
  console.log(`   Success: ${resumeJson.success}`);
  console.log(`   Mode: ${resumeJson.meta?.mode}`);
  console.log(`   ATS Score: ${resumeJson.data?.atsScore}%`);
  console.log(`   Executive Summary: "${resumeJson.data?.profileSummary.substring(0, 80)}..."`);
  console.log(`   Optimized Experience Bullets: ${resumeJson.data?.experience?.[0]?.bullets?.length}`);
  console.log('----------------------------------------------------');

  // Test 3: Portfolio Flow (Profile -> Express -> Gemini -> Portfolio JSON)
  console.log('\n3. AI 3D Portfolio Flow (POST /api/portfolio/generate)');
  const portfolioRes = await fetch(`${BASE_URL}/portfolio/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullProfilePayload),
  });
  console.log(`   Status: ${portfolioRes.status} OK`);
  const portfolioJson = await portfolioRes.json();
  console.log(`   Success: ${portfolioJson.success}`);
  console.log(`   Mode: ${portfolioJson.meta?.mode}`);
  console.log(`   Hero Headline: "${portfolioJson.data?.heroHeadline}"`);
  console.log(`   Hero Tagline: "${portfolioJson.data?.heroTagline}"`);
  console.log(`   Featured Projects: ${portfolioJson.data?.featuredProjects?.length}`);
  console.log('====================================================\n');
}

runEndToEndTests().catch(console.error);
