import React from 'react';
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
  LogOut
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'documents', label: 'Documents', icon: FileText, path: '/dashboard/documents' }, // Placeholder for future expansion
    { id: 'activity', label: 'Activity', icon: History, path: '/dashboard/activity' },
    { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  // Helper to check active state (handling sub-routes slightly better)
  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    // 1. Clear local storage items we set during login
    localStorage.removeItem('vaultToken');
    
    // 2. Trigger the App-level logout state
    if (onLogout) onLogout();
    
    // 3. Force redirect to login
    navigate('/');
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-[#123458] border-r border-[#D4C9BE]/20 transition-all duration-300 ease-in-out z-50 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* --- Brand Header --- */}
      <div className="h-20 flex items-center justify-between px-6 mb-2">
        {!collapsed && (
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#D4C9BE]/10 p-1.5 rounded-lg group-hover:bg-[#D4C9BE]/20 transition-colors">
              <ShieldCheck size={24} className="text-[#D4C9BE]" />
            </div>
            <span className="font-serif font-black text-[#F1EFEC] text-xl tracking-wider">VaultX</span>
          </div>
        )}
        
        {/* Collapsed Logo */}
        {collapsed && (
          <div 
            onClick={() => navigate('/dashboard')}
            className="w-full flex justify-center cursor-pointer"
          >
            <ShieldCheck size={28} className="text-[#D4C9BE] hover:scale-110 transition-transform" />
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden md:flex items-center justify-center w-6 h-6 rounded-lg bg-[#F1EFEC]/10 text-[#D4C9BE] hover:bg-[#F1EFEC] hover:text-[#123458] transition-all absolute -right-3 top-8 shadow-lg border border-[#123458] z-50`}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* --- Navigation Menu --- */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
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
              className={`transition-colors ${isActive(item.path) ? 'text-[#123458]' : 'text-[#D4C9BE] group-hover:text-white'}`} 
            />
            
            {!collapsed && (
              <span className="text-sm tracking-wide">{item.label}</span>
            )}
            
            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#030303] text-[#F1EFEC] text-xs font-bold px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl">
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
             collapsed ? 'justify-center' : ''
           }`}
         >
            <LogOut size={20} className="text-[#D4C9BE] group-hover:text-rose-500 transition-colors" />
            {!collapsed && (
              <div className="flex flex-col items-start">
                 <span className="text-[#F1EFEC] group-hover:text-rose-500 font-bold text-sm tracking-wide transition-colors">Sign Out</span>
                 <span className="text-[10px] text-[#D4C9BE]/50 uppercase tracking-widest">End Session</span>
              </div>
            )}
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;