import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuickAccess, setShowQuickAccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Clear any existing tokens when accessing login page
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // NOTE: In a real app, this would be an API call.
      // For this demo, we'll simulate a login check against mock data.
      const mockUsers = {
        'admin@example.com': { password: 'admin', role: 'admin' },
        'instructor@example.com': { password: 'instructor', role: 'instructor' },
        'student@example.com': { password: 'student', role: 'student' },
      };

      const user = mockUsers[email];
      if (user && user.password === password) {
        const { token, role } = { token: `mock-token-${email}`, role: user.role };
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        router.push(`/${role}/dashboard`)
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid email or password. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleDevAccess = (role) => {
    // Restrict to development environment only
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Quick access is disabled in production')
      return
    }
    
    localStorage.setItem('token', `dev-${role}-token`)
    localStorage.setItem('role', role)
    router.push(`/${role}/dashboard`)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Login Form (Wider) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-xl mb-4 shadow-lg">
              <span className="text-3xl">🎓</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          </div>

          {/* Enhanced Login Box with Shadow and Border */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-8 lg:p-10">
            <h2 className="hidden lg:block text-3xl font-bold text-slate-900 mb-2">Sign in to your account</h2>
            <p className="hidden lg:block text-slate-600 mb-8">Enter your credentials to access the dashboard</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-fade-in">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-teal-600 hover:text-teal-500">Forgot your password?</a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>

            {/* Quick Access Section - Development Only */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowQuickAccess(!showQuickAccess)}
                    className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    {showQuickAccess ? 'Hide' : 'Show'} Quick Demo Access
                  </button>
                </div>
                
                {showQuickAccess && (
                  <div className="mt-4 space-y-3 animate-fade-in">
                    <p className="text-xs text-slate-500 text-center">Use these credentials for instant access:</p>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex justify-between items-center bg-slate-100 rounded-lg px-3 py-2">
                        <span className="font-semibold text-slate-700">Admin:</span>
                        <span>admin@example.com / admin</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-100 rounded-lg px-3 py-2">
                        <span className="font-semibold text-slate-700">Instructor:</span>
                        <span>instructor@example.com / instructor</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-100 rounded-lg px-3 py-2">
                        <span className="font-semibold text-slate-700">Student:</span>
                        <span>student@example.com / student</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <button onClick={() => handleDevAccess('student')} className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">Student</button>
                      <button onClick={() => handleDevAccess('instructor')} className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">Instructor</button>
                      <button onClick={() => handleDevAccess('admin')} className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">Admin</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Branding & Info (Narrower) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-2xl mb-8 shadow-2xl">
            <span className="text-5xl">🎓</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">LMS Platform</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Empowering educators and engaging students with a comprehensive, modern learning management system.
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">1000+</div>
              <div className="text-sm text-slate-400">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">50k+</div>
              <div className="text-sm text-slate-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">98%</div>
              <div className="text-sm text-slate-400">Success</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
