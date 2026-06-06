import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import AdminProductsPage from './pages/AdminProductsPage'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={
              <ProtectedRoute><ProductsPage /></ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute adminOnly><AdminProductsPage /></ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}