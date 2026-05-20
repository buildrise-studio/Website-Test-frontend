// ════════════════════════════════════════════════════════════
// src/pages/Realisations.jsx
// ════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Search } from 'lucide-react'
import api from '../lib/api'

const categories = [
  'Tous',
  'Vitrine',
  'E-commerce',
  'App Web',
  'ERP/CRM'
]

const demoProjects = [
  {
    id: 1,
    titre: 'BatiHome Immobilier',
    categorie: 'Vitrine',
    emoji: '🏠',
    description: 'Plateforme immobilière avec filtres avancés et carte interactive.',
    technologies: ['React', 'Laravel', 'MySQL'],
    annee: 2024
  },
  {
    id: 2,
    titre: 'ShopDZ',
    categorie: 'E-commerce',
    emoji: '🛒',
    description: 'Boutique multi-vendeurs avec paiement CIB et livraison intégrée.',
    technologies: ['Vue.js', 'Laravel', 'Stripe'],
    annee: 2024
  },
  {
    id: 3,
    titre: 'EduPro LMS',
    categorie: 'App Web',
    emoji: '📚',
    description: 'Plateforme e-learning avec cours vidéo, quiz et certificats.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    annee: 2023
  }
]

export default function Realisations() {

  const [projets, setProjets] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categorie, setCategorie] = useState('Tous')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const loadProjects = async () => {

    try {

      const response = await api.get('/projets')

      const data = response.data.data || response.data

      const formatted = data.map((p) => ({

        ...p,

        technologies: Array.isArray(p.technologies)
          ? p.technologies
          : (
              typeof p.technologies === 'string'
                ? p.technologies.split(',')
                : []
            ),

        image:
          p.image
            ? (
                p.image.startsWith('http')
                  ? p.image
                  : `${import.meta.env.VITE_API_URL}/storage/${p.image}`
              )
            : null

      }))

      setProjets(formatted)

      setFiltered(formatted)

    } catch (error) {

      console.error(error)

      setProjets(demoProjects)

      setFiltered(demoProjects)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {

    let res = projets

    if (categorie !== 'Tous') {
      res = res.filter(p => p.categorie === categorie)
    }

    if (search) {
      res = res.filter(p =>
        p.titre.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(res)

  }, [categorie, search, projets])

  return (

    <div className="pt-24 pb-20">

      {/* Header */}
      <section className="py-16 text-center relative overflow-hidden">

        <div className="orb w-72 h-72 bg-brand-500 -top-10 left-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">

          <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">
            Portfolio
          </p>

          <h1 className="section-title mb-4">
            Nos <span className="gradient-text">Réalisations</span>
          </h1>

          <p className="section-subtitle">
            Chaque projet est une histoire de transformation digitale réussie.
          </p>

        </div>

      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

          {/* Category */}
          <div className="flex flex-wrap gap-2">

            {categories.map(c => (

              <button
                key={c}
                onClick={() => setCategorie(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  categorie === c
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
                }`}
              >
                {c}
              </button>

            ))}

          </div>

          {/* Search */}
          <div className="relative">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="input-field pl-9 w-60"
            />

          </div>

        </div>

      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[...Array(6)].map((_, i) => (

              <div
                key={i}
                className="card-dark animate-pulse aspect-[4/3] rounded-2xl"
              />

            ))}

          </div>

        ) : filtered.length === 0 ? (

          <div className="text-center py-20 text-gray-500">

            <div className="text-6xl mb-4">
              🔍
            </div>

            <p>
              Aucun projet trouvé pour ces critères.
            </p>

          </div>

        ) : (

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >

            <AnimatePresence>

              {filtered.map((p) => (

                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card-glass overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                >

                  {/* Preview */}
                  <div className="aspect-video bg-gradient-to-br from-dark-600 to-dark-700 relative overflow-hidden">

                    {p.image ? (

                      <img
                        src={p.image}
                        alt={p.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        {p.emoji || '🖥️'}
                      </div>

                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">

                      {p.url && (

                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary text-xs px-4 py-2"
                        >
                          Voir le site
                          <ExternalLink className="w-3 h-3" />
                        </a>

                      )}

                    </div>

                    <div className="absolute top-3 left-3 flex gap-2">

                      <span className="badge bg-brand-500/80 text-white backdrop-blur-sm">
                        {p.categorie}
                      </span>

                      {p.annee && (

                        <span className="badge bg-dark-700/80 text-gray-300 backdrop-blur-sm">
                          {p.annee}
                        </span>

                      )}

                    </div>

                  </div>

                  <div className="p-5">

                    <h3 className="font-heading font-bold text-white mb-1">
                      {p.titre}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {p.description}
                    </p>

                    {p.technologies && (

                      <div className="flex flex-wrap gap-2">

                        {p.technologies
                          .slice(0, 4)
                          .map((t) => (

                            <span
                              key={t}
                              className="badge bg-white/5 text-gray-400"
                            >
                              {t.trim()}
                            </span>

                          ))}

                      </div>

                    )}

                  </div>

                </motion.div>

              ))}

            </AnimatePresence>

          </motion.div>

        )}

      </section>

    </div>
  )
}