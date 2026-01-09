import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, HelpCircle, Shield, CreditCard, Wrench, BookOpen } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Account & Billing",
    question: "Is there a free trial for the Pro plan?",
    answer: "We don't offer a traditional timed trial, but our Free plan allows you to explore basic features indefinitely. We also offer a 7-day money-back guarantee for Pro subscriptions."
  },
  {
    category: "Account & Billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major Nigerian debit cards (Mastercard, Visa, Verve) via Paystack and Flutterwave. We also support bank transfers and USSD payments."
  },
  {
    category: "Account & Billing",
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your Account Settings. Your Pro features will remain active until the end of your current billing cycle."
  },
  {
    category: "Using the Platform",
    question: "How do I track my progress on the Roadmap?",
    answer: "The Journey Map automatically updates as you check off tasks. Some milestones are also updated automatically if they are linked to verified data inputs."
  },
  {
    category: "Using the Platform",
    question: "Is there a mobile app available?",
    answer: "SmartCorper is currently a web application optimized for mobile browsers. You can 'Add to Home Screen' for an app-like experience. A native mobile app is currently in development."
  },
  {
    category: "Using the Platform",
    question: "Can I share my roadmap with my friends?",
    answer: "Currently, your roadmap is private to your account. However, you can export your progress as a PDF to share with others."
  },
  {
    category: "NYSC General Questions",
    question: "What exactly is the Green Card?",
    answer: "The Green Card is your online registration slip which contains your personal details, call-up number, and biometric data. It is a mandatory document for camp registration."
  },
  {
    category: "NYSC General Questions",
    question: "Can I change my state of deployment after being posted?",
    answer: "Posting is final, but you can apply for 'Redeployment' or 'Relocation' once you arrive at the orientation camp on marital or health grounds."
  },
  {
    category: "NYSC General Questions",
    question: "What happens if I miss my monthly clearance?",
    answer: "Missing a monthly clearance without a valid, documented excuse usually leads to a 'no-pay' status for that month and a possible service extension."
  },
  {
    category: "Technical Support",
    question: "I'm having trouble with the AI Assistant.",
    answer: "If the AI isn't responding, please ensure you have a stable internet connection. If you are a free user, you might have exceeded your daily limit. Try refreshing the page or clearing your cache."
  },
  {
    category: "Technical Support",
    question: "How do I report a bug or incorrect information?",
    answer: "We value accuracy! Please use the 'Report' button found on every guide page, or email us at support@smartcorper.com with details of the issue."
  }
];

const CATEGORIES = ["All", "Account & Billing", "Using the Platform", "NYSC General Questions", "Technical Support"];

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Account & Billing": return <CreditCard className="w-4 h-4" />;
      case "Using the Platform": return <Shield className="w-4 h-4" />;
      case "NYSC General Questions": return <BookOpen className="w-4 h-4" />;
      case "Technical Support": return <Wrench className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCorper</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/pricing" className="text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors">Pricing</Link>
            <Link to="/login" className="btn-primary py-2.5 px-6">Sign In</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            How can we <span className="text-brand-primary">help?</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium mb-10">
            Search our knowledge base or browse by category to find answers to common questions.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500/20 focus:border-brand-primary outline-none transition-all text-gray-700 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-primary text-white shadow-lg shadow-green-100' 
                    : 'bg-white text-gray-500 border border-gray-100 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4 min-h-[400px]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border border-gray-100 rounded-2xl overflow-hidden transition-all ${
                    openIndex === idx ? 'ring-1 ring-green-100 shadow-md' : 'hover:bg-gray-50'
                  }`}
                >
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  >
                    <span className={`font-bold text-lg ${openIndex === idx ? 'text-brand-primary' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    {openIndex === idx ? <ChevronUp className="w-5 h-5 text-brand-primary" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {openIndex === idx && (
                    <div className="px-6 pb-6 pt-0 text-gray-600 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="h-px bg-gray-50 mb-6 w-full"></div>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">We couldn't find any FAQs matching your search.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-6 text-brand-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Still need help?</h2>
              <p className="text-gray-400 text-lg font-medium mb-12 max-w-xl mx-auto">
                Can't find what you're looking for? Our team of veteran corps members and experts are here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/contact" 
                  className="flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
                >
                  <Mail className="w-5 h-5 text-brand-primary" />
                  <span>Contact Support</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-3 bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-900/40 w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>AI Chat Assistant</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
          © 2024 NYSC Smart Companion. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default FAQ;