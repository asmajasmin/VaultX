import React, { useState, useEffect } from 'react';
import { 
  User, Cloud, Key, ShieldAlert, Mail, Smartphone, MapPin, 
  Shield, CreditCard, ExternalLink, RefreshCw, 
  History, ChevronRight, LogOut, Loader, ShieldCheck, 
  Camera, Calendar, Zap, CheckCircle, Lock, Save
} from 'lucide-react';
import { API_BASE_URL } from '../config'; 

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // --- PASSWORD STATE ---
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
  const [passStatus, setPassStatus] = useState({ msg: '', type: '' }); // type: 'success' | 'error'
  const [isSaving, setIsSaving] = useState(false);

  // User Data State
  const [profile, setProfile] = useState({
    user: { username: 'Loading...', email: '...', plan: '...', renewalDate: '...' },
    stats: { fileCount: 0, storageUsed: '0.00', storageLimit: 1024, storagePercent: 0 }
  });

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'ChangePassword', label: 'Security', icon: Key },
  ];

  // --- FETCH DATA ---
  const fetchProfile = async () => {
    const token = localStorage.getItem('vaultToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) setProfile({ user: data.user, stats: data.stats });
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); setIsRefreshing(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleRefresh = () => { setIsRefreshing(true); fetchProfile(); };

  // --- PASSWORD SUBMIT LOGIC ---
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassStatus({ msg: '', type: '' });

    if (passData.new !== passData.confirm) {
      setPassStatus({ msg: "New passwords do not match.", type: 'error' });
      return;
    }
    if (passData.new.length < 6) {
      setPassStatus({ msg: "Password must be at least 6 characters.", type: 'error' });
      return;
    }

    setIsSaving(true);
    const token = localStorage.getItem('vaultToken');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          currentPassword: passData.current, 
          newPassword: passData.new 
        })
      });

      const data = await res.json();

      if (data.success) {
        setPassStatus({ msg: "Password updated successfully.", type: 'success' });
        setPassData({ current: '', new: '', confirm: '' }); // Clear form
      } else {
        setPassStatus({ msg: data.msg || "Update failed.", type: 'error' });
      }
    } catch (err) {
      setPassStatus({ msg: "Server connection failed.", type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Identity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group bg-white border border-[#D4C9BE]/40 rounded-2xl p-6 hover:shadow-lg hover:border-[#123458]/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#F1EFEC] rounded-xl flex items-center justify-center text-[#123458]"><Mail size={20} /></div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1"><CheckCircle size={10} /> Verified</span>
                </div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Primary Email</p><h4 className="text-lg font-bold text-[#123458] truncate">{profile.user.email}</h4></div>
              </div>
              <div className="group bg-white border border-[#D4C9BE]/40 rounded-2xl p-6 hover:shadow-lg hover:border-[#123458]/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#F1EFEC] rounded-xl flex items-center justify-center text-[#123458]"><Smartphone size={20} /></div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1"><CheckCircle size={10} /> Active</span>
                </div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Security Level</p><h4 className="text-lg font-bold text-[#123458]">High</h4></div>
              </div>
            </div>
           {/* Storage Usage Card */}
<div className="bg-[#123458] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C9BE]/10 blur-[80px] rounded-full -mr-16 -mt-16"></div>
  
  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#D4C9BE] text-xs font-bold uppercase tracking-widest">
        <Cloud size={16} /> Storage Node
      </div>
      <div>
        <h3 className="text-3xl font-serif font-black mb-1">Vault Capacity</h3>
        <p className="text-[#D4C9BE]/60 text-sm">Encrypted storage allocated to your account.</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black">{profile.stats.storageUsed}</span>
        <span className="text-lg text-[#D4C9BE]/60">MB Used</span>
      </div>
    </div>

    <div className="w-full md:w-72 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-3">
        {/* Handle Unlimited Display */}
        {profile.stats.storageLimit === 'Unlimited' ? (
          <>
            <span>Unlimited Access</span>
            <span className="text-emerald-400">∞</span>
          </>
        ) : (
          <>
            <span>{profile.stats.storagePercent}% Full</span>
            <span>{profile.stats.storageLimit} MB Total</span>
          </>
        )}
      </div>

      {/* Progress Bar - Infinite Gradient for Enterprise, Calculated for others */}
      <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden mb-4">
        {profile.stats.storageLimit === 'Unlimited' ? (
          <div className="h-full w-full bg-gradient-to-r from-[#123458] via-[#D4C9BE] to-[#123458] animate-pulse"></div>
        ) : (
          <div 
            className="h-full bg-gradient-to-r from-[#D4C9BE] to-white rounded-full transition-all duration-1000" 
            style={{ width: `${profile.stats.storagePercent}%` }}
          ></div>
        )}
      </div>
      
      <button className="w-full py-3 bg-white text-[#123458] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#D4C9BE] transition-colors">
        Manage Storage
      </button>
    </div>
  </div>
</div>

          </div>
        );

      case 'ChangePassword': // Replaced static 'security' with functional Change Password
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#123458]">Security Settings</h2>
            </div>

            {/* --- CHANGE PASSWORD FORM --- */}
            <div className="bg-white border border-[#D4C9BE]/40 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#123458]/10 text-[#123458] rounded-lg"><Lock size={20} /></div>
                <div>
                  <h3 className="text-lg font-black text-[#123458]">Change Password</h3>
                  <p className="text-xs font-bold text-[#D4C9BE] uppercase tracking-wide">Update your access credentials</p>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-[10px] font-black text-[#123458] uppercase tracking-widest mb-2">Current Password</label>
                  <input 
                    type="password" 
                    value={passData.current}
                    onChange={(e) => setPassData({...passData, current: e.target.value})}
                    className="w-full bg-[#F1EFEC] border-2 border-transparent focus:bg-white focus:border-[#123458] rounded-xl px-4 py-3 text-sm font-bold text-[#123458] outline-none transition-all"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-[#123458] uppercase tracking-widest mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={passData.new}
                      onChange={(e) => setPassData({...passData, new: e.target.value})}
                      className="w-full bg-[#F1EFEC] border-2 border-transparent focus:bg-white focus:border-[#123458] rounded-xl px-4 py-3 text-sm font-bold text-[#123458] outline-none transition-all"
                      placeholder="Min. 6 chars"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#123458] uppercase tracking-widest mb-2">Confirm New</label>
                    <input 
                      type="password" 
                      value={passData.confirm}
                      onChange={(e) => setPassData({...passData, confirm: e.target.value})}
                      className="w-full bg-[#F1EFEC] border-2 border-transparent focus:bg-white focus:border-[#123458] rounded-xl px-4 py-3 text-sm font-bold text-[#123458] outline-none transition-all"
                      placeholder="Re-enter new"
                      required
                    />
                  </div>
                </div>

                {passStatus.msg && (
                  <div className={`text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 ${passStatus.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {passStatus.type === 'error' ? <ShieldAlert size={14}/> : <CheckCircle size={14}/>}
                    {passStatus.msg}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-[#123458] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                  Update Password
                </button>
              </form>
            </div>

           
          </div>
        );
      default:
        return (
          <div className="h-64 flex flex-col items-center justify-center text-[#D4C9BE] border-2 border-dashed border-[#D4C9BE]/30 rounded-3xl">
            <CreditCard size={48} className="mb-4 opacity-50" />
            <p className="font-bold uppercase tracking-widest text-sm">Billing Module Locked</p>
          </div>
        );
    }
  };

  if (loading) return <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1EFEC] text-[#123458] gap-4"><Loader className="animate-spin" size={32} /><p className="text-xs font-black uppercase tracking-widest">Loading Profile...</p></div>;

  return (
    <div className="w-full h-full bg-[#F1EFEC] font-inter overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">

        <header className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#D4C9BE]/30 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#123458]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
           
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left z-10 w-full md:w-auto">
  <div className="relative group">
    <div className="w-24 h-24 rounded-full bg-[#123458] p-1 shadow-xl">
      <div className="w-full h-full rounded-full overflow-hidden bg-[#0a1f35] flex items-center justify-center text-white text-3xl font-black relative">
        {profile.user.username ? profile.user.name.charAt(0).toUpperCase() : <User />}
        
      </div>
    </div>
    <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Identity">
      <ShieldCheck size={14} strokeWidth={3} />
    </div>
  </div>

 <div>
       {/* FIX: Check for 'name' OR 'username' */}
       <h1 className="text-3xl font-serif font-black text-[#123458] mb-1">
         {profile.user.name || profile.user.username || 'Authorized User'}
       </h1>
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-bold text-[#D4C9BE] uppercase tracking-wider">
      
      {/* --- UPDATED HIGHLIGHTED LOCATION --- */}
      <span className="flex items-center gap-1.5 bg-[#123458] text-white px-2.5 py-1 rounded-lg shadow-md hover:bg-[#030303] transition-colors cursor-default">
        <MapPin size={12} className="text-emerald-400" /> 
        INDIA
      </span>
      {/* ----------------------------------- */}

      <span className="w-1.5 h-1.5 bg-[#D4C9BE] rounded-full hidden md:block"></span>
      <span>Member since {new Date(profile.user.createdAt || Date.now()).getFullYear()}</span>
    </div>
  </div>
</div>

           <div className="hidden md:block w-px h-16 bg-[#D4C9BE]/30"></div>
           <div className="flex-1 w-full flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-8 z-10">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-[#123458]/5 text-[#123458] rounded-xl"><Zap size={24} fill="#123458" className="opacity-20" /><Zap size={24} className="absolute -mt-6" /></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Current Plan</p><h3 className="text-xl font-black text-[#123458] flex items-center gap-2">{profile.user.plan}<span className="px-2 py-0.5 bg-[#123458] text-white text-[9px] rounded-md tracking-widest">ACTIVE</span></h3>
                  </div>
             </div>
             <div className="flex items-start gap-4">
                <div className="p-3 bg-[#D4C9BE]/10 text-[#D4C9BE] rounded-xl"><Calendar size={24} /></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Join Date</p><h3 className="text-xl font-black text-[#123458]">{profile.user.renewalDate}</h3>
               </div>
             </div>
           </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <nav className="lg:col-span-3 sticky top-6 space-y-2">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4C9BE] mb-4">Settings</p>
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 text-left ${activeTab === item.id ? 'bg-[#123458] text-white shadow-lg shadow-[#123458]/20 translate-x-2' : 'text-[#D4C9BE] hover:bg-white hover:text-[#123458] hover:shadow-sm'}`}>
                <item.icon size={18} className={activeTab === item.id ? '' : 'opacity-70'} />
                {item.label}
                {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </button>
            ))}
            <div className="pt-6 px-4"><button onClick={() => window.location.href='/'} className="flex items-center gap-3 font-bold text-[12px] uppercase tracking-[0.2em] text-[#040147] hover:text-rose-500 transition-colors"><LogOut size={16} />Sign Out</button></div>
          </nav>
          <div className="lg:col-span-9 min-w-0 pb-10">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;