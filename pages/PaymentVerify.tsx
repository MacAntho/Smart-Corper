
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight, PartyPopper, Sparkles, Award } from 'lucide-react';
import { verifyPayment } from '../services/paymentService';

const PaymentVerify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!reference) {
      setStatus('error');
      return;
    }

    const checkPayment = async () => {
      const result = await verifyPayment(reference);
      setStatus(result ? 'success' : 'error');
    };

    checkPayment();
  }, [reference]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-10 md:p-14 text-center">
        {status === 'loading' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto relative">
                <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
             </div>
             <div>
                <h1 className="text-2xl font-black text-gray-900 mb-2">Verifying Transaction</h1>
                <p className="text-gray-500 font-medium leading-relaxed">Please wait while we confirm your payment with the gateway. Do not refresh this page.</p>
             </div>
             <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Ref: {reference}</div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-10 animate-in zoom-in duration-500">
             <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                   <Award className="w-12 h-12 text-brand-primary" />
                </div>
                <div className="absolute top-0 right-1/4 animate-bounce">
                   <PartyPopper className="w-6 h-6 text-amber-500" />
                </div>
             </div>
             
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                   <Sparkles className="w-3 h-3 fill-brand-primary" /> Subscription Active
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Upgrade Complete!</h1>
                <p className="text-gray-500 font-medium leading-relaxed">
                   Welcome to <span className="text-gray-900 font-bold">SmartCorper Pro</span>. Your account has been upgraded and all premium features are now unlocked.
                </p>
             </div>

             <div className="space-y-4">
                <button 
                   onClick={() => navigate('/dashboard')}
                   className="w-full py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                >
                   Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">An invoice has been sent to your email</p>
             </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-10 animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <XCircle className="w-12 h-12 text-red-500" />
             </div>
             
             <div>
                <h1 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Transaction Failed</h1>
                <p className="text-gray-500 font-medium leading-relaxed">
                   We couldn't verify your payment. This might be due to a network error or insufficient funds.
                </p>
             </div>

             <div className="space-y-4">
                <Link 
                   to="/pricing"
                   className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center"
                >
                   Try Again
                </Link>
                <Link to="/dashboard" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">
                   Return to Home
                </Link>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerify;
