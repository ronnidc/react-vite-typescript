import styles from './Skeleton.module.css'

// Skeleton er en primitiv byggesten — en enkelt animeret blok.
// Den bruges til at opbygge mere komplekse skeleton-layouts.
// Termen: "skeleton loader" / "skeleton screen" — viser strukturen
// af indhold der er på vej, i stedet for en spinner der ikke giver
// brugeren nogen fornemmelse af hvad der loader.
interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
}: SkeletonProps) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius }}
      // aria-hidden fortæller skærmlæsere at ignorere dette element —
      // det er rent visuelt og har ingen semantisk betydning.
      aria-hidden="true"
    />
  )
}

// SkeletonCourseCard efterligner layoutet af CourseCard præcist —
// samme padding, samme gap, samme højder som de rigtige elementer.
// Brugeren ser strukturen inden data ankommer — ingen pludselige layout-hop.
// Termen: "content-aware skeleton" — skeleton der matcher det faktiske indhold.
export function SkeletonCourseCard() {
  return (
    <div className={styles.card}>
      <Skeleton width="80px" height="20px" borderRadius="4px" />
      <Skeleton width="70%" height="20px" />
      <Skeleton width="100%" height="14px" />
      <Skeleton width="85%" height="14px" />
      <div className={styles.footer}>
        <Skeleton width="60px" height="14px" />
        <Skeleton width="70px" height="20px" borderRadius="4px" />
      </div>
    </div>
  )
}

// SkeletonGrid viser et grid af SkeletonCourseCards.
// count styrer antallet — matcher antallet af rigtige kort vi forventer.
interface SkeletonGridProps {
  count?: number
}

export function SkeletonGrid({ count = 9 }: SkeletonGridProps) {
  // Array.from({ length: count }) er den idiomatiske måde at lave
  // et array af N elementer i JavaScript uden faktisk data.
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCourseCard key={i} />
      ))}
    </div>
  )
}
