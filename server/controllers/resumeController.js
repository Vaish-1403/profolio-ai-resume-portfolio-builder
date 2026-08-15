import { generateResumeContent } from '../services/geminiService.js';
import { analyzeResumeContent } from '../services/geminiService.js';

/**
 * Controller for POST /api/resume/generate
 */
export async function generateResume(req, res, next) {
  try {
    const profile = req.body;

    console.log(`📄 Processing resume generation request for: ${profile.personalInfo?.fullName}`);

    const resumeResult = await generateResumeContent(profile);

    return res.status(200).json({
      success: true,
      message: 'Resume content generated successfully.',
      data: {
        profileSummary: resumeResult.summary,
        scoreBreakdown: resumeResult.scoreBreakdown,
        atsRecommendations: resumeResult.atsRecommendations,
        experience: resumeResult.optimizedExperience,
        skills: resumeResult.formattedSkills,
        aiGenerated: resumeResult.aiGenerated,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        mode: resumeResult.mode || 'Gemini AI Pro',
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for POST /api/resume/analyze
 */
export async function analyzeResume(req, res, next) {
  try {
    const profile = req.body;
    const resumeText = req.body.resumeText || null;

    console.log(`🔎 Processing ATS analysis request for: ${profile.personalInfo?.fullName}`);

    const analysisResult = await analyzeResumeContent(profile, resumeText);

    return res.status(200).json({
      success: true,
      message: 'ATS analysis completed successfully.',
      data: analysisResult,
      meta: { generatedAt: new Date().toISOString() },
    });
  } catch (error) {
    next(error);
  }
}
