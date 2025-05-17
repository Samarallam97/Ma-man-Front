import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { IoAdd, IoTrashOutline, IoCheckmarkOutline, IoCloseOutline, IoPencilOutline } from 'react-icons/io5';

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
      className={`flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm ${
        isRtl ? 'flex-row-reverse' : ''
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-success-500 border-success-500'
            : 'border-neutral-300 dark:border-neutral-600'
        }`}
      >
        {todo.completed && <IoCheckmarkOutline className="text-white" />}
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-grow">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="input"
            autoFocus
          />
        </form>
      ) : (
        <span
          className={`flex-grow ${todo.completed ? 'line-through text-neutral-500' : ''}`}
        >
          {todo.title}
        </span>
      )}

      <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-neutral-500 hover:text-primary-500 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          {isEditing ? <IoCloseOutline /> : <IoPencilOutline />}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-neutral-500 hover:text-error-500 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
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

  useEffect(() => {
    // Fetch todos from mock API
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${isRtl ? 'text-right' : ''}`}>
        {t('todos.title')}
      </h1>

      <form onSubmit={handleSubmit} className={`mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder={t('todos.add')}
            className="input flex-grow"
          />
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
            disabled={!newTodo.trim()}
          >
            <IoAdd />
            <span>{t('todos.add')}</span>
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </AnimatePresence>

        {todos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">{t('todos.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;