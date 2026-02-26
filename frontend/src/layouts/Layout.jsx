import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Layout = ({ children, activeView, setActiveView, user, isDarkMode, toggleTheme, vaultFiles }) => {
  // Set to true by default as requested
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex transition-colors duration-300">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'pl-20' : 'pl-0 md:pl-64'
        }`}
      >
        <Topbar 
          user={user} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          setActiveView={setActiveView} 
          vaultFiles={vaultFiles}
        />
        
        <main className="flex-1 p-6 md:p-8 max-w-vault mx-auto w-full text-slate-900 dark:text-slate-200">
          {children}
        </main>

        <footer className="p-6 text-center border-t border-slate-200 dark:border-zinc-900 text-slate-500 dark:text-slate-600 text-xs">
          &copy; 2024 Digital Document Vault. Secure. Reliable. Intelligent.
        </footer>
      </div>
    </div>
  );
};

export default Layout;