import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Course } from '../types'
import { fetchCourses } from '../services/courseService'
import { useRelatedResources } from '../hooks/useRelatedResources'
import styles from './CourseDetailPage.module.css'

function CourseDetailPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Henter relaterede ressourcer fra JSONPlaceholder via rigtig HTTP fetch.
  // Bemærk: vi sender Number(id) — useQuery starter automatisk når courseId er klar.
  const {
    data: resources,
    isLoading: resourcesLoading,
    isError: resourcesError,
  } = useRelatedResources(Number(id))

  useEffect(() => {
    let cancelled = false

    async function loadCourse() {
      try {
        setLoading(true)
        const all = await fetchCourses()
        const found = all.find((c) => c.id === Number(id))
        if (!cancelled) {
          if (!found) {
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
  }, [id, navigate])

  if (loading) return <div className={styles.status}>Henter kursus…</div>
  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>
  if (!course) return null

  return (
    <div>
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

      {/* Relaterede ressourcer — hentet fra eksternt REST API */}
      <section className={styles.resources}>
        <h2 className={styles.resourcesTitle}>Relaterede ressourcer</h2>

        {resourcesLoading && (
          <p className={styles.status}>Henter ressourcer…</p>
        )}

        {resourcesError && (
          <p className={`${styles.status} ${styles.error}`}>
            Kunne ikke hente ressourcer.
          </p>
        )}

        {resources && (
          <ul className={styles.resourceList}>
            {resources.map((resource) => (
              <li key={resource.id} className={styles.resourceItem}>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                <p className={styles.resourceBody}>{resource.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default CourseDetailPage
