// ════════════════════════════════════════════════════════════
// src/pages/admin/Temoignages.jsx
// ════════════════════════════════════════════════════════════
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
  }

  const save = async (e) => {

    e.preventDefault()

    setSave(true)

    try {

      if (editing) {

        await api.put(`/admin/temoignages/${editing}`, form)

      } else {

        await api.post('/admin/temoignages', form)

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

    try {

      await api.patch(`/admin/temoignages/${id}/valider`)

      toast.success('Statut mis à jour')

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur')

    }
  }

  const del = async (id) => {

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

        {items.map(t => (

          <motion.div
            key={t.id}
            layout
            className="card-dark p-5"
          >

            <div className="flex items-start justify-between mb-3">

              <div className="flex gap-0.5">

                {[...Array(Number(t.note) || 5)].map((_, i) => (

                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />

                ))}

              </div>

              <div className="flex gap-1">

                <button
                  onClick={() => toggleValide(t.id)}
                  title={t.valide ? 'Dépublier' : 'Publier'}
                  className={`p-1.5 rounded-lg transition-colors ${
                    t.valide
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
                  onClick={() => del(t.id)}
                  className="btn-ghost p-1.5 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

            <p className="text-gray-300 text-sm italic mb-3 line-clamp-2">
              "{t.message}"
            </p>

            <div className="flex items-center gap-2">

              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                {t.nom?.charAt(0)}
              </div>

              <div>

                <div className="text-white text-sm font-medium">
                  {t.nom}
                </div>

                {t.entreprise && (
                  <div className="text-gray-500 text-xs">
                    {t.entreprise}
                  </div>
                )}

              </div>

              <span className={`ml-auto badge ${
                t.valide
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-gray-500/10 text-gray-500'
              }`}>
                {t.valide ? 'Publié' : 'Brouillon'}
              </span>

            </div>

          </motion.div>

        ))}

      </div>

      {modal && (

        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

          <div className="bg-dark-800 border border-white/10 rounded-2xl w-full max-w-lg">

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">

              <h2 className="font-heading font-bold text-white">
                {editing ? 'Modifier' : 'Nouveau'} témoignage
              </h2>

              <button onClick={close}>
                <X className="w-5 h-5 text-gray-500" />
              </button>

            </div>

            <form onSubmit={save} className="p-6 space-y-4">

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-gray-300 text-sm mb-1">
                    Nom *
                  </label>

                  <input
                    value={form.nom}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nom: e.target.value
                      })
                    }
                    className="input-field"
                    required
                  />

                </div>

                <div>

                  <label className="block text-gray-300 text-sm mb-1">
                    Entreprise
                  </label>

                  <input
                    value={form.entreprise || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        entreprise: e.target.value
                      })
                    }
                    className="input-field"
                  />

                </div>

              </div>

              <div>

                <label className="block text-gray-300 text-sm mb-1">
                  Message *
                </label>

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value
                    })
                  }
                  rows={3}
                  className="input-field resize-none"
                  required
                />

              </div>

              <div>

                <label className="block text-gray-300 text-sm mb-2">
                  Note
                </label>

                <div className="flex gap-1">

                  {[1, 2, 3, 4, 5].map(n => (

                    <button
                      type="button"
                      key={n}
                      onClick={() =>
                        setForm({
                          ...form,
                          note: n
                        })
                      }
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          n <= form.note
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>

                  ))}

                </div>

              </div>

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  checked={form.valide}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      valide: e.target.checked
                    })
                  }
                  className="w-4 h-4 accent-brand-500"
                />

                <span className="text-gray-300 text-sm">
                  Publier immédiatement
                </span>

              </label>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={close}
                  className="btn-outline flex-1 justify-center"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1 justify-center"
                >
                  {saving
                    ? '...'
                    : (
                      <>
                        <Save className="w-4 h-4" />
                        Sauvegarder
                      </>
                    )}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}