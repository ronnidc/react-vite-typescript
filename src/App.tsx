import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// React.lazy() + dynamic import = code splitting per route.
// Hver side loades kun når brugeren navigerer til den — ikke ved initial load.
// Termen: "route-based code splitting" / "lazy loading" / "dynamic import"
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function Nav() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        Læring<span>s</span>portal
      </Link>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="nav-user">👤 {user?.name}</span>
            <button className="nav-logout" onClick={logout}>
              Log ud
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-login">
            Log ind
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        {/* Suspense er påkrævet af React.lazy() — den viser fallback mens
            en lazy-loadet komponent henter sin chunk over netværket.
            Termen: "Suspense boundary" / "fallback" */}
        <Suspense fallback={null}>
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
        </Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
