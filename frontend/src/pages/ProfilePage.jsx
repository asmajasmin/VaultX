import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Cloud, Key, ShieldAlert, Mail, Smartphone, MapPin, 
  CreditCard, LogOut, Loader, ShieldCheck, 
  Calendar, Zap, CheckCircle, Lock, Save
} from 'lucide-react';
import { API_BASE_URL } from '../config'; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
  const [passStatus, setPassStatus] = useState({ msg: '', type: '' }); 
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    user: { name: '', username: '', email: '', plan: '', renewalDate: '', createdAt: Date.now() },
    stats: { fileCount: 0, storageUsed: '0.00', storageLimit: 1024, storagePercent: 0 }
  });

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'ChangePassword', label: 'Security', icon: Key },
  ];

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
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchProfile(); }, []);

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
        setPassData({ current: '', new: '', confirm: '' }); 
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
          <div className="space-y-6">
            {/* Identity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white border border-[#D4C9BE]/40 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#F1EFEC] rounded-xl flex items-center justify-center text-[#123458] shrink-0"><Mail size={20} /></div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1 shrink-0"><CheckCircle size={10} /> Verified</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Primary Email</p>
                  <h4 className="text-base md:text-lg font-bold text-[#123458] truncate block w-full" title={profile.user.email}>
                    {profile.user.email}
                  </h4>
                </div>
              </div>
              
              <div className="bg-white border border-[#D4C9BE]/40 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#F1EFEC] rounded-xl flex items-center justify-center text-[#123458] shrink-0"><Smartphone size={20} /></div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1 shrink-0"><CheckCircle size={10} /> Active</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Security Level</p>
                  <h4 className="text-base md:text-lg font-bold text-[#123458]">High</h4>
                </div>
              </div>
            </div>

            {/* Storage Usage Card */}
            <div className="bg-[#123458] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4C9BE]/10 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 text-[#D4C9BE] text-xs font-bold uppercase tracking-wide">
                    <Cloud size={16} /> Storage Node
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-black mb-1">Vault Capacity</h3>
                    <p className="text-[#D4C9BE]/60 text-xs md:text-sm">Encrypted storage allocated to your account.</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black">{profile.stats.storageUsed}</span>
                    <span className="text-base md:text-lg text-[#D4C9BE]/60">MB Used</span>
                  </div>
                </div>

                <div className="w-full lg:w-72 bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-3">
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

                  <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden mb-4">
                    {profile.stats.storageLimit === 'Unlimited' ? (
                      <div className="h-full w-full bg-gradient-to-r from-[#123458] via-[#D4C9BE] to-[#123458] animate-pulse"></div>
                    ) : (
                      <div className="h-full bg-gradient-to-r from-[#D4C9BE] to-white rounded-full transition-all duration-1000" style={{ width: `${profile.stats.storagePercent}%` }}></div>
                    )}
                  </div>
                  
                  <button onClick={() => navigate('/dashboard/storage')} className="w-full py-3 bg-white text-[#123458] rounded-xl font-bold text-sm md:text-base hover:bg-[#D4C9BE] transition-colors mt-2 shadow-sm">
                    MANAGE STORAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ChangePassword': 
        return (
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-lg md:text-xl font-bold text-[#123458]">Security Settings</h2>
            
            <div className="bg-white border border-[#D4C9BE]/40 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#123458]/10 text-[#123458] rounded-lg"><Lock size={20} /></div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-[#123458]">Change Password</h3>
                  <p className="text-[10px] md:text-xs font-bold text-[#D4C9BE] uppercase tracking-wide">Update your access credentials</p>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4 md:space-y-5 max-w-lg">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <button type="submit" disabled={isSaving} className="flex items-center justify-center w-full sm:w-auto gap-2 bg-[#123458] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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
            <p className="font-bold uppercase tracking-widest text-sm">Module Locked</p>
          </div>
        );
    }
  };

  if (loading) return <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1EFEC] text-[#123458] gap-4"><Loader className="animate-spin" size={32} /><p className="text-xs font-black uppercase tracking-widest">Loading Profile...</p></div>;

  return (
    <div className="w-full h-full bg-[#F1EFEC] font-inter overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8 pb-20">
<header className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-[#D4C9BE]/30 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#123458]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 z-10 w-full lg:w-auto">
            <div className="relative shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#123458] p-1 shadow-xl mx-auto sm:mx-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a1f35] flex items-center justify-center text-white text-2xl md:text-3xl font-black relative">
                  {profile.user.name ? profile.user.name.charAt(0).toUpperCase() : profile.user.username ? profile.user.username.charAt(0).toUpperCase() : <User />}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 sm:right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Identity">
                <ShieldCheck size={14} strokeWidth={3} />
              </div>
            </div>

            <div className="min-w-0 flex-1">
               <h1 className="text-2xl md:text-3xl font-serif font-black text-[#123458] mb-2 truncate max-w-full">
                 {profile.user.name || profile.user.username || 'Authorized User'}
               </h1>
               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-[#D4C9BE] uppercase tracking-wider">
                 <span className="flex items-center gap-1.5 bg-[#123458] text-white px-2.5 py-1 rounded-lg shadow-md cursor-default">
                   <MapPin size={12} className="text-emerald-400" /> INDIA
                 </span>
                 <span className="hidden sm:block w-1.5 h-1.5 bg-[#D4C9BE] rounded-full"></span>
                 <span>Member since {new Date(profile.user.createdAt || Date.now()).getFullYear()}</span>
               </div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-16 bg-[#D4C9BE]/30"></div>
          <div className="w-full lg:flex-1 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-6 lg:gap-8 z-10 border-t lg:border-t-0 border-[#D4C9BE]/30 pt-6 lg:pt-0">
             <div className="flex items-start gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <div className="p-3 bg-[#123458]/5 text-[#123458] rounded-xl shrink-0"><Zap size={20} fill="#123458" className="opacity-20" /><Zap size={20} className="absolute -mt-5" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Current Plan</p>
                  <h3 className="text-base md:text-lg font-black text-[#123458] flex items-center gap-2">{profile.user.plan || profile.user.tier}<span className="px-2 py-0.5 bg-[#123458] text-white text-[9px] rounded-md tracking-widest hidden sm:inline-block">ACTIVE</span></h3>
                </div>
             </div>
             <div className="flex items-start gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <div className="p-3 bg-[#D4C9BE]/10 text-[#D4C9BE] rounded-xl shrink-0"><Calendar size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Join Date</p>
                  <h3 className="text-base md:text-lg font-black text-[#123458]">{profile.user.renewalDate || new Date(profile.user.createdAt || Date.now()).toLocaleDateString()}</h3>
                </div>
             </div>
          </div>
        </header>

       <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full">
  <nav className="w-full lg:w-60 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar bg-white lg:bg-transparent p-2 lg:p-0 rounded-2xl lg:rounded-none shadow-sm lg:shadow-none border border-[#D4C9BE]/30 lg:border-none">
    <p className="px-4 text-[12px] font-black uppercase tracking-[0.3em] text-[#89837d] mb-2 hidden lg:block">Settings</p>
    
    {sidebarItems.map((item) => (
      <button 
        key={item.id} 
        onClick={() => setActiveTab(item.id)} 
        // FIX: Added flex-1 to split width evenly on mobile, and justify-center to center text
        className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-2 md:gap-4 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
          activeTab === item.id 
            ? 'bg-[#123458] text-white shadow-md lg:translate-x-2' 
            : 'text-[#123458]/50 lg:text-[#D4C9BE] hover:bg-gray-50 lg:hover:bg-white hover:text-[#123458]'
        }`}
      >
        <item.icon size={16} className={activeTab === item.id ? '' : 'opacity-70'} />
        {item.label}
      </button>
    ))}
    
    <button 
      onClick={() => window.location.href='/'} 
      className="hidden lg:flex shrink-0 items-center gap-2 px-4 py-3 font-bold text-xs uppercase tracking-wider text-rose-500 bg-transparent rounded-xl hover:bg-rose-100 transition-colors whitespace-nowrap mt-4"
    >
      <LogOut size={16} /> Sign Out
    </button>
  </nav>

  <div className="flex-1 w-full min-w-0">
    {renderContent()}
  </div>
</div>
      </div>
    </div>
  );
};

export default ProfilePage;