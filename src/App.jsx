import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'

// Public layout & pages
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Realisations from './pages/Realisations'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

// Admin
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminProjets from './pages/admin/Projets'
import AdminServices from './pages/admin/Services'
import AdminFaq from './pages/admin/Faq'
import AdminMessages from './pages/admin/Messages'
import AdminTemoignages from './pages/admin/Temoignages'

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#11142e', color: '#fff', border: '1px solid #222546' },
          success: { iconTheme: { primary: '#00e5c3', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"    element={<Dashboard />} />
          <Route path="projets"      element={<AdminProjets />} />
          <Route path="services"     element={<AdminServices />} />
          <Route path="faq"          element={<AdminFaq />} />
          <Route path="messages"     element={<AdminMessages />} />
          <Route path="temoignages"  element={<AdminTemoignages />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
