import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Full Stack{' '}
          <span className="text-primary-600">React + Spring Boot</span>
        </h1>
        <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
          A production-ready full stack application with JWT authentication,
          role-based access control, and paginated product catalog.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/products"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Browse Products
          </Link>
          {!isAuthenticated ? (
            <Link to="/register"
              className="border border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-600 px-8 py-3 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
          ) : (
            <p className="border border-gray-200 text-gray-500 px-8 py-3 rounded-lg">
              Welcome, {user?.firstName}! 👋
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 text-left">
          {[
            { icon: '🔐', title: 'JWT Authentication', desc: 'Secure stateless auth with access token, protected routes, and role-based access control.' },
            { icon: '⚡', title: 'React Query', desc: 'Smart server state management with caching, background refetch, and optimistic updates.' },
            { icon: '🎯', title: 'Spring Boot 3', desc: 'Production-grade REST API with validation, global error handling, and paginated responses.' },
          ].map(f => (
            <div key={f.title} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}