import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
// Added X to imports
import { ShieldCheck, Lock, CreditCard, Landmark, Smartphone, ArrowRight, Loader2, CheckCircle, SmartphoneIcon, Hash, Building, ExternalLink, X } from 'lucide-react';
import { PaymentConfig } from '../services/paymentService';

const PaymentGateway: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ref = searchParams.get('ref');
  const [config, setConfig] = useState<PaymentConfig | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<'card' | 'bank' | 'transfer' | 'ussd'>('card');

  useEffect(() => {
    const pending = sessionStorage.getItem('pending_payment');
    if (pending) {
      const parsed = JSON.parse(pending);
      if (parsed.reference === ref) {
        setConfig(parsed);
      }
    }
  }, [ref]);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate successful payment routing
      window.location.href = `#/payment/verify?reference=${ref}&status=success`;
    }, 2500);
  };

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
           <ExternalLink className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Invalid Reference</h2>
        <p className="text-gray-500 font-medium mb-8">This payment session has expired or is invalid.</p>
        <Link to="/pricing" className="btn-primary py-3 px-8 text-xs font-bold uppercase tracking-widest">Back to Pricing</Link>
      </div>
    );
  }

  const amountNaira = (config.amount / 100).toLocaleString();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-white px-8 pt-8 pb-6 border-b border-gray-50">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md">N</div>
                <div>
                   <h2 className="font-black text-gray-900 leading-tight">SmartCorper Checkout</h2>
                   <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Transaction Ref: {ref}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Amount Due</p>
                <p className="text-2xl font-black text-gray-900">₦{amountNaira}</p>
             </div>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
             <div className="p-1.5 bg-blue-600 text-white rounded-md"><SmartphoneIcon className="w-3 h-3" /></div>
             <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest truncate">{config.email}</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row min-h-[440px]">
           {/* Sidebar Methods Selection */}
           <div className="w-full md:w-44 bg-gray-50/50 border-r border-gray-50 p-3 space-y-1.5">
              {[
                { id: 'card', label: 'Card', icon: CreditCard },
                { id: 'bank', label: 'Bank', icon: Building },
                { id: 'transfer', label: 'Transfer', icon: Landmark },
                { id: 'ussd', label: 'USSD', icon: Hash },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${method === m.id ? 'bg-white text-brand-primary shadow-lg ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'}`}
                >
                  <m.icon className="w-4 h-4" />
                  {m.label}
                </button>
              ))}
           </div>

           {/* Active Method Container */}
           <div className="flex-1 p-8 flex flex-col relative overflow-hidden">
              {isProcessing && (
                 <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                    <div className="relative mb-6">
                       <div className="w-16 h-16 border-4 border-gray-50 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-t-brand-primary border-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Authorizing...</h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Securing payment with your bank. Please do not close this window.</p>
                 </div>
              )}

              <div className="flex-1 space-y-6 animate-in fade-in duration-500">
                 {method === 'card' && (
                    <div className="space-y-6">
                       <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Card Information</h3>
                       <div className="space-y-4">
                          <div className="space-y-1.5">
                             <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Card Number</label>
                             <div className="relative">
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 text-sm font-bold outline-none focus:bg-white focus:border-brand-primary transition-all" defaultValue="5399 2344 1234 5678" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                   <div className="w-6 h-4 bg-orange-100 rounded-sm"></div>
                                   <div className="w-6 h-4 bg-blue-100 rounded-sm"></div>
                                </div>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Expiry</label>
                                <input type="text" placeholder="MM / YY" className="input-standard !bg-gray-50 font-bold" defaultValue="12 / 26" />
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">CVV</label>
                                <input type="password" placeholder="123" className="input-standard !bg-gray-50 font-bold" defaultValue="123" />
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
                 
                 {method === 'transfer' && (
                    <div className="space-y-6 text-center pt-8">
                       <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                          <div className="space-y-1">
                             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Bank Name</p>
                             <p className="text-lg font-black text-gray-900">Wema Bank (SmartPay)</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Account Number</p>
                             <p className="text-2xl font-black text-brand-primary tracking-wider">0123995822</p>
                          </div>
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold leading-relaxed px-4 italic uppercase">"Make a transfer to the account above. Payment will be confirmed automatically."</p>
                    </div>
                 )}

                 {method === 'ussd' && (
                    <div className="space-y-8 text-center pt-8">
                       <div className="space-y-4">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dial this code on your phone</p>
                          <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-xl">
                             <p className="text-3xl font-black tracking-tight text-brand-primary">*737*301*3000#</p>
                          </div>
                       </div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Follow the prompts to authorize payment.</p>
                    </div>
                 )}

                 {(method === 'bank') && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
                       <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300">
                          <Building className="w-8 h-8" />
                       </div>
                       <div>
                          <p className="font-black text-gray-900 text-sm uppercase tracking-widest">Select Your Bank</p>
                          <select className="mt-4 input-standard !bg-gray-50">
                             <option>Access Bank</option>
                             <option>Guaranty Trust Bank</option>
                             <option>Zenith Bank</option>
                             <option>United Bank for Africa</option>
                          </select>
                       </div>
                    </div>
                 )}
              </div>

              <div className="mt-auto space-y-4">
                 <button
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full py-5 bg-brand-primary text-white font-black rounded-xl shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                 >
                    {isProcessing ? 'Verifying...' : `Pay ₦${amountNaira}`} <ArrowRight className="w-4 h-4" />
                 </button>
                 <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                    <Lock className="w-3 h-3" />
                    Secure SSL Encrypted Transaction
                 </div>
              </div>
           </div>
        </div>

        {/* Improved Footer */}
        <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-100">
           <div className="flex items-center gap-3 grayscale opacity-40">
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Secured by</span>
              <div className="flex items-center gap-1 font-black text-gray-900 text-xs tracking-tighter">
                <span className="text-blue-500">PAY</span>STACK
              </div>
           </div>
           <button 
            onClick={() => navigate('/pricing')}
            className="text-[9px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1"
           >
             <X className="w-3 h-3" /> Cancel Transaction
           </button>
        </div>
      </div>
      
      {/* Decorative Sidebar (Optional visual flair) */}
      <div className="hidden lg:block fixed left-10 bottom-10">
         <div className="flex flex-col gap-3">
            <div className="w-1.5 h-10 bg-brand-primary rounded-full"></div>
            <div className="w-1.5 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-1.5 h-6 bg-gray-200 rounded-full"></div>
         </div>
      </div>
    </div>
  );
};

export default PaymentGateway;