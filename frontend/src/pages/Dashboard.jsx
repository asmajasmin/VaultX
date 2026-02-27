import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
<<<<<<< HEAD
  Search, Bell, User, Settings, LogOut, ChevronDown, 
  ShieldCheck, Zap, File, Folder, X, Clock, Loader
} from 'lucide-react';
import { API_BASE_URL } from '../config'; 

const Topbar = ({ user }) => {
  const navigate = useNavigate();
=======
  Plus, CloudUpload, FolderPlus, File, 
  Folder, RefreshCw, Trash2, Move, ExternalLink, ChevronLeft, ChevronDown, Check, ArrowDownUp,
  MoreVertical, Edit2, Download, Info, X
} from 'lucide-react';

import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast'; 
import MoveModal from '../components/MoveModal';
import Profile from '../pages/ProfilePage';   
import StoragePage from '../pages/StoragePage';      
import ActivityLog from './ActivityLog';
import { API_BASE_URL } from '../config'; 

const Dashboard = ({ onLogout }) => {
  const [vaultFiles, setVaultFiles] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ by: 'name', direction: 'asc', folders: 'top' });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
  
  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

<<<<<<< HEAD
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
=======
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [moveData, setMoveData] = useState({ isOpen: false, fileId: null, fileName: '' });
  
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [infoModal, setInfoModal] = useState({ isOpen: false, file: null });

  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62

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
        searchResults([]);
        setIsSearchOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // --- 2. NOTIFICATION LOGIC ---
  const fetchNotifications = async () => {
    const token = localStorage.getItem('vaultToken');
    try {
<<<<<<< HEAD
      const res = await fetch( `${API_BASE_URL}/api/files/logs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
=======
      // 1. Fetch User Data First
      const userRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // --- THE FIX: Check if token is expired/invalid ---
      if (userRes.status === 401 || userRes.status === 403) {
        triggerToast("Session expired. Please log in again.", "error");
        setTimeout(() => {
          onLogout(); // Triggers the logout function passed from App.jsx
        }, 1500);
        return; 
      }

      const userData = await userRes.json();
      if (userData.success) setCurrentUser(userData.user);

      // 2. Fetch Files
      const filesRes = await fetch(`${API_BASE_URL}/api/files/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const filesData = await filesRes.json();
      if (filesData.success) setVaultFiles(filesData.files);

    } catch (err) {
      console.error("Vault Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVaultContent(); }, []);

  const handleDelete = async (e, fileId) => {
    e.stopPropagation();
    setMenuOpenId(null);
    if (!window.confirm("Purge this item from the sanctum?")) return;
    
    const token = localStorage.getItem('vaultToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
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

<<<<<<< HEAD
  return (
    // FIX: Reduced height and side padding on mobile (h-16 px-4), standard size on desktop (md:h-20 md:px-8), added gap to space out items
    <header className="h-16 md:h-20 bg-[#F1EFEC] border-b border-[#D4C9BE] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-colors gap-3 md:gap-6">
      
      {/* --- GLOBAL SEARCH SECTION --- */}
      <div className="flex-1 max-w-full md:max-w-xl relative group z-50" ref={searchRef}>
        {/* FIX: Smaller search icon and padding on mobile */}
        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-[#D4C9BE] group-focus-within:text-[#123458] transition-colors">
          <Search className="w-4 h-4 md:w-[18px] md:h-[18px]" />
        </div>
        {/* FIX: Adjusted padding, font size, and rounded corners for mobile */}
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length > 0 && setIsSearchOpen(true)}
          placeholder="Search your secure vault..." 
          className="w-full bg-[#D4C9BE]/10 border-2 border-[#D4C9BE] rounded-xl md:rounded-2xl py-2 md:py-2.5 pl-9 md:pl-12 pr-3 md:pr-4 focus:outline-none focus:ring-4 focus:ring-[#123458]/5 focus:border-[#123458] transition-all font-semibold text-[#030303] placeholder-[#123458]/40 shadow-inner text-xs md:text-sm"
        />

        {/* Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 md:mt-3 bg-white rounded-xl md:rounded-2xl shadow-2xl border border-[#D4C9BE]/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {isSearching ? (
              <div className="p-4 flex items-center justify-center text-[#D4C9BE] text-xs md:text-sm">
                <Loader className="animate-spin mr-2" size={16} /> Searching encrypted index...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                <div className="px-4 py-2 bg-[#F1EFEC]/50 text-[10px] font-black uppercase tracking-widest text-[#123458]/50">
                  Best Matches
                </div>
                {searchResults.map((file) => (
                  <div 
                    key={file._id}
                    onClick={() => {
                      file.isFolder ? alert("Navigate to folder logic needed") : window.open(file.fileUrl, '_blank');
                    }}
                    className="flex items-center gap-3 md:gap-4 px-4 py-3 hover:bg-[#F1EFEC] cursor-pointer transition-colors border-b border-[#F1EFEC] last:border-0"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#123458]/5 flex items-center justify-center text-[#123458] shrink-0">
                      {file.isFolder ? <Folder size={16} className="md:w-5 md:h-5" /> : <File size={16} className="md:w-5 md:h-5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-bold text-[#123458] truncate">{file.fileName}</p>
                      <p className="text-[9px] md:text-[10px] text-[#D4C9BE] uppercase font-bold">{file.isFolder ? 'Directory' : file.fileSize || 'File'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 md:p-6 text-center text-[#D4C9BE]">
                <ShieldCheck size={28} className="mx-auto mb-2 opacity-50 md:w-8 md:h-8" />
                <p className="text-xs md:text-sm font-bold">No secure items found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- ACTIONS SECTION --- */}
      {/* FIX: Prevent shrinking of icons and reduced gap on mobile */}
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        
        {/* --- NOTIFICATIONS DROPDOWN --- */}
        <div className="relative" ref={notifRef}>
          {/* FIX: Scaled down button padding on mobile */}
          <button 
            onClick={toggleNotifications}
            className={`relative p-2 md:p-2.5 text-[#123458] border border-[#D4C9BE] rounded-lg md:rounded-xl transition-all active:scale-95 group ${isNotifOpen ? 'bg-[#123458] text-white border-[#123458]' : 'bg-[#D4C9BE]/30 hover:bg-[#D4C9BE]/50'}`}
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-rose-500 border-2 border-[#F1EFEC] rounded-full animate-pulse"></span>
            )}
          </button>

          {isNotifOpen && (
            // FIX: right-[-60px] pushes it to the right on mobile so it doesn't cut off the left side of the screen. w-[300px] ensures it fits.
            <div className="absolute top-full right-[-60px] md:right-0 mt-3 w-[300px] md:w-80 bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-[#D4C9BE]/30 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-3 md:p-4 border-b border-[#F1EFEC] flex justify-between items-center bg-[#F1EFEC]/50">
                <h3 className="text-sm md:text-base font-bold text-[#123458]">Activity Log</h3>
                <span className="text-[9px] md:text-[10px] font-black bg-[#123458] text-white px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <div className="max-h-80 md:max-h-96 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-6 md:p-8 text-center text-[#D4C9BE]">
                    <Clock size={28} className="mx-auto mb-2 opacity-50 md:w-8 md:h-8" />
                    <p className="text-xs font-bold">No recent activity detected.</p>
                  </div>
                ) : (
                  notifications.map((log, index) => (
                    <div key={index} className="flex gap-3 md:gap-4 p-3 md:p-4 border-b border-[#F1EFEC] hover:bg-[#F1EFEC]/30 transition-colors">
                      <div className={`mt-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0 ${
                        log.action === 'DELETE' ? 'bg-rose-500' : 
                        log.action === 'UPLOAD' ? 'bg-emerald-500' : 'bg-[#123458]'
                      }`} />
                      <div>
                        <p className="text-[10px] md:text-xs font-black text-[#123458] uppercase tracking-wide mb-0.5">{log.action}</p>
                        <p className="text-xs md:text-sm text-[#123458]/80 leading-snug">{log.details}</p>
                        <p className="text-[9px] md:text-[10px] text-[#D4C9BE] mt-1.5 md:mt-2 font-bold flex items-center gap-1">
                          <Clock size={10} /> {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 md:p-3 bg-[#F1EFEC] text-center border-t border-[#D4C9BE]/10">
                <button className="text-[10px] md:text-xs font-bold text-[#123458] hover:underline">View Full Audit Trail</button>
              </div>
=======
    const token = localStorage.getItem('vaultToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (data.success) setVaultFiles(prev => [data.file, ...prev]);
    } catch (err) {
      triggerToast("Upload failed.", "error");
    } finally {
      setLoading(false);
    }
    setIsAddMenuOpen(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  const handleMoveInit = (e, fileId, fileName) => {
    e.stopPropagation();
    setMenuOpenId(null);
    const folders = vaultFiles.filter(f => f.isFolder && f._id !== fileId);
    if (folders.length === 0) return triggerToast("No target folders available", "error");
    setMoveData({ isOpen: true, fileId, fileName });
  };

  const handleMoveConfirm = async (targetFolderId) => {
    const { fileId } = moveData;
    const token = localStorage.getItem('vaultToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/move/${fileId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ targetFolderId })
      });
      if (response.ok) {
        setVaultFiles(prev => prev.map(f => f._id === fileId ? { ...f, parentId: targetFolderId } : f));
        triggerToast("File relocated successfully", "success");
      }
    } catch (err) {
      triggerToast("Relocation failed", "error");
    } finally {
      setMoveData({ isOpen: false, fileId: null, fileName: '' });
    }
  };

  const handleRename = async (e, file) => {
    e.stopPropagation();
    setMenuOpenId(null);
    const newName = prompt("Enter new name:", file.fileName);
    if (!newName || newName === file.fileName) return;

    const token = localStorage.getItem('vaultToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/rename/${file._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: newName })
      });
      if (response.ok) {
        setVaultFiles(prev => prev.map(f => f._id === file._id ? { ...f, fileName: newName } : f));
        triggerToast("Renamed successfully");
      }
    } catch (err) {
      triggerToast("Rename failed", "error");
    }
  };

  const handleOpen = async (e, file) => {
    e.stopPropagation();
    setMenuOpenId(null);
    
    if (file.isFolder) {
      setCurrentFolderId(file._id);
      return;
    }

    try {
      triggerToast("Securing connection...");
      const token = localStorage.getItem('vaultToken');
      const headers = file.fileUrl.includes(API_BASE_URL) ? { 'Authorization': `Bearer ${token}` } : {};
      
      const response = await fetch(file.fileUrl, { headers });
      if (!response.ok) throw new Error("Failed to fetch file");
      
      const arrayBuffer = await response.arrayBuffer();
      let mimeType = response.headers.get('content-type') || 'application/octet-stream';
      
      // Force correct MIME type for PDFs from Cloudinary to prevent browser error
      if (file.fileName.toLowerCase().endsWith('.pdf') || file.fileType === 'application/pdf') {
        mimeType = 'application/pdf';
      }

      const blob = new Blob([arrayBuffer], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);
      
      window.open(blobUrl, '_blank');
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000); 
    } catch (error) {
      console.warn("Secure blob fetch failed, falling back to direct URL", error);
      window.open(file.fileUrl, '_blank');
    }
  };

  const handleDownload = async (e, file) => {
    e.stopPropagation();
    setMenuOpenId(null);
    if (file.isFolder) {
      triggerToast("Folder download not supported yet", "error");
      return;
    }
    
    try {
      triggerToast("Preparing download...");
      const token = localStorage.getItem('vaultToken');
      const headers = file.fileUrl.includes(API_BASE_URL) ? { 'Authorization': `Bearer ${token}` } : {};
      
      const response = await fetch(file.fileUrl, { headers });
      if (!response.ok) throw new Error("Download fetch failed");
      
      const arrayBuffer = await response.arrayBuffer();
      let mimeType = response.headers.get('content-type') || 'application/octet-stream';
      if (file.fileName.toLowerCase().endsWith('.pdf')) mimeType = 'application/pdf';

      const blob = new Blob([arrayBuffer], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const link = document.createElement('a');
      link.href = file.fileUrl;
      link.download = file.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleInfo = (e, file) => {
    e.stopPropagation();
    setMenuOpenId(null);
    setInfoModal({ isOpen: true, file });
  };

  const DocumentsView = () => {
    let displayedItems = vaultFiles.filter(f => f.parentId === currentFolderId);

    displayedItems.sort((a, b) => {
      let valA = sortConfig.by === 'name' ? (a.fileName || '').toLowerCase() : new Date(a.createdAt || 0).getTime();
      let valB = sortConfig.by === 'name' ? (b.fileName || '').toLowerCase() : new Date(b.createdAt || 0).getTime();
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    if (sortConfig.folders === 'top') {
      displayedItems = [
        ...displayedItems.filter(f => f.isFolder),
        ...displayedItems.filter(f => !f.isFolder)
      ];
    }

    return (
      <div className="flex-1 flex overflow-hidden">
        <main 
          onDragOver={(e) => e.preventDefault()} 
          onDrop={handleDrop}
          className="flex-1 flex flex-col p-4 md:p-8 relative bg-[#F1EFEC] min-w-0 overflow-y-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-[#123458] overflow-x-auto pb-2 md:pb-0">
              <button onClick={() => setCurrentFolderId('root')} className="font-black text-xs md:text-sm uppercase tracking-widest hover:underline whitespace-nowrap">Root</button>
              {currentFolderId !== 'root' && (
                <>
                  <ChevronLeft size={16} />
                  <span className="font-bold text-xs md:text-sm opacity-50 whitespace-nowrap">Inside Folder</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsSortMenuOpen(!isSortMenuOpen); setIsAddMenuOpen(false); }} 
                  className="w-full md:w-auto px-3 md:px-4 py-2.5 bg-white border border-[#D4C9BE] text-[#123458] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#D4C9BE]/20 transition-all shadow-sm text-sm"
                >
                  <ArrowDownUp size={16} /> <span className="hidden sm:inline">Sort</span> <ChevronDown size={14} />
                </button>
                
                {isSortMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl rounded-xl border border-[#D4C9BE]/50 z-50 py-2 text-sm text-[#123458] animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-1 text-[10px] font-black opacity-50 uppercase tracking-wider">Sort by</div>
                    <button onClick={() => setSortConfig({...sortConfig, by: 'name'})} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center justify-between font-medium">Name {sortConfig.by === 'name' && <Check size={16} />}</button>
                    <button onClick={() => setSortConfig({...sortConfig, by: 'date'})} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center justify-between font-medium">Date modified {sortConfig.by === 'date' && <Check size={16} />}</button>
                    <div className="h-px bg-[#D4C9BE]/30 my-1"></div>
                    <div className="px-4 py-1 text-[10px] font-black opacity-50 uppercase tracking-wider">Sort direction</div>
                    <button onClick={() => setSortConfig({...sortConfig, direction: 'asc'})} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center justify-between font-medium">{sortConfig.by === 'name' ? 'A to Z' : 'Oldest first'} {sortConfig.direction === 'asc' && <Check size={16} />}</button>
                    <button onClick={() => setSortConfig({...sortConfig, direction: 'desc'})} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center justify-between font-medium">{sortConfig.by === 'name' ? 'Z to A' : 'Newest first'} {sortConfig.direction === 'desc' && <Check size={16} />}</button>
                    <div className="h-px bg-[#D4C9BE]/30 my-1"></div>
                    <div className="px-4 py-1 text-[10px] font-black opacity-50 uppercase tracking-wider">Folders</div>
                    <button onClick={() => setSortConfig({...sortConfig, folders: 'top'})} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center justify-between font-medium">On top {sortConfig.folders === 'top' && <Check size={16} />}</button>
                    <button onClick={() => setSortConfig({...sortConfig, folders: 'mixed'})} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center justify-between font-medium">Mixed with files {sortConfig.folders === 'mixed' && <Check size={16} />}</button>
                  </div>
                )}
              </div>

              <div className="relative flex-1 md:flex-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsAddMenuOpen(!isAddMenuOpen); setIsSortMenuOpen(false); }} 
                  className="w-full md:w-auto bg-[#123458] text-[#F1EFEC] px-4 md:px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all text-sm"
                >
                  <Plus size={18} /> Add Item
                </button>
                
                {isAddMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-xl border border-[#D4C9BE]/50 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <button onClick={handleCreateFolder} className="w-full text-left px-4 py-3 hover:bg-[#F1EFEC] rounded-lg flex items-center gap-3 text-sm font-bold text-[#123458]">
                      <FolderPlus size={18}/> New Folder
                    </button>
                    <button onClick={() => fileInputRef.current.click()} className="w-full text-left px-4 py-3 hover:bg-[#F1EFEC] rounded-lg flex items-center gap-3 text-sm font-bold text-[#123458]">
                      <CloudUpload size={18}/> Upload File
                    </button>
                    <input type="file" ref={fileInputRef} onChange={(e) => onUpload(e.target.files[0])} className="hidden" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center"><RefreshCw className="animate-spin text-[#123458]" size={48} /></div>
          ) : displayedItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <CloudUpload size={64} className="text-[#D4C9BE]" />
              <h2 className="text-xl font-bold text-[#123458]">This directory is empty.</h2>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 md:gap-6 pb-20 md:pb-0">
              {displayedItems.map((file) => (
                <div 
                  key={file._id} 
                  className="group flex flex-col items-center gap-2 relative"
                  onContextMenu={(e) => { e.preventDefault(); setMenuOpenId(file._id); }}
                >
                  <div 
                    onClick={(e) => handleOpen(e, file)}
                    className={`w-full aspect-square rounded-2xl md:rounded-3xl border-2 flex items-center justify-center transition-all relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md ${file.isFolder ? 'bg-[#123458]/5 border-[#123458]/20 hover:border-[#123458]' : 'bg-white border-[#D4C9BE]/50 hover:border-[#D4C9BE]'}`}
                  >
                    {file.isFolder ? <Folder size={48} fill="#123458" className="opacity-80 group-hover:opacity-100 transition-opacity" /> : file.fileType?.includes('image') ? <img src={file.fileUrl} alt={file.fileName} className="w-full h-full object-cover" /> : <File size={40} className="text-[#123458]/70 group-hover:text-[#123458]" />}
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === file._id ? null : file._id); }}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-[#123458] z-10 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F1EFEC] active:scale-95 border border-[#D4C9BE]/30"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {menuOpenId === file._id && (
                    <div className="absolute top-10 right-2 w-48 bg-white rounded-xl shadow-2xl border border-[#D4C9BE]/50 z-50 py-2 animate-in fade-in zoom-in-95">
                      <button onClick={(e) => handleOpen(e, file)} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center gap-3 text-sm font-bold text-[#123458]">
                        <ExternalLink size={16}/> Open
                      </button>
                      <button onClick={(e) => handleRename(e, file)} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center gap-3 text-sm font-bold text-[#123458]">
                        <Edit2 size={16}/> Rename
                      </button>
                      
                      {!file.isFolder && (
                        <button onClick={(e) => handleDownload(e, file)} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center gap-3 text-sm font-bold text-[#123458]">
                          <Download size={16}/> Download
                        </button>
                      )}

                      <button onClick={(e) => handleMoveInit(e, file._id, file.fileName)} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center gap-3 text-sm font-bold text-[#123458]">
                        <Move size={16}/> Move
                      </button>
                      <button onClick={(e) => handleInfo(e, file)} className="w-full text-left px-4 py-2 hover:bg-[#F1EFEC] flex items-center gap-3 text-sm font-bold text-[#123458]">
                        <Info size={16}/> File Info
                      </button>

                      <div className="h-px bg-[#D4C9BE]/30 my-1"></div>

                      <button onClick={(e) => handleDelete(e, file._id)} className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center gap-3 text-sm font-bold text-rose-600">
                        <Trash2 size={16}/> Delete
                      </button>
                    </div>
                  )}

                  <p className="text-xs md:text-sm font-bold truncate w-full text-center text-[#123458] px-2">{file.fileName}</p>
                </div>
              ))}
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
            </div>
          )}
        </div>

<<<<<<< HEAD
        {/* --- PROFILE DROPDOWN AREA --- */}
        {/* FIX: Reduced left padding (pl-3 md:pl-6) on mobile to save space */}
        <div className="flex items-center gap-3 md:gap-4 pl-3 md:pl-6 border-l border-[#D4C9BE]">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-[#123458] font-serif tracking-wide leading-none mb-1">
              {user?.name || user?.username || 'Authorized User'}
            </p>
            <div className="flex items-center gap-1.5 justify-end">
              <Zap size={10} className="text-[#123458]" />
              <p className="text-[9px] font-black text-[#D4C9BE] uppercase tracking-widest">
                {(user?.tier || 'Free').toUpperCase()} TIER
              </p>
=======
  return (
    <div className="h-screen w-full flex bg-[#F1EFEC] overflow-hidden relative font-inter">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} onLogout={onLogout} />
      
      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 pl-0 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        
        <Topbar user={currentUser} />
        
        <Routes>
          <Route index element={<Navigate to="documents" replace />} />
          <Route path="documents" element={<DocumentsView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="storage" element={<StoragePage />} />
          <Route path="settings" element={
            <div className="flex-1 flex items-center justify-center text-[#123458] font-bold text-xl opacity-50">
              Settings Configuration: Coming Soon
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center gap-2 p-1 md:p-1.5 bg-[#123458] rounded-xl md:rounded-2xl hover:opacity-90 transition-all shadow-lg group active:scale-95"
          >
            {/* FIX: Scaled down profile icon on mobile (w-8 h-8 md:w-9 md:h-9) */}
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-[#F1EFEC] flex items-center justify-center text-[#123458] font-black overflow-hidden border border-[#D4C9BE]/50 shadow-inner">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </div>
          </button>
        </div>

      </div>
<<<<<<< HEAD
    </header>
=======

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(prev => ({ ...prev, show: false }))} 
        />
      )}

      <MoveModal 
        isOpen={moveData.isOpen}
        fileName={moveData.fileName}
        folders={vaultFiles.filter(f => f.isFolder && f._id !== moveData.fileId)}
        onClose={() => setMoveData({ isOpen: false, fileId: null, fileName: '' })}
        onConfirm={handleMoveConfirm}
      />

      {infoModal.isOpen && infoModal.file && (
        <div className="fixed inset-0 z-[70] bg-[#123458]/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative shadow-2xl border border-[#D4C9BE]/50">
            <button 
              onClick={() => setInfoModal({ isOpen: false, file: null })} 
              className="absolute top-4 right-4 p-2 bg-[#F1EFEC] rounded-full text-[#123458] hover:bg-[#D4C9BE] transition-colors"
            >
              <X size={16} />
            </button>
            <h3 className="text-xl font-black text-[#123458] mb-6 flex items-center gap-2 font-serif">
              <Info size={24} className="text-[#123458]/70" /> File Details
            </h3>
            <div className="space-y-4 text-sm text-[#123458]">
              <div className="bg-[#F1EFEC] p-5 rounded-2xl space-y-4">
                <p className="flex flex-col"><span className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Name</span> <span className="font-bold break-all text-base">{infoModal.file.fileName}</span></p>
                <div className="h-px bg-[#D4C9BE]/50"></div>
                <p className="flex flex-col"><span className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Type</span> <span className="font-bold text-base">{infoModal.file.isFolder ? 'Folder' : infoModal.file.fileType || 'File'}</span></p>
                <div className="h-px bg-[#D4C9BE]/50"></div>
                <p className="flex flex-col"><span className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Created At</span> <span className="font-bold text-base">{new Date(infoModal.file.createdAt || Date.now()).toLocaleString()}</span></p>
              </div>
            </div>
            <button 
              onClick={() => setInfoModal({ isOpen: false, file: null })}
              className="mt-6 w-full py-4 bg-[#123458] text-[#F1EFEC] rounded-xl font-black hover:opacity-90 active:scale-95 transition-all"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
>>>>>>> 4cc5ae43355cd0692dca0820065c90a08fb55f62
  );
};

export default Topbar;