import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, Wrench, HelpCircle,
  MessageSquare, Star, LogOut, Menu, X, Zap, ChevronRight
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/admin/dashboard',   icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/admin/projets',     icon: FolderKanban,    label: 'Projets' },
  { to: '/admin/services',    icon: Wrench,          label: 'Services' },
  { to: '/admin/faq',         icon: HelpCircle,      label: 'FAQ' },
  { to: '/admin/messages',    icon: MessageSquare,   label: 'Messages' },
  { to: '/admin/temoignages', icon: Star,            label: 'Témoignages' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Déconnexion réussie')
    navigate('/admin/login')
  }

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {(sidebarOpen || onClose) && (
            <span className="font-heading font-bold text-white text-sm">Admin</span>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand-500/15 text-white border border-brand-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {(sidebarOpen || onClose) && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/5">
        {(sidebarOpen || onClose) && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-white text-sm font-medium truncate">{user?.name || 'Administrateur'}</div>
              <div className="text-gray-500 text-xs truncate">{user?.email}</div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {(sidebarOpen || onClose) && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 bg-dark-800 border-r border-white/5 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }}
              transition={{ type: 'spring', damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-dark-800 border-r border-white/5 z-50"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-dark-800/50 border-b border-white/5 px-4 py-3 flex items-center justify-between sticky top-0 z-30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => { setSidebarOpen(!sidebarOpen); setMobileOpen(!mobileOpen) }}
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-gray-500 text-sm hidden sm:block">Espace Administration</span>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors">
            Voir le site <ChevronRight className="w-4 h-4" />
          </a>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
