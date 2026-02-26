import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  LogOut,  Home,  Menu, X    
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'documents', label: 'Documents', icon: FileText, path: '/dashboard/documents' }, 
    { id: 'activity', label: 'Activity', icon: History, path: '/dashboard/activity' },
    { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('vaultToken');
    if (onLogout) onLogout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    setMobileMenuOpen(false); // Close mobile menu after clicking
    navigate(path);
  };

  // Close mobile menu on route change automatically as backup
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* --- MOBILE TOGGLE BUTTON (Floating bottom right) --- */}
      {/* We add a floating action button just for mobile to open the menu */}
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] bg-[#123458] text-[#F1EFEC] p-4 rounded-full shadow-2xl active:scale-95 transition-transform border-2 border-[#D4C9BE]/20"
      >
        <Menu size={24} />
      </button>

      {/* --- MOBILE OVERLAY (Darkens background when menu is open) --- */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-[65] backdrop-blur-sm transition-opacity"
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-[#123458] border-r border-[#D4C9BE]/20 transition-all duration-300 ease-in-out flex flex-col
          /* Mobile Logic: Hide by default, slide in when mobileMenuOpen is true. Always full width (w-64) on mobile */
          ${mobileMenuOpen ? 'translate-x-0 w-64 z-[70]' : '-translate-x-full lg:translate-x-0 z-50'}
          /* Desktop Logic: width based on collapsed state */
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* --- Brand Header --- */}
        <div className="h-20 flex items-center justify-between px-6 mb-2">
          {(!collapsed || mobileMenuOpen) && (
            <div 
              onClick={() => handleNavigation('/dashboard')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="bg-[#D4C9BE]/10 p-1.5 rounded-lg group-hover:bg-[#D4C9BE]/20 transition-colors">
                <ShieldCheck size={24} className="text-[#D4C9BE]" />
              </div>
              <span className="font-serif font-black text-[#F1EFEC] text-xl tracking-wider">VaultX</span>
            </div>
          )}
          
          {/* Collapsed Logo (Only visible on Desktop when collapsed) */}
          {(collapsed && !mobileMenuOpen) && (
            <div 
              onClick={() => handleNavigation('/dashboard')}
              className="w-full flex justify-center cursor-pointer hidden lg:flex"
            >
              <ShieldCheck size={28} className="text-[#D4C9BE] hover:scale-110 transition-transform" />
            </div>
          )}

          {/* Desktop Collapse Toggle Button */}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex items-center justify-center w-6 h-6 rounded-lg bg-[#F1EFEC]/10 text-[#D4C9BE] hover:bg-[#F1EFEC] hover:text-[#123458] transition-all absolute -right-3 top-8 shadow-lg border border-[#123458] z-50`}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-[#D4C9BE] hover:text-[#F1EFEC] p-2"
          >
             <X size={24} />
          </button>
        </div>

        {/* --- Navigation Menu --- */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar py-4">
          
          {/* Added Home Link */}
          <button
            onClick={() => handleNavigation('/')}
            className="w-full flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl text-[#D4C9BE] hover:bg-[#F1EFEC]/10 hover:text-white transition-all group relative mb-6 border border-dashed border-[#D4C9BE]/20"
            title="Go to Homepage"
          >
            <Home size={22} className="transition-colors group-hover:text-white" />
            {(!collapsed || mobileMenuOpen) && (
              <span className="font-bold text-sm tracking-wide">Back to Home</span>
            )}
            {/* Tooltip for collapsed state (Desktop only) */}
            {(collapsed && !mobileMenuOpen) && (
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#030303] text-[#F1EFEC] text-xs font-bold px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl hidden lg:block">
                Home
              </div>
            )}
          </button>

          <div className="h-px bg-[#D4C9BE]/10 my-4" />

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-[#F1EFEC] text-[#123458] shadow-lg shadow-black/20 translate-x-1 font-bold' 
                  : 'text-[#D4C9BE] hover:bg-[#F1EFEC]/10 hover:text-white'
              }`}
            >
              {/* Active Indicator Line */}
              {isActive(item.path) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#123458] rounded-r-full" />
              )}

              <item.icon 
                size={22} 
                className={`transition-colors flex-shrink-0 ${isActive(item.path) ? 'text-[#123458]' : 'text-[#D4C9BE] group-hover:text-white'}`} 
              />
              
              {(!collapsed || mobileMenuOpen) && (
                <span className="text-sm tracking-wide">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state (Desktop only) */}
              {(collapsed && !mobileMenuOpen) && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#030303] text-[#F1EFEC] text-xs font-bold px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl hidden lg:block">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>
        
        {/* --- User / Logout Section --- */}
        <div className="p-4 border-t border-[#D4C9BE]/10 bg-[#0f2b4a]">
           <button 
             onClick={handleLogout}
             className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent hover:bg-rose-500/10 hover:border-rose-500/20 group transition-all ${
               (collapsed && !mobileMenuOpen) ? 'justify-center' : ''
             }`}
           >
             <LogOut size={20} className="text-[#D4C9BE] group-hover:text-rose-500 transition-colors flex-shrink-0" />
             {(!collapsed || mobileMenuOpen) && (
               <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-[#F1EFEC] group-hover:text-rose-500 font-bold text-sm tracking-wide transition-colors truncate">Sign Out</span>
                  <span className="text-[10px] text-[#D4C9BE]/50 uppercase tracking-wide
                  
                  truncate">End Session</span>
               </div>
             )}
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;