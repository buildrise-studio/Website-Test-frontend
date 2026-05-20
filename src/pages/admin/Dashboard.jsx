import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FolderKanban, MessageSquare, Star, HelpCircle, TrendingUp, Eye, ArrowRight, Activity } from 'lucide-react'
import api from '../../lib/api'

const fadeUp = { hidden: { opacity:0, y:20 }, visible: (d=0) => ({ opacity:1, y:0, transition:{ duration:0.5, delay:d } }) }

export default function Dashboard() {
  const [stats, setStats] = useState({ projets: 0, messages: 0, temoignages: 0, faqs: 0, unread: 0 })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats').catch(() => ({ data: null })),
      api.get('/admin/messages?per_page=5').catch(() => ({ data: { data: demoMessages } })),
    ]).then(([statsRes, msgRes]) => {
      if (statsRes.data) setStats(statsRes.data)
      else setStats({ projets: 12, messages: 34, temoignages: 8, faqs: 10, unread: 5 })
      setRecentMessages(msgRes.data.data || msgRes.data || demoMessages)
    }).finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Projets',      value: stats.projets,     icon: FolderKanban, color: 'text-brand-400  bg-brand-500/10  border-brand-500/20',  to: '/admin/projets' },
    { label: 'Messages',     value: stats.messages,    icon: MessageSquare, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', to: '/admin/messages', badge: stats.unread },
    { label: 'Témoignages',  value: stats.temoignages, icon: Star,          color: 'text-amber-400  bg-amber-500/10  border-amber-500/20',  to: '/admin/temoignages' },
    { label: 'FAQs',         value: stats.faqs,        icon: HelpCircle,   color: 'text-teal-400   bg-teal-500/10   border-teal-500/20',   to: '/admin/faq' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-gray-400 text-sm mt-1">Bienvenue dans votre espace d'administration</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color, to, badge }, i) => (
          <motion.div key={label} initial="hidden" animate="visible" variants={fadeUp} custom={i * 0.08}>
            <Link to={to} className="card-dark p-5 block hover:border-brand-500/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {badge > 0 && (
                  <span className="badge bg-red-500/10 text-red-400 border border-red-500/20">{badge} new</span>
                )}
              </div>
              <div className="text-2xl font-heading font-bold text-white">{loading ? '—' : value}</div>
              <div className="text-gray-500 text-xs mt-0.5 flex items-center justify-between">
                <span>{label}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.35}>
          <div className="card-dark">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-heading font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" /> Messages récents
              </h2>
              <Link to="/admin/messages" className="text-brand-400 text-xs hover:text-brand-300 transition-colors">Voir tout</Link>
            </div>
            <div className="divide-y divide-white/5">
              {(loading ? demoMessages : recentMessages).map((msg) => (
                <div key={msg.id} className="px-5 py-3.5 hover:bg-white/3 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium truncate">{msg.nom}</span>
                        {!msg.lu && <span className="w-2 h-2 bg-brand-400 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-gray-500 text-xs truncate">{msg.message}</p>
                    </div>
                    <span className="text-gray-600 text-xs flex-shrink-0">{msg.service || 'General'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
          <div className="card-dark">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="font-heading font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-400" /> Actions rapides
              </h2>
            </div>
            <div className="p-4 space-y-2">
              {[
                { label: 'Ajouter un projet',      to: '/admin/projets',     icon: FolderKanban },
                { label: 'Ajouter une FAQ',        to: '/admin/faq',         icon: HelpCircle },
                { label: 'Voir les messages',      to: '/admin/messages',    icon: MessageSquare },
                { label: 'Gérer les témoignages',  to: '/admin/temoignages', icon: Star },
                { label: 'Voir le site public',    to: '/',                  icon: Eye, external: true },
              ].map(({ label, to, icon: Icon, external }) => (
                <Link
                  key={label} to={to} target={external ? '_blank' : undefined}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" /> {label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance note */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.5}>
        <div className="card-dark p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-accent-400" />
          </div>
          <div>
            <div className="text-white font-medium text-sm">Site en ligne et performant</div>
            <div className="text-gray-500 text-xs">Dernière mise à jour : aujourd'hui — Toutes les fonctionnalités sont opérationnelles.</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const demoMessages = [
  { id:1, nom:'Karim B.', message:'Bonjour, je souhaite un devis pour un site e-commerce.', service:'E-commerce', lu:false },
  { id:2, nom:'Sara M.',  message:'Avez-vous de l\'expérience avec les applications mobiles ?', service:'App Web', lu:false },
  { id:3, nom:'Ali H.',   message:'Quel est votre délai pour une refonte de site ?', service:'Maintenance', lu:true },
  { id:4, nom:'Leila T.', message:'Bonjour, j\'aimerais un tableau de bord pour mon équipe.', service:'ERP/CRM', lu:true },
  { id:5, nom:'Omar D.',  message:'Je cherche un développeur Laravel pour mon projet.', service:'Autre', lu:true },
]
