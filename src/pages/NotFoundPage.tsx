import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={`page-content ${styles.wrapper}`}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Siden findes ikke</h1>
      <p className={styles.text}>
        Den side du leder efter eksisterer ikke eller er blevet flyttet.
      </p>
      <Link to="/" className={styles.link}>
        ← Tilbage til kurser
      </Link>
    </div>
  );
}

export default NotFoundPage;
