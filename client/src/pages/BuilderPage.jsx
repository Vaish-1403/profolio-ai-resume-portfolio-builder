import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ProfileProvider, useProfile } from '../context/ProfileContext';
import { generateResumeApi, generatePortfolioApi } from '../services/api';

// Import Section Forms
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import ContactInfoForm from '../components/builder/ContactInfoForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import CertificationsForm from '../components/builder/CertificationsForm';
import AchievementsForm from '../components/builder/AchievementsForm';
import TargetRoleForm from '../components/builder/TargetRoleForm';

// Import Preview Components
import ResumePreview from '../components/preview/ResumePreview';
import PortfolioPreview from '../components/preview/PortfolioPreview';
import LiveProfileInspector from '../components/builder/LiveProfileInspector';

import { 
  User, 
  Mail, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Briefcase, 
  Award, 
  Trophy, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Printer,
  Eye,
  Globe,
  Loader2,
  AlertCircle,
  X
} from 'lucide-react';

function BuilderContent({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeRightTab, setActiveRightTab] = useState('portfolio'); // 'portfolio' | 'resume' | 'inspector'
  
  // AI Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationType, setGenerationType] = useState('portfolio');
  const [resumeAiResult, setResumeAiResult] = useState(null);
  const [portfolioAiResult, setPortfolioAiResult] = useState(null);
  
  // Notification Toast & Error States
  const [aiError, setAiError] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const { profileData } = useProfile();

  const steps = [
    { id: 'personal', label: '1. Personal Info', icon: User, component: PersonalInfoForm },
    { id: 'contact', label: '2. Contact Details', icon: Mail, component: ContactInfoForm },
    { id: 'education', label: '3. Education', icon: GraduationCap, component: EducationForm },
    { id: 'skills', label: '4. Skills', icon: Code, component: SkillsForm },
    { id: 'projects', label: '5. Projects', icon: FolderGit2, component: ProjectsForm },
    { id: 'experience', label: '6. Work Experience', icon: Briefcase, component: ExperienceForm },
    { id: 'certifications', label: '7. Certifications', icon: Award, component: CertificationsForm },
    { id: 'achievements', label: '8. Achievements', icon: Trophy, component: AchievementsForm },
    { id: 'target', label: '9. Target Job Role', icon: Target, component: TargetRoleForm },
  ];

  const ActiveForm = steps[activeStep].component;

  // Trigger Notification Toast
  const showToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  // Generate Resume with Gemini AI
  const handleGenerateResume = async () => {
    setIsGenerating(true);
    setGenerationType('resume');
    setAiError(null);

    const result = await generateResumeApi(profileData);

    setIsGenerating(false);
    if (result.success) {
      setResumeAiResult(result.data);
      setActiveRightTab('resume');
      showToast('✓ Resume content generated successfully with Gemini AI!');
    } else {
      setAiError(result.error || 'Failed to generate resume with Gemini AI.');
    }
  };

  // Generate Portfolio with Gemini AI
  const handleGeneratePortfolio = async () => {
    setIsGenerating(true);
    setGenerationType('portfolio');
    setAiError(null);

    const result = await generatePortfolioApi(profileData);

    setIsGenerating(false);
    if (result.success) {
      setPortfolioAiResult(result.data);
      setActiveRightTab('portfolio');
      showToast('✓ 3D Portfolio created successfully with Gemini AI!');
    } else {
      setAiError(result.error || 'Failed to generate portfolio with Gemini AI.');
    }
  };

  // Auto-trigger analyzer if requested from landing CTA
  useEffect(() => {
    try {
      const flag = sessionStorage.getItem('profolio_auto_analyze');
      if (flag === 'resume') {
        sessionStorage.removeItem('profolio_auto_analyze');
        // start generation
        handleGenerateResume();
      }
    } catch (e) {}
  }, []);

  const handlePrint = () => {
    // Programmatic print: open a new window with the resume/portfolio HTML and inline styles
    try {
      // Look for either resume or portfolio printable doc
      const original = document.querySelector('.resume-printable-doc') || document.querySelector('.portfolio-printable-doc');
      if (!original) {
        window.print();
        return;
      }

      const clone = original.cloneNode(true);
      clone.querySelectorAll('.no-print').forEach(n => n.remove());

      // Collect CSS text from document.styleSheets where accessible, but filter out
      // global print-hiding rules that would blank the new window (e.g., "body * { display: none }")
      let cssText = '';
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          if (!sheet.cssRules) continue;
          for (const rule of Array.from(sheet.cssRules)) {
            const text = rule.cssText || '';
            // Skip @media print blocks and any rules that hide everything or reference .print-clone
            if (/@media\s+print/i.test(text)) continue;
            if (/body\s*\*/i.test(text)) continue;
            if (/\.print-clone/i.test(text)) continue;
            if (/display\s*:\s*none/i.test(text)) continue;
            cssText += text + '\n';
          }
        } catch (e) {
          // ignore cross-origin stylesheets
        }
      }

      const printWindow = window.open('', '_blank');
      if (!printWindow) { window.print(); return; }

      printWindow.document.open();
      const docTitle = activeRightTab === 'portfolio' ? 'Portfolio' : 'Resume';
      printWindow.document.write(`<!doctype html><html><head><title>${docTitle}</title><meta charset="utf-8"><style>${cssText}</style></head><body></body></html>`);
      printWindow.document.close();

      // Append the cloned node to the new window's body
      printWindow.document.body.appendChild(clone);

      // Ensure body margins are reset for A4
      const styleEl = printWindow.document.createElement('style');
      styleEl.innerHTML = '@page { size: A4 portrait; margin: 12mm; } body{ margin:0; padding:0; } .resume-printable-doc, .portfolio-printable-doc{ box-sizing:border-box; width:210mm; margin:0 auto; padding:12mm; }';
      printWindow.document.head.appendChild(styleEl);

      // Wait a moment for styles to apply, then print
      setTimeout(() => {
        try {
          printWindow.focus();
          // Close the print window only after the print dialog completes
          try {
            printWindow.onafterprint = () => {
              try { printWindow.close(); } catch (e) {}
            };
          } catch (e) {}
          printWindow.print();
        } catch (err) {
          try { printWindow.close(); } catch (e) {}
        }
      }, 500);
      return;
    } catch (err) {
      console.error('Print failed, falling back to window.print()', err);
      window.print();
    }
  };

  // Open a clean, production-ready print preview in a new tab
  // User can then use Ctrl+P to save as PDF
  const handlePrintPreview = () => {
    try {
      // Look for either resume or portfolio printable doc
      const original = document.querySelector('.resume-printable-doc') || document.querySelector('.portfolio-printable-doc');
      if (!original) {
        alert('No document to preview');
        return;
      }

      // Deep clone to preserve all inline styles and attributes
      const clone = original.cloneNode(true);
      clone.querySelectorAll('.no-print').forEach(n => n.remove());
      
      // Remove embedded style tags that might conflict with print preview
      // (these are designed for the original print mechanism, not this new preview)
      clone.querySelectorAll('style').forEach(styleEl => {
        styleEl.remove();
      });

      // Process all elements to ensure computed styles are applied
      const processElement = (el) => {
        const computed = window.getComputedStyle(el);
        
        // Copy critical visual properties to inline styles
        const criticalProps = [
          'color', 'backgroundColor', 'fontSize', 'fontWeight', 'fontFamily',
          'lineHeight', 'textAlign', 'margin', 'padding', 'border', 'display',
          'width', 'height', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth',
          'position', 'top', 'left', 'right', 'bottom', 'float', 'clear',
          'letterSpacing', 'wordSpacing', 'textDecoration', 'fontStyle',
          'textTransform', 'verticalAlign', 'whiteSpace', 'overflow'
        ];

        criticalProps.forEach(prop => {
          const value = computed.getPropertyValue(prop);
          if (value && value !== 'auto' && value !== 'normal') {
            try {
              el.style[prop] = value + ' !important';
            } catch (e) {
              // Skip if property is read-only
            }
          }
        });

        // Ensure text is visible - if no color is set or color is transparent, set to black
        const textColor = computed.getPropertyValue('color');
        if (!textColor || textColor === 'transparent' || textColor === 'rgba(0, 0, 0, 0)') {
          if (el.children.length === 0 && el.textContent.trim()) {
            // This is a leaf text node with content - ensure it's visible
            el.style.color = '#000000 !important';
          }
        }

        // Recursively process children
        for (let child of el.children) {
          processElement(child);
        }
      };

      // Apply computed styles to clone
      processElement(clone);

      // Collect ALL CSS from stylesheets
      let cssText = '';
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          if (!sheet.cssRules) continue;
          for (const rule of Array.from(sheet.cssRules)) {
            const text = rule.cssText || '';
            // Only skip rules that would conflict
            if (/\.print-clone/i.test(text)) continue;
            cssText += text + '\n';
          }
        } catch (e) {
          // Cross-origin stylesheets will throw, continue
        }
      }

      // Create new window with optimized document
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow pop-ups to use print preview');
        return;
      }

      const docTitle = activeRightTab === 'portfolio' ? 'Portfolio' : 'Resume';
      
      // Write complete HTML with comprehensive styles
      const htmlContent = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${docTitle}</title>
  <style>
    /* Comprehensive reset and styling */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: auto;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      font-size: 14px;
      line-height: 1.6;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      background: #f5f5f5;
    }

    /* A4 Page Setup - Critical for printing */
    @page {
      size: A4 portrait;
      margin: 12mm;
    }

    /* Print optimizations */
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: auto !important;
        background: white !important;
      }

      body {
        display: block !important;
        padding: 0 !important;
      }

      .printable-doc {
        width: 210mm !important;
        max-width: 210mm !important;
        height: auto !important;
        margin: 0 !important;
        padding: 12mm !important;
        box-shadow: none !important;
        background: white !important;
        page-break-after: avoid;
      }

      /* Prevent page breaks in important sections */
      h1, h2, h3, h4, h5, h6,
      section,
      .itemBlock,
      .timelineCard,
      header {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Ensure images stay within bounds */
      img {
        max-width: 100% !important;
        height: auto !important;
      }

      /* Hide UI elements in print */
      button, [role="button"], .no-print {
        display: none !important;
      }
    }

    /* Screen view styling */
    .printable-doc {
      background: white;
      width: 210mm;
      height: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin: 0 auto;
      padding: 12mm;
      line-height: 1.6;
      color: #000000;
    }

    /* Ensure all content is visible */
    .printable-doc {
      color: #000000 !important;
    }

    .printable-doc * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }

    /* Ensure text elements are visible by default */
    .printable-doc p, .printable-doc span, .printable-doc div,
    .printable-doc h1, .printable-doc h2, .printable-doc h3,
    .printable-doc h4, .printable-doc h5, .printable-doc h6,
    .printable-doc li, .printable-doc a {
      color: #000000 !important;
    }

    /* Fallback styling for various resume/portfolio elements */
    .printable-doc section { display: block !important; }
    .printable-doc header { display: block !important; }
    .printable-doc ul, .printable-doc ol { display: block !important; }

    /* Include all application CSS */
    ${cssText}
  </style>
