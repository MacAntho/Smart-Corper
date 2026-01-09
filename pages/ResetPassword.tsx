
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, EyeOff, CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwords, setPasswords] = useState({
    new: '',
    confirm: ''
  });

  const getStrength = () => {
    if (!passwords.new) return 0;
    let strength = 0;
    if (passwords.new.length >= 8) strength += 25;
    if (/[A-Z]/.test(passwords.new)) strength += 25;
    if (/[0-9]/.test(passwords.new)) strength += 25;
    if (/[^A-Za-z0-9]/.test(passwords.new)) strength += 25;
    return strength;
  };

  const strength = getStrength();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return;
    
    setIsLoading(true);
    // Simulate reset delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">New Password</h1>
          <p className="text-gray-500 font-medium">Create a strong password that you haven't used before.</p>
        </div>

        {isSuccess ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="w-10 h-10 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Password Updated!</h3>
              <p className="text-sm text-gray-500 font-medium">
                Your password has been reset successfully. You can now use your new password to sign in.
              </p>
            </div>
            <Link to="/login" className="btn-primary w-full py-4 flex items-center justify-center text-lg font-bold">
              Sign In <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="input-standard w-full py-4 pl-12 pr-12 bg-gray-50 border-gray-100 focus:bg-white transition-all text-sm font-medium"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength Meter */}
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strength</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    strength <= 25 ? 'text-red-500' : strength <= 75 ? 'text-orange-500' : 'text-brand-primary'
                  }`}>
                    {strength <= 25 ? 'Weak' : strength <= 75 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      strength <= 25 ? 'bg-red-500' : strength <= 75 ? 'bg-orange-500' : 'bg-brand-primary'
                    }`}
                    style={{ width: `${strength}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className={`input-standard w-full py-4 pl-12 pr-5 bg-gray-50 transition-all text-sm font-medium ${
                    passwords.confirm && passwords.new !== passwords.confirm ? 'border-red-300' : 'border-gray-100'
                  }`}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                />
              </div>
              {passwords.confirm && passwords.new !== passwords.confirm && (
                <p className="mt-1.5 text-[10px] text-red-500 font-bold uppercase tracking-widest">Passwords do not match</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading || strength < 25 || passwords.new !== passwords.confirm}
              className="btn-primary w-full py-4 shadow-xl shadow-green-100 text-lg font-bold flex items-center justify-center disabled:opacity-70 active:scale-[0.98] transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-12">
        <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
