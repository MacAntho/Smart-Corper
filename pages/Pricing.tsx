import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ShieldCheck, Star, ArrowRight, Sparkles, Loader2, Award, Zap, Shield, HelpCircle } from 'lucide-react';
import { initializePayment } from '../services/paymentService';

const features = [
  { name: 'Personalized Journey Roadmap', free: true, pro: true },
  { name: 'AI Expert Support', free: '3 queries / day', pro: 'Unlimited' },
  { name: 'Standard Knowledge Base', free: true, pro: true },
  { name: 'Push & App Notifications', free: true, pro: true },
  { name: 'Premium Relocation Pack', free: false, pro: true },
  { name: 'CDS Proposal & Financial Tools', free: false, pro: true },
  { name: 'Priority SMS Alerts', free: false, pro: true },
  { name: 'PPA Salary Negotiation Scripts', free: false, pro: true },
  { name: 'Ad-Free Experience', free: false, pro: true },
  { name: 'Permanent Document Storage', free: false, pro: true },
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const handleUpgradeClick = () => {
    setIsModalOpen(true);
  };

  const handleProceedToPayment = () => {
    setIsInitializing(true);
    // Simulation of payment initialization flow
    setTimeout(() => {
      const checkoutUrl = initializePayment('pro', billingCycle);
      window.location.href = checkoutUrl;
    }, 1500);
  };

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
            <Link to="/faq" className="text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors">FAQ</Link>
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-brand-primary transition-colors">Sign In</Link>
            <Link to="/dashboard" className="btn-primary py-2.5 px-6">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-green-200 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-green-700" />
            <span>Join 10,000+ Smart Compatriots</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Elevate Your <span className="text-brand-primary">Service Year</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mb-12 leading-relaxed">
            Invest in peace of mind. One small payment for an entire year of expert guidance, AI support, and premium survival tools.
          </p>

          <div className="inline-flex items-center bg-white p-1.5 rounded-2xl shadow-md border border-gray-200">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-10 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-10 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all relative ${billingCycle === 'yearly' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Yearly
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black shadow-sm tracking-wider">SAVE 70%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="card-standard !p-12 flex flex-col hover:border-gray-300 hover:shadow-xl transition-all">
             <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Basic</h3>
                <p className="text-sm font-medium text-gray-400">Everything you need to start your journey.</p>
             </div>
             <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-black text-gray-900">₦0</span>
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">/ Forever</span>
             </div>
             <div className="space-y-5 mb-12 flex-1">
                {features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-600">
                    <div className="p-1 bg-green-50 text-green-600 rounded-md"><Check className="w-4 h-4" /></div>
                    {f.name}
                  </div>
                ))}
                {features.slice(4).map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-medium text-gray-300">
                    <div className="p-1 bg-gray-50 text-gray-300 rounded-md"><X className="w-4 h-4" /></div>
                    {f.name}
                  </div>
                ))}
             </div>
             <Link to="/dashboard" className="btn-secondary w-full py-4 text-xs uppercase tracking-widest font-black shadow-sm">Current Plan</Link>
          </div>

          {/* Pro Plan */}
          <div className="card-standard !p-12 !border-brand-primary bg-white ring-4 ring-green-50 flex flex-col relative shadow-2xl transform md:scale-105">
             <div className="absolute top-0 right-10 -translate-y-1/2 bg-brand-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-xl">
                Most Popular Choice
             </div>
             <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-900 mb-2">SmartPro</h3>
                <p className="text-sm font-medium text-gray-500">Unrestricted access to the full ecosystem.</p>
             </div>
             <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl font-black text-gray-900">{billingCycle === 'monthly' ? '₦1,000' : '₦3,000'}</span>
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
             </div>
             <div className="space-y-5 mb-12 flex-1">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-black text-gray-800">
                    <div className="p-1 bg-brand-primary text-white rounded-md shadow-sm"><Check className="w-4 h-4" /></div>
                    {f.name}
                  </div>
                ))}
             </div>
             <button onClick={handleUpgradeClick} className="btn-primary w-full py-4 text-sm uppercase tracking-widest shadow-xl shadow-green-100">Upgrade Now</button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-black text-gray-900">Detailed Comparison</h2>
              <p className="text-gray-500 font-medium">See exactly why 70% of our users choose Pro.</p>
           </div>
           <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                       <th className="p-8 text-xs font-black uppercase text-gray-400 tracking-widest">Capability</th>
                       <th className="p-8 text-center text-sm font-black text-gray-900">Basic</th>
                       <th className="p-8 text-center text-sm font-black text-brand-primary bg-green-50/30">SmartPro</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {features.map((f, i) => (
                       <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                          <td className="p-6 pl-8 text-sm font-bold text-gray-700">{f.name}</td>
                          <td className="p-6 text-center">
                             {typeof f.free === 'string' ? <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{f.free}</span> : f.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-200 mx-auto" />}
                          </td>
                          <td className="p-6 text-center bg-green-50/10">
                             {typeof f.pro === 'string' ? <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{f.pro}</span> : f.pro ? <Check className="w-5 h-5 text-brand-primary mx-auto" strokeWidth={3} /> : <X className="w-5 h-5 text-gray-200 mx-auto" />}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

      {/* Upgrade Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
           <div className="relative bg-white rounded-xl w-full max-w-lg p-10 md:p-12 shadow-2xl animate-in zoom-in duration-300">
              <div className="text-center mb-8 space-y-4">
                 <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-brand-primary">
                    <ShieldCheck className="w-10 h-10" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Proceed to <span className="text-brand-primary">Payment</span></h2>
                    <p className="text-gray-500 font-medium mt-2">Unlock unlimited tools and stress-free guidance.</p>
                 </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 flex flex-col gap-4">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan Details</p>
                       <p className="text-lg font-black text-gray-900">SmartCorper Pro ({billingCycle})</p>
                    </div>
                    <span className="px-3 py-1 bg-brand-primary text-white rounded-full text-[9px] font-black uppercase tracking-widest">Active Choice</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <div className="text-gray-500 text-xs font-medium">Billed {billingCycle === 'monthly' ? 'every 30 days' : 'once every 12 months'}</div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-brand-primary">₦{billingCycle === 'monthly' ? '1,000' : '3,000'}</p>
                       <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Inclusive of processing fees</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <button 
                  onClick={handleProceedToPayment}
                  disabled={isInitializing}
                  className="w-full py-5 bg-brand-primary text-white font-black rounded-xl shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                 >
                    {isInitializing ? (
                       <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Initializing Gateway...</span>
                       </>
                    ) : (
                       <>
                          <span>Proceed to Payment</span>
                          <ArrowRight className="w-5 h-5" />
                       </>
                    )}
                 </button>
                 
                 <div className="flex items-center justify-center gap-6 opacity-30 grayscale pt-2 scale-90">
                    <div className="flex items-center gap-1.5"><span className="text-[8px] font-black uppercase text-gray-600">Powered by</span> <span className="font-black tracking-tighter text-sm"><span className="text-blue-500">PAY</span>STACK</span></div>
                    <div className="flex items-center gap-1.5"><span className="text-[8px] font-black uppercase text-gray-600">or</span> <span className="font-black tracking-tighter text-sm text-orange-500">Flutterwave</span></div>
                 </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100 flex items-start gap-4">
                 <Lock className="w-4 h-4 text-gray-300 shrink-0" />
                 <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">Your transaction is secured by bank-grade SSL encryption. We never store your card details on our local servers.</p>
              </div>
           </div>
        </div>
      )}

      {/* Trust Badges Footer */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Shield className="w-8 h-8" /></div>
               <h4 className="font-black text-lg">Money-back Guarantee</h4>
               <p className="text-sm text-gray-500 font-medium">Unsatisfied with Pro? Request a full refund within 7 days of purchase.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Zap className="w-8 h-8" /></div>
               <h4 className="font-black text-lg">Instant Activation</h4>
               <p className="text-sm text-gray-500 font-medium">Your Pro features are unlocked immediately after successful transaction.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><HelpCircle className="w-8 h-8" /></div>
               <h4 className="font-black text-lg">Priority Support</h4>
               <p className="text-sm text-gray-500 font-medium">Pro members get dedicated helpdesk access for service-related hurdles.</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
          © 2024 SmartCorper Companion. Built for Nigerian Excellence. <br className="md:hidden" /> Not affiliated with the NYSC official body.
        </div>
      </footer>
    </div>
  );
};

export default Pricing;