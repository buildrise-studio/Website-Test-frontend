import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

const demoFaqs = [
  { id:1, categorie:'Tarifs',    question:'Combien coûte un site web ?',               reponse:'Les tarifs varient selon la complexité du projet. Un site vitrine démarre à partir de 50 000 DA, une boutique e-commerce à partir de 120 000 DA. Nous établissons un devis détaillé et gratuit après analyse de vos besoins.' },
  { id:2, categorie:'Tarifs',    question:'Quels sont vos modes de paiement ?',        reponse:'Nous acceptons les virements bancaires, paiement en espèces et CCP. Le règlement se fait en deux fois : 50% à la commande et 50% à la livraison.' },
  { id:3, categorie:'Délais',    question:'Quel est le délai de réalisation ?',        reponse:'Un site vitrine est livré en 2 à 3 semaines. Une boutique e-commerce ou une application web nécessite entre 4 et 8 semaines selon le périmètre fonctionnel.' },
  { id:4, categorie:'Délais',    question:'Comment se déroule un projet ?',            reponse:'Nos projets suivent 5 phases : (1) Analyse & cahier des charges, (2) Maquettes UI/UX, (3) Développement, (4) Tests & révisions, (5) Mise en ligne et formation.' },
  { id:5, categorie:'Technique', question:'Quelles technologies utilisez-vous ?',     reponse:'Nous utilisons principalement React/Vue.js pour le frontend, Laravel pour le backend, et MySQL/PostgreSQL pour la base de données. Nous choisissons la stack la plus adaptée à chaque projet.' },
  { id:6, categorie:'Technique', question:'Mon site sera-t-il optimisé pour les mobiles ?', reponse:'Oui, tous nos sites sont 100% responsive et s\'adaptent parfaitement aux smartphones, tablettes et ordinateurs. Nous adoptons une approche mobile-first.' },
  { id:7, categorie:'Technique', question:'Mon site sera-t-il sécurisé ?',            reponse:'Absolument. Nous appliquons les meilleures pratiques : HTTPS/SSL, protection CSRF, validation des données, hachage des mots de passe et sauvegardes régulières.' },
  { id:8, categorie:'Support',   question:'Proposez-vous la maintenance ?',           reponse:'Oui. Chaque projet inclut 3 mois de support gratuit. Nous proposons ensuite des contrats de maintenance mensuelle pour les mises à jour, corrections et optimisations.' },
  { id:9, categorie:'Support',   question:'Puis-je modifier le contenu moi-même ?',  reponse:'Oui, tous nos sites incluent un dashboard d\'administration intuitif. Nous vous formons à son utilisation et répondons à vos questions.' },
  { id:10,categorie:'Support',   question:'Proposez-vous le référencement SEO ?',    reponse:'Oui, tous nos sites sont optimisés pour le référencement naturel : balises méta, structure sémantique, vitesse de chargement et compatibilité Google.' },
]

const cats = ['Tous', 'Tarifs', 'Délais', 'Technique', 'Support']

export default function FAQ() {
  const [faqs, setFaqs]     = useState([])
  const [cat, setCat]       = useState('Tous')
  const [open, setOpen]     = useState(null)

  useEffect(() => {
    api.get('/faq').then(r => setFaqs(r.data.data || r.data)).catch(() => setFaqs(demoFaqs))
  }, [])

  const list = faqs.length ? faqs : demoFaqs
  const filtered = cat === 'Tous' ? list : list.filter(f => f.categorie === cat)

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="orb w-72 h-72 bg-purple-600 -top-10 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Questions fréquentes</p>
          <h1 className="section-title mb-4">Tout ce que vous <span className="gradient-text">voulez savoir</span></h1>
          <p className="section-subtitle">
            Vous avez d'autres questions ? N'hésitez pas à nous contacter directement.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div className="max-w-3xl mx-auto px-4 mb-8 flex flex-wrap gap-2 justify-center">
        {cats.map(c => (
          <button
            key={c}
            onClick={() => { setCat(c); setOpen(null) }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              cat === c ? 'bg-brand-500 text-white' : 'bg-dark-700 text-gray-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      <div className="max-w-3xl mx-auto px-4 space-y-3">
        {filtered.map((faq, i) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <button
              className="w-full card-dark p-5 flex items-center justify-between text-left hover:border-brand-500/30 transition-all duration-200"
              onClick={() => setOpen(open === faq.id ? null : faq.id)}
            >
              <div className="flex items-center gap-3 pr-4">
                {faq.categorie && (
                  <span className="badge bg-brand-500/10 text-brand-400 flex-shrink-0 hidden sm:inline-flex">{faq.categorie}</span>
                )}
                <span className="font-medium text-white">{faq.question}</span>
              </div>
              {open === faq.id
                ? <ChevronUp className="w-5 h-5 text-brand-400 flex-shrink-0" />
                : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              }
            </button>
            {open === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="card-dark mt-1 px-5 py-4 text-gray-300 text-sm leading-relaxed border-l-2 border-brand-500"
              >
                {faq.reponse}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 mt-16">
        <div className="card-glass p-8 text-center">
          <MessageCircle className="w-12 h-12 text-brand-400 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold text-white mb-2">Votre question n'est pas ici ?</h3>
          <p className="text-gray-400 text-sm mb-6">Contactez-nous directement, nous répondons sous 24h.</p>
          <Link to="/contact" className="btn-primary">Nous contacter</Link>
        </div>
      </div>
    </div>
  )
}
