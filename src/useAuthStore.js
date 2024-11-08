// src/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  id: localStorage.getItem('id') || null,
  rec: localStorage.getItem('rec') || null,

  // Function to set user data upon login
  setUserData: ({ token, email, id, rec }) => {
    set({ token, email, id, rec });
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
    localStorage.setItem('rec', rec);
  },

  // Logout function
  logout: () => {
    set({ token: null, email: null, id: null, rec: null });
    localStorage.clear();
  }
}));

export default useAuthStore;
