import { generatePortfolioContent } from '../services/geminiService.js';

/**
 * Controller for POST /api/portfolio/generate
 */
export async function generatePortfolio(req, res, next) {
  try {
    const profile = req.body;

    console.log(`🌐 Processing portfolio generation request for: ${profile.personalInfo?.fullName}`);

    const portfolioResult = await generatePortfolioContent(profile);

    return res.status(200).json({
      success: true,
      message: 'Portfolio content generated successfully.',
      data: {
        heroHeadline: portfolioResult.heroHeadline,
        heroTagline: portfolioResult.heroTagline,
        portfolioBio: portfolioResult.portfolioBio,
        featuredProjects: portfolioResult.featuredProjects,
        competencyHighlights: portfolioResult.competencyHighlights,
        personalInfo: profile.personalInfo,
        contactInfo: profile.contactInfo,
        skills: profile.skills,
        experience: profile.experience,
        education: profile.education,
        certifications: profile.certifications,
        achievements: profile.achievements,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        mode: portfolioResult.mode || 'Gemini AI Pro',
      },
    });
  } catch (error) {
    next(error);
  }
}
