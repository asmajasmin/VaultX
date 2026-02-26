import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft, Loader, ShieldAlert, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // UI State
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: New Password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });
  
  // Form Data
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });

  // STEP 1: VERIFY EMAIL
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ msg: '', type: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setStep(2); // Move to password reset step
        setStatus({ msg: '', type: '' });
      } else {
        setStatus({ msg: data.message || "Email not found.", type: 'error' });
      }
    } catch (error) {
      setStatus({ msg: "Network error. Please try again.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 2: RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus({ msg: '', type: '' });

    if (passwords.new !== passwords.confirm) {
      setStatus({ msg: "Passwords do not match.", type: 'error' });
      return;
    }
    if (passwords.new.length < 6) {
      setStatus({ msg: "Password must be at least 6 characters.", type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: passwords.new })
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ msg: "Password successfully reset! Redirecting to login...", type: 'success' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setStatus({ msg: data.message || "Failed to reset password.", type: 'error' });
      }
    } catch (error) {
      setStatus({ msg: "Network error. Please try again.", type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EFEC] flex items-center justify-center p-6 font-inter relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#123458]/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4C9BE]/30 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-md bg-white border border-[#D4C9BE]/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#123458] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#123458]/20">
            <ShieldCheck size={32} className="text-[#F1EFEC]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#123458] font-serif mb-2">
            {step === 1 ? 'Recover Vault' : 'Reset Protocol'}
          </h2>
          <p className="text-[#123458]/60 text-sm font-medium">
            {step === 1 
              ? 'Enter your registered email to verify your identity.' 
              : 'Secure your vault with a new cryptographic key.'}
          </p>
        </div>

        {/* Status Messages */}
        {status.msg && (
          <div className={`text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 mb-6 ${status.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
            {status.type === 'error' ? <ShieldAlert size={16}/> : <CheckCircle size={16}/>}
            {status.msg}
          </div>
        )}

        {/* STEP 1 FORM: EMAIL VERIFICATION */}
        {step === 1 && (
          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#123458] ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#123458]/40" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-[#F1EFEC] border-2 border-transparent focus:bg-white focus:border-[#123458] rounded-xl pl-11 pr-4 py-4 text-sm font-bold text-[#123458] outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#123458] text-[#F1EFEC] py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all flex justify-center items-center gap-2 shadow-xl shadow-[#123458]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader size={18} className="animate-spin" /> : <>Verify Identity <ArrowRight size={18} /></>}
            </button>
          </form>
        )}

        {/* STEP 2 FORM: NEW PASSWORD */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-5 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#123458] ml-1">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#123458]/40" />
                </div>
                <input 
                  type="password" 
                  required
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  placeholder="Min. 6 characters" 
                  className="w-full bg-[#F1EFEC] border-2 border-transparent focus:bg-white focus:border-[#123458] rounded-xl pl-11 pr-4 py-4 text-sm font-bold text-[#123458] outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#123458] ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#123458]/40" />
                </div>
                <input 
                  type="password" 
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  placeholder="Re-enter password" 
                  className="w-full bg-[#F1EFEC] border-2 border-transparent focus:bg-white focus:border-[#123458] rounded-xl pl-11 pr-4 py-4 text-sm font-bold text-[#123458] outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all flex justify-center items-center gap-2 shadow-xl shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? <Loader size={18} className="animate-spin" /> : <>Reset Password <ShieldCheck size={18} /></>}
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => navigate('/login')} 
            className="text-xs font-bold text-[#123458]/60 hover:text-[#123458] transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft size={14} /> Return to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;