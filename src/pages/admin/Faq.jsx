// ════════════════════════════════════════════════════════════
// src/pages/admin/Faq.jsx
// ════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const CATS = [
  'Tarifs',
  'Délais',
  'Technique',
  'Support',
  'Autre'
]

const EMPTY = {
  question: '',
  reponse: '',
  categorie: 'Tarifs',
  ordre: 0,
  actif: true
}

export default function AdminFaq() {

  const [faqs, setFaqs] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEdit] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSave] = useState(false)

  const load = async () => {

    try {

      const r = await api.get('/admin/faq')

      setFaqs(r.data)

    } catch (error) {

      console.error(error)

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

  const openEdit = (f) => {

    setEdit(f.id)

    setForm(f)

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

        await api.put(`/admin/faq/${editing}`, form)

      } else {

        await api.post('/admin/faq', form)

      }

      toast.success('FAQ sauvegardée !')

      close()

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur')

    } finally {

      setSave(false)

    }
  }

  const del = async (id) => {

    if (!confirm('Supprimer ?')) return

    try {

      await api.delete(`/admin/faq/${id}`)

      toast.success('Supprimée')

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
          FAQ{' '}
          <span className="text-gray-500 text-lg font-normal">
            ({faqs.length})
          </span>
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>

      </div>

      <div className="space-y-2">

        {faqs.map(f => (

          <motion.div
            key={f.id}
            layout
            className="card-dark p-4 flex items-start justify-between gap-4"
          >

            <div className="flex-1">

              {f.categorie && (
                <span className="badge bg-brand-500/10 text-brand-400 mb-1">
                  {f.categorie}
                </span>
              )}

              <p className="text-white text-sm font-medium">
                {f.question}
              </p>

              <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                {f.reponse}
              </p>

            </div>

            <div className="flex gap-1 flex-shrink-0">

              <button
                onClick={() => openEdit(f)}
                className="btn-ghost p-2"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => del(f.id)}
                className="btn-ghost p-2 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

            </div>

          </motion.div>

        ))}

      </div>

      {modal && (

        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

          <div className="bg-dark-800 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">

              <h2 className="font-heading font-bold text-white">
                {editing ? 'Modifier' : 'Nouvelle'} FAQ
              </h2>

              <button onClick={close}>
                <X className="w-5 h-5 text-gray-500" />
              </button>

            </div>

            <form onSubmit={save} className="p-6 space-y-4">

              <div>

                <label className="block text-gray-300 text-sm mb-1">
                  Question *
                </label>

                <input
                  value={form.question}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      question: e.target.value
                    })
                  }
                  className="input-field"
                  required
                />

              </div>

              <div>

                <label className="block text-gray-300 text-sm mb-1">
                  Réponse *
                </label>

                <textarea
                  value={form.reponse}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      reponse: e.target.value
                    })
                  }
                  rows={4}
                  className="input-field resize-none"
                  required
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-gray-300 text-sm mb-1">
                    Catégorie
                  </label>

                  <select
                    value={form.categorie}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        categorie: e.target.value
                      })
                    }
                    className="input-field"
                  >

                    {CATS.map(c => (

                      <option key={c}>
                        {c}
                      </option>

                    ))}

                  </select>

                </div>

                <div>

                  <label className="block text-gray-300 text-sm mb-1">
                    Ordre
                  </label>

                  <input
                    type="number"
                    value={form.ordre}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ordre: +e.target.value
                      })
                    }
                    className="input-field"
                  />

                </div>

              </div>

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