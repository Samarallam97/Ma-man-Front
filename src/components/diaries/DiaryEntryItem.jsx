import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Calendar } from 'lucide-react';

const DiaryEntryItem = ({ entry, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = format(new Date(entry.date), 'MMMM d, yyyy');
  
  // Truncate content if it's too long and not expanded
  const displayContent = isExpanded || entry.content.length < 200 
    ? entry.content 
    : `${entry.content.substring(0, 200)}...`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800">{entry.title}</h3>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(entry)}
              className="p-2 text-slate-500 hover:text-[var(--primary-color)] rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Edit entry"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="prose prose-slate prose-[var(--primary-color)] max-w-none mb-4">
          <p className="whitespace-pre-line text-slate-700">{displayContent}</p>
          
          {entry.content.length > 200 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[var(--primary-color)] hover:text-[var(--primary-color)]-700 text-sm font-medium mt-2"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        
        <div className="flex items-center text-sm text-slate-500">
          <Calendar className="h-4 w-4 mr-2" />
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryItem;