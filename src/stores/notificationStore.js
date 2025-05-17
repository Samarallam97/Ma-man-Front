import { create } from 'zustand';
import mockApi from '../services/mockService';

const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  error: null,
  
  // Fetch all notifications
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const response = await mockApi.getNotifications();
      set({ notifications: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  // Mark notification as read
  markAsRead: async (id) => {
    try {
      await mockApi.markNotificationAsRead(id);
      set((state) => ({
        notifications: state.notifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      }));
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },
  
  // Mark all notifications as read
  markAllAsRead: async () => {
    set({ isLoading: true });
    try {
      await mockApi.markAllNotificationsAsRead();
      set((state) => ({
        notifications: state.notifications.map(notification => ({ ...notification, read: true })),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }
  },
  
  // Delete a notification
  deleteNotification: async (id) => {
    try {
      await mockApi.deleteNotification(id);
      set((state) => ({
        notifications: state.notifications.filter(notification => notification.id !== id)
      }));
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },
  
  // Clear all notifications
  clearAllNotifications: async () => {
    set({ isLoading: true });
    try {
      await mockApi.clearAllNotifications();
      set({ notifications: [], isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }
  },
  
  // Get unread count
  getUnreadCount: (state) => (state && state.notifications ? state.notifications.filter(notification => !notification.read).length : 0),
}));

export default useNotificationStore;