import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const CATS = ['Vitrine', 'E-commerce', 'App Web', 'ERP/CRM']
const EMPTY = { titre:'', description:'', categorie:'Vitrine', technologies:'', url:'', annee: new Date().getFullYear(), ordre:0 }

export default function AdminProjets() {
  const [projets, setProjets]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY)
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/admin/projets').then(r => setProjets(r.data.data || r.data)).catch(() => setProjets([])).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit   = (p) => {
    setEditing(p.id)
    setForm({ ...p, technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '' })
    setModal(true)
  }
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      if (editing) await api.put(`/admin/projets/${editing}`, payload)
      else await api.post('/admin/projets', payload)
      toast.success(editing ? 'Projet modifié !' : 'Projet ajouté !')
      closeModal(); load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return
    setDeleting(id)
    try {
      await api.delete(`/admin/projets/${id}`)
      toast.success('Projet supprimé')
      load()
    } catch { toast.error('Erreur lors de la suppression') }
    finally { setDeleting(null) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Projets</h1>
          <p className="text-gray-400 text-sm">{projets.length} projet(s)</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="card-dark h-40 animate-pulse rounded-2xl" />)}
        </div>
      ) : projets.length === 0 ? (
        <div className="card-dark p-12 text-center text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucun projet. Commencez par en ajouter un !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projets.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <div className="card-dark p-5 hover:border-brand-500/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="badge bg-brand-500/10 text-brand-400">{p.categorie}</span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="btn-ghost p-1.5"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="btn-ghost p-1.5 hover:text-red-400">
                      {deleting === p.id ? <span className="w-3.5 h-3.5 border border-t-red-400 rounded-full animate-spin block" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-white mb-1">{p.titre}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{p.description}</p>
                {p.technologies && (
  <div className="flex flex-wrap gap-2">
    {(Array.isArray(p.technologies)
      ? p.technologies
      : typeof p.technologies === 'string'
        ? p.technologies.split(',')
        : []
    )
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
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && closeModal()}>
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="bg-dark-800 border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="font-heading font-bold text-white">{editing ? 'Modifier le projet' : 'Nouveau projet'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Titre *</label>
                <input value={form.titre} onChange={e => setForm({...form, titre: e.target.value})} className="input-field" required />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Description *</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="input-field resize-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Catégorie</label>
                  <select value={form.categorie} onChange={e => setForm({...form, categorie: e.target.value})} className="input-field">
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Année</label>
                  <input type="number" value={form.annee} onChange={e => setForm({...form, annee: e.target.value})} className="input-field" min="2000" max="2099" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Technologies (séparées par des virgules)</label>
                <input value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} className="input-field" placeholder="React, Laravel, MySQL" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">URL du projet</label>
                <input value={form.url || ''} onChange={e => setForm({...form, url: e.target.value})} className="input-field" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">URL image</label>
                <input value={form.image || ''} onChange={e => setForm({...form, image: e.target.value})} className="input-field" placeholder="https://... (optionnel)" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="btn-outline flex-1 justify-center">Annuler</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Sauvegarder</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
