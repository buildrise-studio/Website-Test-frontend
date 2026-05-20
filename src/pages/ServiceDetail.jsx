import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { color, motion } from 'framer-motion'
import { title } from 'framer-motion/client'

const details = {
  vitrine: {
    title: 'Site Web Vitrine',
    emoji: '🌐',
    color: 'from-brand-500 to-brand-400',
    tagline: 'Votre meilleure carte de visite en ligne',
    desc: 'Un site vitrine professionnel est le pilier de votre présence digitale. Nous créons des sites rapides, beaux et optimisés qui reflètent parfaitement votre image de marque.',
    features: ['Design 100% personnalisé', 'Responsive mobile/tablet/desktop', 'Optimisation SEO avancée', 'Formulaire de contact sécurisé', 'Galerie photos & vidéos', 'Intégration réseaux sociaux', 'Google Analytics (optionnelle)'],
    process: ['Brief & cahier des charges', 'Maquettes graphiques (wireframes)', 'Design UI final', 'Développement & intégration', 'Tests & validation', 'Mise en ligne & formation'],
    prix: 'À partir de 50 000 DA',
    delai: '2 – 3 semaines',
  },
  ecommerce: {
    title: 'Boutique E-commerce',
    emoji: '🛒',
    color: 'from-purple-600 to-purple-400',
    tagline: 'Vendez partout, 24h/24, 7j/7',
    desc: 'Lancez votre boutique en ligne et accédez à un marché illimité. Nous développons des plateformes e-commerce performantes, sécurisées et faciles à gérer.',
    features: ['Catalogue produits illimité', 'Gestion des stocks automatisée', 'Suivi des commandes en temps réel', 'Promotions & codes de réduction', 'Multi-langues (AR / FR / EN)', 'Dashboard analytique complet', 'Notifications email/push'],
    process: ['Analyse métier & concurrents', 'Architecture catalogue', 'Design boutique', 'Développement & paiement', 'Tests de charge & sécurité', 'Formation & mise en ligne'],
    prix: 'À partir de 60 000 DA',
    delai: '4 – 6 semaines',
  },
  landing: {
  title: 'Landing Page',
  emoji: '🚀',
  color: 'from-blue-600 to-cyan-400',
  tagline: 'Transformez vos visiteurs en clients',
  desc: 'Créez une landing page moderne, rapide et optimisée pour maximiser vos conversions. Une page conçue pour présenter votre offre, capturer des leads et augmenter vos ventes.',
  features: [
    'Design moderne et responsive',
    'Sections personnalisées (Hero, Services, FAQ, Contact)',
    'Formulaire de capture de leads',
    'Appels à l’action stratégiques (CTA)',
    'Animations fluides et interactives',
    'Optimisation SEO',
    'Intégration réseaux sociaux & WhatsApp'
  ],
  process: [
    'Analyse de votre objectif',
    'Structure & stratégie de conversion',
    'Maquette UI/UX',
    'Développement responsive',
    'Optimisation performance & SEO',
    'Tests & mise en ligne'
  ],
  prix: 'À partir de 25 000 DA',
  delai: '1 – 2 semaines',
},

  application: {
    title: 'Application Web',
    emoji: '⚙️',
    color: 'from-teal-600 to-accent-500',
    tagline: 'Automatisez vos processus avec des outils sur mesure',
    desc: 'Chaque entreprise a ses propres processus. Nous concevons des applications web métiers adaptées à vos besoins spécifiques, de la prise de RDV à la gestion de projets.',
    features: ['Analyse & spécifications détaillées', 'Architecture API REST sécurisée', 'Gestion des rôles & permissions', 'Notifications temps réel', 'Exports PDF/Excel', 'Intégrations tierces (SMS, email, maps)', 'Tests automatisés', 'Documentation technique'],
    process: ['Ateliers de conception', 'Maquettes fonctionnelles', 'Architecture technique', 'Développement itératif', 'Tests & recette', 'Déploiement & formation'],
    prix: 'Selon Fonctionalité',
    delai: 'de 6 semaines ou plus',
  },
  'erp-crm': {
    title: 'Système ERP / CRM',
    emoji: '📊',
    color: 'from-orange-600 to-amber-400',
    tagline: 'Pilotez votre activité depuis un seul tableau de bord',
    desc: 'Nos solutions ERP/CRM centralisent toutes vos données : clients, ventes, stocks, finances. Une visibilité complète pour des décisions plus rapides et plus précises.',
    features: ['Tableau de bord en temps réel', 'Gestion 360° des clients', 'Devis & facturation automatisée', 'Suivi des stocks multi-dépôts', 'Rapports & analytics avancés', 'Gestion des équipes & tâches', 'Import/export de données', 'Accès multi-utilisateurs'],
    process: ['Audit des processus existants', 'Conception des workflows', 'Développement du noyau', 'Modules métiers', 'Migration des données', 'Formation & support'],
    prix: 'Selon Fonctionalité',
    delai: 'de 8 semaines ou plus',
  },
  maintenance: {
    title: 'Refonte & Maintenance',
    emoji: '🔧',
    color: 'from-rose-600 to-pink-400',
    tagline: 'Modernisez et pérennisez votre solution digitale',
    desc: 'Votre site est obsolète ou rencontre des problèmes ? Nous intervenons rapidement pour le moderniser, l\'optimiser et assurer sa pérennité dans le temps.',
    features: ['Audit technique & UX complet', 'Rapport de recommandations', 'Modernisation du design', 'Migration vers technologies récentes', 'Optimisation performances', 'Mise à jour de sécurité', 'Sauvegardes automatiques', 'Support mensuel dédié'],
    process: ['Audit & diagnostic', 'Plan d\'action priorisé', 'Validation du devis', 'Intervention technique', 'Tests & validation', 'Rapport & suivi mensuel'],
    prix: 'À partir de 30 000 DA',
    delai: '1 – 4 semaines',
  },
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const d = details[slug]
  if (!d) return <Navigate to="/services" replace />

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour aux services
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} className="mb-12">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center mb-6 text-3xl shadow-xl`}>
            {d.emoji}
          </div>
          <h1 className="section-title mb-3">{d.title}</h1>
          <p className="text-xl text-brand-300 font-medium mb-4">{d.tagline}</p>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">{d.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Features */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}>
            <div className="card-glass p-6">
              <h2 className="font-heading font-bold text-xl text-white mb-5">Ce qui est inclus</h2>
              <ul className="space-y-3">
                {d.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Process */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 }}>
            <div className="card-glass p-6">
              <h2 className="font-heading font-bold text-xl text-white mb-5">Notre processus</h2>
              <ol className="space-y-4">
                {d.process.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${d.color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                      {i + 1}
                    </span>
                    <span className="text-gray-300 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>

        {/* CTA card */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <div className="card-glass p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-gray-400 text-sm mb-1">Investissement</div>
              <div className="text-2xl font-heading font-bold text-white">{d.prix}</div>
              <div className="text-gray-500 text-sm mt-1">Délai estimé : {d.delai}</div>
            </div>
            <Link to="/contact" className="btn-primary text-base px-8 py-4 flex-shrink-0">
              Demander un devis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
