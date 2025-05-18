import React from 'react';
import { PlusCircle } from 'lucide-react';

const DiaryHeader = ({ onNewEntry }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--primary-color)]">My Diary</h1>
        <p className="text-slate-500 mt-1">Capture your thoughts and memories</p>
      </div>
      <button
        onClick={onNewEntry}
        className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-200"
        aria-label="Add new diary entry"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        New Entry
      </button>
    </div>
  );
};

export default DiaryHeader;