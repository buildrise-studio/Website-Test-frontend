import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, ShoppingBag, Code2, BarChart3, Wrench, Star, ChevronDown, ChevronUp, CheckCircle, Zap, Shield, TrendingUp, Rocket } from 'lucide-react'
import api from '../lib/api'

// ─── Animation helpers ─────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } }),
}

// ─── Static data ───────────────────────────────────────────────────────────
const services = [
  { icon: Globe,       title: 'Site Web Vitrine',          desc: 'Présence en ligne professionnelle et percutante pour votre activité.', color: 'from-brand-500 to-brand-400', slug: 'vitrine' },
  { icon: ShoppingBag, title: 'Boutique E-commerce',       desc: 'Vente en ligne avec paiement sécurisé et gestion des commandes.', color: 'from-purple-600 to-purple-400', slug: 'ecommerce' },
  { icon: Code2,       title: 'Application Web',           desc: 'Applications sur mesure adaptées à vos processus métiers.', color: 'from-teal-600 to-accent-500', slug: 'application' },
  { icon: Rocket,      title: 'Landing page',              desc: 'Transformez vos visiteurs en clients grâce à une page moderne et optimisée.', color: "from-blue-600 to-cyan-400", slug: 'landing'},
  { icon: BarChart3,   title: 'Système ERP / CRM',         desc: 'Tableaux de bord et outils de gestion pour piloter votre activité.', color: 'from-orange-600 to-amber-400', slug: 'erp-crm' },
  { icon: Wrench,      title: 'Refonte & Maintenance',     desc: 'Modernisation de votre existant et support technique continu.', color: 'from-rose-600 to-pink-400', slug: 'maintenance' },
]

const stats = [
  { value: '50+',   label: 'Projets livrés' },
  { value: '98%',   label: 'Clients satisfaits' },
  { value: '5 ans', label: 'D\'expérience' },
  { value: '24h',   label: 'Support réactif' },
]

const atouts = [
  { icon: Zap,        title: 'Livraison rapide',       desc: 'Projets livrés dans les délais convenus.' },
  { icon: Shield,     title: 'Sécurité maximale',      desc: 'Code sécurisé, hébergement fiable.' },
  { icon: TrendingUp, title: 'Optimisé SEO',           desc: 'Sites performants et bien référencés.' },
  { icon: CheckCircle,title: 'Support inclus',         desc: '3 mois de support offert après livraison.' },
]

