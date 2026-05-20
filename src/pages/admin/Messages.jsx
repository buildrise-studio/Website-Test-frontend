// ════════════════════════════════════════════════════════════
// src/pages/admin/Messages.jsx
// ════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Eye, Trash2, CheckCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

export default function AdminMessages() {

  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const load = async () => {

    try {

      const r = await api.get('/admin/messages')

      setMessages(r.data.data || r.data)

    } catch (error) {

      console.error(error)

    }
  }

  useEffect(() => {
    load()
  }, [])

  const view = async (msg) => {

    setSelected(msg)

    if (!msg.lu) {

      try {

        await api.patch(`/admin/messages/${msg.id}/marquer-lu`)

        setMessages(prev =>
          prev.map(m =>
            m.id === msg.id
              ? { ...m, lu: true }
              : m
          )
        )

      } catch (error) {

        console.error(error)

      }
    }
  }

  const del = async (id) => {

    if (!confirm('Supprimer ce message ?')) return

    try {

      await api.delete(`/admin/messages/${id}`)

      toast.success('Message supprimé')

      setSelected(null)

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur suppression')

    }
  }

  const filtered = messages.filter(m =>
    filter === 'all'
      ? true
      : filter === 'unread'
        ? !m.lu
        : m.lu
  )

  const unread = messages.filter(m => !m.lu).length

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Messages
          </h1>

          {unread > 0 && (
            <p className="text-brand-400 text-sm">
              {unread} non lu{unread > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex gap-2">

          {['all', 'unread', 'read'].map(f => (

            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-brand-500 text-white'
                  : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all'
                ? 'Tous'
                : f === 'unread'
                  ? 'Non lus'
                  : 'Lus'}
            </button>

          ))}

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="space-y-2">

          {filtered.length === 0 && (
            <div className="card-dark p-10 text-center text-gray-500">
              <Mail className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Aucun message</p>
            </div>
          )}

          {filtered.map(msg => (

            <motion.div
              key={msg.id}
              layout
              onClick={() => view(msg)}
              className={`card-dark p-4 cursor-pointer hover:border-brand-500/30 transition-all ${
                selected?.id === msg.id
                  ? 'border-brand-500/50'
                  : ''
              }`}
            >

              <div className="flex items-start justify-between gap-2">

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2">

                    {!msg.lu && (
                      <span className="w-2 h-2 bg-brand-400 rounded-full flex-shrink-0" />
                    )}

                    <span className={`text-sm font-medium truncate ${
                      !msg.lu
                        ? 'text-white'
                        : 'text-gray-300'
                    }`}>
                      {msg.nom}
                    </span>

                    {msg.service && (
                      <span className="badge bg-brand-500/10 text-brand-400 text-xs flex-shrink-0">
                        {msg.service}
                      </span>
                    )}

                  </div>

                  <p className="text-gray-500 text-xs truncate mt-0.5">
                    {msg.message}
                  </p>

                  <p className="text-gray-600 text-xs mt-1">
                    {msg.email}
                  </p>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    del(msg.id)
                  }}
                  className="p-1 text-gray-600 hover:text-red-400 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>

            </motion.div>

          ))}

        </div>

        <div className="card-dark">

          {selected ? (

            <div className="p-6">

              <div className="flex items-start justify-between mb-5">

                <div>

                  <h2 className="font-heading font-bold text-white text-lg">
                    {selected.nom}
                  </h2>

                  <a
                    href={`mailto:${selected.email}`}
                    className="text-brand-400 text-sm hover:underline"
                  >
                    {selected.email}
                  </a>

                </div>

                <div className="flex gap-2">

                  <span className="badge bg-green-500/10 text-green-400 flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" />
                    Lu
                  </span>

                  <button
                    onClick={() => del(selected.id)}
                    className="btn-ghost p-2 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">

                {[
                  ['Téléphone', selected.telephone],
                  ['Entreprise', selected.entreprise],
                  ['Service', selected.service],
                  ['Budget', selected.budget]
                ].map(([k, v]) => (

                  v
                    ? (
                      <div key={k}>
                        <div className="text-gray-500 text-xs">{k}</div>
                        <div className="text-white text-sm">{v}</div>
                      </div>
                    )
                    : null

                ))}

              </div>

              <div className="bg-dark-700 rounded-xl p-4">
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <a
                href={`mailto:${selected.email}`}
                className="btn-primary mt-4 inline-flex"
              >
                Répondre par email
              </a>

            </div>

          ) : (

            <div className="flex items-center justify-center h-full min-h-[200px] text-gray-600">

              <div className="text-center">
                <Eye className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Sélectionner un message</p>
              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}