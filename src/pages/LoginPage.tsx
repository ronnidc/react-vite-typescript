import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'

// LoginPage er en placeholder til fase 6 (auth).
// For nu viser den bare en formular uden funktionalitet.
function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log ind</h1>
        <p className={styles.subtitle}>Læringsportalen for undervisere</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              placeholder="din@email.dk"
              autoComplete="email"
            />
          </label>

          <label className={styles.label}>
            Adgangskode
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button className={styles.button} type="submit">
            Log ind
          </button>
        </form>

        <Link to="/" className={styles.back}>← Tilbage til kurser</Link>
      </div>
    </div>
  )
}

export default LoginPage
