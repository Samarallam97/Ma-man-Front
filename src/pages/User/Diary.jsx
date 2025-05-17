import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { IoAdd, IoTrashOutline, IoPencilOutline, IoCalendarOutline, IoSearchOutline } from 'react-icons/io5';

const DiaryEntry = ({ entry, onDelete, onEdit }) => {
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState(entry);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(entry.id, editedEntry);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden"
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 d-flex " >
            <input
              type="text"
              value={editedEntry.title}
              onChange={(e) => setEditedEntry({ ...editedEntry, title: e.target.value })}
              className="input"
              placeholder="Title"
            />
            <textarea
              value={editedEntry.content}
              onChange={(e) => setEditedEntry({ ...editedEntry, content: e.target.value })}
              className="input min-h-[150px]"
              placeholder="Write your thoughts..."
            />
            <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outlined"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-6">
          <div className={`flex items-center justify-between mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-xl font-semibold">{entry.title}</h3>
            <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-neutral-500 hover:text-primary-500 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <IoPencilOutline />
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="p-2 text-neutral-500 hover:text-error-500 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <IoTrashOutline />
              </button>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">{entry.content}</p>
          <div className={`flex items-center text-sm text-neutral-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <IoCalendarOutline className="mr-2" />
            {format(new Date(entry.date), 'PPP')}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Diary = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch diary entries from mock API
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/diary');
        const data = await response.json();
        setEntries(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || entry.date.includes(selectedDate);
    return matchesSearch && matchesDate;
  });

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEdit = (id, updatedEntry) => {
    setEntries(entries.map(entry => entry.id === id ? updatedEntry : entry));
  };

  const handleNewEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    };
    setEntries([newEntry, ...entries]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`flex items-center justify-between mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-3xl font-bold">{t('diary.title')}</h1>
        <button
          onClick={handleNewEntry}
          className="btn btn-primary flex items-center gap-2"
        >
          <IoAdd />
          <span>{t('diary.add')}</span>
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className="relative">
          <IoSearchOutline className="absolute top-3 left-3 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('diary.search')}
            className="input pl-10"
          />
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input"
        />
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {filteredEntries.map((entry) => (
            <DiaryEntry
              key={entry.id}
              entry={entry}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </AnimatePresence>

        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">{t('diary.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;