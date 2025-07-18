const Star = ({
  size,
  left,
  top,
  opacity,
  animationDelay,
}: {
  size: number
  left: string
  top: string
  opacity: number
  animationDelay: string
}) => (
  <div
    className="absolute bg-white rounded-full animate-twinkle"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left,
      top,
      opacity,
      animationDelay,
    }}
  />
)

const Meteor = ({
  left,
  top,
  animationDelay,
  animationDuration,
}: {
  left: string
  top: string
  animationDelay: string
  animationDuration: string
}) => (
  <div
    className="absolute bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-meteor"
    style={{
      width: "150px", // Still a visible streak
      height: "2px",
      left,
      top,
      animationDelay,
      animationDuration,
    }}
  />
)

export default function StarsBackground() {
  const numStars = 300 // Keeping star count for density
  const numMeteors = 3 // Reduced number of meteors

  const stars = Array.from({ length: numStars }).map((_, i) => {
    const size = Math.random() * 2 + 0.5
    const left = `${Math.random() * 100}%`
    const top = `${Math.random() * 100}%`
    const opacity = Math.random() * 0.7 + 0.3
    const animationDelay = `${Math.random() * 5}s`

    return (
      <Star key={`star-${i}`} size={size} left={left} top={top} opacity={opacity} animationDelay={animationDelay} />
    )
  })

  const meteors = Array.from({ length: numMeteors }).map((_, i) => {
    const left = `${Math.random() * 100}%`
    const top = `${Math.random() * 50}%`
    const animationDelay = `${Math.random() * 20 + 10}s` // Increased delay for less frequent meteors (10-30s)
    const animationDuration = `${Math.random() * 5 + 3}s` // Increased duration for slower movement (3-8s)

    return (
      <Meteor
        key={`meteor-${i}`}
        left={left}
        top={top}
        animationDelay={animationDelay}
        animationDuration={animationDuration}
      />
    )
  })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars}
      {meteors}
    </div>
  )
}
