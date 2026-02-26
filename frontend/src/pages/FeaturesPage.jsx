import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChevronDown, 
  Cloud, 
  Share2, 
  ShieldAlert, 
  Smartphone, 
  Key, 
  Database, 
  Eye, 
  EyeOff, 
  Shield, 
  Quote, 
  HelpCircle,
  ArrowRight,
  Menu, 
  X, Lock,
  MessageSquare,
  CreditCard,
  Sparkles,
  Rocket,
  User
} from 'lucide-react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const FeaturesPage = ({ onLogin, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate(); // Initialize navigator
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "What is VaultX?",
      a: "VaultX is a military-grade digital sovereign sanctum designed to protect your most sensitive documents through advanced client-side encryption and zero-knowledge storage protocols."
    },
    {
      q: "What does VaultX Premium offer?",
      a: "Premium provides 50GB of secure storage, AI-powered security auditing, biometric hardware key support, multi-device synchronization, and priority recovery services for elite users."
    },
    {
      q: "What is the benefit of end-to-end encryption?",
      a: "End-to-end encryption grants security and data ownership to the users. It ensures that their data remains private and inaccessible to anyone without appropriate authentication."
    },
    {
      q: "What platforms is VaultX available on?",
      a: "We are available as a secure Web platform, mobile apps for iOS and Android, and native desktop applications for Windows, macOS, and Linux to ensure your vault is always within reach."
    },
    {
      q: "What security methods does VaultX use?",
      a: "We utilize AES-256 for data at rest, TLS 1.3 for data in transit, and Argon2 for secure key derivation. We also strictly support FIDO2/WebAuthn for hardware-level biometric authentication."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1EFEC] text-[#030303] selection:bg-[#123458]/30 font-inter transition-colors duration-300">
      <Navbar />
     
      {/* Main Content */}
      <main className="pt-32">
        <section className="py-20 px-6 bg-[#F1EFEC]">
          <div className="max-w-5xl mx-auto text-center">
           <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-wider leading-[1.1] text-[#123458] font-serif">
             Privacy Features You<br className="hidden md:block" />   <span className="text-[#030303]">
              Can Trust.
            </span>
           </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Encrypted cloud storage", desc: "Upload and sync files across devices with military-grade security and personal access control.", icon: Cloud, bgColor: "bg-[#123458]/5" },
                { title: "Private file sharing", desc: "Share encrypted files via password-protected links with unique security codes.", icon: Share2, bgColor: "bg-[#D4C9BE]/30" },
                { title: "No leaks or stolen files", desc: "Proactive monitoring prevents unauthorized exposure and protects against cyber threats.", icon: ShieldAlert, bgColor: "bg-[#030303]/5" }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center group p-6 rounded-[2rem] border border-[#D4C9BE] bg-[#F1EFEC] hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#000000]/50" >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 relative ${feature.bgColor} transition-transform duration-500 group-hover:scale-105 shadow-inner`}>
                    <feature.icon size={32} className="text-[#123458]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[#123458] font-serif tracking-wider">{feature.title}</h3>
                  <p className="text-sm text-[#123458]/70 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#123458] border-y border-[#D4C9BE]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4C9BE]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="mb-16 space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-[#F1EFEC] tracking-wider font-serif">Unlock secure cloud with end-to-end encryption</h2>
              <p className="text-lg text-[#D4C9BE] max-w-3xl leading-relaxed font-medium">Whether for business or personal privacy, benefit from VaultX's zero-knowledge architecture and industrial-grade end-to-end encryption.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10">
              {[
                { title: "Supporting all files", desc: "VaultX works with all file types. Big or small, documents or folders.", icon: Database },
                { title: "Cross-platform sync", desc: "Enjoy privacy on all your devices. Access via browser or native apps.", icon: Smartphone },
                { title: "Share privately", desc: "Share encrypted files via protected links or invite specific viewers.", icon: Share2 },
                { title: "Private cloud storage", desc: "Your data remains secure and recoverable even if your device is lost.", icon: Cloud },
                { title: "Total E2E encryption", desc: "Your data is encrypted before it leaves your device. You hold the keys.", icon: Key },
                { title: "Zero-knowledge design", desc: "We can never see what you store. What's yours is strictly yours.", icon: EyeOff }
              ].map((item, i) => (
                <div key={i} className="space-y-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#F1EFEC] text-[#123458] flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300" >
                    <item.icon size={24} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-[#F1EFEC] tracking-wider">{item.title}</h4>
                    <p className="text-[#D4C9BE]/80 leading-relaxed text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#F1EFEC]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-wider text-[#123458] font-serif text-center">Why choose encrypted storage?</h2>
            <div className="space-y-4">
              {[
                { title: "Deter cyber attacks", desc: "Encryption adds a massive layer of defense, making data resilient to unauthorized breaches.", icon: ShieldAlert, color: "bg-[#030303]/5" },
                { title: "Shield data from exposure", desc: "Safe even if networks are compromised. Data remains inaccessible without authenticated local keys.", icon: Eye, color: "bg-[#123458]/5" },
                { title: "Uphold data privacy", desc: "Prevents data from being processed by third parties or sold without explicit user consent.", icon: Lock, color: "bg-[#D4C9BE]/20" },
                { title: "Corporate integrity", desc: "Direct access is removed from the corporate chain, drastically reducing target surface area.", icon: Shield, color: "bg-[#123458]/10" }
              ].map((benefit, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-[2rem] ${benefit.color} border border-[#D4C9BE]/50 hover:shadow-lg transition-all duration-500 group hover:shadow-2xl hover:shadow-[#000000]/50`}>
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-full bg-[#F1EFEC] border border-[#D4C9BE]/50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <benefit.icon size={32} className="text-[#123458]" />
                  </div>
                  <div className="text-center md:text-left space-y-1">
                    <h3 className="text-xl font-bold text-[#123458] font-serif">{benefit.title}</h3>
                    <p className="text-base text-[#123458]/70 leading-relaxed font-medium max-w-xl">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#123458]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-wider font-serif text-[#ffffff]">Here’s what our users have to say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Marcus Thorne", role: "VP of Security", quote: "The most robust digital document sanctum I've ever deployed." },
                { name: "Elena Rodriguez", role: "Digital Strategist", quote: "Absolute sovereignty over my personal files without the complexity." },
                { name: "Jonathan Chen", role: "Privacy Advocate", quote: "Unbreakable encryption meets world-class UX. Simply brilliant." }
              ].map((t, i) => (
                <div key={i} className="p-6 md:p-8 rounded-[2rem] bg-[#123458] text-[#F1EFEC] border border-[#D4C9BE]/100 text-left flex flex-col shadow-xl transition-all hover:-translate-y-1 duration-500 group hover:shadow-2xl hover:shadow-[#000000]/80">
                  <Quote className="text-[#D4C9BE]/20 mb-6 group-hover:text-[#D4C9BE]/100 transition-colors" size={32} />
                  <p className="text-base italic text-[#F1EFEC] mb-6 flex-1 leading-relaxed font-medium">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-6 border-t border-[#D4C9BE]/10">
                    <div className="w-8 h-8 rounded-full bg-[#F1EFEC] text-[#123458] flex items-center justify-center font-black text-xs">{t.name[0]}</div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F1EFEC] tracking-wider">{t.name}</h4>
                      <p className="text-[10px] text-[#D4C9BE] uppercase tracking-widerst font-black opacity-80">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 px-6 bg-[#F1EFEC]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-12 tracking-wider text-[#123458] font-serif">Frequently asked questions</h2>
            <div className="border-t border-[#D4C9BE]/50 w-full">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#D4C9BE]/50 group">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left transition-all hover:bg-[#D4C9BE]/10 px-4 md:px-8">
                    <span className={`text-lg md:text-xl font-bold tracking-wider transition-colors duration-300 ${openFaq === i ? 'text-[#123458]' : 'text-[#123458]/80'}`}>{faq.q}</span>
                    <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#123458]' : 'text-[#D4C9BE]'}`}><ChevronDown size={20} /></div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[700px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                    <div className="text-sm md:text-base text-[#123458]/70 leading-relaxed font-medium px-4 md:px-8 max-w-3xl">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;