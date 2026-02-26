import React from 'react';
import { Folder, X, Move } from 'lucide-react';

const MoveModal = ({ isOpen, onClose, folders, onConfirm, fileName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#123458]/40 backdrop-blur-sm">
      <div className="bg-[#F1EFEC] w-full max-w-sm rounded-[2.5rem] border border-[#D4C9BE] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-[#123458] font-serif">Relocate Item</h3>
            <p className="text-xs font-bold text-[#D4C9BE] uppercase tracking-tighter mt-1">{fileName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#D4C9BE]/20 rounded-full text-[#123458]"><X size={20}/></button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {folders.map((folder) => (
            <button
              key={folder._id}
              onClick={() => onConfirm(folder._id)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-[#D4C9BE] hover:border-[#123458] hover:bg-white transition-all group"
            >
              <Folder size={20} className="text-[#D4C9BE] group-hover:text-[#123458]" />
              <span className="font-bold text-[#123458] text-sm">{folder.fileName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoveModal;