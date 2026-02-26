import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Plus, CloudUpload, FolderPlus, File, 
  Folder, RefreshCw, Trash2, Move, ExternalLink, ChevronLeft
} from 'lucide-react';

import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast'; 
import MoveModal from '../components/MoveModal';
import Profile from '../pages/ProfilePage';       
import ActivityLog from './ActivityLog';
import { API_BASE_URL } from '../config'; 

const Dashboard = ({ onLogout }) => {
  const [vaultFiles, setVaultFiles] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [currentUser, setCurrentUser] = useState({ 
    name: 'Loading...', 
    tier: 'Free',
    avatar: null 
  });

  const fileInputRef = useRef(null);
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [moveData, setMoveData] = useState({ isOpen: false, fileId: null, fileName: '' });

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const fetchVaultContent = async () => {
    setLoading(true);
    const token = localStorage.getItem('vaultToken');
    try {
      const filesRes = await fetch(`${API_BASE_URL}/api/files/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const filesData = await filesRes.json();
      if (filesData.success) setVaultFiles(filesData.files);

      // B. Fetch Current User (The Fix)
      const userRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userData = await userRes.json();
      if (userData.success) setCurrentUser(userData.user);

    } catch (err) {
      console.error("Vault Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVaultContent(); }, []);

  // --- 3. ACTION HANDLERS ---
  const handleDelete = async (fileId) => {
    if (!window.confirm("Purge this item from the sanctum?")) return;
    
    const token = localStorage.getItem('vaultToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setVaultFiles(prev => prev.filter(f => f._id !== fileId));
        triggerToast("Item purged successfully.", "success");
      }
    } catch (err) {
      triggerToast("Purge failed.", "error");
    }
  };

  const handleCreateFolder = async () => {
    const folderName = prompt("Enter new folder name:");
    if (!folderName) return;

    const token = localStorage.getItem('vaultToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/create-folder`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ fileName: folderName, parentId: currentFolderId })
      });
      const data = await response.json();
      if (data.success) setVaultFiles(prev => [data.folder, ...prev]);
    } catch (err) {
      triggerToast("Folder creation failed.", "error");
    }
    setIsAddMenuOpen(false);
  };

  const onUpload = async (fileObject) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', fileObject);
    formData.append('parentId', currentFolderId);

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
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  const handleMoveInit = (fileId, fileName) => {
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
        setVaultFiles(prev => prev.map(f => 
          f._id === fileId ? { ...f, parentId: targetFolderId } : f
        ));
        triggerToast("File relocated successfully", "success");
      }
    } catch (err) {
      triggerToast("Relocation failed", "error");
    } finally {
      setMoveData({ isOpen: false, fileId: null, fileName: '' });
    }
  };

  // --- 4. DOCUMENTS VIEW COMPONENT ---
  const DocumentsView = () => {
    const displayedItems = vaultFiles.filter(f => f.parentId === currentFolderId);

    return (
      <div className="flex-1 flex overflow-hidden">
        {/* Inner Add Sidebar */}
        <aside className="w-64 bg-white border-r p-6 hidden md:flex flex-col gap-4">
          <button onClick={() => setIsAddMenuOpen(!isAddMenuOpen)} className="w-full bg-[#123458] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all">
            <Plus size={20} /> Add Item
          </button>
          
          {isAddMenuOpen && (
            <div className="bg-[#F1EFEC] rounded-xl p-2 border border-[#D4C9BE]/50 space-y-1 animate-in fade-in slide-in-from-top-2">
              <button onClick={handleCreateFolder} className="w-full text-left px-4 py-2 hover:bg-[#D4C9BE] rounded-lg flex items-center gap-2 text-sm font-bold text-[#123458]">
                <FolderPlus size={16}/> New Folder
              </button>
              <button onClick={() => fileInputRef.current.click()} className="w-full text-left px-4 py-2 hover:bg-[#D4C9BE] rounded-lg flex items-center gap-2 text-sm font-bold text-[#123458]">
                <CloudUpload size={16}/> Upload File
              </button>
              <input type="file" ref={fileInputRef} onChange={(e) => onUpload(e.target.files[0])} className="hidden" />
            </div>
          )}
        </aside>

        {/* File Browser Grid */}
        <main 
          onDragOver={(e) => e.preventDefault()} 
          onDrop={handleDrop}
          className="flex-1 flex flex-col p-8 relative bg-[#F1EFEC] min-w-0 overflow-y-auto"
        >
          <div className="flex items-center gap-2 mb-8 text-[#123458]">
            <button onClick={() => setCurrentFolderId('root')} className="font-black text-xs uppercase tracking-widest hover:underline">Root</button>
            {currentFolderId !== 'root' && (
              <>
                <ChevronLeft size={14} />
                <span className="font-bold text-xs opacity-50">Inside Folder</span>
              </>
            )}
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center"><RefreshCw className="animate-spin text-[#123458]" size={48} /></div>
          ) : displayedItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <CloudUpload size={64} className="text-[#D4C9BE]" />
              <h2 className="text-xl font-bold text-[#123458]">This directory is empty.</h2>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {displayedItems.map((file) => (
                <div key={file._id} className="group flex flex-col items-center gap-2">
                  <div 
                    onClick={() => file.isFolder && setCurrentFolderId(file._id)}
                    className={`w-full aspect-square rounded-[2rem] border-2 flex items-center justify-center transition-all relative overflow-hidden cursor-pointer ${file.isFolder ? 'bg-[#123458]/5 border-[#123458]' : 'bg-white border-[#D4C9BE]'}`}
                  >
                    {file.isFolder ? <Folder size={48} fill="#123458" /> : file.fileType?.includes('image') ? <img src={file.fileUrl} alt={file.fileName} className="w-full h-full object-cover" /> : <File size={40} />}
                    
                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-[#123458]/90 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm">
                      {!file.isFolder ? (
                        <>
                          <button onClick={(e) => {e.stopPropagation(); window.open(file.fileUrl, '_blank')}} className="p-2 bg-white rounded-xl text-[#123458] hover:scale-110"><ExternalLink size={16}/></button>
                          <button onClick={(e) => {e.stopPropagation(); handleMoveInit(file._id, file.fileName)}} className="p-2 bg-white rounded-xl text-[#123458] hover:scale-110"><Move size={16}/></button>
                          <button onClick={(e) => {e.stopPropagation(); handleDelete(file._id)}} className="p-2 bg-rose-500 text-white rounded-xl hover:scale-110 shadow-lg"><Trash2 size={16}/></button>
                        </>
                      ) : (
                        <button onClick={(e) => {e.stopPropagation(); handleDelete(file._id)}} className="p-2 bg-rose-500 text-white rounded-xl hover:scale-110 shadow-lg"><Trash2 size={16}/></button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-bold truncate w-full text-center text-[#123458]">{file.fileName}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  };

  // --- MAIN RENDER ---
  return (
    <div className="h-screen w-full flex bg-[#F1EFEC] overflow-hidden relative font-inter">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} onLogout={onLogout} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-64'}`}>
        
        {/* --- PASSED REAL USER DATA TO TOPBAR --- */}
        <Topbar user={currentUser} />
        
        {/* --- ROUTER OUTLET --- */}
        <Routes>
          <Route index element={<Navigate to="documents" replace />} />
          <Route path="documents" element={<DocumentsView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="settings" element={
            <div className="flex-1 flex items-center justify-center text-[#123458] font-bold text-xl opacity-50">
              Settings Configuration: Coming Soon
            </div>
          } />
        </Routes>
      </div>

      {/* --- OVERLAYS --- */}
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
    </div>
  );
};

export default Dashboard;