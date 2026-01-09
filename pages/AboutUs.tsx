
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Target, Users, ShieldCheck, 
  Sparkles, GraduationCap, Map, Award, Globe, 
  CheckCircle2, Compass, MessageSquare, ArrowRight,
  // Added BookOpen to resolve reference error
  BookOpen
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const values = [
    {
      title: 'Integrity First',
      desc: 'We never promote "ghosting" or illegal shortcuts. We believe in serving with honor.',
      icon: ShieldCheck,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Community Driven',
      desc: 'Built by former corps members for current ones. Your success is our mission.',
      icon: Users,
      color: 'text-brand-primary',
      bg: 'bg-green-50'
    },
    {
      title: 'Radical Clarity',
      desc: 'NYSC rules can be complex. We simplify the noise into actionable steps.',
      icon: Target,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      title: 'Innovation',
      desc: 'Using AI and modern tech to solve age-old administrative hurdles.',
      icon: Sparkles,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    }
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
          <div className="flex items-center space-x-8">
            <Link to="/pricing" className="text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors">Pricing</Link>
            <Link to="/login" className="btn-primary py-2.5 px-6">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <GraduationCap className="w-96 h-96 text-brand-primary" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full mb-8 border border-green-200 shadow-sm">
            <Heart className="w-4 h-4 fill-green-700" />
            <span className="text-[10px] font-black uppercase tracking-widest">Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
            Empowering Nigeria's <br />
            <span className="text-brand-primary">Next Generation.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            SmartCorper is the independent digital companion designed to make the National Youth Service Corps (NYSC) journey stress-free, transparent, and impactful.
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Why we built this.</h2>
              <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                <p>
                  In 2022, our founders noticed a recurring problem: Nigerian graduates were heading into their service year with a mix of excitement and deep anxiety. 
                </p>
                <p>
                  Confusion about registration, the "fear" of camp drills, unreliable rumors in WhatsApp groups, and the complex process of finding a Primary Assignment (PPA) were causing unnecessary stress for thousands of young Nigerians.
                </p>
                <div className="p-8 bg-green-50 border-l-4 border-brand-primary rounded-r-[2.5rem]">
                  <p className="italic text-brand-primary font-bold">
                    "We realized that the information existed, but it wasn't organized, personalized, or accessible. We decided to build the tool we wish we had during our own service year."
                  </p>
                </div>
                <p>
                  Today, SmartCorper has evolved from a simple checklist into a comprehensive AI-powered platform serving over 10,000 corps members nationwide.
                </p>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full"></div>
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="space-y-4 pt-12">
                   <div className="aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl">
                      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Team" />
                   </div>
                   <div className="p-8 bg-brand-primary rounded-[2.5rem] text-white">
                      <Users className="w-8 h-8 mb-4" />
                      <p className="text-3xl font-black">10k+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Active Members</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white">
                      <Map className="w-8 h-8 mb-4 text-brand-primary" />
                      <p className="text-3xl font-black">37</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">States Guided</p>
                   </div>
                   <div className="aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl">
                      <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Collaboration" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Our Core Philosophy</h2>
            <p className="text-gray-500 text-lg font-medium">These principles guide every feature we build and every guide we publish.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                <div className={`w-14 h-14 ${v.bg} ${v.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{v.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">The SmartCorper Ecosystem</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Personalized Roadmap', icon: Compass, text: 'Custom timelines that adjust based on your specific Batch and Deployment State.' },
              { title: 'Expert Knowledge Base', icon: BookOpen, text: 'Hundreds of vetted guides on relocation, medical reports, and camp survival.' },
              { title: 'AI Assistant', icon: MessageSquare, text: 'Instant, accurate answers to complex NYSC rules powered by Google Gemini.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-brand-primary">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Join the movement.</h2>
            <p className="text-gray-400 text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you're a fresh graduate or currently serving, SmartCorper is here to ensure you have the best service year possible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <Link to="/signup" className="bg-brand-primary text-white font-black py-5 px-12 rounded-2xl text-xl hover:bg-green-700 transition-colors shadow-2xl active:scale-95 w-full sm:w-auto flex items-center justify-center">
                 Create Free Account <ArrowRight className="ml-2 w-6 h-6" />
               </Link>
               <Link to="/contact" className="bg-white/10 border border-white/20 text-white font-bold py-5 px-12 rounded-2xl text-xl hover:bg-white/20 transition-colors w-full sm:w-auto">
                 Partner with us
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCorper</span>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            © 2024 NYSC Smart Companion • Built for Nigerian Excellence
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-brand-primary transition-colors">Official Disclaimer</Link>
            <Link to="/faq" className="hover:text-brand-primary transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
