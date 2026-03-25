import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function Nav() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">Læring<span>s</span>portal</Link>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="nav-user">👤 {user?.name}</span>
            <button className="nav-logout" onClick={logout}>Log ud</button>
          </>
        ) : (
          <Link to="/login" className="nav-login">Log ind</Link>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      {/* Ingen app-body wrapper her — hver side styrer sit eget layout.
          CoursesPage har brug for full-width hero.
          De øvrige sider har deres egne containere. */}
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
