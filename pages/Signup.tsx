
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle, Eye, EyeOff, ShieldCheck, Mail, User, Lock } from 'lucide-react';
import { sendEmail } from '../services/emailService';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirm: '',
  });

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  useEffect(() => {
    const newErrors = { email: '', password: '', confirm: '' };
    
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
  }, [formData]);

  const isFormValid = 
    formData.fullName && 
    formData.email && 
    validateEmail(formData.email) && 
    formData.password.length >= 8 && 
    formData.password === formData.confirmPassword && 
    formData.agreeTerms;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Trigger Welcome Email (Simulation)
      await sendEmail('welcome', formData.email, { name: formData.fullName });
      // Navigate to onboarding flow
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      {/* Left: Branding/Marketing */}
      <div className="hidden md:flex md:w-1/2 bg-brand-primary p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700/50 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <Link to="/" className="flex items-center space-x-3 text-white z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-brand-primary font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight">SmartCorper</span>
        </Link>

        <div className="z-10">
          <h2 className="text-5xl font-extrabold text-white mb-8 leading-tight">Start your <br />journey today.</h2>
          <p className="text-white/80 text-lg mb-12 max-w-md font-medium">Join thousands of Corpers nationwide who use SmartCorper to manage their service year with confidence.</p>
          <div className="space-y-6">
            <div className="flex items-center text-white font-bold space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-6 h-6 text-green-300" />
              <span>Secure & Verified Guides</span>
            </div>
            <div className="flex items-center text-white font-bold space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <Sparkles className="w-6 h-6 text-green-300" />
              <span>Smart AI Career Tips</span>
            </div>
          </div>
        </div>

        <p className="text-white/60 text-xs font-bold uppercase tracking-widest z-10">Built by Corpers for Nigerian Excellence</p>
      </div>

      {/* Right: Signup Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-20 relative overflow-y-auto">
        <Link to="/" className="absolute top-8 left-8 flex items-center text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>

        <div className="w-full max-w-md py-12">
          <div className="text-center md:text-left mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 font-medium">Get your personalized NYSC roadmap in seconds.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                <User className="w-3 h-3 mr-1.5" /> Full Name
              </label>
              <input 
                type="text" 
                placeholder="Adebayo Chinedu"
                required
                className="input-standard w-full py-3.5 px-5 bg-gray-50 border-gray-100 focus:bg-white transition-all text-sm font-medium"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                <Mail className="w-3 h-3 mr-1.5" /> Email Address
              </label>
              <input 
                type="email" 
                placeholder="adebayo@example.com"
                required
                className={`input-standard w-full py-3.5 px-5 bg-gray-50 transition-all text-sm font-medium ${errors.email ? 'border-red-300 focus:border-red-500 ring-red-100' : 'border-gray-100'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="mt-1.5 text-[11px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                <Lock className="w-3 h-3 mr-1.5" /> Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Minimum 8 characters"
                  required
                  className={`input-standard w-full py-3.5 px-5 bg-gray-50 transition-all text-sm font-medium pr-12 ${errors.password ? 'border-red-300 focus:border-red-500 ring-red-100' : 'border-gray-100'}`}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-[11px] text-red-500 font-bold uppercase tracking-wider">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Re-enter password"
                required
                className={`input-standard w-full py-3.5 px-5 bg-gray-50 transition-all text-sm font-medium ${errors.confirm ? 'border-red-300 focus:border-red-500 ring-red-100' : 'border-gray-100'}`}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              {errors.confirm && <p className="mt-1.5 text-[11px] text-red-500 font-bold uppercase tracking-wider">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start pt-2">
              <input 
                type="checkbox" 
                id="terms"
                className="mt-1 w-4 h-4 text-brand-primary rounded border-gray-300 focus:ring-brand-primary transition-all"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
              />
              <label htmlFor="terms" className="ml-3 text-xs font-medium text-gray-500 leading-relaxed">
                I agree to the <Link to="/terms" className="text-brand-primary font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-primary font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={!isFormValid}
              className={`btn-primary w-full py-4 text-base font-bold shadow-xl transition-all ${!isFormValid ? 'opacity-50 cursor-not-allowed grayscale' : 'shadow-green-100 hover:scale-[1.02] active:scale-95'}`}
            >
              Create Account
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-white px-4 text-gray-400">Or signup with</span></div>
            </div>

            <button className="btn-secondary w-full mt-6 py-4 flex items-center justify-center font-bold text-gray-700 bg-white border-gray-200 hover:bg-gray-50 transition-all text-sm">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
              Google Account
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-gray-500">
            Already have an account? <Link to="/login" className="text-brand-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
