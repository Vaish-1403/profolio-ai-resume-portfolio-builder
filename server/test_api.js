// Verification script for ProFolio AI backend API
const BASE_URL = 'http://localhost:5000/api';

const sampleProfile = {
  personalInfo: {
    fullName: 'Alex Rivera',
    title: 'Senior Full-Stack Engineer',
    bio: 'Passionate developer with 5+ years experience.',
    location: 'San Francisco, CA',
  },
  contactInfo: {
    email: 'alex@example.com',
    phone: '+1 (555) 234-5678',
  },
  skills: [
    { name: 'React.js', category: 'Technical' },
    { name: 'Node.js', category: 'Backend' },
  ],
  experience: [
    {
      company: 'Vanguard Tech Labs',
      title: 'Senior Engineer',
      description: 'Built high-throughput micro-frontends.',
    },
  ],
  targetRole: {
    roleTitle: 'Senior Software Engineer',
    keywords: 'React, System Design',
  },
};

async function testEndpoints() {
  console.log('--- 1. Testing GET /api/health ---');
  const healthRes = await fetch(`${BASE_URL}/health`);
  console.log('Status:', healthRes.status);
  console.log('Response:', await healthRes.json());

  console.log('\n--- 2. Testing POST /api/resume/generate (Validation Error Case) ---');
  const invalidRes = await fetch(`${BASE_URL}/resume/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personalInfo: { fullName: '' } }),
  });
  console.log('Status:', invalidRes.status);
  console.log('Response:', await invalidRes.json());

  console.log('\n--- 3. Testing POST /api/resume/generate (Valid Payload) ---');
  const resumeRes = await fetch(`${BASE_URL}/resume/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sampleProfile),
  });
  console.log('Status:', resumeRes.status);
  const resumeData = await resumeRes.json();
  console.log('Success:', resumeData.success);
  console.log('Summary:', resumeData.data?.profileSummary);
  console.log('ATS Score:', resumeData.data?.atsScore);

  console.log('\n--- 4. Testing POST /api/portfolio/generate (Valid Payload) ---');
  const portfolioRes = await fetch(`${BASE_URL}/portfolio/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sampleProfile),
  });
  console.log('Status:', portfolioRes.status);
  const portfolioData = await portfolioRes.json();
  console.log('Success:', portfolioData.success);
  console.log('Hero Headline:', portfolioData.data?.heroHeadline);
  console.log('Featured Projects:', portfolioData.data?.featuredProjects?.length);
}

testEndpoints().catch(console.error);
