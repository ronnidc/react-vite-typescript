import { useState, useEffect } from 'react'
import type { Course } from '../types'
import { fetchCourses } from '../services/courseService'

// Vores første custom hook.
// Navnekonvention: altid "use" som prefix — det er et krav fra React, ikke bare en konvention.
// React bruger det til at håndhæve reglerne for hooks (må ikke kaldes i if-sætninger mv.)
interface UseCoursesResult {
  courses: Course[]
  loading: boolean
  error: string | null
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // "cancelled" bruges til cleanup — forklaring nedenfor
    let cancelled = false

    async function loadCourses() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchCourses()

        // Cleanup-check: hvis komponenten er unmountet mens vi ventede på data,
        // skal vi IKKE opdatere state — det ville give en memory leak og en React-advarsel.
        // Dette mønster hedder "cancellation via boolean flag".
        if (!cancelled) {
          setCourses(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Kunne ikke hente kurser. Prøv igen.')
          console.error(err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCourses()

    // Cleanup-funktionen — returneres fra useEffect.
    // React kalder den når komponenten unmountes, eller før effecten kører igen.
    // Her sætter vi cancelled = true så async-operationen ignorerer sit svar.
    return () => {
      cancelled = true
    }
  }, []) // Tom dependency array = kør kun ved mount. Svarer til onMounted() i Vue.

  return { courses, loading, error }
}
