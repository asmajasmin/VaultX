import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram, 
  Globe,
  Loader2
} from 'lucide-react';
import { API_BASE_URL } from '../config';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Successfully subscribed!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Subscription failed.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer id="footer" className="relative bg-[#123458] text-[#F1EFEC] pt-24 pb-12 overflow-hidden border-t border-[#D4C9BE]/20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#D4C9BE]/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-vault mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-2 font-bold text-[#F1EFEC] text-2xl tracking-wide">
              <ShieldCheck size={32} strokeWidth={2.5} />
              <span className="font-serif">VaultX</span>
            </div>
            <p className="text-[#D4C9BE] text-sm leading-relaxed max-w-sm">
              Empowering individuals and enterprises through advanced cryptographic sovereignty. 
              Your documents deserve a sanctum that respects absolute privacy.
            </p>
            <div className="space-y-4">
              <h4 className="text-[#F1EFEC] font-black text-xs uppercase tracking-[0.2em]">Stay Secure</h4>
              
              {/* Form implementation */}
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-sm">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4C9BE]/50" size={16} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Security updates..." 
                      className="w-full bg-[#030303]/40 border border-[#D4C9BE]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4C9BE] transition-all text-[#F1EFEC] placeholder-[#D4C9BE]/40"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#F1EFEC] hover:bg-[#D4C9BE] disabled:opacity-70 text-[#123458] px-6 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center min-w-[80px]"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Join'}
                  </button>
                </div>
                {/* Status Message */}
                {status.message && (
                  <p className={`text-xs font-bold ${status.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {status.message}
                  </p>
                )}
              </form>

            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#F1EFEC] font-black text-xs uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-3 text-sm font-medium text-[#D4C9BE]">
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Individual Vault</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Business Suite</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Desktop App</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Mobile Sync</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#F1EFEC] font-black text-xs uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-3 text-sm font-medium text-[#D4C9BE]">
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Security Whitepaper</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Compliance Guide</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Community Forum</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Status Page</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#F1EFEC] font-black text-xs uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-3 text-sm font-medium text-[#D4C9BE]">
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Ethics Protocol</a></li>
              <li><a href="#" className="hover:text-[#F1EFEC] transition-colors">Trust Center</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-10 border-t border-[#D4C9BE]/10 gap-8">
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#D4C9BE] hover:text-[#F1EFEC] transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-[#D4C9BE] hover:text-[#F1EFEC] transition-colors"><Github size={20} /></a>
            <a href="#" className="text-[#D4C9BE] hover:text-[#F1EFEC] transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-[#D4C9BE] hover:text-[#F1EFEC] transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-[#D4C9BE]/10 gap-4 text-xs font-medium text-[#D4C9BE]/60">
          <div className="flex items-center gap-6">
            <span>© 2026 Vault Security Technologies Inc.</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#F1EFEC]">Site Map</a>
            <a href="#" className="hover:text-[#F1EFEC]">English (US)</a>
            <div className="flex items-center gap-1.5">
              <Globe size={14} />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;