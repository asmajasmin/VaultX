import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Mail, Lock, ArrowRight, Eye, EyeOff,
  ChevronLeft, Loader2
} from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  // --- Form State ---
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Authenticated Submit Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('vaultToken', data.token);
        localStorage.removeItem('pendingVerificationEmail');
        
        if (onLoginSuccess) onLoginSuccess();
        navigate('/dashboard');
      } else {
        alert(data.msg || "Authentication failed.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Critical Error: Vault login node unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-full flex bg-[#F1EFEC] text-[#030303] font-sans overflow-hidden">
      
      {/* --- LEFT SIDE: BRANDING (Hidden on Mobile) --- */}
      {/* Heavy Navy Blue Background using exact #123458 */}
      <div className="relative hidden lg:flex flex-col justify-between w-5/12 bg-[#123458] p-12 overflow-hidden selection:bg-[#D4C9BE]/30">
        
        {/* Subtle Luxury Glows (Not AI style, just physical depth) */}
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-[#D4C9BE]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-[#F1EFEC]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div onClick={() => navigate('/')} className="relative z-10 flex items-center gap-3 cursor-pointer group w-fit">
          <div className="bg-[#F1EFEC] p-2.5 rounded-xl text-[#123458] shadow-lg group-hover:scale-105 transition-transform duration-300">
            <ShieldCheck size={26} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-widest text-[#F1EFEC] font-serif uppercase">VaultX</span>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 space-y-8 max-w-sm mb-12">
          <h2 className="text-5xl xl:text-6xl font-black text-[#F1EFEC] leading-[1.1] font-serif tracking-wide">
            The keys to <br />
            <span className="text-[#D4C9BE] italic">your legacy.</span>
          </h2>
          <p className="text-[#F1EFEC]/80 text-lg leading-relaxed font-medium">
            Experience absolute privacy with military-grade encryption and zero-knowledge architecture.
          </p>
          
          <div className="w-16 h-1 bg-[#D4C9BE]/50 rounded-full mt-8"></div>
        </div>
        
        {/* Bottom Detail */}
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4C9BE]/60">
            Absolute Sovereign Privacy
          </span>
        </div>
      </div>

      {/* --- RIGHT SIDE: LOGIN FORM --- */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 relative selection:bg-[#123458]/20">
        
        {/* Floating Navigation Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#123458]/60 hover:text-[#123458] transition-colors group"
        >
          <div className="bg-[#D4C9BE]/20 border border-[#D4C9BE] p-1.5 rounded-full group-hover:bg-[#D4C9BE]/40 transition-colors">
             <ChevronLeft size={16} strokeWidth={3} />
          </div>
          Go Back
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex justify-center mb-10 mt-12">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
           <div className="bg-[#123458] p-2.5 rounded-xl shadow-lg">
             <ShieldCheck className="text-[#F1EFEC] w-7 h-7" />
           </div>
           <span className="text-3xl font-black tracking-widest text-[#123458] font-serif uppercase">VaultX</span>
          </div>
        </div>

        {/* Core Form Container */}
        <div className="w-full max-w-[400px] mx-auto">
          
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-[#123458] font-serif tracking-widest">
              Welcome Back
            </h1>
            <p className="mt-3 text-[#123458]/70 text-lg font-medium">
              Please enter your details to sign in.
            </p>
          </div>

<<<<<<< HEAD
=======
        
        </div>
        <div className="z-10 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-[#D4C9BE]/50"></div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative h-full bg-[#F1EFEC]">
        <div className="absolute top-8 right-8 flex items-center gap-4 z-50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE]/30 hover:bg-[#D4C9BE]/50 border border-[#D4C9BE] rounded-xl text-[#123458] transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
          >
            <ChevronLeft size={16} strokeWidth={3} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="w-full max-w-sm space-y-8 animate-content-smooth">
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-[#123458] tracking-widest font-serif">Welcome Back</h2>
            <p className="text-[#123458]/60 font-medium">Please enter your details to sign in.</p>
          </div>

>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#123458] ml-1">Vault Email</label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedField === 'email' ? 'text-[#123458]' : 'text-[#D4C9BE]'}`}>
                  <Mail size={20} strokeWidth={2.5} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="name@gmail.com"
                  className="w-full bg-white border-2 border-[#D4C9BE]/50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#123458] focus:ring-4 focus:ring-[#123458]/5 transition-all font-semibold text-[#030303] shadow-sm hover:border-[#D4C9BE] placeholder:text-[#123458]/30"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
<<<<<<< HEAD
                <label className="text-[11px] font-black uppercase tracking-widest text-[#123458]">Password</label>
                <button 
                  type="button" 
                  onClick={() => navigate('/forgot-password')} 
                  className="text-[11px] font-black uppercase tracking-widest text-[#123458]/60 hover:text-[#123458] transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedField === 'password' ? 'text-[#123458]' : 'text-[#D4C9BE]'}`}>
                  <Lock size={20} strokeWidth={2.5} />
=======
                <label className="text-[12px] font-black uppercase tracking-widest text-[#123458]">Password</label>
             <button 
      type="button" 
      onClick={() => navigate('/forgot-password')} 
      className="text-[12px] font-black uppercase tracking-widest text-[#123458] hover:opacity-70 transition-opacity"
    >
      Forgot?
    </button>  </div>
              <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.01]' : ''}`}>
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'password' ? 'text-[#123458]' : 'text-[#D4C9BE]'}`}>
                  <Lock size={18} />
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border-2 border-[#D4C9BE]/50 rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#123458] focus:ring-4 focus:ring-[#123458]/5 transition-all font-semibold text-[#030303] shadow-sm hover:border-[#D4C9BE] placeholder:text-[#123458]/30"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4C9BE] hover:text-[#123458] transition-colors p-2 rounded-full"
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
                </button>
              </div>
            </div>

            {/* Premium Interactive Button */}
            <button 
              disabled={loading}
              className="relative group w-full bg-[#123458] overflow-hidden rounded-xl py-4 mt-4 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(18,52,88,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(18,52,88,0.6)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-[#F1EFEC]" />
              ) : (
                <span className="relative flex items-center gap-2 text-[#F1EFEC] font-black text-lg tracking-wide uppercase">
                  Sign in to Vault
                  <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Footer Area */}
          <div className="mt-10 text-center pt-8 border-t border-[#D4C9BE]/40">
            <p className="text-[#123458]/70 font-medium text-sm">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/register')} 
                className="text-[#123458] font-black ml-1 hover:opacity-70 transition-opacity underline decoration-2 underline-offset-4 decoration-[#D4C9BE] hover:decoration-[#123458]"
              >
                Sign up for free
              </button>
            </p>
          </div>

<<<<<<< HEAD
        </div>
      </div>
=======
     
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
    </div>
  );
};

export default LoginPage;