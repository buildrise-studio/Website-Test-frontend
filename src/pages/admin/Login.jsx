import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, Lock } from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const { login, isLoading, error, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => { if (isAuthenticated()) navigate('/admin/dashboard', { replace: true }) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Orbs */}
      <div className="orb w-80 h-80 bg-brand-500 top-0 left-0 opacity-20" />
      <div className="orb w-64 h-64 bg-purple-600 bottom-0 right-0 opacity-15" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Espace Administrateur</h1>
          <p className="text-gray-400 text-sm mt-1">DevAgence — Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-glass p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Adresse email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input-field" placeholder="admin@devagence.dz" required autoFocus
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1.5">Mot de passe</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field pr-10" placeholder="••••••••" required
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3.5 text-base">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connexion...
              </span>
            ) : (
              <><Lock className="w-4 h-4" /> Se connecter</>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">← Retour au site</Link>
        </div>
      </motion.div>
    </div>
  )
}
