import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ATSAnalyzerPage({ onNavigate }) {
  const { profileData } = useProfile();
  const [resumeText, setResumeText] = useState('');
  const [keywords, setKeywords] = useState(profileData.targetRole?.keywords || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const flag = sessionStorage.getItem('profolio_auto_analyze');
      if (flag === 'resume') {
        sessionStorage.removeItem('profolio_auto_analyze');
        // prefill resumeText from profile
        setResumeText(JSON.stringify(profileData, null, 2));
        handleAnalyze();
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = { ...profileData, resumeText, targetRole: { ...profileData.targetRole, keywords } };
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Analysis failed');
      setResult(json.data);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>AI-Powered ATS Resume Analyzer</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => onNavigate && onNavigate('landing')}>Back</Button>
        </div>
      </div>

      <Card variant="glass" padding="20px">
        <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
          <label style={{ fontWeight: 700 }}>Paste resume text (or leave empty to analyze your profile)</label>
          <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} style={{ minHeight: 140, width: '100%', padding: 12, fontFamily: 'monospace' }} placeholder="Paste plain-text resume, or leave empty to use profile data" />

          <label style={{ fontWeight: 700 }}>Target Keywords (comma-separated)</label>
          <input value={keywords} onChange={(e) => setKeywords(e.target.value)} style={{ padding: 10, width: '100%' }} />

          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="primary" size="md" onClick={handleAnalyze} icon={loading ? Loader2 : null} disabled={loading}>
              {loading ? 'Analyzing…' : 'Analyze'}
            </Button>
            <Button variant="outline" size="md" onClick={() => { setResumeText(''); setKeywords(profileData.targetRole?.keywords || ''); setResult(null); setError(null); }}>
              Reset
            </Button>
          </div>

          {error && <div style={{ color: '#DC2626', fontWeight: 700 }}>{error}</div>}
        </div>
      </Card>

      {result && (
        <div style={{ marginTop: 18 }}>
          <h3>Analysis Results</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <Card variant="solid" padding="16px">
              <strong>ATS Score</strong>
              <div style={{ marginTop: 8 }}>
                <div style={{ height: 12, background: '#EEF2FF', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${result.atsScore}%`, height: '100%', background: 'linear-gradient(90deg,#4F46E5,#7C3AED)' }} />
                </div>
                <div style={{ marginTop: 8, fontWeight: 800 }}>{result.atsScore}/100 (AI estimate)</div>
              </div>
            </Card>

            <Card variant="glass" padding="18px" style={{ marginTop: 0 }}>
              <h4>AI Recommendations</h4>
              <ol>
                {(result.recommendations || []).map((r, i) => <li key={i}>{r}</li>)}
              </ol>

              <div style={{ marginTop: 12 }}>
                <Button variant="primary" size="md" onClick={() => onNavigate && onNavigate('builder')}>Improve My Resume</Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
