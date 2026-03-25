import { useState } from 'react'
import CourseCard from '../components/CourseCard'
import { SkeletonGrid } from '../components/Skeleton'
import { useCourses } from '../hooks/useCourses'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './CoursesPage.module.css'

function CoursesPage() {
  const { courses, loading, error } = useCourses()
  const { user } = useAuth()
  const navigate = useNavigate()

  // RBAC — rolle bestemmer standardadfærd:
  // admin ser alle kurser som standard (showOnlyPublished = false)
  // instructor ser kun publicerede som standard (showOnlyPublished = true)
  // Termen: "role-based default state"
  const isAdmin = user?.role === 'admin'
  const [showOnlyPublished, setShowOnlyPublished] = useState(!isAdmin)

  const visibleCourses = showOnlyPublished
    ? courses.filter((course) => course.published)
    : courses

  if (loading) return (
    <div>
      <header className={styles.header}>
        <h1>Læringsportal</h1>
        <p>Undervisningsmateriale om FNs verdensmål</p>
      </header>
      <SkeletonGrid count={9} />
    </div>
  )

  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1>Læringsportal</h1>
          <p>Undervisningsmateriale om FNs verdensmål</p>
        </div>

        {/* Rolle-badge i headeren — kun synligt når man er logget ind */}
        {user && (
          <span className={isAdmin ? styles.roleAdmin : styles.roleInstructor}>
            {isAdmin ? 'Administrator' : 'Underviser'}
          </span>
        )}
      </header>

      <div className={styles.toolbar}>
        {/* Admin kan toggle mellem alle og kun publicerede.
            Instructor ser kun filteret som info — det er låst til publicerede. */}
        {isAdmin ? (
          <label className={styles.filterToggle}>
            <input
              type="checkbox"
              checked={showOnlyPublished}
              onChange={(e) => setShowOnlyPublished(e.target.checked)}
            />
            Vis kun publicerede kurser
          </label>
        ) : (
          <span className={styles.filterInfo}>Viser publicerede kurser</span>
        )}

        <span className={styles.count}>
          {visibleCourses.length} {visibleCourses.length === 1 ? 'kursus' : 'kurser'}
        </span>
      </div>

      <div className={styles.grid}>
        {visibleCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/courses/${course.id}`)}
            className={styles.cardWrapper}
          >
            {/* isAdmin sendes ned som prop — CourseCard viser kladde-badge hvis sand */}
            <CourseCard course={course} isAdmin={isAdmin} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
