import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import ATSAnalyzerPage from './pages/ATSAnalyzerPage';
import ErrorBoundary from './components/ErrorBoundary';
import { ProfileProvider } from './context/ProfileContext';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      {currentView === 'landing' && (
        <LandingPage onNavigate={(view) => setCurrentView(view)} />
      )}
      {currentView === 'builder' && (
        <BuilderPage onNavigate={(view) => setCurrentView(view)} />
      )}
      {currentView === 'ats' && (
        <ErrorBoundary>
          <ProfileProvider>
            <ATSAnalyzerPage onNavigate={(view) => setCurrentView(view)} />
          </ProfileProvider>
        </ErrorBoundary>
      )}
    </div>
  );
}
