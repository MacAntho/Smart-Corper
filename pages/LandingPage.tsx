
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Map, Shield, Smartphone, ArrowRight, 
  AlertCircle, Info, Zap, Star, Users, Check, 
  Play, BookOpen, Clock, Hammer, Compass, MessageSquare,
  X
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      title: 'Smart Journey Roadmap',
      desc: 'A personalized timeline that adjusts based on your Batch and Deployment State.',
      icon: Map,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'AI NYSC Assistant',
      desc: 'Get instant, accurate answers to complex NYSC rules and camp survival questions.',
      icon: MessageSquare,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Deadline Guardian',
      desc: 'Automatic reminders for biometric clearance, mobilization, and monthly reports.',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'State-Specific Guides',
      desc: 'Local intel on every orientation camp, PPA landscape, and living costs.',
      icon: Compass,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'CDS Project Toolkit',
      desc: 'Professional proposal templates and project ideas to leave a lasting legacy.',
      icon: Hammer,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    },
    {
      title: 'Verified Knowledge Base',
      desc: 'Vetted guides on relocation, medical reports, and avoiding service extension.',
      icon: BookOpen,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCorper</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest text-gray-500">
            <a href="#features" className="hover:text-brand-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How It Works</a>
            <Link to="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link>
            <Link to="/faq" className="hover:text-brand-primary transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-brand-primary transition-colors">Sign In</Link>
            <Link to="/dashboard" className="btn-primary py-2.5 px-6 shadow-xl shadow-green-100 active:scale-95 transition-transform">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-1.5 rounded-full mb-8 border border-green-100 shadow-sm animate-fade-in">
            <Users className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Trusted by 10,000+ Corps Members</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.05]">
            Survive NYSC Without <br />
            <span className="text-brand-primary relative inline-block">
              The Stress
              <svg className="absolute -bottom-2 left-0 w-full h-3 md:h-4" viewBox="0 0 358 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.26C1 5.26 120.5 1.5 179 1.5C237.5 1.5 357 5.26 357 5.26" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-12">
            Step-by-step guidance from registration to POP. The all-in-one digital roadmap designed to navigate you through every stage.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link to="/dashboard" className="btn-primary py-5 px-10 text-lg flex items-center group shadow-2xl shadow-green-200 w-full sm:w-auto">
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary py-5 px-10 text-lg flex items-center bg-white shadow-sm w-full sm:w-auto hover:bg-gray-50">
              <Play className="mr-2 w-5 h-5 text-brand-primary fill-brand-primary" /> Watch Demo
            </button>
          </div>

          {/* Interactive Preview Mock */}
          <div className="mt-24 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-green-500/10 blur-[120px] rounded-full"></div>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 relative ring-1 ring-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dashboard Interactive Preview</div>
                <div className="flex items-center space-x-2">
                   <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                   <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 md:p-12 grid md:grid-cols-3 gap-10 text-left">
                <div className="col-span-2 space-y-8">
                  <div className="space-y-4">
                    <div className="h-4 w-48 bg-gray-100 rounded-full"></div>
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4 shadow-lg shadow-green-100">
                         <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 w-1/2 bg-green-200 rounded-full mb-2"></div>
                        <div className="h-2 w-1/3 bg-green-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-gray-100 flex items-center shadow-sm">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-200 mr-4"></div>
                      <div className="flex-1">
                        <div className="h-3 w-2/3 bg-gray-200 rounded-full mb-2"></div>
                        <div className="h-2 w-1/4 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <div className="h-3 w-20 bg-gray-300 rounded-full"></div>
                    <div className="h-32 w-full bg-white rounded-2xl border border-gray-100 shadow-inner"></div>
                  </div>
                  <div className="h-12 w-full bg-brand-primary rounded-xl shadow-lg shadow-green-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">The Struggle is Real... but Optional</h2>
          <p className="text-gray-500 font-medium mb-20 text-lg">Stop relying on hearsay. Get the facts, every time.</p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="card-standard border-none shadow-xl shadow-gray-200/50 text-left p-10 hover:translate-y-[-4px]">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-8">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Unending Confusion</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Corps members rely on chaotic WhatsApp groups and unreliable rumours, leading to costly mistakes and high anxiety.</p>
            </div>
            <div className="card-standard border-none shadow-xl shadow-gray-200/50 text-left p-10 hover:translate-y-[-4px]">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Missed Deadlines</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Missing biometric clearance or mobilization windows can lead to an extra 6 months of service without pay.</p>
            </div>
            <div className="card-standard border-none shadow-xl shadow-gray-200/50 text-left p-10 hover:translate-y-[-4px]">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-8">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lack of Support</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Finding credible information about PPA relocation or CDS financing is frustrating and often costs you money in "tips".</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Everything you need in one pocket</h2>
            <p className="text-gray-500 text-xl font-medium">Built by former corps members who know the pain, to ensure you have a smooth year.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-brand-primary hover:shadow-2xl hover:shadow-green-50 transition-all duration-300">
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-extrabold tracking-tight">3 Simple Steps to Peace of Mind</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16 lg:gap-24 relative">
            <div className="absolute top-[4.5rem] left-0 w-full h-1 bg-gradient-to-r from-green-50 via-green-100 to-green-50 hidden md:block z-0"></div>
            {[
              { title: 'Create Account', desc: 'Select your batch and deployment state to personalize your roadmap.', icon: Zap },
              { title: 'Follow Roadmap', desc: 'Complete stage-specific checklists verified by veteran corps members.', icon: Map },
              { title: 'Get Expert Advice', desc: 'Use our AI Assistant for instant answers on any NYSC policy or rule.', icon: MessageSquare },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-white border-4 border-brand-primary flex items-center justify-center text-brand-primary font-bold text-3xl mb-10 shadow-2xl shadow-green-100 group-hover:rotate-6 transition-transform">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-500 font-medium text-lg max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
             <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Voices of Successful Corpers</h2>
                <p className="text-gray-500 font-medium text-xl">Join thousands of Nigerians serving with clarity.</p>
             </div>
             <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-white bg-brand-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  +10k
                </div>
             </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Tunde O.', role: 'Lagos State Corper', text: 'SmartCorper made my registration so smooth. I didn\'t have to go to any cybercafe to ask basic questions.', initials: 'TO' },
              { name: 'Amarachi K.', role: 'Abuja FCT Corper', text: 'The relocation guide is gold. It explained exactly what I needed for medical grounds without the usual stress.', initials: 'AK' },
              { name: 'Ibrahim S.', role: 'Kano State Corper', text: 'CDS projects used to be confusing, but the templates here helped me get my approval letter in 48 hours.', initials: 'IS' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-1 mb-8">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-gold-500 fill-gold-500" />)}
                </div>
                <p className="text-gray-800 font-medium mb-10 text-lg leading-relaxed">"{item.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-brand-primary flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">{item.initials}</div>
                  <div>
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="pricing" className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Simple, Transparent Pricing</h2>
            <div className="inline-flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-brand-primary text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-brand-primary text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Yearly (20% Off)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Free Tier */}
            <div className="bg-white rounded-[2.5rem] border border-gray-200 p-12 flex flex-col h-full hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Basic Companion</h3>
              <p className="text-gray-500 font-medium mb-8">Perfect for early registration and basic tracking.</p>
              <div className="mb-10">
                <span className="text-5xl font-extrabold text-gray-900">Free</span>
              </div>
              <ul className="space-y-5 mb-12 flex-1 text-base font-medium text-gray-600">
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-4" /> Standard Journey Roadmap</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-4" /> 3 AI Queries per day</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-4" /> Basic Knowledge Base</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-4" /> General Deadline Notifications</li>
                <li className="flex items-center opacity-40"><X className="w-5 h-5 text-gray-400 mr-4" /> Premium Relocation Pack</li>
              </ul>
              <Link to="/dashboard" className="btn-secondary w-full text-center py-4 border-2">Start Free Journey</Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-[2.5rem] border-4 border-brand-primary p-12 flex flex-col h-full relative shadow-2xl shadow-green-100 transform md:scale-105 z-10">
              <div className="absolute top-0 right-12 -translate-y-1/2 bg-brand-primary text-white text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl shadow-green-200">
                Highly Recommended
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Pro Companion</h3>
              <p className="text-gray-600 font-medium mb-8">Maximum support for PPA, CDS, and relocation.</p>
              <div className="mb-10">
                <span className="text-5xl font-extrabold text-gray-900">{billingCycle === 'monthly' ? '₦2,500' : '₦20,000'}</span>
                <span className="text-gray-400 text-sm font-bold ml-2 uppercase tracking-widest">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
              <ul className="space-y-5 mb-12 flex-1 text-base font-bold text-gray-800">
                <li className="flex items-center text-brand-primary"><CheckCircle className="w-5 h-5 mr-4" /> Unlimited AI Support 24/7</li>
                <li className="flex items-center text-brand-primary"><CheckCircle className="w-5 h-5 mr-4" /> Step-by-Step Relocation Pack</li>
                <li className="flex items-center text-brand-primary"><CheckCircle className="w-5 h-5 mr-4" /> CDS Project Finance Templates</li>
                <li className="flex items-center text-brand-primary"><CheckCircle className="w-5 h-5 mr-4" /> Priority Bio-metrics SMS Alerts</li>
                <li className="flex items-center text-brand-primary"><CheckCircle className="w-5 h-5 mr-4" /> PPA Salary Negotiation Scripts</li>
              </ul>
              <button className="btn-primary w-full py-4 text-lg shadow-2xl shadow-green-200">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-brand-primary via-green-700 to-green-900 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-green-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Ready to Serve <br />Without the Fear?</h2>
            <p className="text-green-50 text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">Join 10,000+ Nigerian graduates using SmartCorper to ensure a stress-free and impactful service year.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <Link to="/dashboard" className="bg-white text-brand-primary font-extrabold py-5 px-12 rounded-2xl text-xl hover:bg-green-50 transition-colors shadow-2xl active:scale-95 w-full sm:w-auto">
                 Join Now For Free
               </Link>
               <button className="bg-transparent border-2 border-white/40 text-white font-bold py-5 px-12 rounded-2xl text-xl hover:bg-white/10 transition-colors w-full sm:w-auto">
                 Contact Support
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 pt-32 pb-16 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/50">
                  <span className="text-white font-bold text-2xl">N</span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">SmartCorper</span>
              </div>
              <p className="text-gray-400 max-w-sm mb-10 text-lg font-medium leading-relaxed">Helping Nigerian youth serve with clarity, peace, and real impact. Built for Corpers, by Corpers.</p>
              <div className="flex space-x-6">
                {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(social => (
                  <a key={social} href="#" className="text-gray-500 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-[10px]">{social}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-10">Quick Links</h4>
              <ul className="space-y-6 text-base font-bold text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/knowledge" className="hover:text-white transition-colors">Knowledge Base</Link></li>
                <li><Link to="/state-guide" className="hover:text-white transition-colors">State Guides</Link></li>
                <li><Link to="/cds-toolkit" className="hover:text-white transition-colors">CDS Project Lab</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-10">Support</h4>
              <ul className="space-y-6 text-base font-bold text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition-colors">Official Disclaimer</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Expert</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>© 2024 NYSC Smart Companion.</span>
            <span className="text-center md:text-right">SmartCorper is an independent guide and is not affiliated with the NYSC official body.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
