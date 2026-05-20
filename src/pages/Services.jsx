import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe, ShoppingBag, Code2, BarChart3, Wrench, ArrowRight, Target, Lightbulb, Rocket } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d } }),
}

const services = [
  {
    slug: 'vitrine',
    icon: Globe,
    color: 'from-brand-500 to-brand-400',
    title: 'Site Web Vitrine',
    pitch: 'Une vitrine professionnelle qui convertit vos visiteurs en clients.',
    features: ['Design responsive & moderne', 'Optimisation SEO', 'Formulaire de contact', 'Galerie photos/vidéos', 'Hébergement inclus (1 an)', 'Livraison en 2–3 semaines'],
  },
  {
    slug: 'ecommerce',
    icon: ShoppingBag,
    color: 'from-purple-600 to-purple-400',
    title: 'Boutique E-commerce',
    pitch: 'Vendez en ligne 24h/24 avec une boutique performante et sécurisée.',
    features: ['Catalogue produits illimité', 'Paiement sécurisé (Stripe/CIB)', 'Gestion des stocks', 'Suivi des commandes', 'Dashboard ventes', 'Livraison & codes promo'],
  },
  {
  slug: 'landing',
  icon: Rocket,
  color: 'from-blue-600 to-cyan-400',
  title: 'Landing Page',
  pitch: 'Transformez vos visiteurs en clients grâce à une page moderne et optimisée.',
  features: [
    'Design moderne et responsive',
    'Sections personnalisées',
    'Formulaire de génération de leads',
    'Boutons CTA stratégiques',
    'Animations fluides',
    'Optimisation SEO',
    'Intégration réseaux sociaux & WhatsApp'
  ],
},
  {
    slug: 'application',
    icon: Code2,
    color: 'from-teal-600 to-accent-500',
    title: 'Application Web',
    pitch: 'Des applications métiers sur mesure pour automatiser vos processus.',
    features: ['Analyse des besoins', 'UI/UX sur mesure', 'API REST sécurisée', 'Authentification & rôles', 'Tests & documentation', 'Formation incluse'],
  },
  {
    slug: 'erp-crm',
    icon: BarChart3,
    color: 'from-orange-600 to-amber-400',
    title: 'Système ERP / CRM',
    pitch: 'Pilotez votre entreprise avec des outils de gestion intelligents.',
    features: ['Tableau de bord en temps réel', 'Gestion clients & prospects', 'Facturation & devis', 'Suivi des stocks', 'Rapports & analytics', 'Intégrations API tiers'],
  },
  {
    slug: 'maintenance',
    icon: Wrench,
    color: 'from-rose-600 to-pink-400',
    title: 'Refonte & Maintenance',
    pitch: 'Modernisez votre existant et gardez-le performant dans le temps.',
    features: ['Audit technique complet', 'Migration de données', 'Optimisation performance', 'Mise à jour de sécurité', 'Corrections de bugs', 'Rapport mensuel'],
  },
]

const mission = [
  { icon: Target,   title: 'Notre mission',  desc: 'Accompagner les entreprises algériennes dans leur transformation digitale avec des solutions adaptées à leurs réalités.' },
  { icon: Lightbulb,title: 'Notre approche', desc: 'Écoute active, conception itérative et livraison en temps et en heure. Nous travaillons en transparence totale.' },
  { icon: Rocket,   title: 'Notre vision',   desc: 'Devenir le partenaire digital de référence pour les PME/TPE du Maghreb, avec un ancrage local fort.' },
]

export default function Services() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="orb w-80 h-80 bg-brand-500 -top-20 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Ce que nous proposons</p>
            <h1 className="section-title mb-4">Nos <span className="gradient-text">Services</span></h1>
            <p className="section-subtitle">
              De la conception à la mise en ligne, nous vous accompagnons à chaque étape 
              de votre projet digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-dark-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mission.map((m, i) => (
              <motion.div key={m.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}>
                <div className="text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-7 h-7 text-brand-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">{m.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}
            >
              {/* Visual */}
              <div className="w-full lg:w-1/2">
                <div className={`rounded-3xl bg-gradient-to-br ${s.color} p-1`}>
                  <div className="rounded-[22px] bg-dark-800 p-10 flex items-center justify-center min-h-[260px]">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-2xl animate-float`}>
                      <s.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h2 className="font-heading text-3xl font-bold text-white mb-3">{s.title}</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">{s.pitch}</p>
                <ul className="space-y-2 mb-8">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="w-5 h-5 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-3 h-3 text-accent-400" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${s.slug}`} className="btn-primary">
                  Détails & tarifs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Vous ne trouvez pas ce qu'il vous faut ?</h2>
          <p className="text-gray-400 mb-6">Dites-nous votre besoin, nous trouverons la solution adaptée.</p>
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Nous contacter <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
