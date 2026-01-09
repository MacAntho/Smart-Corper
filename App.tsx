
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JourneyMap from './pages/JourneyMap';
import LandingPage from './pages/LandingPage';
import KnowledgeBase from './pages/KnowledgeBase';
import ArticleDetail from './pages/ArticleDetail';
import Deadlines from './pages/Deadlines';
import StateGuide from './pages/StateGuide';
import CDSToolkit from './pages/CDSToolkit';
import DocumentVault from './pages/DocumentVault';
import RelocationAssistant from './pages/RelocationAssistant';
import Settings from './pages/Settings';
import SearchResults from './pages/SearchResults';
import EmailPreview from './pages/EmailPreview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PaymentGateway from './pages/PaymentGateway';
import PaymentVerify from './pages/PaymentVerify';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import OfficialDisclaimer from './pages/OfficialDisclaimer';
import PPADatabase from './pages/PPADatabase';
import CareerHub from './pages/CareerHub';
import DownloadsHub from './pages/DownloadsHub';
import Layout from './components/Layout';
import GeminiAssistant from './components/GeminiAssistant';

const AppContent: React.FC = () => {
  const location = useLocation();
  const publicPaths = [
    '/', 
    '/login', 
    '/signin', 
    '/register', 
    '/signup', 
    '/onboarding', 
    '/pricing', 
    '/faq', 
    '/contact',
    '/about',
    '/forgot-password',
    '/reset-password',
    '/payment/gateway',
    '/privacy',
    '/terms',
    '/disclaimer'
  ];
  const isPublic = publicPaths.includes(location.pathname);

  if (isPublic) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signin" element={<Login />} /> 
        <Route path="/register" element={<Signup />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/onboarding" element={<Onboarding />} /> 
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment/gateway" element={<PaymentGateway />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<OfficialDisclaimer />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journey" element={<JourneyMap />} />
        <Route path="/deadlines" element={<Deadlines />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/knowledge/:slug" element={<ArticleDetail />} />
        <Route path="/vault" element={<DocumentVault />} />
        <Route path="/relocation" element={<RelocationAssistant />} />
        <Route path="/state-guide" element={<StateGuide />} />
        <Route path="/ppa-database" element={<PPADatabase />} />
        <Route path="/cds-toolkit" element={<CDSToolkit />} />
        <Route path="/career-hub" element={<CareerHub />} />
        <Route path="/downloads" element={<DownloadsHub />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/email-preview" element={<EmailPreview />} />
        <Route path="/payment/verify" element={<PaymentVerify />} />
      </Routes>
      <GeminiAssistant />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
