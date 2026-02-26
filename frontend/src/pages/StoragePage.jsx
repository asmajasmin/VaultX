import React, { useState, useEffect } from 'react';
import { 
  HardDrive, Image as ImageIcon, FileText, FileQuestion, 
  Zap, Building2, User, CheckCircle2, 
  X, CreditCard, Loader2 
} from 'lucide-react';
import { API_BASE_URL } from '../config'; 

const StoragePage = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [hoveredTier, setHoveredTier] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Real User & Storage State
  const [currentTier, setCurrentTier] = useState('Personal');
  const [stats, setStats] = useState({ storageUsed: 0, storageLimit: 1024, storagePercent: 0 });
  const [breakdown, setBreakdown] = useState({ docs: 0, images: 0, other: 0 });

  // States for Checkout Modal
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // --- 1. FETCH REAL DATA & CALCULATE STORAGE ---
  const fetchStorageData = async () => {
    const token = localStorage.getItem('vaultToken');
    try {
      // A. Get User Info
      const userRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userData = await userRes.json();
      
      let limit = 1024;
      if (userData.success && userData.user) {
        // Read 'tier' from database
        const userTier = userData.user.tier || 'Personal';
        setCurrentTier(userTier);
        
        // Set limit based on tier
        if (userTier === 'Professional') limit = 51200;
        if (userTier === 'Enterprise') limit = 'Unlimited';
        
        setStats(prev => ({ ...prev, storageLimit: limit }));
      }

      // B. Get Files & Calculate Actual Storage Used
      const filesRes = await fetch(`${API_BASE_URL}/api/files/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const filesData = await filesRes.json();

      if (filesData.success) {
        let docs = 0, images = 0, other = 0;
        let totalUsed = 0;
        
        filesData.files.forEach(file => {
          // Cloudinary sizes are usually in bytes. Convert to MB.
          // If size is missing from your DB, fallback to 0.5 MB so the bar still works.
          const sizeMB = file.size ? (file.size / (1024 * 1024)) : 0.5; 
          totalUsed += sizeMB;
          
          const type = (file.fileType || '').toLowerCase();
          
          if (type.includes('pdf') || type.includes('doc') || type.includes('txt')) {
            docs += sizeMB;
          } else if (type.includes('image')) {
            images += sizeMB;
          } else if (!file.isFolder) {
            other += sizeMB;
          }
        });

        // Update Breakdown UI
        setBreakdown({
          docs: docs.toFixed(2),
          images: images.toFixed(2),
          other: other.toFixed(2)
        });

        // Update Total Stats UI
        setStats(prev => ({
          ...prev,
          storageUsed: totalUsed.toFixed(2),
          storagePercent: limit === 'Unlimited' ? 0 : Math.min(((totalUsed / limit) * 100), 100).toFixed(1)
        }));
      }
    } catch (err) {
      console.error("Failed to load storage data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStorageData(); }, []);

  // --- 2. HANDLE UPGRADE PAYMENT ---
  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    const token = localStorage.getItem('vaultToken');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/upgrade-plan`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ plan: selectedPlan.name }) // Sends 'Professional' or 'Enterprise'
      });

      const data = await response.json();

      if (data.success) {
        setTimeout(() => {
          setIsProcessing(false);
          setPaymentSuccess(true);
          fetchStorageData(); // Refresh the page data instantly to show the new limits!
        }, 1500);
      } else {
        alert(data.message || "Upgrade failed");
        setIsProcessing(false);
      }
    } catch (error) {
      alert("Network error. Please try again.");
      setIsProcessing(false);
    }
  };

  const pricingTiers = [
    { name: "Personal", price: 0, icon: User },
    { name: "Professional", price: isYearly ? 300 : 600, icon: Zap },
    { name: "Enterprise", price: 2000, icon: Building2 }
  ];

  if (loading) {
    return <div className="flex-1 flex items-center justify-center bg-[#F1EFEC]"><Loader2 className="animate-spin text-[#123458]" size={32} /></div>;
  }

  // Calculate widths for the progress bar segments
  const totalCalculated = parseFloat(breakdown.docs) + parseFloat(breakdown.images) + parseFloat(breakdown.other);
  const getWidth = (val) => totalCalculated === 0 ? 0 : (parseFloat(val) / totalCalculated) * 100;

  return (
    <div className="flex-1 overflow-y-auto bg-[#F1EFEC] p-4 md:p-8 font-inter relative">
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        <div className="flex items-center gap-3 text-[#123458]">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-[#D4C9BE]/30">
            <HardDrive size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-serif tracking-wide">Storage & Plans</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Storage Bar */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-[#D4C9BE]/50 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-bold text-[#123458] mb-6">Storage Usage</h2>
            
            <div className="flex justify-between text-sm font-bold text-[#123458] mb-3">
              <span className="text-2xl">{stats.storageUsed} <span className="text-sm opacity-60">MB Used</span></span>
              <span className="opacity-50 flex items-end">
                {stats.storageLimit === 'Unlimited' ? 'Unlimited' : `${stats.storageLimit} MB Total`}
              </span>
            </div>
            
            {/* Dynamic Multi-color Progress Bar */}
            <div className="w-full h-4 bg-[#F1EFEC] rounded-full overflow-hidden flex shadow-inner mb-8">
              {totalCalculated === 0 ? (
                 <div className="bg-[#D4C9BE]/30 h-full w-full"></div>
              ) : (
                <>
                  <div className="bg-[#123458] h-full transition-all duration-1000" style={{ width: `${getWidth(breakdown.docs)}%` }}></div>
                  <div className="bg-[#D4C9BE] h-full transition-all duration-1000" style={{ width: `${getWidth(breakdown.images)}%` }}></div>
                  <div className="bg-rose-400 h-full transition-all duration-1000" style={{ width: `${getWidth(breakdown.other)}%` }}></div>
                </>
              )}
            </div>

            {/* Legend / Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F1EFEC]/50 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-[#123458]"></div>
                <div>
                  <p className="text-xs font-bold text-[#123458]/60 uppercase tracking-wider">Documents</p>
                  <p className="font-bold text-[#123458]">{breakdown.docs} MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F1EFEC]/50 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-[#D4C9BE]"></div>
                <div>
                  <p className="text-xs font-bold text-[#123458]/60 uppercase tracking-wider">Images</p>
                  <p className="font-bold text-[#123458]">{breakdown.images} MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F1EFEC]/50 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div>
                  <p className="text-xs font-bold text-[#123458]/60 uppercase tracking-wider">Other</p>
                  <p className="font-bold text-[#123458]">{breakdown.other} MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Plan Status */}
          <div className="bg-[#123458] text-[#F1EFEC] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-[#D4C9BE] uppercase tracking-widest mb-2">Current Plan</p>
              <h3 className="text-3xl font-black font-serif mb-1">{currentTier}</h3>
              <p className="text-[#F1EFEC]/70 text-sm font-medium">
                {currentTier === 'Enterprise' ? 'Maximum security & priority support.' : 
                 currentTier === 'Professional' ? 'Advanced security & multi-sync.' : 
                 'Basic cryptographic sovereignty.'}
              </p>
            </div>
            
            <div className="space-y-3 mt-8 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-sm font-medium text-[#F1EFEC]/70">Bandwidth</span>
                <span className="font-bold text-sm">
                  {currentTier === 'Personal' ? 'Standard' : 'High-Speed'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#F1EFEC]/70">Support</span>
                <span className="font-bold text-sm">
                  {currentTier === 'Enterprise' ? '24/7 Priority' : 'Community'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Upgrade Plans --- */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#0c1f33] font-serif">Upgrade Your Vault</h2>
            
            <div className="flex items-center gap-3 text-sm font-bold bg-white p-1.5 rounded-full border border-[#D4C9BE]/50 shadow-sm">
              <button onClick={() => setIsYearly(false)} className={`px-4 py-2 rounded-full transition-all ${!isYearly ? 'bg-[#D4C9BE]/30 text-[#123458]' : 'text-[#123458]/50 hover:text-[#123458]'}`}>
                Monthly
              </button>
              <button onClick={() => setIsYearly(true)} className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${isYearly ? 'bg-[#123458] text-[#F1EFEC]' : 'text-[#123458]/50 hover:text-[#123458]'}`}>
                Yearly <span className={`text-[10px] px-2 py-0.5 rounded-full ${isYearly ? 'bg-white/20' : 'bg-[#123458]/10 text-[#123458]'}`}>-50%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => {
              const isCurrent = tier.name.toLowerCase() === currentTier.toLowerCase();
              
              return (
                <div key={i} onMouseEnter={() => setHoveredTier(i)} className={`p-8 rounded-[2rem] flex flex-col transition-all duration-300 border-2 ${isCurrent ? 'border-[#123458] bg-[#123458]/5 cursor-default' : hoveredTier === i ? 'bg-[#123458] text-[#F1EFEC] scale-105 shadow-2xl z-10 border-[#123458] cursor-pointer' : 'bg-white text-[#030303] border-[#D4C9BE]/30 hover:border-[#D4C9BE] cursor-pointer'}`}>
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${hoveredTier === i && !isCurrent ? 'bg-white/10' : 'bg-[#123458]/10'}`}>
                      <tier.icon size={24} className={hoveredTier === i && !isCurrent ? 'text-[#F1EFEC]' : 'text-[#123458]'} />
                    </div>
                    <h3 className="text-xl font-black mb-2">{tier.name}</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black">₹{tier.price}</span>
                      <span className="text-sm pb-1 font-medium opacity-60">/mo</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {["E2E Encryption", i > 0 ? "AI Security Audits" : "Basic Security", i > 0 ? "Cross-Platform Sync" : "Web Only", i === 2 ? "24/7 Priority Support" : "Standard Support"].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 size={16} className={hoveredTier === i && !isCurrent ? 'text-[#D4C9BE]' : 'text-[#123458]'} />
                        <span className={hoveredTier === i && !isCurrent ? 'text-[#F1EFEC]' : 'text-[#123458]/80'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button disabled={isCurrent} onClick={() => !isCurrent && setSelectedPlan(tier)} className={`w-full py-4 rounded-xl font-black text-sm transition-all ${isCurrent ? 'bg-transparent border-2 border-[#123458]/20 text-[#123458]/50 cursor-not-allowed' : hoveredTier === i ? 'bg-[#F1EFEC] text-[#123458] hover:bg-white shadow-lg' : 'bg-[#123458] text-[#F1EFEC] hover:opacity-90 shadow-lg'}`}>
                    {isCurrent ? 'Current Plan' : 'Upgrade Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- MOCK CHECKOUT MODAL --- */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] bg-[#123458]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl">
            
            {!isProcessing && !paymentSuccess && (
              <button onClick={() => setSelectedPlan(null)} className="absolute top-4 right-4 p-2 text-[#123458]/50 hover:text-[#123458] hover:bg-[#F1EFEC] rounded-full transition-colors">
                <X size={20} />
              </button>
            )}

            {paymentSuccess ? (
              <div className="text-center py-8 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-[#123458] mb-2 font-serif">Upgrade Complete!</h3>
                <p className="text-[#123458]/70 mb-8">Welcome to the {selectedPlan.name} tier. Your vault capacity has been expanded.</p>
                <button onClick={() => { setPaymentSuccess(false); setSelectedPlan(null); }} className="w-full py-4 bg-[#123458] text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95">
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-[#123458] mb-6 font-serif flex items-center gap-3">
                  <CreditCard className="text-[#D4C9BE]" /> Secure Checkout
                </h3>
                
                <div className="bg-[#F1EFEC] p-5 rounded-2xl mb-6 border border-[#D4C9BE]/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#123458]">{selectedPlan.name} Plan</span>
                    <span className="font-black text-[#123458]">₹{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-[#123458]/60">
                    <span>Billing Cycle</span>
                    <span>{isYearly ? 'Annually (-50%)' : 'Monthly'}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#123458] mb-1 block">Card Information</label>
                    <div className="w-full border-2 border-[#D4C9BE]/30 rounded-xl px-4 py-3 flex items-center justify-between text-[#123458]/50 bg-white">
                      <span>**** **** **** 4242</span>
                      <span className="text-xs">MM/YY</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-[#123458] flex items-center justify-center gap-1 font-bold bg-[#D4C9BE]/20 py-2 rounded-lg">
                    Payment system is currently in Demo Mode
                  </p>
                </div>

                <button onClick={handlePaymentSubmit} disabled={isProcessing} className="w-full py-4 bg-[#123458] text-[#F1EFEC] rounded-xl font-black hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#123458]/20 disabled:opacity-80 disabled:cursor-wait">
                  {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Processing Payment...</> : `Pay ₹${selectedPlan.price}`}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoragePage;