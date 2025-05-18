import React, { useState, useEffect } from 'react';
import DiaryHeader from '../../components/diaries/DiaryHeader.jsx';
import DiaryList from '../../components/diaries/DiaryList';
import DiaryForm from '../../components/diaries/DiaryForm';
import DiarySearch from '../../components/diaries/DiarySearch';

const Diary = () => {
  const [entries, setEntries] = useState(() => {
    // Load entries from localStorage on initial render
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
    setIsFormOpen(false);
  };

  const updateEntry = (updatedEntry) => {
    setEntries(entries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
    setEditingEntry(null);
  };

  const deleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || 
      new Date(entry.date).toISOString().split('T')[0] === dateFilter;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <DiaryHeader onNewEntry={() => {
        setEditingEntry(null);
        setIsFormOpen(true);
      }} />
      
      <DiarySearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />
      
      {isFormOpen && (
        <div className="my-6">
          <DiaryForm 
            onSave={editingEntry ? updateEntry : addEntry} 
            onCancel={() => {
              setIsFormOpen(false);
              setEditingEntry(null);
            }}
            entry={editingEntry}
          />
        </div>
      )}
      
      <div className="mt-8">
        <DiaryList 
          entries={filteredEntries} 
          onDelete={deleteEntry} 
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Diary;