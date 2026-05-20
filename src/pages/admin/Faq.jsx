import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../../lib/api'

export default function AdminFaq() {

  const [faqs, setFaqs] = useState([])

  const safeArray = (data) => (
    Array.isArray(data)
      ? data
      : []
  )

  const load = async () => {

    try {

      const r = await api.get('/admin/faq')

      const data = Array.isArray(r.data)
        ? r.data
        : Array.isArray(r.data?.data)
          ? r.data.data
          : []

      setFaqs(data)

    } catch (error) {

      console.error(error)

      setFaqs([])

      toast.error('Erreur chargement FAQ')

    }
  }

  useEffect(() => {
    load()
  }, [])

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="font-heading text-2xl font-bold text-white">
          FAQ
        </h1>

        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Ajouter
        </button>

      </div>

      <div className="space-y-3">

        {safeArray(faqs).map((f) => (

          <motion.div
            key={f?.id}
            layout
            className="card-dark p-5 flex items-start justify-between gap-4"
          >

            <div>

              <h3 className="font-heading font-bold text-white">
                {f?.question || '-'}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {f?.reponse || '-'}
              </p>

            </div>

            <div className="flex gap-2">

              <button className="btn-ghost p-2">
                <Pencil className="w-4 h-4" />
              </button>

              <button className="btn-ghost p-2 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  )
}
