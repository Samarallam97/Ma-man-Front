import React from 'react';
import DiaryEntryItem from './DiaryEntryItem';
import { BookOpen } from 'lucide-react';

const DiaryList = ({ entries, onDelete, onEdit }) => {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen className="h-16 w-16 text-[var(--primary-color)] mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No entries found</h3>
        <p className="text-slate-500 max-w-md">
          {entries.length === 0 
            ? "Your diary is empty. Start by adding your first entry!" 
            : "No entries match your search criteria. Try adjusting your filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <DiaryEntryItem
          key={entry.id}
          entry={entry}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default DiaryList;