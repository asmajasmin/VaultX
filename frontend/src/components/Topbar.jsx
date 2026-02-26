import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, User, Settings, LogOut, ChevronDown, 
  ShieldCheck, Zap, File, Folder, X, Clock, Loader
} from 'lucide-react';
import { API_BASE_URL } from '../config'; 

const Topbar = ({ user }) => {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // --- 1. SEARCH LOGIC ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        const token = localStorage.getItem('vaultToken');
        try {
          const res = await fetch(`${API_BASE_URL}/api/files/search?query=${searchQuery}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) setSearchResults(data.results);
        } catch (err) {
          console.error("Search Error", err);
        } finally {
          setIsSearching(false);
          setIsSearchOpen(true);
        }
      } else {
        setSearchResults([]);
        setIsSearchOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // --- 2. NOTIFICATION LOGIC ---
  const fetchNotifications = async () => {
    const token = localStorage.getItem('vaultToken');
    try {
      const res = await fetch( `${API_BASE_URL}/api/files/logs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.logs);
        setUnreadCount(data.logs.length > 0 ? 3 : 0); 
      }
    } catch (err) {
      console.error("Notif Error", err);
    }
  };

  const toggleNotifications = () => {
    if (!isNotifOpen) fetchNotifications();
    setIsNotifOpen(!isNotifOpen);
    setUnreadCount(0);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-[#F1EFEC] border-b border-[#D4C9BE] flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">
      
      {/* --- GLOBAL SEARCH SECTION --- */}
      <div className="flex-1 max-w-xl relative group z-50" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D4C9BE] group-focus-within:text-[#123458] transition-colors">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length > 0 && setIsSearchOpen(true)}
          placeholder="Search your secure vault..." 
          className="w-full bg-[#D4C9BE]/10 border-2 border-[#D4C9BE] rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#123458]/5 focus:border-[#123458] transition-all font-semibold text-[#030303] placeholder-[#123458]/40 shadow-inner"
        />

        {/* Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-[#D4C9BE]/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {isSearching ? (
              <div className="p-4 flex items-center justify-center text-[#D4C9BE]">
                <Loader className="animate-spin mr-2" size={16} /> Searching encrypted index...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                <div className="px-4 py-2 bg-[#F1EFEC]/50 text-[10px] font-black uppercase tracking-widest text-[#123458]/50">
                  Best Matches
                </div>
                {searchResults.map((file) => (
                  <div 
                    key={file._id}
                    onClick={() => {
                      file.isFolder ? alert("Navigate to folder logic needed") : window.open(file.fileUrl, '_blank');
                    }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-[#F1EFEC] cursor-pointer transition-colors border-b border-[#F1EFEC] last:border-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#123458]/5 flex items-center justify-center text-[#123458]">
                      {file.isFolder ? <Folder size={20} /> : <File size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#123458]">{file.fileName}</p>
                      <p className="text-[10px] text-[#D4C9BE] uppercase font-bold">{file.isFolder ? 'Directory' : file.fileSize || 'File'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-[#D4C9BE]">
                <ShieldCheck size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm font-bold">No secure items found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- ACTIONS SECTION --- */}
      <div className="flex items-center gap-6">
        
        {/* --- NOTIFICATIONS DROPDOWN --- */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={toggleNotifications}
            className={`relative p-2.5 text-[#123458] border border-[#D4C9BE] rounded-xl transition-all active:scale-95 group ${isNotifOpen ? 'bg-[#123458] text-white border-[#123458]' : 'bg-[#D4C9BE]/30 hover:bg-[#D4C9BE]/50'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-[#F1EFEC] rounded-full animate-pulse"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-[#D4C9BE]/30 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 border-b border-[#F1EFEC] flex justify-between items-center bg-[#F1EFEC]/50">
                <h3 className="font-bold text-[#123458]">Activity Log</h3>
                <span className="text-[10px] font-black bg-[#123458] text-white px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-[#D4C9BE]">
                    <Clock size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-bold">No recent activity detected.</p>
                  </div>
                ) : (
                  notifications.map((log, index) => (
                    <div key={index} className="flex gap-4 p-4 border-b border-[#F1EFEC] hover:bg-[#F1EFEC]/30 transition-colors">
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        log.action === 'DELETE' ? 'bg-rose-500' : 
                        log.action === 'UPLOAD' ? 'bg-emerald-500' : 'bg-[#123458]'
                      }`} />
                      <div>
                        <p className="text-xs font-black text-[#123458] uppercase tracking-wide mb-0.5">{log.action}</p>
                        <p className="text-sm text-[#123458]/80 leading-snug">{log.details}</p>
                        <p className="text-[10px] text-[#D4C9BE] mt-2 font-bold flex items-center gap-1">
                          <Clock size={10} /> {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 bg-[#F1EFEC] text-center border-t border-[#D4C9BE]/10">
                <button className="text-xs font-bold text-[#123458] hover:underline">View Full Audit Trail</button>
              </div>
            </div>
          )}
        </div>

        {/* --- PROFILE DROPDOWN AREA (FIXED) --- */}
        <div className="flex items-center gap-4 pl-6 border-l border-[#D4C9BE]">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-[#123458] font-serif tracking-tight leading-none mb-1">
              {/* Uses optional chaining to prevent crash and checks for name OR username */}
              {user?.name || user?.username || 'Authorized User'}
            </p>
            <div className="flex items-center gap-1.5 justify-end">
              <Zap size={10} className="text-[#123458]" />
              <p className="text-[9px] font-black text-[#D4C9BE] uppercase tracking-widest">
                {/* Dynamically displays Personal/Pro Tier, defaults to Free */}
                {(user?.tier || 'Free').toUpperCase()} TIER
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center gap-2 p-1.5 bg-[#123458] rounded-2xl hover:opacity-90 transition-all shadow-lg group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F1EFEC] flex items-center justify-center text-[#123458] font-black overflow-hidden border border-[#D4C9BE]/50 shadow-inner">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Topbar;