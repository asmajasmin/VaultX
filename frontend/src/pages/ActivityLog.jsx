import React, { useEffect, useState } from 'react';
import { 
  Clock, Trash2, Cloud, Folder, LogIn, Move, 
  ShieldCheck, AlertTriangle, Calendar, Search, Filter, Activity
} from 'lucide-react';
import { API_BASE_URL } from '../config'; 

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- FILTER STATES ---
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem('vaultToken');
      try {
        const res = await fetch(`${API_BASE_URL}/api/files/logs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setLogs(data.logs);
          setFilteredLogs(data.logs);
        }
      } catch (err) {
        console.error("Log Fetch Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // --- FILTER LOGIC ---
  useEffect(() => {
    let result = logs;

    // 1. Filter by Type
    if (filterType !== 'ALL') {
      result = result.filter(log => log.action === filterType);
    }

    // 2. Filter by Search
    if (searchQuery.trim() !== '') {
      result = result.filter(log => 
        log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLogs(result);
  }, [filterType, searchQuery, logs]);

  // --- HELPER: Group Logs by Date ---
  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const date = new Date(log.createdAt).toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(log);
    return groups;
  }, {});

  // --- HELPER: Stats Calculation ---
  const stats = {
    total: logs.length,
    uploads: logs.filter(l => l.action === 'UPLOAD').length,
    alerts: logs.filter(l => l.action === 'DELETE').length
  };

  const getActionStyle = (action) => {
    switch (action) {
      case 'DELETE': return { icon: Trash2, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
      case 'UPLOAD': return { icon: Cloud, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
      case 'CREATE_FOLDER': return { icon: Folder, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
      case 'MOVE': return { icon: Move, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' };
      case 'LOGIN': return { icon: LogIn, color: 'text-[#123458]', bg: 'bg-[#123458]/10', border: 'border-[#123458]/20' };
      default: return { icon: ShieldCheck, color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center p-8">
       <div className="animate-pulse flex flex-col items-center gap-4">
         <div className="h-12 w-12 bg-[#D4C9BE]/30 rounded-full"></div>
         <div className="h-4 w-48 bg-[#D4C9BE]/20 rounded"></div>
       </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#F1EFEC] p-8 md:p-12 overflow-y-auto custom-scrollbar">
      
      {/* --- HEADER & STATS --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="p-2 bg-[#123458] rounded-xl text-[#F1EFEC] shadow-lg">
                 <ShieldCheck size={20} />
               </span>
               <span className="text-xs font-black uppercase tracking-[0.3em] text-[#D4C9BE]">
                 System Audit
               </span>
            </div>
            <h1 className="text-4xl font-black text-[#123458] font-serif tracking-tight">
              Security Log
            </h1>
          </div>
          
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#123458] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Total Events</p>
              <h3 className="text-3xl font-black">{stats.total}</h3>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Activity size={14} /> +{logs.length} this week
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4C9BE]/30 shadow-lg relative overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Data Ingestion</p>
            <h3 className="text-3xl font-black text-[#123458]">{stats.uploads}</h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#123458]/60">
              <Cloud size={14} /> Upload Actions
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D4C9BE]/30 shadow-lg relative overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#D4C9BE] mb-1">Security Alerts</p>
            <h3 className="text-3xl font-black text-rose-500">{stats.alerts}</h3>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-rose-500/60">
              <AlertTriangle size={14} /> Deletions/Purges
            </div>
          </div>
        </div>
      </div>

      {/* --- FILTER TOOLBAR --- */}
      <div className="max-w-7xl mx-auto mb-8 bg-white p-4 rounded-2xl shadow-sm border border-[#D4C9BE]/20 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['ALL', 'LOGIN', 'UPLOAD', 'DELETE', 'MOVE'].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                filterType === type 
                  ? 'bg-[#123458] text-white shadow-md' 
                  : 'bg-[#F1EFEC] text-[#D4C9BE] hover:bg-[#D4C9BE]/20 hover:text-[#123458]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4C9BE] group-focus-within:text-[#123458] transition-colors" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F1EFEC] border-transparent focus:bg-white border-2 focus:border-[#123458] rounded-xl py-2 pl-10 pr-4 text-sm font-bold text-[#123458] placeholder-[#D4C9BE] outline-none transition-all"
          />
        </div>
      </div>

      {/* --- TIMELINE --- */}
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute left-6 top-4 bottom-0 w-0.5 bg-gradient-to-b from-[#D4C9BE]/50 to-transparent"></div>

        {Object.keys(groupedLogs).length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Filter size={48} className="mx-auto mb-4 text-[#123458]" />
            <p className="font-bold text-[#123458]">No records match your filter.</p>
            <button onClick={() => {setFilterType('ALL'); setSearchQuery('')}} className="mt-4 text-xs font-bold text-rose-500 underline">Clear Filters</button>
          </div>
        ) : (
          Object.entries(groupedLogs).map(([date, items], groupIndex) => (
            <div key={date} className="mb-10 relative animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${groupIndex * 100}ms` }}>
              
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#F1EFEC] border-4 border-[#F1EFEC] shadow-sm flex items-center justify-center z-10">
                   <div className="w-8 h-8 rounded-full bg-[#123458] flex items-center justify-center text-white">
                     <Calendar size={14} />
                   </div>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#123458] bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#D4C9BE]/20">
                  {date}
                </h3>
              </div>

              {/* Log Items */}
              <div className="space-y-3 pl-12 sm:pl-16">
                {items.map((log, i) => {
                  const style = getActionStyle(log.action);
                  return (
                    <div 
                      key={i} 
                      className="group relative bg-white p-4 md:p-5 rounded-2xl border border-[#D4C9BE]/20 shadow-sm hover:shadow-lg hover:border-[#123458]/20 transition-all duration-300 flex items-center gap-6"
                    >
                      {/* Connector Dot */}
                      <div className="absolute -left-[2.85rem] sm:-left-[3.85rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D4C9BE] border-2 border-[#F1EFEC] group-hover:bg-[#123458] group-hover:scale-150 transition-all"></div>

                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${style.bg} ${style.color} ${style.border} shadow-inner`}>
                           <style.icon size={24} strokeWidth={2.5} />
                      </div>

                      {/* Content - Wider Layout */}
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div>
                           <div className="flex items-center gap-3 mb-1">
                             <p className="text-sm font-black text-[#123458] uppercase tracking-wide">
                               {log.action.replace('_', ' ')}
                             </p>
                             {log.ipAddress && (
                               <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-[#F1EFEC] text-[9px] font-mono text-[#D4C9BE] border border-[#D4C9BE]/20">
                                 {log.ipAddress}
                               </span>
                             )}
                           </div>
                           <p className="text-sm font-medium text-[#123458]/80 leading-relaxed">
                             {log.details}
                           </p>
                         </div>

                         {/* Time Badge */}
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D4C9BE] uppercase tracking-widest bg-[#F1EFEC] px-3 py-1.5 rounded-xl whitespace-nowrap border border-[#D4C9BE]/10">
                           <Clock size={12} />
                           {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;