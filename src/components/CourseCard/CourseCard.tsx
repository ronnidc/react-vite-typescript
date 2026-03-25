import type { Course } from '../../types'
import styles from './CourseCard.module.css'

interface CourseCardProps {
  course: Course
  // isAdmin er en valgfri prop — false hvis ikke angivet.
  // Komponenten ved dermed selv om den skal vise admin-specifikt indhold.
  // Termen: "prop-driven rendering" — adfærd styres via props udefra.
  isAdmin?: boolean
}

function CourseCard({ course, isAdmin = false }: CourseCardProps) {
  return (
    <article className={`${styles.card} ${!course.published ? styles.unpublished : ''}`}>

      <div className={styles.badges}>
        <span className={styles.goal}>Verdensmål {course.goal}</span>

        {/* Kladde-badge — kun synligt for admin og kun på upublicerede kurser.
            Dobbelt betingelse: begge skal være sande.
            Termen: "compound conditional rendering" */}
        {isAdmin && !course.published && (
          <span className={styles.draft}>Kladde</span>
        )}
      </div>

      <h2 className={styles.title}>{course.title}</h2>
      <p className={styles.description}>{course.description}</p>

      <footer className={styles.footer}>
        <span>{course.durationMinutes} min</span>
        {course.published && (
          <span className={styles.published}>Publiceret</span>
        )}
      </footer>
    </article>
  )
}

export default CourseCard
