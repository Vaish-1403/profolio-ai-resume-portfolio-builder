/**
 * System Prompts and Prompt Engineering Templates for ProFolio AI
 */

export const ZERO_HALLUCINATION_SYSTEM_INSTRUCTION = `
You are ProFolio AI, an expert executive resume writer and career strategist.

STRICT ACCURACY RULES (CRITICAL):
1. NEVER invent, fabricate, or assume any work experience, degrees, certifications, companies, job titles, dates, or skills that are NOT present in the user payload.
2. Rely ONLY on the facts supplied by the user.
3. Enhance phrasing using strong action verbs, professional tone, ATS keyword alignment, and impact metrics based ONLY on the user's provided experience.
4. Return output strictly in valid JSON format as requested.
`;

export function buildResumePrompt(profile) {
  return `
Use the following user profile to generate a polished, recruiter-ready resume structure and calculate an AI-assisted resume score breakdown.

Target Job Role: ${profile.targetRole?.roleTitle || 'Professional'}
Target Industry: ${profile.targetRole?.industry || 'General'}
Target Keywords: ${profile.targetRole?.keywords || 'N/A'}

USER DATA:
${JSON.stringify(profile, null, 2)}

REQUIREMENTS:
1. Generate an optimized Executive Summary (3-4 impactful sentences).
2. Refine Work Experience bullet points using strong action verbs (e.g., "Architected", "Engineered", "Optimized").
3. Organize Skills into logical categories.
4. Calculate an AI-Assisted Resume Score breakdown (percentages 0-100) based on content relevance for the target role:
   - overallScore: Overall rating (0-100)
   - skillsRelevance: Rating for technical & soft skills alignment (0-100)
   - keywordRelevance: Alignment with target job keywords (0-100)
   - structureScore: Formatting, section organization, bullet balance (0-100)
   - completenessScore: Coverage of work history, contact info, and education (0-100)
   - readabilityScore: Action verb usage, clarity, and conciseness (0-100)
5. Provide 3-4 actionable recommendations to improve the score.

Return output strictly as a valid JSON object matching this schema:
{
  "summary": "enhanced summary string",
  "scoreBreakdown": {
    "overallScore": 94,
    "skillsRelevance": 95,
    "keywordRelevance": 90,
    "structureScore": 96,
    "completenessScore": 92,
    "readabilityScore": 94
  },
  "atsRecommendations": [
    "Quantify impact in work experience bullet points",
    "Emphasize target role keywords in professional summary"
  ],
  "optimizedExperience": [
    {
      "id": "exp-1",
      "company": "Company Name",
      "title": "Job Title",
      "bullets": ["Enhanced action bullet 1", "Enhanced action bullet 2"]
    }
  ],
  "formattedSkills": [
    { "category": "Category", "skills": ["Skill 1", "Skill 2"] }
  ]
}
`;
}

export function buildPortfolioPrompt(profile) {
  return `
Use the following user profile to generate content for an interactive 3D web portfolio.

USER DATA:
${JSON.stringify(profile, null, 2)}

REQUIREMENTS:
1. Create a compelling Headline & Hero Bio tailored for a portfolio website.
2. Create project summaries highlighting technical architecture and metrics based strictly on user-supplied data.
3. Format featured skills into competency highlight cards.

Return output strictly as a valid JSON object matching this schema:
{
  "heroHeadline": "Hero Headline String",
  "heroTagline": "Hero Tagline String",
  "portfolioBio": "Portfolio Bio String",
  "featuredProjects": [
    {
      "id": "proj-1",
      "title": "Project Title",
      "summary": "Project summary emphasizing tech stack and user metrics",
      "techPills": ["Tech 1", "Tech 2"]
    }
  ],
  "competencyHighlights": ["Highlight 1", "Highlight 2"]
}
`;
}

export function buildAnalyzePrompt(profile, resumeText = '') {
  return `
You are an expert ATS resume analyzer. Given the user's resume text and the target role keywords, return a JSON object with the following fields:

- atsScore: integer 0-100 (AI estimate)
- keywordMatch: { matched: [], missing: [] }
- skillsMatch: { matched: [], missing: [] }
- structure: { summary: boolean, education: boolean, experience: boolean, skills: boolean, projects: boolean, certifications: boolean }
- formatting: [strings] (issues like "complex tables", "images", "unusual fonts", "candidate used two-column layout")
- strengths: [strings]
- recommendations: [strings]

Target Keywords: ${profile.targetRole?.keywords || ''}

USER RESUME TEXT:
${resumeText || JSON.stringify(profile || {}, null, 2)}

Return strictly valid JSON only.
`;
}
