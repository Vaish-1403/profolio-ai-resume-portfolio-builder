import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TemplatesSection from '../components/landing/TemplatesSection';
import ATSSection from '../components/landing/ATSSection';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/layout/Footer';
import { useEffect } from 'react';

export default function LandingPage({ onNavigate }) {
  useEffect(() => {
    try {
      const target = sessionStorage.getItem('profolio_scroll_target');
      const trigger = sessionStorage.getItem('profolio_scroll_trigger');
      // Only perform the scroll if a recent trigger exists (avoid stale values on fresh opens)
      if (target && trigger) {
        const ts = parseInt(trigger, 10) || 0;
        const ageMs = Date.now() - ts;
        // allow triggers no older than 2 minutes
        if (ageMs >= 0 && ageMs <= 120000) {
          setTimeout(() => {
            const el = document.getElementById(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 160);
        }
      }
      // Clean up any stored keys
      try { sessionStorage.removeItem('profolio_scroll_target'); sessionStorage.removeItem('profolio_scroll_trigger'); } catch (e) {}
    } catch (e) {}
  }, []);
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
      <Navbar onNavigate={onNavigate} />
      
      <main style={{ flex: 1 }}>
        <HeroSection onStart={(target) => onNavigate && onNavigate(target)} />
        <FeaturesSection />
        <ATSSection onStart={(target) => onNavigate && onNavigate(target)} />
        <TemplatesSection onSelectTemplate={() => onNavigate && onNavigate('builder')} />
        <CtaSection onStart={(target) => onNavigate && onNavigate(target)} />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
