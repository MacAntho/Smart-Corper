
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldAlert, Scale, Info, AlertTriangle, 
  FileWarning, ExternalLink, ShieldCheck, CheckCircle2
} from 'lucide-react';

const OfficialDisclaimer: React.FC = () => {
  const sections = [
    { id: 'non-affiliation', title: 'Non-Affiliation', icon: ShieldAlert },
    { id: 'accuracy', title: 'Accuracy of Data', icon: Info },
    { id: 'advice', title: 'Not Professional Advice', icon: Scale },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertTriangle },
    { id: 'external', title: 'Third-Party Links', icon: ExternalLink },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - offset,
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
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full mb-6 border border-amber-100 shadow-sm">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Public Notice</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Official Disclaimer</h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Important information regarding the legal status and usage of the SmartCorper platform.
          </p>
          <div className="mt-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            Effective Date: June 22, 2024
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-4">Navigation</p>
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
            
            {/* 1. Non-Affiliation */}
            <section id="non-affiliation" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">1. Official Non-Affiliation</h2>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm space-y-6">
                <p className="text-gray-600 font-medium leading-relaxed">
                  NYSC Smart Companion (hereafter referred to as "SmartCorper") is an <span className="text-gray-900 font-black">independent digital guide</span>. 
                </p>
                <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
                   <p className="text-sm text-red-800 font-bold leading-relaxed">
                     SmartCorper is NOT affiliated with, endorsed by, authorized by, or in any way officially connected to the National Youth Service Corps (NYSC) of Nigeria, the Federal Government of Nigeria, or any of its subsidiaries or its affiliates.
                   </p>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">
                  The official NYSC website can be found at <a href="https://www.nysc.gov.ng" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-bold hover:underline inline-flex items-center">nysc.gov.ng <ExternalLink className="w-3 h-3 ml-1" /></a>. All NYSC-related logos, names, and trademarks are the property of the National Youth Service Corps body.
                </p>
              </div>
            </section>

            {/* 2. Accuracy of Information */}
            <section id="accuracy" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">2. Accuracy & Completeness</h2>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
                <p>
                  All information provided on this platform is for educational and informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                   <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <h4 className="font-black text-gray-900 text-xs uppercase mb-3">Vetted by Veterans</h4>
                      <p className="text-xs">Guides are compiled based on past experiences and public records which may change without notice.</p>
                   </div>
                   <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <h4 className="font-black text-gray-900 text-xs uppercase mb-3">Official Directives</h4>
                      <p className="text-xs">Official NYSC circulars and directives always override any information found on this platform.</p>
                   </div>
                </div>
              </div>
            </section>

            {/* 3. Not Professional Advice */}
            <section id="advice" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">3. No Professional Advice</h2>
              </div>
              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <FileWarning className="w-40 h-40" />
                </div>
                <div className="relative z-10 space-y-6">
                  <p className="text-xl font-bold">Informational use only.</p>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">
                    The information contained on SmartCorper and the resources available through the AI assistant are not intended as, and shall not be understood or construed as, professional legal, medical, or financial advice. We are not lawyers, doctors, or NYSC officials.
                  </p>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm">
                    Your use of this platform does not create a professional-client relationship between you and SmartCorper. You should always consult with official NYSC staff (LGI, ZI, or State Coordinator) for critical service decisions.
                  </p>
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
              <div className="text-gray-600 font-medium leading-relaxed space-y-4">
                <p>
                  In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this platform.
                </p>
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
                   <h4 className="font-bold text-gray-900">Specific exclusions include:</h4>
                   <ul className="space-y-3">
                      {[
                        "Service extensions or penalties from NYSC.",
                        "Disciplinary actions by PPA employers or NYSC officials.",
                        "Financial loss due to Maami Market pricing or travel expenses.",
                        "Rejection of relocation or redeployment applications."
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-gray-300" /> {item}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            </section>

            {/* 5. External Links */}
            <section id="external" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">5. External Links</h2>
              </div>
              <div className="text-gray-600 font-medium leading-relaxed">
                <p>
                  Through this platform, you are able to link to other websites which are not under the control of SmartCorper. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
              </div>
            </section>

            {/* Contact Callout */}
            <section className="bg-green-50 border border-green-100 rounded-[2.5rem] p-12 text-center space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Clarity is key.</h3>
              <p className="text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                If you have any questions about this disclaimer or our platform's legal status, please reach out.
              </p>
              <Link 
                to="/contact" 
                className="bg-brand-primary text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all inline-flex items-center"
              >
                Contact Support
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 text-center bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            © 2024 SmartCorper Companion • All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-brand-primary transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OfficialDisclaimer;
