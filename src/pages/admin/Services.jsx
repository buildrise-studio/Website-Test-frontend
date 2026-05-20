import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const EMPTY = {
  titre: '',
  slug: '',
  description: '',
  prix_depuis: '',
  delai: '',
  actif: true
}

export default function AdminServices() {

  const [services, setServices] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const safeArray = (data) => (
    Array.isArray(data)
      ? data
      : []
  )

  const load = async () => {

    try {

      const r = await api.get('/admin/services')

      const data = Array.isArray(r.data)
        ? r.data
        : Array.isArray(r.data?.data)
          ? r.data.data
          : []

      setServices(data)

    } catch (error) {

      console.error(error)

      setServices([])

      toast.error('Erreur chargement services')

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

  const openEdit = (s) => {

    if (!s) return

    setEditing(s.id)

    setForm({
      ...EMPTY,
      ...s
    })

    setModal(true)
  }

  const close = () => {

    setModal(false)

    setEditing(null)

    setForm(EMPTY)
  }

  const save = async (e) => {

    e.preventDefault()

    setSaving(true)

    try {

      if (editing) {

        await api.put(
          `/admin/services/${editing}`,
          form
        )

      } else {

        await api.post(
          '/admin/services',
          form
        )

      }

      toast.success('Service sauvegardé !')

      close()

      load()

    } catch (error) {

      console.error(error)

      toast.error('Erreur')

    } finally {

      setSaving(false)

    }
  }

  const del = async (id) => {

    if (!id) return

    if (!confirm('Supprimer ?')) return

    try {

      await api.delete(`/admin/services/${id}`)

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
          Services
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>

      </div>

      <div className="space-y-3">

        {safeArray(services).map((s) => (

          <motion.div
            key={s?.id}
            layout
            className="card-dark p-5 flex items-center justify-between gap-4"
          >

            <div>

              <h3 className="font-heading font-bold text-white">
                {s?.titre || '-'}
              </h3>

              <p className="text-gray-500 text-sm">

                {s?.prix_depuis &&
                  `À partir de ${s.prix_depuis}`}

                {s?.delai &&
                  ` · ${s.delai}`}

              </p>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() => openEdit(s)}
                className="btn-ghost p-2"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => del(s?.id)}
                className="btn-ghost p-2 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>

            </div>

          </motion.div>

        ))}

      </div>

      {modal && (

        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

          <div className="bg-dark-800 border border-white/10 rounded-2xl w-full max-w-lg">

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">

              <h2 className="font-heading font-bold text-white">
                {editing ? 'Modifier' : 'Nouveau'} service
              </h2>

              <button onClick={close}>
                <X className="w-5 h-5 text-gray-500" />
              </button>

            </div>

            <form onSubmit={save} className="p-6 space-y-4">

              <div>

                <label className="block text-gray-300 text-sm mb-1">
                  Titre *
                </label>

                <input
                  value={form.titre}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      titre: e.target.value
                    })
                  }
                  className="input-field"
                  required
                />

              </div>

              <div>

                <label className="block text-gray-300 text-sm mb-1">
                  Slug *
                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: e.target.value
                    })
                  }
                  className="input-field"
                  required
                />

              </div>

              <div>

                <label className="block text-gray-300 text-sm mb-1">
                  Description *
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value
                    })
                  }
                  rows={3}
                  className="input-field resize-none"
                  required
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-gray-300 text-sm mb-1">
                    Prix depuis
                  </label>

                  <input
                    value={form.prix_depuis || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        prix_depuis: e.target.value
                      })
                    }
                    className="input-field"
                    placeholder="50 000 DA"
                  />

                </div>

                <div>

                  <label className="block text-gray-300 text-sm mb-1">
                    Délai
                  </label>

                  <input
                    value={form.delai || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        delai: e.target.value
                      })
                    }
                    className="input-field"
                    placeholder="2–3 semaines"
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
