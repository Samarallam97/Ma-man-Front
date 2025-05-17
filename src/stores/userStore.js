import { create } from 'zustand';
import mockApi from '../services/mockService';

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  // Fetch user data
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const response = await mockApi.getUser();
      set({ user: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  // Update user info
  updateUser: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await mockApi.updateUser(userData);
      set({ user: response.data, isLoading: false, error: null });
      return true;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }
  },
  
  // Update password
  updatePassword: async (passwordData) => {
    set({ isLoading: true });
    try {
      await mockApi.updatePassword(passwordData);
      set({ isLoading: false, error: null });
      return true;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return false;
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null });
  },
}));

export default useUserStore;