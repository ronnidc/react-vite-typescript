import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { SkeletonGrid } from '../components/Skeleton';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import styles from './CoursesPage.module.css';

function CoursesPage() {
  const { courses, loading, error } = useCourses();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';
  const [showOnlyPublished, setShowOnlyPublished] = useState(!isAdmin);

  const visibleCourses = showOnlyPublished ? courses.filter((course) => course.published) : courses;

  if (loading)
    return (
      <>
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Forbundets Læringsplatform</p>
            <h1>Undervisning i FNs Verdensmål</h1>
            <p>Kurser og materialer til undervisere i forbundsregi</p>
          </div>
        </div>
        <div className={styles.content}>
          <SkeletonGrid count={9} />
        </div>
      </>
    );

  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>;

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Forbundets Læringsplatform</p>
          <h1>Undervisning i FNs Verdensmål</h1>
          <p>Kurser og materialer til undervisere i forbundsregi</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
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
            {user && (
              <span className={isAdmin ? styles.roleAdmin : styles.roleInstructor}>
                {isAdmin ? 'Administrator' : 'Underviser'}
              </span>
            )}
          </div>
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
              <CourseCard course={course} isAdmin={isAdmin} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursesPage;
