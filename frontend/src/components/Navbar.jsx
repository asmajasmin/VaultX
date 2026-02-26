import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, CreditCard, Sparkles, HelpCircle, MessageSquare, User, Rocket, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem('vaultToken');

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
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isScrolled ? 'bg-[#F1EFEC]/90 backdrop-blur-md border-[#D4C9BE] shadow-sm py-3' : 'bg-transparent border-transparent py-4'}`}>
        <div className="max-w-vault mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div onClick={() => scrollToSection('top')} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="VaultX" className="h-16 w-auto object-contain scale-150 ml-2" />
            </div>

                       <div className="hidden lg:flex items-center gap-8 text-sm font-bold">
              <button onClick={() => scrollToSection('top')} className="text-[#123458] hover:opacity-70 transition-opacity">Home</button>
              <button onClick={() => navigate('/features')} className="text-[#123458]/70 hover:text-[#123458] transition-colors">Features</button>
              <button onClick={() => scrollToSection('faq')} className="text-[#123458]/70 hover:text-[#123458] transition-colors">FAQ</button>
              <button onClick={() => navigate('/contact')} className="text-[#123458]/70 hover:text-[#123458] transition-colors">Contact</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="bg-[#123458] text-[#F1EFEC] px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-[#123458]/20 hover:-translate-y-0.5 transition-transform"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="px-5 py-2.5 text-sm font-bold text-[#123458] hover:opacity-70 transition-opacity">Login</button>
                  <button onClick={() => navigate('/register')} className="bg-[#123458] text-[#F1EFEC] px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-[#123458]/20 hover:-translate-y-0.5 transition-transform">Register</button>
                </>
              )}
            </div>
            
            <button 
              type="button"
              className="lg:hidden p-2 text-[#123458] active:scale-95 transition-transform" 
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

     
      <div className={`fixed inset-0 z-[100] bg-[#F1EFEC] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden overflow-hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
       
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4C9BE]/30 blur-[100px] rounded-full -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      
        <div className="flex items-center justify-between px-6 py-6 relative z-10">
            <div onClick={() => { setIsMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 cursor-pointer">
               <img src="/logo.png" alt="VaultX" className="h-18 w-auto object-contain scale-125 ml-2" />
            </div>
            <button 
              type="button"
              onClick={() => setIsMenuOpen(false)} 
              className="p-2.5 text-[#123458] bg-white shadow-sm border border-[#D4C9BE]/30 rounded-full hover:bg-[#D4C9BE]/20 transition-colors active:scale-95"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col flex-1 px-6 py-8 space-y-2 relative z-10">
          
            
            {[
              { l: 'Home', i: CreditCard, a: () => scrollToSection('top') },
              { l: 'Features', i: Sparkles, a: () => { setIsMenuOpen(false); navigate('/features'); } },
              { l: 'FAQ', i: HelpCircle, a: () => scrollToSection('faq') },
              { l: 'Contact', i: MessageSquare, a: () => { setIsMenuOpen(false); navigate('/contact'); } }
            ].map((x,i) => (
              <button 
                key={i} 
                onClick={x.a} 
                className="flex items-center justify-between w-full p-2 rounded-2xl group hover:bg-white transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-[1rem] bg-white border border-[#D4C9BE]/30 flex items-center justify-center text-[#123458] shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                     <x.i size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-black text-[#123458] font-serif tracking-wide">{x.l}</span>
                </div>
                <ChevronRight className="text-[#D4C9BE] group-hover:text-[#123458] group-hover:translate-x-1 transition-all" size={24} />
              </button>
            ))}
        </div>

       
        <div className="mt-auto bg-white rounded-t-[2.5rem] p-8 shadow-[0_-15px_40px_rgba(18,52,88,0.05)] border-t border-[#D4C9BE]/30 relative z-10">
          <div className="w-12 h-1.5 bg-[#D4C9BE]/40 rounded-full mx-auto mb-8"></div>
          
          <div className="space-y-4">
            {isAuthenticated ? (
              <button 
                onClick={() => { setIsMenuOpen(false); navigate('/dashboard'); }} 
                className="w-full py-4 rounded-xl bg-[#123458] text-[#F1EFEC] font-black text-lg flex justify-center items-center gap-3 shadow-xl shadow-[#123458]/20 hover:opacity-90 active:scale-95 transition-all"
              >
                Go to Dashboard <ChevronRight size={20} />
              </button>
            ) : (
              <>
                <button onClick={() => { setIsMenuOpen(false); navigate('/register'); }} className="w-full py-4 rounded-xl bg-[#123458] text-[#F1EFEC] font-black text-lg flex justify-center items-center gap-2 shadow-xl shadow-[#123458]/20 hover:opacity-90 active:scale-95 transition-all">
                  <Rocket size={20}/> Get Started
                </button>
                <button onClick={() => { setIsMenuOpen(false); navigate('/login'); }} className="w-full py-4 rounded-xl bg-transparent border-2 border-[#123458] text-[#123458] font-black text-lg flex justify-center items-center gap-2 hover:bg-[#123458]/5 active:scale-95 transition-all">
                  <User size={20}/> Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;