import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';
  
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-bottom-4 duration-300 ${
      isSuccess ? 'bg-[#123458] border-[#D4C9BE]/20 text-white' : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      {isSuccess ? <CheckCircle className="text-[#D4C9BE]" size={20} /> : <AlertCircle size={20} />}
      <p className="text-sm font-black uppercase tracking-widest">{message}</p>
      <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity ml-2">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;