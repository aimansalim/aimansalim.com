'use client'

import { useEffect, useRef, useState } from 'react'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'

export function MatrixText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startAnimation = () => {
    setIsHovering(true)
    let iteration = 0
    const originalText = text
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index]
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          })
          .join('')
      )

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }

      iteration += 1/3
    }, 30)
  }

  const stopAnimation = () => {
    setIsHovering(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setDisplayText(text)
  }

  return (
    <span
      className="inline-block cursor-pointer"
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
    >
      {displayText}
    </span>
  )
}

