import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Mail, Lock, ArrowRight, Eye, EyeOff,
  ChevronLeft, CheckCircle2, LockKeyhole, Loader2
} from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  // --- NEW: Form State ---
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: Authenticated Submit Logic ---
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
        // 1. Store the JWT token for session persistence
        localStorage.setItem('vaultToken', data.token);
        
        // 2. Clear any local registration flags
        localStorage.removeItem('pendingVerificationEmail');
        
        // 3. Trigger app-level success state and navigate
        onLoginSuccess();
        navigate('/dashboard');
      } else {
        // Handle specific status codes from your authController
        // 403 = Not Verified, 401 = Wrong Credentials
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
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#F1EFEC] text-[#030303] overflow-hidden font-inter transition-colors duration-500 animate-page-smooth">
      
      {/* Brand / Visual Side */}
      <div className="hidden md:flex flex-col justify-between w-[40%] lg:w-[45%] bg-[#123458] p-12 relative overflow-hidden border-r border-[#D4C9BE]/20">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#D4C9BE]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#F1EFEC]/5 blur-[120px] rounded-full"></div>
        
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group z-10 w-fit">
          <div className="bg-[#F1EFEC] p-2.5 rounded-2xl shadow-xl shadow-black/20 text-[#123458] group-hover:scale-110 transition-transform">
            <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-widest text-[#F1EFEC] font-serif">VaultX</span>
        </div>

        <div className="space-y-8 z-10 relative animate-content-smooth">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-[#ffffff] leading-[1.1] tracking-wider font-serif">
              The keys to your <br />
              <span className="text-[#ffffff]">Digital Sanctum.</span>
            </h1>
            <p className="text-[#D4C9BE]/80 text-lg font-medium max-w-sm leading-relaxed">
              Experience absolute privacy with military-grade encryption and zero-knowledge architecture.
            </p>
          </div>

          <div className="space-y-4 pt-4">
              {[
                "FIPS 140-2 Level 3 Hardware Security",
                "AES-256-GCM End-to-End Encryption",
                "Multi-Region Sovereign Redundancy"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#D4C9BE]">
                  <div className="w-5 h-5 rounded-full bg-[#F1EFEC]/10 flex items-center justify-center text-[#F1EFEC]">
                    <CheckCircle2 size={14} />
                  </div>
                  {feature}
                </div>
              ))}
          </div>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-black uppercase tracking-widest text-[#123458] ml-1">Vault Email</label>
              <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.01]' : ''}`}>
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'email' ? 'text-[#123458]' : 'text-[#D4C9BE]'}`}>
                  <Mail size={18} />
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
                  className="w-full bg-[#D4C9BE]/10 border-2 border-[#D4C9BE] rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#123458] transition-all font-semibold text-[#030303] shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[12px] font-black uppercase tracking-widest text-[#123458]">Cryptographic Key</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#123458] hover:opacity-70">Forgot?</button>
              </div>
              <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.01]' : ''}`}>
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'password' ? 'text-[#123458]' : 'text-[#D4C9BE]'}`}>
                  <Lock size={18} />
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
                  className="w-full bg-[#D4C9BE]/10 border border-[#D4C9BE] rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#123458] transition-all font-semibold text-[#030303] shadow-inner"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4C9BE] hover:text-[#123458] transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="group w-full bg-[#123458] hover:opacity-95 disabled:opacity-50 text-[#F1EFEC] py-4 rounded-full font-black text-lg transition-all shadow-xl shadow-[#123458]/20 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Sign in to Vault
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#123458]/60 font-medium text-sm">
              Don't have an account?
              <button onClick={() => navigate('/register')} className="ml-2 text-[#123458] font-black hover:underline">
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 hidden lg:flex items-center gap-3 p-4 bg-[#F1EFEC]/80 backdrop-blur-xl border border-[#D4C9BE] rounded-[1.5rem] shadow-2xl z-50">
        <div className="w-10 h-10 rounded-xl bg-[#123458]/5 flex items-center justify-center text-[#123458]">
          <LockKeyhole size={20} />
        </div>
        <div className="text-left">
          <p className="text-[9px] font-black text-[#123458] uppercase tracking-widest">Client-Side Verification</p>
          <p className="text-[8px] text-[#D4C9BE] mt-1 uppercase tracking-[0.2em]">End-to-End Encryption Active</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;