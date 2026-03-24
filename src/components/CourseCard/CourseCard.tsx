import type { Course } from '../../types'
import styles from './CourseCard.module.css'

// Props er en TypeScript interface der beskriver hvad komponenten accepterer udefra.
// Her siger vi: "CourseCard kræver et course-objekt af typen Course".
interface CourseCardProps {
  course: Course
}

// En funktionskomponent er bare en funktion der returnerer JSX.
// Vi destrukturerer props med det samme: { course } frem for props.course
function CourseCard({ course }: CourseCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.goal}>Verdensmål {course.goal}</span>
      <h2 className={styles.title}>{course.title}</h2>
      <p className={styles.description}>{course.description}</p>
      <footer className={styles.footer}>
        <span>{course.durationMinutes} min</span>
        {/* Betinget rendering: vis kun badge hvis kurset er publiceret */}
        {course.published && (
          <span className={styles.published}>Publiceret</span>
        )}
      </footer>
    </article>
  )
}

export default CourseCard
