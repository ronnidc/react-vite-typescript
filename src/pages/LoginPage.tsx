import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { User } from '../types'
import styles from './LoginPage.module.css'

// Mock-brugere — erstatter et rigtigt API-kald til POST /auth/login i produktion.
// I virkeligheden ville vi sende email + password til serveren og få et JWT tilbage.
const MOCK_USERS: Record<string, User> = {
  'underviser@forbund.dk': { id: 1, name: 'Anders Nielsen', email: 'underviser@forbund.dk', role: 'instructor' },
  'admin@forbund.dk':      { id: 2, name: 'Lise Holm',      email: 'admin@forbund.dk',      role: 'admin' },
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  // useLocation giver adgang til state der blev sendt med fra ProtectedRoute.
  // Termen: "location state" — data der følger med en navigation uden at stå i URL'en.
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Simulerer netværksforsinkelse — som om vi kalder POST /auth/login
    await new Promise((resolve) => setTimeout(resolve, 600))

    const user = MOCK_USERS[email]

    // Mock-validering: acceptér alle passwords for kendte emails
    if (!user) {
      setError('Ukendt email. Prøv underviser@forbund.dk eller admin@forbund.dk')
      setLoading(false)
      return
    }

    // Login opdaterer AuthContext — alle komponenter der bruger useAuth() re-renderer
    login(user)

    // Navigér tilbage til den side brugeren forsøgte at tilgå — eller forsiden.
    // Termen: "post-login redirect"
    navigate(from, { replace: true })
  }

  return (
    <div className={styles.wrapper}>

      {/* Venstre side — navy med kontekst */}
      <aside className={styles.aside}>
        <div className={styles.asideContent}>
          <p className={styles.asideEyebrow}>Forbundets Læringsplatform</p>
          <h2 className={styles.asideTitle}>Undervisning i FNs Verdensmål</h2>
        </div>
      </aside>

      {/* Højre side — formular */}
      <div className={styles.formSide}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log ind</h1>
        <p className={styles.subtitle}>Læringsportalen for undervisere</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@email.dk"
              autoComplete="email"
              required
            />
          </label>

          <label className={styles.label}>
            Adgangskode
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {/* Fejlbesked — vises kun hvis error er sat */}
          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logger ind…' : 'Log ind'}
          </button>
        </form>

        {/* Hjælpetekst til demo */}
        <div className={styles.hint}>
          <p>Demo-logins:</p>
          <code>underviser@forbund.dk</code>
          <code>admin@forbund.dk</code>
          <p>Adgangskode: hvad som helst</p>
        </div>

        <Link to="/" className={styles.back}>← Tilbage til kurser</Link>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