</head>
<body>
</body>
</html>`;

      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Add printable-doc class and content
      clone.classList.add('printable-doc');
      printWindow.document.body.appendChild(clone);

      // Ensure proper rendering
      setTimeout(() => {
        printWindow.focus();
      }, 300);

      return;
    } catch (err) {
      console.error('Print preview failed', err);
      alert('Failed to open print preview: ' + err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
      <Navbar onNavigate={onNavigate} />

      {/* Success Notification Toast */}
      {successToast && (
        <div style={styles.toastWrap} className="animate-float-subtle">
          <CheckCircle2 size={18} color="#059669" />
          <span>{successToast}</span>
          <button style={styles.toastCloseBtn} onClick={() => setSuccessToast(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      <main style={styles.mainContainer}>
        {/* Workspace Subheader */}
        <div style={styles.subheader}>
          <div>
            <h1 style={styles.pageTitle}>AI Resume & 3D Portfolio Workspace</h1>
            <p style={styles.pageSub}>
              Fill in your credentials to generate an ATS resume and interactive 3D web portfolio website powered by Gemini AI.
            </p>
          </div>

          <div style={styles.topActionGroup}>
            <Button 
              variant="primary" 
              size="md" 
              icon={isGenerating && generationType === 'portfolio' ? Loader2 : Globe}
              disabled={isGenerating}
              onClick={handleGeneratePortfolio}
              style={{ boxShadow: '0 8px 25px rgba(124, 58, 237, 0.35)' }}
            >
              {isGenerating && generationType === 'portfolio' ? 'Crafting Portfolio...' : 'Generate 3D Portfolio'}
            </Button>

            <Button 
              variant="secondary" 
              size="md" 
              icon={isGenerating && generationType === 'resume' ? Loader2 : Sparkles}
              disabled={isGenerating}
              onClick={handleGenerateResume}
            >
              {isGenerating && generationType === 'resume' ? 'Refining Resume...' : 'Generate AI Resume'}
            </Button>

            <Button 
              variant="outline" 
              size="md" 
              icon={Printer}
              onClick={handlePrintPreview}
            >
              Print / PDF
            </Button>
          </div>
        </div>

        {/* AI Error Alert Banner */}
        {aiError && (
          <div style={styles.errorBanner}>
            <AlertCircle size={18} color="#DC2626" />
            <div style={{ flex: 1 }}>
              <strong>AI API Error:</strong> {aiError}
            </div>
            <button style={styles.retryBtn} onClick={generationType === 'portfolio' ? handleGeneratePortfolio : handleGenerateResume}>
              Retry API Request
            </button>
          </div>
        )}

        {/* Stepper Navigation */}
        <div style={styles.stepperWrap}>
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isActive = idx === activeStep;
            return (
              <button 
                key={step.id} 
                onClick={() => setActiveStep(idx)}
                style={{
                  ...styles.stepTab,
                  ...(isActive ? styles.stepTabActive : {}),
                }}
              >
                <IconComp size={15} color={isActive ? '#4F46E5' : '#6B7280'} />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace 2-Column Grid */}
        <div style={styles.workspaceGrid}>
          {/* Left Form Column */}
          <Card variant="glass" padding="32px">
            <div style={styles.formStepIndicator}>
              Step {activeStep + 1} of {steps.length} — {steps[activeStep].label.replace(/^\d+\.\s*/, '')}
            </div>

            {/* Active Form */}
            <div style={styles.formBody}>
              <ActiveForm />
            </div>

            {/* Stepper Controls */}
            <div style={styles.bottomNavRow}>
              <Button 
                variant="outline" 
                size="md" 
                icon={ArrowLeft}
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                Previous
              </Button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {activeStep < steps.length - 1 ? (
                  <Button 
                    variant="primary" 
                    size="md" 
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  >
                    Next Section
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    size="md" 
                    icon={Globe}
                    iconPosition="right"
                    disabled={isGenerating}
                    onClick={handleGeneratePortfolio}
                  >
                    Generate 3D Portfolio
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Right Column: Live View Switcher */}
          <div style={styles.rightCol}>
            {/* View Switcher Bar */}
            <div style={styles.rightNavHeader}>
              <div style={styles.tabToggleRow}>
                <button 
                  style={{ ...styles.rightTabBtn, ...(activeRightTab === 'portfolio' ? styles.rightTabActive : {}) }}
                  onClick={() => setActiveRightTab('portfolio')}
                >
                  <Globe size={15} /> 3D Portfolio View
                </button>
                <button 
                  style={{ ...styles.rightTabBtn, ...(activeRightTab === 'resume' ? styles.rightTabActive : {}) }}
                  onClick={() => setActiveRightTab('resume')}
                >
                  <Eye size={15} /> Resume Preview
                </button>
                <button 
                  style={{ ...styles.rightTabBtn, ...(activeRightTab === 'inspector' ? styles.rightTabActive : {}) }}
                  onClick={() => setActiveRightTab('inspector')}
                >
                  <Code size={15} /> State Inspector
                </button>
              </div>

              {(portfolioAiResult?.mode || resumeAiResult?.mode) && (
                <span style={styles.aiBadge}>
                  <Sparkles size={12} color="#7C3AED" /> AI Powered
                </span>
              )}
            </div>

            {/* Loading State Overlay */}
            {isGenerating && (
              <Card variant="solid" padding="40px" style={styles.loadingCard}>
                <Loader2 size={38} color="#4F46E5" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#171717' }}>
                  {generationType === 'portfolio' 
                    ? 'Google Gemini AI Crafting 3D Portfolio Website...' 
                    : 'Google Gemini AI Refining Resume...'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '6px', textAlign: 'center', maxWidth: '420px' }}>
                  Processing profile payload, calculating ATS keyword density, and enhancing professional bullet points.
                </p>
              </Card>
            )}

            {/* Tab 1: Interactive 3D Web Portfolio */}
            {!isGenerating && activeRightTab === 'portfolio' && (
              <PortfolioPreview profile={profileData} aiData={portfolioAiResult} />
            )}

            {/* Tab 2: Resume Preview */}
            {!isGenerating && activeRightTab === 'resume' && (
              <div style={styles.previewStack}>
                <ResumePreview profile={profileData} aiData={resumeAiResult} />
              </div>
            )}

            {/* Tab 3: Raw State Inspector */}
            {!isGenerating && activeRightTab === 'inspector' && (
              <LiveProfileInspector />
            )}
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default function BuilderPage({ onNavigate }) {
  return (
    <ProfileProvider>
      <BuilderContent onNavigate={onNavigate} />
    </ProfileProvider>
  );
}

const styles = {
  mainContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 24px',
    width: '100%',
    flex: 1,
  },
  toastWrap: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1000,
    background: '#FFFFFF',
    border: '1px solid #A7F3D0',
    boxShadow: '0 15px 30px rgba(5, 150, 105, 0.18)',
    borderRadius: '14px',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#059669',
  },
  toastCloseBtn: {
    marginLeft: '8px',
    color: '#9CA3AF',
    cursor: 'pointer',
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  pageTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#171717',
    marginBottom: '4px',
  },
  pageSub: {
    fontSize: '1rem',
    color: '#6B7280',
  },
  topActionGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  errorBanner: {
    background: '#FEE2E2',
    border: '1px solid #FCA5A5',
    color: '#991B1B',
    padding: '12px 16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.9rem',
    marginBottom: '20px',
  },
  retryBtn: {
    background: '#DC2626',
    color: '#FFFFFF',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  stepperWrap: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '12px',
    marginBottom: '28px',
  },
  stepTab: {
    padding: '10px 16px',
    borderRadius: '12px',
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  },
  stepTabActive: {
    background: '#EDE9FE',
    color: '#4F46E5',
    borderColor: '#A78BFA',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.12)',
  },
  workspaceGrid: {
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    gap: '32px',
  },
  formStepIndicator: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#7C3AED',
    background: '#F3E8FF',
    padding: '4px 10px',
    borderRadius: '10px',
    display: 'inline-block',
    marginBottom: '20px',
  },
  formBody: {
    marginBottom: '32px',
  },
  bottomNavRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    borderTop: '1px solid #E5E7EB',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightNavHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabToggleRow: {
    display: 'flex',
    gap: '6px',
    background: '#E5E7EB',
    padding: '4px',
    borderRadius: '12px',
  },
  rightTabBtn: {
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4B5563',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  rightTabActive: {
    background: '#FFFFFF',
    color: '#4F46E5',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  },
  aiBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#7C3AED',
    background: '#F3E8FF',
    padding: '4px 10px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  loadingCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  previewStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};
