import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, logoutUser, getUser, registerUser } from '../api/authApi';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginUser(email, password);
          if (response.success) {
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            set({
              isLoading: false,
              error: response.message || 'Login failed',
            });
            return { success: false, message: response.message };
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Login failed',
          });
          return { success: false, message: error.message };
        }
      },

      registerUser: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Starting registration...');
          const response = await registerUser(name, email, password);
          console.log('Registration response:', response);
          
          if (response.success) {
            console.log('Registration successful, setting user state...');
            // After successful registration, set user data from response
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true, message: response.message };
          } else {
            console.log('Registration failed:', response);
            set({
              isLoading: false,
              error: response.message || 'Registration failed',
            });
            return { success: false, message: response.message };
          }
        } catch (error) {
          console.error('Registration error:', error);
          set({
            isLoading: false,
            error: error.message || 'Registration failed',
          });
          return { success: false, message: error.message };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutUser();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Logout failed',
          });
          return { success: false, message: error.message };
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await getUser();
          if (response.success) {
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            // Handle unauthorized case (user not logged in) - this is not an error
            if (response.isUnauthorized) {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
              return { success: true, isUnauthorized: true };
            }
            // Handle actual errors
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: response.message,
            });
            return { success: false, message: response.message };
          }
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message,
          });
          return { success: false, message: error.message };
        }
      },

      clearError: () => {
        set({ error: null });
      },

      // Computed values
      isAdmin: () => {
        const { user } = get();
        return user?.is_admin || false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore; 