import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  IoAdd,
  IoTrashOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoSearchOutline,
} from 'react-icons/io5';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { language } = useLanguage();
  const isRtl = language === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(todo.id, { ...todo, title: editedTitle });
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-shadow duration-300 ${
        isRtl ? 'flex-row-reverse' : ''
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={` w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
          todo.completed
            ? 'bg-[var(--primary-color)] border-[var(--primary-color)]'
            : 'bg-[var(--secondary-color)]  dark:border-[var(--primary-dark)] hover:border-[var(--primary-color)]'
        }`}
      >
        {todo.completed && <IoCheckmarkOutline className="text-white" />}
      </button>

      <div className="flex-grow">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] dark:bg-gray-700 dark:text-white"
              autoFocus
            />
          </form>
        ) : (
          <div className="flex flex-col">
            <span
              className={`text-gray-800 dark:text-white font-medium ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.title}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {format(new Date(todo.createdAt), 'PPP')}
            </span>
          </div>
        )}
      </div>

      <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-gray-500 hover:text-[var(--primary-color)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isEditing ? <IoCloseOutline /> : <IoPencilOutline />}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <IoTrashOutline />
        </button>
      </div>
    </motion.div>
  );
};

const Todos = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        const data = await response.json();
        setTodos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: Date.now().toString(),
      title: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (statusFilter === 'completed') return todo.completed;
      if (statusFilter === 'active') return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1
        className={`text-3xl font-bold mb-8 text-gray-800 dark:text-white ${
          isRtl ? 'text-right' : ''
        }`}
      >
        {t('todos.title')}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-all duration-300">
        <form
          onSubmit={handleSubmit}
          className={`mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder={t('todos.add')}
              className="flex-grow px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)] flex items-center gap-2 shadow-md transition-colors duration-200"
              disabled={!newTodo.trim()}
            >
              <IoAdd size={20} />
              <span>{t('todos.add')}</span>
            </button>
          </div>
        </form>

        <div className={`flex gap-4 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="relative flex-grow">
            <IoSearchOutline className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('todos.search')}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] dark:bg-gray-700 dark:text-white"
          >
            <option value="all">{t('todos.filter.all')}</option>
            <option value="active">{t('todos.filter.active')}</option>
            <option value="completed">{t('todos.filter.completed')}</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </AnimatePresence>

        {filteredTodos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">{t('todos.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
