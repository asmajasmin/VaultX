import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, CreditCard, Sparkles, HelpCircle, MessageSquare, User, Rocket } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Scroll Effect for Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll when Mobile Menu is Open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Helper: Scroll to Section (for single-page links)
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); 
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isScrolled ? 'bg-[#F1EFEC]/90 backdrop-blur-md border-[#D4C9BE] shadow-sm py-3' : 'bg-transparent border-transparent py-4'}`}>
        <div className="max-w-vault mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div onClick={() => scrollToSection('top')} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="VaultX" className="h-16 w-auto object-contain scale-150 ml-2" />
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold">
              <button onClick={() => scrollToSection('top')} className="text-[#123458] hover:opacity-70 transition-opacity">Home</button>
              
              {/* FIXED: Navigate to separate Features Page */}
              <button onClick={() => navigate('/features')} className="text-[#123458]/70 hover:text-[#123458] transition-colors">Features</button>
              
              <button onClick={() => scrollToSection('faq')} className="text-[#123458]/70 hover:text-[#123458] transition-colors">FAQ</button>
              <button onClick={() => navigate('/contact')} className="text-[#123458]/70 hover:text-[#123458] transition-colors">Contact</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => navigate('/login')} className="px-5 py-2.5 text-sm font-bold text-[#123458] hover:opacity-70 transition-opacity">Login</button>
              <button onClick={() => navigate('/register')} className="bg-[#123458] text-[#F1EFEC] px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-[#123458]/20 hover:-translate-y-0.5 transition-transform">Register</button>
            </div>
            
            {/* MOBILE TOGGLE BUTTON */}
            <button className="lg:hidden p-2 text-[#123458]" onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {/* Fixed z-index and height to cover everything properly */}
      <div className={`fixed inset-0 z-[60] bg-[#F1EFEC] h-screen w-full transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#D4C9BE]">
            <div onClick={() => { setIsMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 cursor-pointer">
               <img src="/logo.png" alt="VaultX" className="h-10 w-auto object-contain scale-125 ml-2" />
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#123458] hover:bg-[#D4C9BE]/20 rounded-xl transition-colors">
              <X size={28} />
            </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8 space-y-2 pb-32">
            {[
              { l: 'Home', i: CreditCard, a: () => scrollToSection('top') },
              { l: 'Features', i: Sparkles, a: () => { setIsMenuOpen(false); navigate('/features'); } }, // FIXED HERE
              { l: 'FAQ', i: HelpCircle, a: () => scrollToSection('faq') },
              { l: 'Contact', i: MessageSquare, a: () => { setIsMenuOpen(false); navigate('/contact'); } }
            ].map((x,i) => (
              <button key={i} onClick={x.a} className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-[#D4C9BE]/20 text-[#123458] font-bold transition-all">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#123458]">
                   <x.i size={20} />
                </div>
                <span className="text-lg">{x.l}</span>
              </button>
            ))}

            <div className="h-px bg-[#D4C9BE]/50 my-6" />

            <div className="space-y-4">
              <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="w-full py-4 rounded-xl bg-[#D4C9BE]/20 text-[#123458] font-bold flex justify-center gap-2 hover:bg-[#D4C9BE]/30 transition-colors">
                <User size={20}/> Login
              </button>
              <button onClick={() => { setIsMenuOpen(false); navigate('/register'); }} className="w-full py-4 rounded-xl bg-[#123458] text-[#F1EFEC] font-bold flex justify-center gap-2 shadow-xl shadow-[#123458]/20 hover:opacity-90 transition-opacity">
                <Rocket size={20}/> Get Started
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;