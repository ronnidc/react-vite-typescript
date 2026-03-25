import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

// Nav er en separat komponent fordi den bruger useAuth.
// App() selv behøver ikke kende til auth — god separation of concerns.
function Nav() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">Læringsportal</Link>

      <div className="nav-actions">
        {isAuthenticated ? (
          // Betinget rendering baseret på auth-state
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
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
