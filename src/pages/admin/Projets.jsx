import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react'

import toast from 'react-hot-toast'
import api from '../../lib/api'

const CATS = [
  'Vitrine',
  'E-commerce',
  'App Web',
  'ERP/CRM'
]

const EMPTY = {
  titre: '',
  description: '',
  categorie: 'Vitrine',
  technologies: '',
  url: '',
  annee: new Date().getFullYear(),
  ordre: 0
}

export default function AdminProjets() {

  const [projets, setProjets] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const safeArray = (data) => (
    Array.isArray(data)
      ? data
      : []
  )

  const load = async () => {

    setLoading(true)

    try {

      const r = await api.get('/admin/projets')

      const data = Array.isArray(r.data)
        ? r.data
        : Array.isArray(r.data?.data)
          ? r.data.data
          : []

      setProjets(data)

    } catch (error) {

      console.error(error)

      setProjets([])

      toast.error('Erreur chargement projets')

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {

    setEditing(null)

    setForm(EMPTY)

    setModal(true)
  }

  const openEdit = (p) => {

    if (!p) return

    setEditing(p.id)

    setForm({
      ...EMPTY,
      ...p,
      technologies: Array.isArray(p?.technologies)
        ? p.technologies.join(', ')
        : typeof p?.technologies === 'string'
          ? p.technologies
          : ''
    })

    setModal(true)
  }

  const closeModal = () => {

    setModal(false)

    setEditing(null)

    setForm(EMPTY)
  }

  const handleSave = async (e) => {

    e.preventDefault()

    setSaving(true)

    const payload = {
      ...form,
      technologies:
        typeof form.technologies === 'string'
          ? form.technologies
              .split(',')
              .map(t => t.trim())
              .filter(Boolean)
          : []
    }

    try {

      if (editing) {

        await api.put(
          `/admin/projets/${editing}`,
          payload
        )

      } else {

        await api.post(
          '/admin/projets',
          payload
        )

      }

      toast.success(
        editing
          ? 'Projet modifié !'
          : 'Projet ajouté !'
      )

      closeModal()

      load()

    } catch (err) {

      console.error(err)

      toast.error(
        err.response?.data?.message ||
        'Erreur lors de la sauvegarde'
      )

    } finally {

      setSaving(false)

    }
  }

  const handleDelete = async (id) => {

    if (!id) return

    if (!confirm('Supprimer ce projet ?')) return

    setDeleting(id)

    try {

      await api.delete(`/admin/projets/${id}`)

      toast.success('Projet supprimé')

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur lors de la suppression')

    } finally {

      setDeleting(null)

    }
  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="font-heading text-2xl font-bold text-white">
            Projets
          </h1>

          <p className="text-gray-400 text-sm">
            {safeArray(projets).length} projet(s)
          </p>

        </div>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>

      </div>

      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {[...Array(6)].map((_, i) => (

            <div
              key={i}
              className="card-dark h-40 animate-pulse rounded-2xl"
            />

          ))}

        </div>

      ) : safeArray(projets).length === 0 ? (

        <div className="card-dark p-12 text-center text-gray-500">

          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />

          <p>
            Aucun projet. Commencez par en ajouter un !
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {safeArray(projets).map((p) => {

            const techs = Array.isArray(p?.technologies)
              ? p.technologies
              : typeof p?.technologies === 'string'
                ? p.technologies.split(',')
                : []

            return (

              <motion.div
                key={p?.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >

                <div className="card-dark p-5 hover:border-brand-500/20 transition-all">

                  <div className="flex items-start justify-between mb-3">

                    <span className="badge bg-brand-500/10 text-brand-400">
                      {p?.categorie || '-'}
                    </span>

                    <div className="flex gap-1">

                      <button
                        onClick={() => openEdit(p)}
                        className="btn-ghost p-1.5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(p?.id)}
                        disabled={deleting === p?.id}
                        className="btn-ghost p-1.5 hover:text-red-400"
                      >

                        {deleting === p?.id
                          ? (
                            <span className="w-3.5 h-3.5 border border-t-red-400 rounded-full animate-spin block" />
                          )
                          : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}

                      </button>

                    </div>

                  </div>

                  <h3 className="font-heading font-bold text-white mb-1">
                    {p?.titre || '-'}
                  </h3>

                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                    {p?.description || '-'}
                  </p>

                  {safeArray(techs).length > 0 && (

                    <div className="flex flex-wrap gap-2">

                      {safeArray(techs)
                        .filter(Boolean)
                        .slice(0, 4)
                        .map((t, i) => (

                          <span
                            key={i}
                            className="badge bg-white/5 text-gray-400"
                          >
                            {String(t).trim()}
                          </span>

                        ))}

                    </div>

                  )}

                </div>

              </motion.div>

            )
          })}

        </div>

      )}

    </div>
  )
}
