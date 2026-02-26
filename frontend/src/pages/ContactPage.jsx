import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Mail, Phone, MapPin, MessageSquare, Send, Menu, X, ArrowRight, Globe, LifeBuoy, Building2, Clock, Sparkles,
  User, CreditCard, HelpCircle, Rocket } from 'lucide-react';
  import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const ContactPage = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your secure transmission has been received. Our agents will respond shortly.');
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      title: "Global Support",
      desc: "Get technical help with your vault.",
      info: "support@VaultX",
      icon: LifeBuoy,
      color: "bg-[#123458]"
    },
    {
      title: "Sales Inquiries",
      desc: "For enterprise pricing and solutions.",
      info: "enterprise@VaultX",
      icon: Building2,
      color: "bg-[#123458]"
    },
    {
      title: "Press & Media",
      desc: "Official inquiries and branding info.",
      info: "press@VaultX",
      icon: Globe,
      color: "bg-[#123458]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1EFEC] text-[#030303] transition-colors duration-300 font-inter animate-page-smooth">
      {/* Navbar */}
     <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#123458]/5 blur-[150px] rounded-full -z-10"></div>
        <div className="max-w-vault mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4C9BE]/30 border border-[#D4C9BE] text-[10px] font-black text-[#123458] uppercase tracking-[0.3em]">
            <MessageSquare size={14} className="animate-pulse" />
            Direct Communication
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-wideest leading-none font-serif text-[#123458]">
            Get in touch with the <br />
            <span className="text-[#030303]">
              Vault Guardians.
            </span>
          </h1>
          <p className="text-xl text-[#123458]/70 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about your sovereign security? Our technical experts and support team are standing by to ensure your sanctum remains impenetrable.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="pb-32 px-6">
        <div className="max-w-vault mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-black tracking-wide text-[#123458] font-serif">Support Channels</h2>
              <div className="space-y-6">
                {contactMethods.map((method, i) => (
                  <div key={i} className="group p-6 bg-[#F1EFEC] border border-[#D4C9BE] rounded-[2rem] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start gap-5">
                      <div className={`w-12 h-12 rounded-2xl ${method.color} flex items-center justify-center text-[#F1EFEC] shadow-lg group-hover:scale-110 transition-transform`}>
                        <method.icon size={22} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-[#123458]">{method.title}</h4>
                        <p className="text-xs text-[#123458]/60 font-medium">{method.desc}</p>
                        <p className="text-sm font-black text-[#123458] mt-2 underline decoration-[#D4C9BE]">{method.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-[#123458] rounded-[2.5rem] text-[#F1EFEC] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                 <Clock size={120} />
              </div>
              <h3 className="text-xl font-black mb-4 relative z-10 font-serif">Global Response Hours</h3>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center py-2 border-b border-[#F1EFEC]/10">
                  <span className="text-sm font-medium opacity-60">Mon - Fri</span>
                  <span className="text-sm font-black">24 / 7 Operations</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#F1EFEC]/10">
                  <span className="text-sm font-medium opacity-60">Sat - Sun</span>
                  <span className="text-sm font-black">Limited Sentry Duty</span>
                </div>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D4C9BE]">
                  <div className="w-2 h-2 rounded-full bg-[#D4C9BE] animate-pulse"></div>
                  Currently Active
                </div>
              </div>
            </div>
          </div>

        {/* Form Column */}
        <div className="lg:col-span-8">
        <div className="bg-[#123458] border border-[#D4C9BE]/30 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4C9BE]/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
             <div className="space-y-2">
               <h3 className="text-3xl font-black tracking-wide text-[#F1EFEC] font-serif">Secure Transmission</h3>
               <p className="text-[#D4C9BE] font-medium opacity-80">Your message is encrypted end-to-end via TLS 1.3.</p>
             </div>
             <div className="p-4 bg-[#F1EFEC]/10 rounded-2xl flex items-center gap-4 border border-[#D4C9BE]/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-[#F1EFEC] flex items-center justify-center text-[#123458]">
                   <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE]">Encryption</p>
                  <p className="text-xs font-black text-[#F1EFEC]">AES-256 Enabled</p>
                </div>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] ml-1">Your Identity (Name)</label>
                <input 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  type="text" 
                  placeholder="Alex" 
                  className="w-full bg-[#F1EFEC] border border-[#D4C9BE] rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#D4C9BE]/20 focus:border-[#F1EFEC] transition-all font-semibold shadow-sm text-[#030303] placeholder-[#123458]/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] ml-1">Secure Email</label>
                <input 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  type="email" 
                  placeholder="alex@gmail.com" 
                  className="w-full bg-[#F1EFEC] border border-[#D4C9BE] rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#D4C9BE]/20 focus:border-[#F1EFEC] transition-all font-semibold shadow-sm text-[#030303] placeholder-[#123458]/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] ml-1">Subject of Transmission</label>
              <select 
                required
                value={formState.subject}
                onChange={(e) => setFormState({...formState, subject: e.target.value})}
                className="w-full bg-[#F1EFEC] border border-[#D4C9BE] rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#D4C9BE]/20 focus:border-[#F1EFEC] transition-all font-semibold shadow-sm text-[#030303] appearance-none cursor-pointer"
              >
                <option value="" disabled>Select inquiry type...</option>
                <option value="technical">Technical Vault Issues</option>
                <option value="billing">Billing & Tiers</option>
                <option value="security">Security Vulnerability Report</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] ml-1">Message Protocol</label>
              <textarea 
                required
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                rows={5} 
                placeholder="Describe your request in detail..."
                className="w-full bg-[#F1EFEC] border border-[#D4C9BE] rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#D4C9BE]/20 focus:border-[#F1EFEC] transition-all font-semibold shadow-sm text-[#030303] placeholder-[#123458]/40 resize-none"
              ></textarea>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full group relative bg-[#F1EFEC] hover:bg-[#D4C9BE] text-[#123458] py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#123458]/5 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite] transition-transform"></div>
              <div className="flex items-center justify-center gap-4 relative z-10">
                {isSubmitting ? (
                  <div className="w-6 h-6 border-[3px] border-[#123458]/30 border-t-[#123458] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="tracking-wide text-[#123458]">Initiate Secure Send</span>
                    <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="flex items-start gap-4 p-6 bg-[#D4C9BE]/10 rounded-3xl border border-[#D4C9BE]">
                <div className="w-10 h-10 bg-[#123458]/10 rounded-xl flex items-center justify-center text-[#123458]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h5 className="font-black text-sm uppercase tracking-widest mb-1 text-[#123458]">Corporate HQ</h5>
                  <p className="text-sm text-[#123458]/70 font-medium leading-relaxed">
                    1201 Encryption Way, Suite 400<br />
                    Palo Alto, CA 94301, USA
                  </p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-6 bg-[#D4C9BE]/10 rounded-3xl border border-[#D4C9BE]">
                <div className="w-10 h-10 bg-[#123458]/10 rounded-xl flex items-center justify-center text-[#123458]">
                  <Phone size={20} />
                </div>
                <div>
                  <h5 className="font-black text-sm uppercase tracking-widest mb-1 text-[#123458]">Encrypted Line</h5>
                  <p className="text-sm text-[#123458]/70 font-medium leading-relaxed">
                    +1 (888) VAULT-SEC<br />
                    Priority response for Enterprise
                  </p>
                </div>
             </div>
          </div>
        </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;