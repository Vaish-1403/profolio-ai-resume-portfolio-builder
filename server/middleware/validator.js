/**
 * Validation Middleware for ProFolio AI Profile Payload
 */
export function validateProfilePayload(req, res, next) {
  const profile = req.body;

  if (!profile || typeof profile !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Invalid request body. User profile object is required.',
      code: 'INVALID_PAYLOAD',
    });
  }

  const errors = [];

  // Validate Personal Info
  if (!profile.personalInfo) {
    errors.push('personalInfo section is missing.');
  } else {
    if (!profile.personalInfo.fullName || profile.personalInfo.fullName.trim() === '') {
      errors.push('personalInfo.fullName is required.');
    }
    if (!profile.personalInfo.title || profile.personalInfo.title.trim() === '') {
      errors.push('personalInfo.title is required.');
    }
  }

  // Validate Contact Info
  if (!profile.contactInfo) {
    errors.push('contactInfo section is missing.');
  } else {
    if (!profile.contactInfo.email || !profile.contactInfo.email.includes('@')) {
      errors.push('contactInfo.email must be a valid email address.');
    }
  }

  // Validate Skills (must be an array)
  if (!profile.skills || !Array.isArray(profile.skills) || profile.skills.length === 0) {
    errors.push('skills must be a non-empty array with at least 1 technical skill.');
  }

  // Return validation error response if any required field is invalid
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Profile validation failed.',
      validationDetails: errors,
      code: 'VALIDATION_FAILED',
    });
  }

  next();
}
