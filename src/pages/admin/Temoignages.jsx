import { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Star,
  Check
} from 'lucide-react'

import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const EMPTY = {
  nom: '',
  entreprise: '',
  message: '',
  note: 5,
  valide: false
}

export default function AdminTemoignages() {

  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEdit] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSave] = useState(false)

  const safeArray = (data) => (
    Array.isArray(data)
      ? data
      : []
  )

  const load = async () => {

    try {

      const r = await api.get('/admin/temoignages')

      const data = Array.isArray(r.data)
        ? r.data
        : Array.isArray(r.data?.data)
          ? r.data.data
          : []

      setItems(data)

    } catch (error) {

      console.error(error)

      setItems([])

      toast.error('Erreur chargement témoignages')

    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {

    setEdit(null)

    setForm(EMPTY)

    setModal(true)
  }

  const openEdit = (t) => {

    if (!t) return

    setEdit(t.id)

    setForm({
      ...EMPTY,
      ...t
    })

    setModal(true)
  }

  const close = () => {

    setModal(false)

    setEdit(null)

    setForm(EMPTY)
  }

  const save = async (e) => {

    e.preventDefault()

    setSave(true)

    try {

      if (editing) {

        await api.put(
          `/admin/temoignages/${editing}`,
          form
        )

      } else {

        await api.post(
          '/admin/temoignages',
          form
        )

      }

      toast.success('Témoignage sauvegardé !')

      close()

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur')

    } finally {

      setSave(false)

    }
  }

  const toggleValide = async (id) => {

    if (!id) return

    try {

      await api.patch(
        `/admin/temoignages/${id}/valider`
      )

      toast.success('Statut mis à jour')

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur')

    }
  }

  const del = async (id) => {

    if (!id) return

    if (!confirm('Supprimer ?')) return

    try {

      await api.delete(`/admin/temoignages/${id}`)

      toast.success('Supprimé')

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur suppression')

    }
  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="font-heading text-2xl font-bold text-white">
          Témoignages
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {safeArray(items).map(t => (

          <motion.div
            key={t?.id}
            layout
            className="card-dark p-5"
          >

            <div className="flex items-start justify-between mb-3">

              <div className="flex gap-0.5">

                {[...Array(Math.max(1, Number(t?.note) || 5))]
                  .map((_, i) => (

                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />

                  ))}

              </div>

              <div className="flex gap-1">

                <button
                  onClick={() => toggleValide(t?.id)}
                  title={t?.valide ? 'Dépublier' : 'Publier'}
                  className={`p-1.5 rounded-lg transition-colors ${
                    t?.valide
                      ? 'text-green-400 bg-green-500/10'
                      : 'text-gray-500 hover:text-green-400'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openEdit(t)}
                  className="btn-ghost p-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => del(t?.id)}
                  className="btn-ghost p-1.5 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

            <p className="text-gray-300 text-sm italic mb-3 line-clamp-2">
              "{t?.message || '-'}"
            </p>

            <div className="flex items-center gap-2">

              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                {t?.nom?.charAt(0) || '?'}
              </div>

              <div>

                <div className="text-white text-sm font-medium">
                  {t?.nom || '-'}
                </div>

                {t?.entreprise && (
                  <div className="text-gray-500 text-xs">
                    {t.entreprise}
                  </div>
                )}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  )
}