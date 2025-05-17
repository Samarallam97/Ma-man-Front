import { format } from 'date-fns';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  joinDate: '2023-01-15',
};

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    title: 'Welcome to Ma\'man',
    message: 'We\'re glad to have you here. Explore your new safe space.',
    date: '2023-05-15T09:30:00',
    read: true,
    type: 'info',
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Your password was changed recently. If this wasn\'t you, please contact support.',
    date: '2023-05-14T14:45:00',
    read: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'New Feature Added',
    message: 'Check out our new diary feature to keep track of your thoughts and feelings.',
    date: '2023-05-13T11:20:00',
    read: false,
    type: 'success',
  },
  {
    id: '4',
    title: 'Maintenance Notice',
    message: 'The system will be down for maintenance on June 1st from 2:00 AM to 4:00 AM UTC.',
    date: '2023-05-12T16:00:00',
    read: true,
    type: 'error',
  },
  {
    id: '5',
    title: 'Your Weekly Summary',
    message: 'You\'ve completed 15 tasks this week. Great job!',
    date: '2023-05-11T08:15:00',
    read: true,
    type: 'info',
  },
];

// Mock todos
const mockTodos = [
  {
    id: '1',
    title: 'Complete project proposal',
    completed: false,
    dueDate: '2023-05-20',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Schedule dentist appointment',
    completed: true,
    dueDate: '2023-05-15',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Buy groceries',
    completed: false,
    dueDate: '2023-05-16',
    priority: 'low',
  },
  {
    id: '4',
    title: 'Prepare for meeting',
    completed: false,
    dueDate: '2023-05-18',
    priority: 'high',
  },
];

// Mock diary entries
const mockDiaryEntries = [
  {
    id: '1',
    title: 'First day at new job',
    content: 'Today was my first day at the new job. Everyone was welcoming and I\'m excited about the projects I\'ll be working on.',
    date: '2023-05-10',
    mood: 'happy',
  },
  {
    id: '2',
    title: 'Reflecting on goals',
    content: 'I spent some time today thinking about my goals for the year. I need to focus more on health and personal development.',
    date: '2023-05-08',
    mood: 'thoughtful',
  },
  {
    id: '3',
    title: 'Weekend trip planning',
    content: 'Started planning for a weekend getaway next month. Looking at a few different locations and activities.',
    date: '2023-05-05',
    mood: 'excited',
  },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // User related API calls
  getUser: async () => {
    await delay(300);
    return { data: mockUser };
  },
  
  updateUser: async (userData) => {
    await delay(500);
    const updatedUser = { ...mockUser, ...userData };
    return { data: updatedUser };
  },
  
  updatePassword: async (passwordData) => {
    await delay(500);
    return { data: { message: 'Password updated successfully' } };
  },
  
  // Notification related API calls
  getNotifications: async () => {
    await delay(300);
    return { data: mockNotifications };
  },
  
  markNotificationAsRead: async (id) => {
    await delay(200);
    const updatedNotifications = mockNotifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    return { data: updatedNotifications };
  },
  
  markAllNotificationsAsRead: async () => {
    await delay(300);
    const updatedNotifications = mockNotifications.map(notification => ({ ...notification, read: true }));
    return { data: updatedNotifications };
  },
  
  deleteNotification: async (id) => {
    await delay(200);
    const updatedNotifications = mockNotifications.filter(notification => notification.id !== id);
    return { data: updatedNotifications };
  },
  
  clearAllNotifications: async () => {
    await delay(300);
    return { data: [] };
  },
  
  // Todo related API calls
  getTodos: async () => {
    await delay(300);
    return { data: mockTodos };
  },
  
  createTodo: async (todoData) => {
    await delay(300);
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
    };
    return { data: newTodo };
  },
  
  updateTodo: async (id, todoData) => {
    await delay(200);
    const updatedTodos = mockTodos.map(todo => 
      todo.id === id ? { ...todo, ...todoData } : todo
    );
    return { data: updatedTodos.find(todo => todo.id === id) };
  },
  
  deleteTodo: async (id) => {
    await delay(200);
    const updatedTodos = mockTodos.filter(todo => todo.id !== id);
    return { data: updatedTodos };
  },
  
  // Diary related API calls
  getDiaryEntries: async () => {
    await delay(300);
    return { data: mockDiaryEntries };
  },
  
  createDiaryEntry: async (entryData) => {
    await delay(300);
    const newEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...entryData,
    };
    return { data: newEntry };
  },
  
  updateDiaryEntry: async (id, entryData) => {
    await delay(200);
    const updatedEntries = mockDiaryEntries.map(entry => 
      entry.id === id ? { ...entry, ...entryData } : entry
    );
    return { data: updatedEntries.find(entry => entry.id === id) };
  },
  
  deleteDiaryEntry: async (id) => {
    await delay(200);
    const updatedEntries = mockDiaryEntries.filter(entry => entry.id !== id);
    return { data: updatedEntries };
  },
};

export default mockApi;