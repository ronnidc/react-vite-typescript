import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    // BrowserRouter aktiverer History API og giver alle børnekomponenter
    // adgang til routing via hooks som useNavigate og useParams.
    // Termen: "router context" — en React Context der leverer routing-state.
    <BrowserRouter>
      <div className="app">

        <nav className="nav">
          {/* Link renderer et <a>-tag men intercepter klikket
              og bruger History API i stedet for fuld side-reload.
              Termen: "client-side navigation" */}
          <Link to="/" className="nav-logo">Læringsportal</Link>
          <Link to="/login" className="nav-login">Log ind</Link>
        </nav>

        <main>
          {/* Routes finder den første <Route> der matcher URL'en.
              Termen: "route matching" */}
          <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* path="*" matcher alt der ikke er matchet ovenfor — vores 404.
                Termen: "wildcard route" / "catch-all route" */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App
