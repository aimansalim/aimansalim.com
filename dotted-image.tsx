"use client"

import { useEffect, useRef } from 'react'

interface DottedImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export function DottedImage({ src, alt, width, height }: DottedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => {
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      ctx.fillStyle = '#10b981' // emerald-500
      ctx.clearRect(0, 0, width, height)

      const dotSize = 2
      const gap = 4

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4
          if (data[i + 3] > 128) {
            ctx.beginPath()
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }
  }, [src, width, height])

  return <canvas ref={canvasRef} width={width} height={height} className="w-full h-auto" />
}

