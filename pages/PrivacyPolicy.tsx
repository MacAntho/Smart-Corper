
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Shield, Lock, Eye, FileText, 
  Globe, Bell, Mail, ShieldCheck, Info
} from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Info },
    { id: 'collection', title: 'Information Collection', icon: FileText },
    { id: 'usage', title: 'Data Usage', icon: Eye },
    { id: 'vault', title: 'Document Vault Security', icon: Lock },
    { id: 'ai', title: 'AI & Third-Party Services', icon: Globe },
    { id: 'contact', title: 'Contact Information', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCorper</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors flex items-center group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Header Section */}
      <header className="pt-40 pb-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-brand-primary px-4 py-1.5 rounded-full mb-6 border border-green-100 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Privacy Protected</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            We are committed to protecting your data while you serve your nation. Learn how we handle your information.
          </p>
          <div className="mt-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            Last Updated: June 20, 2024
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-4">Jump to Section</p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-white hover:text-brand-primary transition-all group text-left border border-transparent hover:border-gray-100 hover:shadow-sm"
                >
                  <section.icon className="w-4 h-4 text-gray-300 group-hover:text-brand-primary" />
                  {section.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Policy Content */}
          <div className="flex-1 space-y-24 max-w-3xl">
            {/* 1. Introduction */}
            <section id="introduction" className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">1. Introduction</h2>
              <div className="prose prose-gray max-w-none text-gray-600 font-medium leading-relaxed space-y-4">
                <p>
                  Welcome to NYSC Smart Companion ("SmartCorper", "we", "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our application.
                </p>
                <p>
                  Our services are designed specifically for Nigerian Corps Members. We prioritize transparency and security to ensure your service year journey is documented safely and efficiently.
                </p>
              </div>
            </section>

            {/* 2. Information Collection */}
            <section id="collection" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">2. Information Collection</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6">
                <p className="text-gray-600 font-medium leading-relaxed">
                  We collect and process various types of data to provide our personalized roadmap services:
                </p>
                <ul className="grid gap-4">
                  {[
                    { title: "Identity Data", desc: "Includes your full name, username, and profile initials." },
                    { title: "Contact Data", desc: "Includes your email address and optionally your phone number for alerts." },
                    { title: "NYSC Data", desc: "Includes your Batch, State of Deployment, and current service stage." },
                    { title: "Usage Data", desc: "Information about how you use our guides, checklists, and AI features." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block text-sm">{item.title}</span>
                        <span className="text-xs text-gray-500 font-medium">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 3. Data Usage */}
            <section id="usage" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-brand-primary rounded-2xl">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">3. How We Use Your Data</h2>
              </div>
              <div className="text-gray-600 font-medium leading-relaxed space-y-6">
                <p>
                  Your data is used primarily to power the "Smart" features of your companion. Specifically:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-3">Roadmap Logic</h4>
                    <p className="text-xs text-gray-500">We use your Batch and State info to calculate deadlines for biometrics and mobilization.</p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-3">Smart Alerts</h4>
                    <p className="text-xs text-gray-500">Sending automated email reminders for monthly clearance so you never miss your allowance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Document Vault Security */}
            <section id="vault" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">4. Document Vault Security</h2>
              </div>
              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Shield className="w-40 h-40" />
                </div>
                <div className="relative z-10 space-y-6">
                  <p className="text-xl font-bold">Your documents are your business.</p>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">
                    Files uploaded to the Document Vault (such as Green Cards or Call-up Letters) are stored using industry-standard AES-256 encryption. Our administrative team <span className="text-brand-primary font-bold">cannot view or download</span> your sensitive files. They are strictly hosted for your personal access and quick retrieval at PPA or LGI offices.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 w-fit px-4 py-2 rounded-full">
                    <CheckCircle2 size={14} /> Zero-Access Architecture
                  </div>
                </div>
              </div>
            </section>

            {/* 5. AI & Third-Party Services */}
            <section id="ai" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">5. AI & Third-Party Services</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8 text-gray-600 font-medium leading-relaxed">
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900">Google Gemini AI</h3>
                  <p>
                    Our "Smart Assistant" uses the Google Gemini API. When you interact with the chat, only the text of your query is sent to Google. We <span className="font-bold text-gray-900">never share</span> your uploaded documents or sensitive identity data with the AI model.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900">Payments</h3>
                  <p>
                    Pro subscriptions are processed via Paystack or Flutterwave. We do not store your credit card information on our servers; it is handled entirely by these PCI-DSS compliant payment gateways.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Contact Information */}
            <section id="contact" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">6. Contact Information</h2>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-[2.5rem] p-10 text-center space-y-6 shadow-sm shadow-green-50">
                <h3 className="text-xl font-black text-gray-900">Questions about your data?</h3>
                <p className="text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                  If you have concerns regarding how your data is handled or want to request data deletion, reach out to our privacy officer.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/contact" 
                    className="bg-brand-primary text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center"
                  >
                    Contact Support
                  </Link>
                  <a 
                    href="mailto:privacy@smartcorper.com" 
                    className="bg-white text-gray-700 border border-gray-200 font-bold px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all inline-flex items-center justify-center"
                  >
                    Email Privacy Team
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Simplified Footer */}
      <footer className="py-20 border-t border-gray-100 text-center bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            © 2024 SmartCorper Companion • All Rights Reserved
          </p>
          <div className="flex justify-center gap-6 text-[10px] font-black text-gray-300 uppercase tracking-widest">
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            <span className="text-gray-100">•</span>
            <Link to="/faq" className="hover:text-brand-primary transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>

      {/* Internal Component Icons Helper */}
      <style>{`
        .prose-gray li { margin-bottom: 0.5rem; }
        .prose-gray p { margin-bottom: 1rem; }
      `}</style>
    </div>
  );
};

const CheckCircle2 = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default PrivacyPolicy;
