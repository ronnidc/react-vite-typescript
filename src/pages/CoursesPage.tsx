import { useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useCourses } from '../hooks/useCourses'
import { useNavigate } from 'react-router-dom'
import styles from './CoursesPage.module.css'

function CoursesPage() {
  const { courses, loading, error } = useCourses()
  const [showOnlyPublished, setShowOnlyPublished] = useState(false)

  // useNavigate returnerer en funktion til programmatisk navigation.
  // Termen: "imperative navigation" — du navigerer via kode, ikke via et <Link>-element.
  const navigate = useNavigate()

  const visibleCourses = showOnlyPublished
    ? courses.filter((course) => course.published)
    : courses

  if (loading) return <div className={styles.status}>Henter kurser…</div>
  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>

  return (
    <div>
      <header className={styles.header}>
        <h1>Læringsportal</h1>
        <p>Undervisningsmateriale om FNs verdensmål</p>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.filterToggle}>
          <input
            type="checkbox"
            checked={showOnlyPublished}
            onChange={(e) => setShowOnlyPublished(e.target.checked)}
          />
          Vis kun publicerede kurser
        </label>
        <span className={styles.count}>
          {visibleCourses.length} {visibleCourses.length === 1 ? 'kursus' : 'kurser'}
        </span>
      </div>

      <div className={styles.grid}>
        {visibleCourses.map((course) => (
          // onClick på et card navigerer til detaljsiden
          // navigate() svarer til router.push() i Vue Router
          <div key={course.id} onClick={() => navigate(`/courses/${course.id}`)} className={styles.cardWrapper}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
