
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Building2, CheckCircle2, ChevronDown, User} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; 

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(true);
  const [hoveredTier, setHoveredTier] = useState(1);
  const [openFaq, setOpenFaq] = useState(2);

 
  useEffect(() => {
    const img = new Image();
    img.src = "/heroimage.png";
    img.onload = () => {
      setTimeout(() => setLoading(false), 500); 
    };
  }, []);

 
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1EFEC] px-6 pt-24 pb-12">
        <Navbar /> 
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

  return (
    <div id="top" className="min-h-screen bg-[#F1EFEC] text-[#030303] selection:bg-[#123458]/30 overflow-x-hidden font-inter animate-in fade-in duration-700"> 
      
     
      <Navbar />

<<<<<<< HEAD
   <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#FAFBFF] font-sans">
      
      {/* --- ELITE GLOW BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Core Pulsating Mesh Gradients - Enhanced for a more vibrant, high-end SaaS feel */}
        <div className="absolute w-[800px] h-[800px] top-[-10%] -left-[10%] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-[100px] mix-blend-multiply opacity-80 animate-[pulse_8s_ease-in-out_infinite]" />
        
        <div className="absolute w-[600px] h-[600px] bottom-[-10%] -right-[5%] bg-gradient-to-tl from-blue-400/20 via-cyan-300/10 to-transparent rounded-full blur-[100px] mix-blend-multiply opacity-80 animate-[pulse_12s_ease-in-out_infinite]" />
        
        <div className="absolute w-[500px] h-[500px] top-[20%] left-[50%] -translate-x-1/2 bg-gradient-to-b from-indigo-400/10 to-pink-300/10 rounded-full blur-[80px] opacity-60 animate-[pulse_10s_ease-in-out_infinite]" />
        {/* Micro-Dot Grid Texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTgsIDUyLCA4OCwgMC4wOCkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)] opacity-60" />
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-8 items-center">
          
          {/* --- LEFT TEXT CONTENT --- */}
          {/* On mobile, this will perfectly absolute-center itself since the image is hidden */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left pt-4 lg:pt-0">
            
            {/* Highly Responsive Heading */}
            <h1 className="text-[2.75rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-extrabold text-[#0e0d55] tracking-tight font-serif px-2 sm:px-0">
              Your Digital Legacy,<br className="hidden sm:block" />
              {' '}
              <span className="relative inline-block mt-1 sm:mt-4 whitespace-normal lg:whitespace-nowrap">
                {/* Text Gradient */}
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#0e0d55] via-indigo-600 to-[#0e0d55] drop-shadow-sm">
                  Under Absolute Lock.
                </span>
                {/* Glowing SVG underline */}
                <svg className="absolute -bottom-1 md:-bottom-3 left-0 w-full h-2 sm:h-3 md:h-5 text-indigo-400/30 -z-10" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none"><path d="M2.5 9.5C80 -1.5 220 -1.5 297.5 9.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/></svg>
              </span>
            </h1>
            
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium px-4 sm:px-0">
              Experience the world's first zero-knowledge document sanctum. Built for those who demand absolute sovereign privacy for their most critical assets.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
              <button 
                onClick={() => navigate('/register')} 
                className="relative group w-full sm:w-auto overflow-hidden rounded-full bg-[#0e0d55] px-8 py-4 sm:px-10 sm:py-4 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_-10px_rgba(14,13,85,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(14,13,85,0.8)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2 text-white font-bold text-[1.05rem] sm:text-lg">
                  Begin Enrollment
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </button>
              
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} 
                className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-4 rounded-full border border-slate-300 bg-white/50 backdrop-blur-md text-[#0e0d55] font-bold text-[1.05rem] sm:text-lg transition-all hover:bg-white hover:border-slate-400 shadow-sm hover:shadow-md"
              >
                View Architecture
=======
     {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#123458]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4C9BE]/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-vault mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left mt-10 lg:mt-0">            
           <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-[#0e0d55] tracking-wide md:tracking-wide leading-[0.95] md:leading-[0.95] font-serif">
  Your Digital <br />
  <span className="text-[#030303]">Legacy, Under <br /> Absolute Lock.</span>
</h1>
            
           <p className="text-lg md:text-xl text-[#123458]/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience the world's first zero-knowledge document sanctum. Built for those who demand absolute sovereign privacy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onClick={() => navigate('/register')} className="w-full sm:w-auto bg-[#123458] text-[#F1EFEC] px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-[#123458]/20 hover:-translate-y-1">
                Begin Enrollment
              </button>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 md:px-8 md:py-5 border border-[#D4C9BE] text-[#123458] rounded-2xl font-bold text-lg hover:bg-[#D4C9BE]/10 transition-all">
                Learn More
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
              </button>
            </div>
            {/* Premium Trust Indicators */}
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-6 w-full justify-center lg:justify-start border-t lg:border-t-0 border-slate-200/60 lg:pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm transform transition-transform hover:-translate-y-1" src={`https://i.pravatar.cc/100?img=${i+40}`} alt="Trusted User" />
                ))}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 leading-snug">
                Trusted by <span className="font-bold text-[#0e0d55]">1,000+</span><br className="hidden sm:block"/> high-net-worth individuals.
              </div>
            </div>
          </div>
          {/* --- RIGHT 3D GLOW MOCKUP --- */}
          {/* HIDDEN ON MOBILE AND TABLET using `hidden lg:block` */}
          <div className="hidden lg:block lg:col-span-5 relative w-full mx-auto lg:max-w-none perspective-[2000px]">
            
            {/* The Ultimate Ambient Glow Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/40 via-purple-400/30 to-blue-500/30 blur-[80px] scale-110 rounded-full animate-pulse object-cover" style={{ animationDuration: '4s' }} />
            {/* Application Mockup Container */}
            <div className="relative z-10 w-full group transition-all duration-700 ease-out hover:scale-[1.02] hover:-translate-y-2 lg:[transform:rotateY(-8deg)_rotateX(4deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] cursor-pointer">
              
              {/* Ultra Smooth Outer Border Glow */}
              <div className="absolute -inset-[3px] bg-gradient-to-b from-white/90 to-white/10 rounded-[2.1rem] opacity-70 group-hover:opacity-100 transition duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
              
              {/* Glass Window Shell - Sleek and Modern */}
              <div className="relative bg-white/70 backdrop-blur-3xl border border-white/60 p-2 sm:p-3 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(14,13,85,0.25)] flex flex-col justify-center items-center overflow-hidden">
                  
                  {/* Subtle Top Inner Edge Highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  {/* MacOS Style App Header / Browser Bar */}
                  <div className="w-full flex items-center gap-2 px-3 pt-2 pb-3 mb-1">
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm"></div>
                    </div>
                  </div>
                  {/* Vault Screenshot Area */}
                  <div className="relative w-full overflow-hidden rounded-[1.2rem] border border-slate-200/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)] bg-[#fafafa]">
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[1.2rem] pointer-events-none z-10" />
                    <img 
                      src="/heroimage.png" 
                      alt="Vault Interface" 
                      className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-[1.04]" 
                    />
                  </div>
              </div>
            </div>
            
            {/* Under-shadow for a floating effect */}
            <div className="absolute -bottom-8 left-10 right-10 h-8 bg-[#0e0d55]/10 blur-2xl rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>

     {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 bg-[#F1EFEC]">
         <div className="max-w-vault mx-auto text-center">
          <div className="max-w-5xl mx-auto mb-16">
           <h2 className="text-5xl md:text-6xl font-black mb-8 md:mb-12 tracking-tight md:tracking-wide leading-[1.05] md:leading-tight text-[#123458] font-serif">
  Manage files privately with confidence</h2> 
<p className="text-xl text-[#123458]/70 leading-relaxed font-medium">VaultX keeps your data accessible without compromising its security thanks to zero-knowledge architecture and limitless end-to-end encryption.</p>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Encrypted cloud storage",
                desc: "Upload files to the cloud storage and sync it across your devices and platforms. Complete access control and saves space on your device.",
                imgSrc: "/cloud.svg"
              },
              {
                title: "Private file sharing",
                desc: "Share your encrypted files via email or a link with anyone. A unique code adds an extra layer of security to your items.",
                imgSrc: "/sharing.svg"
              },
              {
                title: "No leaks or stolen files",
                desc: "Keep your personal files for your eyes only. Your data is backed up and protected from unauthorized access and malware.",
                imgSrc: "/encryption.svg"
              }
            ].map((feature, i) => (
              <div key={i} className="max-w-sm mx-auto w-full bg-[#F1EFEC] border border-[#D4C9BE] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                
                <div className="mb-8 w-full flex justify-center transform group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={feature.imgSrc} 
                    alt={feature.title} 
                    className="w-auto h-48 md:h-56 object-contain" 
                  />
                </div>
                
                <h3 className="text-2xl font-black mb-4 text-[#123458] font-serif relative z-10">{feature.title}</h3>
                <p className="text-[#123458]/60 leading-relaxed font-medium relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 bg-[#D4C9BE]/10 border-y border-[#D4C9BE]">
        <div className="max-w-vault mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black mb-8 md:mb-12 tracking-tight md:tracking-wide leading-[1.05] md:leading-tight text-[#123458] font-serif">Professional Tiers</h2>
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
         <div className="max-w-6xl mx-auto">
         <h2 className="text-center text-5xl md:text-6xl font-black mb-8 md:mb-12 tracking-tight md:tracking-wide leading-[1.05] md:leading-tight text-[#123458] font-serif">
      Frequently asked questions
    </h2> <div className="border-t border-[#D4C9BE]/50 w-full">
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
