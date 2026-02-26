import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Mail, Lock, User, ArrowRight, ChevronLeft, 
  CreditCard, Zap, Building2, ShieldAlert, Eye, EyeOff // <--- Imported Eye Icons
} from 'lucide-react';

const RegisterPage = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState('account');
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  // Toggle Visibility States
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const pricingTiers = [
    { name: "Personal", price: 0, icon: User, features: ["1GB Storage", "Basic Security"] },
    { name: "Professional", price: 600, icon: Zap, features: ["15GB Storage", "AI Security", "Priority Support"] },
    { name: "Enterprise", price: 2000, icon: Building2, features: ["Unlimited", "Hardware Keys", "SSO"] }
  ];

  // --- REGEX PATTERNS ---
  const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, 
    card: /^\d{16}$/,
    expiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
    cvc: /^\d{3,4}$/
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    if (step === 'account') {
      if (!formData.name.trim()) { newErrors.name = "Full name is required."; isValid = false; }
      if (!formData.email.trim()) { newErrors.email = "Email is required."; isValid = false; } 
      else if (!PATTERNS.email.test(formData.email)) { newErrors.email = "Invalid email address."; isValid = false; }

      if (!formData.password) { newErrors.password = "Password is required."; isValid = false; } 
      else if (!PATTERNS.password.test(formData.password)) { newErrors.password = "Requires 8+ chars, 1 Upper, 1 Lower, 1 Number & 1 Special Char."; isValid = false; }

      if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = "Passwords do not match."; isValid = false; }
    }

    if (step === 'payment') {
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      if (!PATTERNS.card.test(cleanCard)) { newErrors.cardNumber = "Invalid card number (16 digits)."; isValid = false; }
      if (!PATTERNS.expiry.test(formData.expiry)) { newErrors.expiry = "Format: MM/YY"; isValid = false; }
      if (!PATTERNS.cvc.test(formData.cvc)) { newErrors.cvc = "Invalid CVC."; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (!validateStep()) return;
    if (step === 'account') {
      setStep('plan');
    } else if (step === 'plan') {
      if (pricingTiers[selectedPlan].price === 0) {
        completeRegistration(); 
      } else {
        setStep('payment'); 
      }
    } else if (step === 'payment') {
      completeRegistration();
    }
  };

  const completeRegistration = async () => {
    setLoading(true);
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      tier: pricingTiers[selectedPlan].name,
      cardData: pricingTiers[selectedPlan].price > 0 ? {
        cardNumber: formData.cardNumber,
        expiry: formData.expiry,
        cvc: formData.cvc
      } : null
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        alert(data.msg || "Registry node failure.");
      }
    } catch (error) {
      alert("Critical Error: Vault server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  const getStepBranding = () => {
    switch(step) {
      case 'account': return { tag: "Identity Protocol", title: "Claim your space in the vault.", desc: "Create your decentralized profile in seconds.", icon: <User size={40} className="text-[#123458]" /> };
      case 'plan': return { tag: "Scaling Access", title: "Choose your level of protection.", desc: "Pick the tier that matches your security needs.", icon: <Zap size={40} className="text-[#123458]" /> };
      case 'payment': return { tag: "Secure Settlement", title: "Finalizing your digital sanctum.", desc: "Billing info is protected by zero-leakage bridges.", icon: <ShieldCheck size={40} className="text-[#123458]" /> };
      default: return {};
    }
  };

  const branding = getStepBranding();
  const labelClass = "text-[12px] font-black uppercase tracking-widest text-[#123458] ml-1 mb-1.5 block";
  
  // UPDATED: Changed pr-4 to pr-12 to make room for the eye icon
  const inputClass = "w-full bg-[#D4C9BE]/10 border-2 border-[#D4C9BE] rounded-2xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-[#123458]/5 focus:border-[#123458] transition-all font-semibold text-[#030303] shadow-inner placeholder:text-[#123458]/30";
  
  const errorInputClass = "border-rose-500 focus:border-rose-500 bg-rose-50/50";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-[#D4C9BE] group-focus-within:text-[#123458] transition-colors duration-300";

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F1EFEC] text-[#030303] font-inter overflow-y-auto">
      {/* Visual Side */}
      <div className="hidden md:flex flex-col justify-between w-[35%] lg:w-[40%] bg-[#123458] p-12 relative text-[#F1EFEC] shadow-2xl overflow-hidden">
        <div className="z-10 space-y-8">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group w-fit">
            <div className="bg-[#F1EFEC] p-2.5 rounded-2xl text-[#123458] group-hover:scale-110 transition-transform"><ShieldCheck size={28} /></div>
            <span className="text-2xl font-black font-serif">VaultX</span>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEC]/10 border border-[#D4C9BE]/30 text-[10px] font-black uppercase tracking-[0.3em]"><Zap size={12} className="animate-pulse" /> {branding.tag}</div>
            <h1 className="text-6xl font-black font-serif leading-tight">{branding.title}</h1>
            <p className="text-[#D4C9BE]/80 text-lg font-medium max-w-sm">{branding.desc}</p>
          </div>
        </div>
        <p className="z-10 text-[10px] font-bold text-[#D4C9BE]/40 uppercase tracking-[0.2em]">Verified Security System &copy; 2026</p>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col relative bg-[#F1EFEC] p-8 md:p-12 lg:p-20 py-24 min-h-screen">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4C9BE]/30">
          <div className="h-full bg-[#123458] transition-all duration-700" style={{ width: step === 'account' ? '33%' : step === 'plan' ? '66%' : '100%' }}></div>
        </div>

        <div className="w-full max-w-xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-[#123458] font-serif">{step === 'account' ? 'Create Account' : step === 'plan' ? 'Select Plan' : 'Secure Billing'}</h2>
            <p className="text-[#123458]/60 font-medium">Please provide the necessary details below.</p>
          </div>

          <div className="min-h-[380px]">
             <div className="absolute top-8 right-8 flex items-center gap-4 z-50">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 bg-[#D4C9BE]/30 hover:bg-[#D4C9BE]/50 border border-[#D4C9BE] rounded-xl text-[#123458] transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
              >
                <ChevronLeft size={16} strokeWidth={3} />
                <span>Go Back</span>
              </button>
            </div>

            {/* --- STEP 1: ACCOUNT --- */}
            {step === 'account' && (
              <div className="space-y-5 animate-content-smooth">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Full Name</label>
                    <div className="relative group">
                      <User className={`${iconClass} ${errors.name ? 'text-rose-500' : ''}`} size={18} />
                      <input name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Aswin" className={`${inputClass} ${errors.name ? errorInputClass : ''}`} />
                    </div>
                    {errors.name && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Email</label>
                    <div className="relative group">
                      <Mail className={`${iconClass} ${errors.email ? 'text-rose-500' : ''}`} size={18} />
                      <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="aswin@gmail.com" className={`${inputClass} ${errors.email ? errorInputClass : ''}`} />
                    </div>
                    {errors.email && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* --- PASSWORD FIELD WITH EYE --- */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Password</label>
                    <div className="relative group">
                      <Lock className={`${iconClass} ${errors.password ? 'text-rose-500' : ''}`} size={18} />
                      <input 
                        name="password" 
                        type={showPass ? "text" : "password"} 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        placeholder="••••••••" 
                        className={`${inputClass} ${errors.password ? errorInputClass : ''}`} 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4C9BE] hover:text-[#123458] transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[10px] font-bold text-rose-500 ml-1 leading-tight">{errors.password}</p>}
                  </div>

                  {/* --- CONFIRM PASSWORD FIELD WITH EYE --- */}
                  <div className="space-y-1.5">
                    <label className={labelClass}>Confirm Password</label>
                    <div className="relative group">
                      <ShieldAlert className={`${iconClass} ${errors.confirmPassword ? 'text-rose-500' : ''}`} size={18} />
                      <input 
                        name="confirmPassword" 
                        type={showConfirm ? "text" : "password"} 
                        value={formData.confirmPassword} 
                        onChange={handleInputChange} 
                        placeholder="••••••••" 
                        className={`${inputClass} ${errors.confirmPassword ? errorInputClass : ''}`} 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4C9BE] hover:text-[#123458] transition-colors"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: PLAN --- */}
            {step === 'plan' && (
              <div className="space-y-4 animate-content-smooth">
                {pricingTiers.map((tier, i) => (
                  <button key={i} onClick={() => setSelectedPlan(i)} className={`w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all ${selectedPlan === i ? 'border-[#123458] bg-white ring-4 ring-[#123458]/5 shadow-md' : 'border-[#D4C9BE]/30 bg-[#D4C9BE]/10 hover:border-[#D4C9BE]'}`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedPlan === i ? 'bg-[#123458] text-[#F1EFEC]' : 'bg-[#D4C9BE]/30 text-[#123458]'}`}><tier.icon size={22} /></div>
                      <div className="text-left"><h4 className="font-black text-[#123458]">{tier.name}</h4><div className="flex gap-2 mt-1">{tier.features.map((f, idx) => <span key={idx} className="text-[9px] font-black uppercase text-[#123458]/40 border border-[#D4C9BE]/30 px-2 rounded-md">{f}</span>)}</div></div>
                    </div>
                    <p className="text-xl font-black text-[#123458]">₹{tier.price}</p>
                  </button>
                ))}
              </div>
            )}

            {/* --- STEP 3: PAYMENT --- */}
            {step === 'payment' && (
              <div className="space-y-6 animate-content-smooth">
                <div className="bg-[#123458] p-6 rounded-3xl text-[#F1EFEC] flex justify-between items-center shadow-xl border border-white/5">
                  <div><p className="text-[10px] font-black uppercase opacity-50">Selected Plan</p><p className="text-xl font-black">{pricingTiers[selectedPlan].name} Tier</p></div>
                  <p className="text-2xl font-black">₹{pricingTiers[selectedPlan].price}.00</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Card Information</label>
                    <div className="relative group">
                      <CreditCard className={`${iconClass} ${errors.cardNumber ? 'text-rose-500' : ''}`} size={18} />
                      <input name="cardNumber" type="text" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className={`${inputClass} ${errors.cardNumber ? errorInputClass : ''}`} />
                    </div>
                    {errors.cardNumber && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <input name="expiry" type="text" value={formData.expiry} onChange={handleInputChange} placeholder="MM / YY" className={`${inputClass.replace('pl-12', 'pl-6')} ${errors.expiry ? errorInputClass : ''}`} />
                      {errors.expiry && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.expiry}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <input name="cvc" type="text" value={formData.cvc} onChange={handleInputChange} placeholder="CVC" className={`${inputClass.replace('pl-12', 'pl-6')} ${errors.cvc ? errorInputClass : ''}`} />
                      {errors.cvc && <p className="text-[10px] font-bold text-rose-500 ml-1">{errors.cvc}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4">
            {step !== 'account' && (
              <button onClick={() => setStep(step === 'payment' ? 'plan' : 'account')} className="p-5 bg-[#D4C9BE]/30 text-[#123458] rounded-2xl border border-[#D4C9BE] shadow-sm active:scale-95"><ChevronLeft size={24} strokeWidth={3} /></button>
            )}
            <button disabled={loading} onClick={handleNextStep} className="flex-1 relative bg-[#123458] text-[#F1EFEC] py-5 px-8 rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#123458]/20 active:scale-[0.98] disabled:opacity-50 hover:-translate-y-1 overflow-hidden">
              <div className="flex items-center justify-center gap-4 relative z-10">
                {loading ? <div className="w-6 h-6 border-[3px] border-[#F1EFEC]/30 border-t-[#F1EFEC] rounded-full animate-spin"></div> : <>{step === 'payment' ? 'Secure Finalization' : 'Proceed Forward'} <ArrowRight size={22} className="group-hover:translate-x-2 transition-all" /></>}
              </div>
            </button>
          </div>
          <p className="text-center text-[#123458]/60 font-medium text-sm">Already a resident? <button onClick={() => navigate('/login')} className="ml-2 text-[#123458] font-black hover:underline">Sign In</button></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;