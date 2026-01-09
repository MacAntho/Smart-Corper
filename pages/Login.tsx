import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Sparkles, CheckCircle, Eye, EyeOff, 
  Mail, Lock, ShieldCheck, Chrome, Loader2 
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    auth: ''
  });

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', auth: '' });

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we accept any login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      {/* Left: Branding/Marketing Section */}
      <div className="hidden md:flex md:w-1/2 bg-brand-primary p-20 flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-700/40 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
        
        <Link to="/" className="flex items-center space-x-3 text-white z-10 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-2xl">
            <span className="text-brand-primary font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight">SmartCorper</span>
        </Link>

        <div className="z-10 max-w-md">
          <h2 className="text-5xl font-extrabold text-white mb-8 leading-[1.1]">
            Welcome back, <br />
            <span className="text-green-200">Compatriot.</span>
          </h2>
          <p className="text-white/80 text-lg mb-12 font-medium leading-relaxed">
            Continue your journey towards a stress-free and impactful service year. Your personalized roadmap is waiting.
          </p>
          
          <div className="space-y-5">
            {[
              { icon: CheckCircle, text: 'Real-time Deadline Tracking' },
              { icon: Sparkles, text: 'AI-Powered PPA Advice' },
              { icon: ShieldCheck, text: 'Verified State Survival Guides' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-white/90 font-bold space-x-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5 shadow-sm">
                <item.icon className="w-6 h-6 text-green-300" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="z-10">
          <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
            Trusted by over 10,000+ corps members nationwide
          </p>
        </div>
      </div>

      {/* Right: Login Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-20 relative bg-white">
        <Link to="/" className="absolute top-8 left-8 md:left-20 flex items-center text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to home
        </Link>

        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Sign In</h1>
            <p className="text-gray-500 font-medium text-lg">Enter your details to access your account.</p>
          </div>

          {errors.auth && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-600 text-sm font-bold">
              <span className="mr-2">⚠️</span> {errors.auth}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2" /> Email Address
              </label>
              <input 
                type="email" 
                placeholder="corpermartins@example.com"
                required
                className={`input-standard w-full py-4 px-5 bg-gray-50 transition-all text-sm font-medium ${errors.email ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-100 focus:bg-white'}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="mt-1.5 text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-2" /> Password
                </label>
                <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-brand-primary hover:underline uppercase tracking-widest">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  className="input-standard w-full py-4 px-5 bg-gray-50 border-gray-100 focus:bg-white transition-all text-sm font-medium pr-14"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember"
                className="w-4 h-4 text-brand-primary rounded border-gray-300 focus:ring-brand-primary/20 transition-all cursor-pointer"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <label htmlFor="remember" className="ml-3 text-xs font-bold text-gray-500 uppercase tracking-widest cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 shadow-2xl shadow-green-100 text-lg font-bold flex items-center justify-center relative overflow-hidden active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="bg-white px-6 text-gray-400">Or continue with</span>
              </div>
            </div>

            <button className="btn-secondary w-full mt-8 py-4 flex items-center justify-center font-bold text-gray-700 bg-white border-gray-100 hover:bg-gray-50 transition-all shadow-sm group">
              <Chrome className="w-5 h-5 mr-3 text-red-500 group-hover:scale-110 transition-transform" />
              Google Account
            </button>
          </div>

          <p className="mt-12 text-center text-sm font-medium text-gray-500">
            Don't have an account yet? <br className="md:hidden" />
            <Link to="/signup" className="text-brand-primary font-extrabold hover:underline ml-1">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
