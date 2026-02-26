import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Cloud, Share2, ShieldAlert, FileText, Lock, Shield, 
  Zap, Building2, CheckCircle2, ChevronDown, User 
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; // <--- Import the new component

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Pricing & FAQ States
  const [isYearly, setIsYearly] = useState(true);
  const [hoveredTier, setHoveredTier] = useState(1);
  const [openFaq, setOpenFaq] = useState(2);

  // --- IMAGE LOADING ---
  useEffect(() => {
    const img = new Image();
    img.src = "/heroimage.png";
    img.onload = () => {
      setTimeout(() => setLoading(false), 500); 
    };
  }, []);

  // --- SKELETON LOADER ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1EFEC] px-6 pt-24 pb-12">
        <Navbar /> {/* Show Navbar even during loading */}
        <div className="max-w-vault mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center h-full">
          <div className="space-y-8 animate-pulse">
            <div className="w-48 h-8 bg-[#123458]/10 rounded-full" />
            <div className="space-y-4">
              <div className="w-full h-20 bg-[#123458]/10 rounded-3xl" />
              <div className="w-3/4 h-20 bg-[#123458]/10 rounded-3xl" />
            </div>
          </div>
          <div className="hidden lg:block h-[600px] w-full bg-[#123458]/5 rounded-[3.5rem] animate-pulse" />
        </div>
      </div>
    );
  }

  // --- MAIN CONTENT ---
  return (
    <div id="top" className="min-h-screen bg-[#F1EFEC] text-[#030303] selection:bg-[#123458]/30 overflow-x-hidden font-inter animate-in fade-in duration-700"> 
      
      {/* REUSABLE NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* ... (Keep your Hero Section code exactly as it was) ... */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#123458]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4C9BE]/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-vault mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#123458]/5 border border-[#D4C9BE] text-[10px] font-black text-[#123458] uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-[#123458] animate-pulse" />
              Vault Status: Secure
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#123458] tracking-tighter leading-[0.95] font-serif">
              Your Digital <br />
              <span className="text-[#030303]">Legacy, Under <br /> Absolute Lock.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#123458]/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience the world's first zero-knowledge document sanctum. Built for those who demand absolute sovereign privacy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button onClick={() => navigate('/register')} className="w-full sm:w-auto bg-[#123458] text-[#F1EFEC] px-10 py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-[#123458]/20 hover:-translate-y-1">
                Begin Enrollment
              </button>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-5 border border-[#D4C9BE] text-[#123458] rounded-2xl font-bold text-lg hover:bg-[#D4C9BE]/10 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative group hidden lg:block perspective-1000">
            <div className="relative z-30 bg-[#F1EFEC]/40 backdrop-blur-xl border border-[#D4C9BE]/50 p-4 rounded-[3rem] shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
                <img 
                  src="/heroimage.png" 
                  alt="Vault Interface" 
                  className="w-full h-auto rounded-[2.5rem] shadow-inner" 
                />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 bg-[#F1EFEC]">
        {/* ... (Keep Features code exactly as it was) ... */}
         <div className="max-w-vault mx-auto text-center">
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-wider text-[#123458] font-serif">Manage files privately with confidence</h2>
            <p className="text-xl text-[#123458]/70 leading-relaxed font-medium">VaultX keeps your data accessible without compromising its security thanks to zero-knowledge architecture and limitless end-to-end encryption.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Encrypted cloud storage",
                desc: "Upload files to the cloud storage and sync it across your devices and platforms. Complete access control and saves space on your device.",
                icon: Cloud,
                illustration: (
                  <div className="relative w-48 h-48 bg-[#123458]/5 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute -bottom-4 bg-[#123458] w-32 h-32 rounded-3xl rotate-12 flex items-center justify-center shadow-xl"><User size={64} className="text-[#F1EFEC] -rotate-12" /></div>
                    <div className="absolute top-4 right-4 bg-[#F1EFEC] p-2 rounded-lg shadow-lg rotate-6 border border-[#D4C9BE]"><FileText size={24} className="text-[#123458]" /></div>
                  </div>
                )
              },
              {
                title: "Private file sharing",
                desc: "Share your encrypted files via email or a link with anyone. A unique code adds an extra layer of security to your items.",
                icon: Share2,
                illustration: (
                  <div className="relative w-48 h-48 bg-[#D4C9BE]/20 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="bg-[#F1EFEC] w-24 h-44 rounded-2xl border-4 border-[#123458] shadow-2xl flex flex-col items-center justify-center relative"><Lock size={32} className="text-[#123458]" /></div>
                  </div>
                )
              },
              {
                title: "No leaks or stolen files",
                desc: "Keep your personal files for your eyes only. Your data is backed up and protected from unauthorized access and malware.",
                icon: ShieldAlert,
                illustration: (
                  <div className="relative w-48 h-48 bg-[#F1EFEC] border border-[#D4C9BE] rounded-full flex items-center justify-center"><Shield size={64} className="text-[#123458] fill-[#123458]/5" /></div>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#F1EFEC] border border-[#D4C9BE] rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="mb-10 transform group-hover:scale-110 transition-transform duration-500">{feature.illustration}</div>
                <h3 className="text-2xl font-black mb-4 text-[#123458] font-serif">{feature.title}</h3>
                <p className="text-[#123458]/60 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 bg-[#D4C9BE]/10 border-y border-[#D4C9BE]">
        {/* ... (Keep Pricing code exactly as it was) ... */}
        <div className="max-w-vault mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black mb-12 text-[#123458] font-serif">Professional Tiers</h2>
            <div className="flex items-center justify-center gap-4 text-sm font-bold">
              <span className={!isYearly ? "text-[#123458]" : "text-[#123458]/40"}>Monthly</span>
              <button onClick={() => setIsYearly(!isYearly)} className="w-12 h-6 bg-[#D4C9BE] rounded-full p-1 transition-colors hover:bg-[#D4C9BE]/80">
                <div className={`w-4 h-4 bg-[#123458] rounded-full transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <span className={isYearly ? "text-[#123458]" : "text-[#123458]/40"}>Yearly <span className="text-[10px] bg-[#123458]/10 text-[#123458] px-2 py-0.5 rounded-full">-50%</span></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {[
              { name: "Personal", price: 0, icon: User },
              { name: "Professional", price: isYearly ? 300 : 600, icon: Zap },
              { name: "Enterprise", price: 2000, icon: Building2 }
            ].map((tier, i) => (
              <div key={i} onMouseEnter={() => setHoveredTier(i)} className={`p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 cursor-default ${hoveredTier === i ? 'bg-[#123458] text-[#F1EFEC] scale-105 shadow-2xl z-10' : 'bg-[#F1EFEC] text-[#030303] border border-[#D4C9BE]'}`}>
                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${hoveredTier === i ? 'bg-white/10' : 'bg-[#123458]/5'}`}><tier.icon size={24} className={hoveredTier === i ? 'text-[#F1EFEC]' : 'text-[#123458]'} /></div>
                  <h3 className="text-xl font-black mb-2">{tier.name}</h3>
                  <span className="text-4xl font-black">₹{tier.price}</span><span className="text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {["E2E Encryption", "AI Security Audits", "Cross-Platform Sync", "Priority Support"].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className={hoveredTier === i ? 'text-[#D4C9BE]' : 'text-[#123458]'} />{feat}</li>
                  ))}
                </ul>
                <button onClick={() => navigate('/register')} className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${hoveredTier === i ? 'bg-[#F1EFEC] text-[#123458] hover:bg-white' : 'bg-[#123458] text-[#F1EFEC] hover:opacity-90'}`}>Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-6 bg-[#F1EFEC]">
        {/* ... (Keep FAQ code exactly as it was) ... */}
         <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12 text-[#123458] font-serif">Frequently asked questions</h2>
          <div className="border-t border-[#D4C9BE]/50 w-full">
            {[
              { q: "What is VaultX?", a: "VaultX is a military-grade digital sovereign sanctum designed to protect your most sensitive documents through advanced client-side encryption and zero-knowledge storage protocols." },
              { q: "What does VaultX Premium offer?", a: "Premium provides 50GB of secure storage, AI-powered security auditing, biometric hardware key support, multi-device synchronization, and priority recovery services for elite users." },
              { q: "What is the benefit of end-to-end encryption?", a: "End-to-end encryption grants security and data ownership to the users. It ensures that their data remains private and inaccessible to anyone without appropriate authentication." },
              { q: "What platforms is VaultX available on?", a: "We are available as a secure Web platform, mobile apps for iOS and Android, and native desktop applications for Windows, macOS, and Linux to ensure your vault is always within reach." },
              { q: "What security methods does VaultX use?", a: "We utilize AES-256 for data at rest, TLS 1.3 for data in transit, and Argon2 for secure key derivation. We also strictly support FIDO2/WebAuthn for hardware-level biometric authentication." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D4C9BE]/50">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left px-4 md:px-8 hover:bg-[#D4C9BE]/10 transition-colors">
                  <span className={`text-lg md:text-xl font-bold ${openFaq === i ? 'text-[#123458]' : 'text-[#123458]/80'}`}>{faq.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}><ChevronDown size={20} /></div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                  <div className="text-sm md:text-base text-[#123458]/70 leading-relaxed font-medium px-4 md:px-8 max-w-3xl">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Welcome;