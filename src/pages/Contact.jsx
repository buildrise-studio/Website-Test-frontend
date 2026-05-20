import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import api from '../lib/api'

const services = ['Site Web Vitrine', 'Boutique E-commerce', 'Application Web', 'Système ERP / CRM', 'Refonte & Maintenance', 'Autre']
const budgets  = ['Moins de 50 000 DA', '50 000 – 150 000 DA', '150 000 – 500 000 DA', 'Plus de 500 000 DA', 'À définir']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', data)
      setSent(true)
      reset()
    } catch {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="orb w-80 h-80 bg-accent-500 -top-20 left-1/2 -translate-x-1/2 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Parlons de votre projet</p>
          <h1 className="section-title mb-4">Nous <span className="gradient-text">contacter</span></h1>
          <p className="section-subtitle">
            Dites-nous ce dont vous avez besoin. Nous vous répondons sous 24h avec une proposition personnalisée.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Infos */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: Mail,   label: 'Email',    value: 'buildrisestudio@gmail.com', href: 'mailto:buildrisestudio@gmail.com' },
              { icon: Phone,  label: 'Téléphone', value: '+213 (0) 675 559 5880', href: 'tel:+213675595880' },
              { icon: MapPin, label: 'Adresse',   value: 'Alger, Algérie', href: '#' },
              { icon: Clock,  label: 'Disponibilité', value: '7/7 j', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.div key={label} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5 }}>
                <div className="card-glass p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-white hover:text-brand-300 transition-colors text-sm font-medium">{value}</a>
                      : <span className="text-white text-sm font-medium">{value}</span>
                    }
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="card-glass p-6">
              <h4 className="font-heading font-bold text-white mb-3">Pourquoi nous choisir ?</h4>
              <ul className="space-y-2">
                {['Paiement flexible', '3 mois de support offert', 'Code source livré', 'Formation incluse'].map(p => (
                  <li key={p} className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                className="card-glass p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-accent-400" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-gray-400 mb-6">Nous vous répondrons dans les 24 heures.</p>
                <button onClick={() => setSent(false)} className="btn-outline">Envoyer un autre message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="card-glass p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">Nom complet *</label>
                    <input {...register('nom', { required: 'Nom requis' })} className="input-field" placeholder="Votre nom" />
                    {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">Email *</label>
                    <input {...register('email', { required: 'Email requis', pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' } })} className="input-field" placeholder="votre@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">Téléphone</label>
                    <input {...register('telephone')} className="input-field" placeholder="+213 5XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">Entreprise</label>
                    <input {...register('entreprise')} className="input-field" placeholder="Nom de votre société" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Service souhaité</label>
                  <select {...register('service')} className="input-field">
                    <option value="">Sélectionner un service...</option>
                    {services.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Budget estimé</label>
                  <select {...register('budget')} className="input-field">
                    <option value="">Sélectionner une tranche...</option>
                    {budgets.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Votre message *</label>
                  <textarea
                    {...register('message', { required: 'Message requis', minLength: { value: 20, message: 'Message trop court (min. 20 caractères)' } })}
                    rows={5} className="input-field resize-none"
                    placeholder="Décrivez votre projet : objectifs, fonctionnalités souhaitées, délais..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-base">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours...</span>
                  ) : (
                    <><Send className="w-5 h-5" /> Envoyer ma demande</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
