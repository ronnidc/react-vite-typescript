import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Course } from '../types'
import { fetchCourses } from '../services/courseService'
import styles from './CourseDetailPage.module.css'

function CourseDetailPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useParams læser URL-parametre — :id fra route-definitionen.
  // TypeScript ved ikke hvilke params der findes, så alt er string | undefined.
  // Termen: "URL parameter" / "route param" — svarer til useRoute().params i Vue.
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    async function loadCourse() {
      try {
        setLoading(true)
        // Vi henter alle kurser og finder det rigtige — i virkeligheden ville
        // vi kalde et endpoint som GET /courses/:id
        const all = await fetchCourses()
        const found = all.find((c) => c.id === Number(id))

        if (!cancelled) {
          if (!found) {
            // Naviger til 404 hvis kurset ikke findes
            navigate('/not-found', { replace: true })
            return
          }
          setCourse(found)
        }
      } catch {
        if (!cancelled) setError('Kunne ikke hente kursus.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCourse()
    return () => { cancelled = true }

  // id er i dependency array — effecten kører igen hvis URL-parameteren ændrer sig.
  }, [id, navigate])

  if (loading) return <div className={styles.status}>Henter kursus…</div>
  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>
  if (!course) return null

  return (
    <div>
      {/* Link er den deklarative måde at navigere på — renderer et <a>-tag.
          Brug Link til navigation i JSX, useNavigate til navigation i kode.
          Termen: "declarative navigation" */}
      <Link to="/" className={styles.back}>← Tilbage til kurser</Link>

      <article className={styles.article}>
        <span className={styles.goal}>Verdensmål {course.goal}</span>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>

        <div className={styles.meta}>
          <span>{course.durationMinutes} minutter</span>
          <span className={course.published ? styles.published : styles.draft}>
            {course.published ? 'Publiceret' : 'Kladde'}
          </span>
        </div>
      </article>
    </div>
  )
}

export default CourseDetailPage
