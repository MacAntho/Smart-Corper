import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Clock, Send, CheckCircle, ArrowLeft, Headphones, LifeBuoy } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  const subjects = [
    "General Inquiry",
    "Technical Support",
    "Account & Billing",
    "NYSC Information Query",
    "Feedback & Suggestions",
    "Partnerships"
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCorper</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/faq" className="text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors">FAQ</Link>
            <Link to="/login" className="btn-primary py-2.5 px-6">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Get in <span className="text-brand-primary">Touch</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Have a specific question or facing an issue? Our team is here to help you navigate your service year smoothly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100 p-8 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                  <p className="text-gray-500 font-medium mb-8">
                    Thank you for reaching out. We've received your inquiry and will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary px-8 font-bold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-brand-primary outline-none transition-all font-medium"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-brand-primary outline-none transition-all font-medium"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Subject Category</label>
                    <select 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-brand-primary outline-none transition-all font-medium appearance-none"
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    >
                      {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-brand-primary outline-none transition-all font-medium resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-3 shadow-xl shadow-green-100 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:py-12 space-y-12">
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">Contact Information</h3>
                <h2 className="text-3xl font-extrabold text-gray-900">Alternative ways to reach us</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                  While we recommend using the form for the fastest response, you can also reach out via email or check our help center.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-primary transition-all group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
                  <a href="mailto:support@smartcorper.com" className="text-brand-primary font-bold hover:underline">support@smartcorper.com</a>
                </div>

                <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-primary transition-all group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Response Time</h4>
                  <p className="text-gray-500 font-medium italic">Within 24 hours</p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <LifeBuoy className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">Self-Service Portal</h3>
                  <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
                    Check out our FAQ page for instant answers to common questions about account management, NYSC rules, and app features.
                  </p>
                  <Link to="/faq" className="inline-flex items-center space-x-2 text-brand-primary font-bold hover:text-green-400 transition-colors">
                    <span>Visit FAQ Center</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          © 2024 NYSC Smart Companion. Built with excellence in Nigeria.
        </div>
      </footer>
    </div>
  );
};

export default Contact;
