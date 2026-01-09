
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { sendEmail } from '../services/emailService';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Trigger Password Reset Email (Simulation)
    await sendEmail('passwordReset', email, { link: `https://smartcorper.app/reset-password?token=mock_token_${Date.now()}` });
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <Link to="/login" className="absolute top-8 left-8 flex items-center text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Sign In
      </Link>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6 shadow-sm">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Reset Password</h1>
          <p className="text-gray-500 font-medium">Enter your email and we'll send you instructions to reset your password.</p>
        </div>

        {isSubmitted ? (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-brand-primary" />
              </div>
              <p className="text-sm font-bold text-green-800 mb-1">Check your inbox!</p>
              <p className="text-xs text-green-700 font-medium">
                We've sent a recovery link to <span className="font-bold">{email}</span>. Please check your spam folder if you don't see it.
              </p>
            </div>
            <Link to="/login" className="btn-primary w-full py-4 flex items-center justify-center">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="email" 
                  required
                  placeholder="corpermartins@example.com"
                  className="input-standard w-full py-4 pl-12 pr-5 bg-gray-50 border-gray-100 focus:bg-white transition-all text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !email}
              className="btn-primary w-full py-4 shadow-xl shadow-green-100 text-lg font-bold flex items-center justify-center disabled:opacity-70 active:scale-[0.98] transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          NYSC Smart Companion Support
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