// ─── Components ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-brand-500 top-20 -left-20" />
      <div className="orb w-80 h-80 bg-purple-600 bottom-10 right-0" />
      <div className="orb w-64 h-64 bg-accent-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden" animate="visible"
          variants={fadeUp} custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/30 rounded-full mb-6"
        >
          <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse-slow" />
          <span className="text-brand-300 text-sm font-medium">Votre partenaire digital de confiance</span>
        </motion.div>

        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={0.1}
          className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6"
        >
          Des solutions
          <br />
          <span className="gradient-text">digitales qui font</span>
          <br />
          la différence
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nous concevons et développons des sites web, applications et systèmes de gestion 
          qui propulsent votre entreprise vers de nouveaux sommets.
        </motion.p>

        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={0.3}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Démarrer mon projet <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/realisations" className="btn-outline text-base px-8 py-4">
            Voir nos réalisations
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={0.4}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/5"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-heading font-bold gradient-text">{value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Ce que nous faisons</p>
            <h2 className="section-title mb-4">Nos <span className="gradient-text">Services</span></h2>
            <p className="section-subtitle">
              Des solutions complètes pour digitaliser votre activité et accélérer votre croissance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i * 0.1}
            >
              <Link to={`/services/${service.slug}`} className="card-glass p-6 block group hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="text-brand-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
          {/* CTA card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}>
            <Link to="/services" className="card-glass p-6 block group border-dashed hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center h-full min-h-[180px]">
              <div className="text-4xl mb-3">✦</div>
              <h3 className="font-heading font-bold text-white mb-1">Voir tous nos services</h3>
              <p className="text-gray-500 text-sm">Découvrez l'ensemble de nos offres</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AtotsSection() {
  return (
    <section className="py-20 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {atouts.map((a, i) => (
            <motion.div key={a.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-heading font-bold text-white mb-1">{a.title}</h3>
                <p className="text-gray-400 text-sm">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RealisationsSection({ projets }) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Portfolio</p>
            <h2 className="section-title">Nos dernières <span className="gradient-text">réalisations</span></h2>
          </div>
          <Link to="/realisations" className="btn-outline self-start md:self-auto">
            Tout voir <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projets.slice(0, 6).map((p, i) => (
            <motion.div key={p.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}>
              <div className="card-glass overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-dark-600 to-dark-700 relative overflow-hidden">
                  {p.image
                    ? <img src={p.image} alt={p.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full flex items-center justify-center text-5xl">{p.emoji || '🖥️'}</div>
                  }
                  <div className="absolute top-3 left-3">
                    <span className="badge bg-brand-500/80 text-white backdrop-blur-sm">{p.categorie || 'Web'}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-white mb-1">{p.titre}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{p.description}</p>
                  {p.technologies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.technologies.slice(0, 3).map(t => (
                        <span key={t} className="badge bg-white/5 text-gray-400">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TemoignagesSection({ temoignages }) {
  return (
    <section className="py-24 bg-dark-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Témoignages</p>
          <h2 className="section-title">Ce que disent <span className="gradient-text">nos clients</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temoignages.map((t, i) => (
            <motion.div key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}>
              <div className="card-glass p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array(t.note || 5).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1 italic mb-4">"{t.message}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.nom?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.nom}</div>
                    <div className="text-gray-500 text-xs">{t.entreprise}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="section-title">Questions <span className="gradient-text">fréquentes</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <motion.div key={faq.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <button
                className="w-full card-dark p-5 flex items-center justify-between text-left hover:border-brand-500/30 transition-all"
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                {open === faq.id
                  ? <ChevronUp className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                }
              </button>
              {open === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="card-dark mt-1 px-5 py-4 text-gray-400 text-sm leading-relaxed"
                >
                  {faq.reponse}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="btn-outline">Voir toutes les questions</Link>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="gradient-border rounded-3xl p-12 bg-dark-700 relative overflow-hidden">
          <div className="orb w-64 h-64 bg-brand-500 -top-20 -right-20 opacity-20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Prêt à lancer votre <span className="gradient-text">projet digital ?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Discutons ensemble de vos besoins. Consultation gratuite et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Démarrer maintenant <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+213675595880" className="btn-outline text-base px-8 py-4">
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [projets, setProjets] = useState([])
  const [temoignages, setTemoignages] = useState([])
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    api.get('/projets?per_page=6').then(r => setProjets(r.data.data || r.data)).catch(() => setProjets(demoProjects))
    api.get('/temoignages').then(r => setTemoignages(r.data.data || r.data)).catch(() => setTemoignages(demoTemoignages))
    api.get('/faq?per_page=5').then(r => setFaqs(r.data.data || r.data)).catch(() => setFaqs(demoFaqs))
  }, [])

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AtotsSection />
      <RealisationsSection projets={projets.length ? projets : demoProjects} />
      <TemoignagesSection temoignages={temoignages.length ? temoignages : demoTemoignages} />
      <FaqSection faqs={faqs.length ? faqs : demoFaqs} />
      <CtaSection />
    </>
  )
}

// ─── Demo data ─────────────────────────────────────────────────────────────
const demoProjects = [
  { id:1, titre:'BatiHome Immobilier', description:'Plateforme de vente immobilière avec filtres avancés.', categorie:'Web', emoji:'🏠', technologies:['React','Laravel','MySQL'] },
  { id:2, titre:'ShopDZ E-commerce', description:'Boutique en ligne avec panier et paiement sécurisé.', categorie:'E-commerce', emoji:'🛒', technologies:['Vue.js','Laravel','Stripe'] },
  { id:3, titre:'EduPro LMS', description:'Plateforme d\'apprentissage en ligne avec cours vidéo.', categorie:'App Web', emoji:'📚', technologies:['React','Node.js','MongoDB'] },
  { id:4, titre:'CRM ProGestion', description:'Système CRM pour la gestion des clients et ventes.', categorie:'ERP/CRM', emoji:'📊', technologies:['React','Laravel','PostgreSQL'] },
  { id:5, titre:'RestaurantPro', description:'Site vitrine + menu en ligne pour restaurant.', categorie:'Vitrine', emoji:'🍽️', technologies:['Next.js','TailwindCSS'] },
  { id:6, titre:'MediCare Clinique', description:'Gestion de rendez-vous médicaux en ligne.', categorie:'App Web', emoji:'🏥', technologies:['React','Laravel'] },
]
const demoTemoignages = [
  { id:1, nom:'Karim Benali', entreprise:'BatiHome SARL', message:'Équipe très professionnelle. Notre site est magnifique et nos ventes ont doublé !', note:5 },
  { id:2, nom:'Sara Medjdoub', entreprise:'ShopDZ', message:'Réalisation rapide et parfaite. Exactement ce dont nous avions besoin.', note:5 },
  { id:3, nom:'Mohamed Haddad', entreprise:'EduPro', message:'Support réactif et code de qualité. Je recommande vivement DevAgence !', note:5 },
]
const demoFaqs = [
  { id:1, question:'Combien coûte un site web ?', reponse:'Les tarifs varient selon la complexité. Un site vitrine démarre à partir de 50 000 DA. Contactez-nous pour un devis personnalisé.' },
  { id:2, question:'Quel est le délai de réalisation ?', reponse:'Entre 2 et 8 semaines selon le projet. Nous établissons un planning précis dès le démarrage.' },
  { id:3, question:'Proposez-vous la maintenance ?', reponse:'Oui, nous offrons 3 mois de support inclus, avec des contrats de maintenance mensuelle disponibles.' },
  { id:4, question:'Mes données sont-elles sécurisées ?', reponse:'Absolument. Nous utilisons les meilleures pratiques de sécurité : HTTPS, protection CSRF, validation des données, etc.' },
  { id:5, question:'Puis-je modifier le contenu moi-même ?', reponse:'Oui, tous nos sites incluent un dashboard d\'administration intuitif pour gérer votre contenu facilement.' },
]
