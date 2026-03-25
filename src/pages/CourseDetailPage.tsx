import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { Course } from '../types'
import { fetchCourses } from '../services/courseService'
import { useRelatedResources } from '../hooks/useRelatedResources'
import { useAuth } from '../context/AuthContext'
import styles from './CourseDetailPage.module.css'

function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Vi bruger SAMME queryKey ['courses'] som CoursesPage.
  // Hvis brugeren har besøgt kursuslisten, henter TanStack Query ikke igen —
  // den returnerer øjeblikkeligt fra cachen. Ingen loading-spinner, ingen forsinkelse.
  // Termen: "cache hit" — data blev fundet i cachen uden netværkskald.
  const { data: courses, isLoading, isError } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })

  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const {
    data: resources,
    isLoading: resourcesLoading,
    isError: resourcesError,
  } = useRelatedResources(Number(id))

  if (isLoading) return <div className={styles.status}>Henter kursus…</div>
  if (isError) return <div className={`${styles.status} ${styles.error}`}>Kunne ikke hente kursus.</div>

  const course = courses?.find((c) => c.id === Number(id))

  // Hvis kurset ikke findes navigerer vi til 404
  if (!course) {
    navigate('/not-found', { replace: true })
    return null
  }

  return (
    <div className="page-content">
      <Link to="/" className={styles.back}>← Tilbage til kurser</Link>

      <div className={styles.articleHeader}>
        <div />
        {/* Rediger-knap — kun synlig for admin.
            I et rigtigt projekt ville dette linke til en edit-route.
            Termen: "conditional UI" / "role-gated feature" */}
        {isAdmin && (
          <button className={styles.editButton} onClick={() => alert('Redigering kommer i næste version')}>
            Rediger kursus
          </button>
        )}
      </div>

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
