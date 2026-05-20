import { create } from 'zustand'
import api from '../lib/api'

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  token: localStorage.getItem('auth_token') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await api.post('/admin/login', { email, password })
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      set({ user: data.user, token: data.token, isLoading: false })
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Identifiants invalides', isLoading: false })
      return false
    }
  },

  logout: async () => {
    try { await api.post('/admin/logout') } catch {}
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    set({ user: null, token: null })
  },

  isAuthenticated: () => !!get().token,
}))

export default useAuthStore
