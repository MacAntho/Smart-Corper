
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Scale, UserCheck, CreditCard, 
  AlertTriangle, Hammer, Handshake, ShieldAlert,
  FileCheck, ScrollText, ExternalLink
} from 'lucide-react';

const TermsOfService: React.FC = () => {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: Handshake },
    { id: 'conduct', title: 'User Conduct', icon: UserCheck },
    { id: 'intellectual', title: 'Intellectual Property', icon: Hammer },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertTriangle },
    { id: 'pro', title: 'Pro Subscription & Billing', icon: CreditCard },
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
      {/* Navigation */}
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

      {/* Header */}
      <header className="pt-40 pb-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-6 border border-blue-100 shadow-sm">
            <Scale className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Please read these terms carefully before using the NYSC Smart Companion platform.
          </p>
          <div className="mt-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            Last Updated: June 22, 2024
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-4">Sections</p>
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

          {/* Content */}
          <div className="flex-1 space-y-24 max-w-3xl">
            {/* Disclaimer Alert */}
            <section id="disclaimer" className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-10 space-y-6 shadow-sm shadow-amber-50">
               <div className="flex items-center gap-3 text-amber-800">
                  <ShieldAlert className="w-6 h-6" />
                  <h3 className="font-black uppercase tracking-widest text-xs">Official Non-Affiliation Disclaimer</h3>
               </div>
               <p className="text-sm text-amber-700 font-medium leading-relaxed">
                 SmartCorper is an independent digital guide and is <span className="font-black">NOT</span> affiliated with, endorsed by, or in any way officially connected to the National Youth Service Corps (NYSC) body of Nigeria. All information provided is for educational purposes based on veteran experiences and publicly available records.
               </p>
            </section>

            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Handshake className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 font-medium leading-relaxed space-y-4">
                <p>
                  By accessing or using the NYSC Smart Companion ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
                </p>
                <p>
                  These terms apply to all visitors, users, and others who access or use the Service. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of updated terms.
                </p>
              </div>
            </section>

            {/* 2. User Conduct */}
            <section id="conduct" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-brand-primary rounded-2xl">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">2. User Conduct</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6">
                <p className="text-gray-600 font-medium leading-relaxed">
                  As a user of this platform, you agree to use it responsibly and in accordance with Nigerian law. Prohibited behaviors include:
                </p>
                <ul className="grid gap-4">
                  {[
                    { title: "Fraudulent Information", desc: "Providing false NYSC Batch, State Code, or deployment details." },
                    { title: "Illegal AI Usage", desc: "Using the AI Assistant to generate fake medical reports or forged clearance letters." },
                    { title: "Ghosting Promotion", desc: "Sharing or soliciting methods to 'ghost' or abscond from national service." },
                    { title: "System Abuse", desc: "Attempting to reverse engineer the roadmap logic or scrape proprietary knowledge base content." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block text-sm">{item.title}</span>
                        <span className="text-xs text-gray-500 font-medium">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 3. Intellectual Property */}
            <section id="intellectual" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <Hammer className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">3. Intellectual Property</h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 font-medium leading-relaxed space-y-4">
                <p>
                  The Service and its original content (excluding documents uploaded by users), features, and functionality are and will remain the exclusive property of SmartCorper.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-gray-900 text-sm mb-2">Knowledge Base</p>
                    <p className="text-xs">Our guides and checklists are curated by veterans. Redistribution without credit is prohibited.</p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-gray-900 text-sm mb-2">Roadmap Algorithms</p>
                    <p className="text-xs">The logic used to calculate batch-specific deadlines is proprietary intellectual property.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Limitation of Liability */}
            <section id="liability" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">4. Limitation of Liability</h2>
              </div>
              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <ScrollText className="w-40 h-40" />
                </div>
                <div className="relative z-10 space-y-6">
                  <p className="text-xl font-bold">Use at your own risk.</p>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">
                    In no event shall SmartCorper be liable for any service extensions, disciplinary actions by NYSC officials, or loss of allowances resulting from your interpretation of the data provided here. We strive for 100% accuracy, but <span className="text-brand-primary font-bold">official NYSC directives always take precedence</span> over this guide.
                  </p>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 w-fit px-4 py-2 rounded-full">
                    Verify with your Zonal Inspector (ZI)
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Pro Subscription & Billing */}
            <section id="pro" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">5. Pro Subscription & Billing</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8 text-gray-600 font-medium leading-relaxed">
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900">Subscription Terms</h3>
                  <p>
                    Access to certain features like unlimited AI and relocation packs requires a paid subscription. Billing occurs on a recurring basis (monthly or annually) until cancelled.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900">Refund Policy</h3>
                  <p>
                    We offer a <span className="font-bold">7-day satisfaction guarantee</span>. If you are unsatisfied with Pro features, contact support within 7 days of your first payment for a full refund. Refunds are not available for subsequent monthly renewals.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Footer Callout */}
            <section id="questions" className="bg-blue-50 border border-blue-100 rounded-[2.5rem] p-10 text-center space-y-6 shadow-sm shadow-blue-50">
              <h3 className="text-xl font-black text-gray-900">Legal Questions?</h3>
              <p className="text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                If you have any questions about these Terms, please contact our legal team for clarification.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-gray-900 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center"
                >
                  Contact Legal
                </Link>
                <Link 
                  to="/faq" 
                  className="bg-white text-gray-700 border border-gray-200 font-bold px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all inline-flex items-center justify-center"
                >
                  View FAQ
                </Link>
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
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-100">•</span>
            <Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
