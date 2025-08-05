import { useEffect, useState } from "react";
import React from "react";

const Star = ({
  size,
  left,
  top,
  opacity,
  animationDelay,
  color = "white",
  glowColor = "white",
}: {
  size: number
  left: string
  top: string
  opacity: number
  animationDelay: string
  color?: string
  glowColor?: string
}) => (
  <div
    className="absolute rounded-full animate-twinkle"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left,
      top,
      opacity,
      animationDelay,
      backgroundColor: color,
      boxShadow: `0 0 ${size * 3}px ${glowColor}, 0 0 ${size * 6}px ${glowColor}`,
      filter: 'blur(0.5px)',
    }}
  />
)

const Meteor = ({
  left,
  top,
  animationDelay,
  animationDuration,
  color = "white",
  glowColor = "white",
}: {
  left: string
  top: string
  animationDelay: string
  animationDuration: string
  color?: string
  glowColor?: string
}) => (
  <div
    className="absolute bg-gradient-to-r from-transparent via-current to-transparent rounded-full animate-meteor"
    style={{
      width: "200px",
      height: "3px",
      left,
      top,
      animationDelay,
      animationDuration,
      color: color,
      filter: `drop-shadow(0 0 8px ${glowColor})`,
    }}
  />
)

export default function StarsBackground({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const numStars = 120; // Slightly reduced for better performance
  const numMeteors = 3; // Slightly increased for more impact
  const [stars, setStars] = useState<React.ReactElement[]>([]);
  const [meteors, setMeteors] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Enhanced color palette for modern look
    const starColors = isDarkMode 
      ? ["#ffffff", "#e0e7ff", "#c7d2fe", "#a5b4fc"] // White and light blue variations
      : ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc"]; // Purple variations
    
    const meteorColors = isDarkMode
      ? ["#ffffff", "#e0e7ff", "#c7d2fe"]
      : ["#8b5cf6", "#a855f7", "#c084fc"];

    const generatedStars = Array.from({ length: numStars }).map((_, i) => {
      const size = Math.random() * 3 + 1; // Slightly larger stars
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const opacity = Math.random() * 0.8 + 0.4; // Higher opacity range
      const animationDelay = `${Math.random() * 8}s`; // Longer animation cycle
      const colorIndex = Math.floor(Math.random() * starColors.length);
      const starColor = starColors[colorIndex];
      const glowColor = isDarkMode ? starColor : starColor;
      
      return (
        <Star 
          key={`star-${i}`} 
          size={size} 
          left={left} 
          top={top} 
          opacity={opacity} 
          animationDelay={animationDelay} 
          color={starColor}
          glowColor={glowColor}
        />
      );
    });
    setStars(generatedStars);

    const generatedMeteors = Array.from({ length: numMeteors }).map((_, i) => {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 60}%`; // More meteors in upper area
      const animationDelay = `${Math.random() * 25 + 15}s`; // Longer delays
      const animationDuration = `${Math.random() * 4 + 2}s`; // Faster meteors
      const colorIndex = Math.floor(Math.random() * meteorColors.length);
      const meteorColor = meteorColors[colorIndex];
      const glowColor = isDarkMode ? meteorColor : meteorColor;
      
      return (
        <Meteor
          key={`meteor-${i}`}
          left={left}
          top={top}
          animationDelay={animationDelay}
          animationDuration={animationDuration}
          color={meteorColor}
          glowColor={glowColor}
        />
      );
    });
    setMeteors(generatedMeteors);
  }, [isDarkMode]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars}
      {meteors}
    </div>
  );
}
