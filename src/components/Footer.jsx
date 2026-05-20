import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import logo from '../assets/Logo.svg'
export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
                    <Link to="/" className="flex items-center">
            
                    <div className="w-[250px] h-auto transition-all duration-300">
                      
                      <img
                        src={logo}
            
                      />
            
                    </div>
                  </Link>
                  <br/>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Agence digitale spécialisée en développement web, applications et solutions numériques sur mesure.
            </p>
            <div className="flex gap-3">
              {[Instagram].map((Icon, i) => (
                <a key={i} href="https://www.instagram.com/buildrisestudio/" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-500/20 flex items-center justify-center text-gray-400 hover:text-brand-300 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Nos Services</h4>
            <ul className="space-y-2">
              {['Site Web Vitrine', 'Boutique E-commerce', 'Landing Page', 'Application Web', 'Système ERP / CRM', 'Refonte & Maintenance'].map(s => (
                <li key={s}><Link to="/services" className="text-gray-400 hover:text-brand-300 text-sm transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[['Accueil', '/'], ['Réalisations', '/realisations'], ['FAQ', '/faq'], ['Contact', '/contact']].map(([label, to]) => (
                <li key={to}><Link to={to} className="text-gray-400 hover:text-brand-300 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                buildrisestudio@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                +213 (0) 675 559 5880
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                Alger, Algérie
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Build Rise Studio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
