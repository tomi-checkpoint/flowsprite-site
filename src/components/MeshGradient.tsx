import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0

    const blobs: Blob[] = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, radius: 0.4, color: 'rgba(124, 58, 237, 0.18)' },   // violet
      { x: 0.7, y: 0.2, vx: -0.0002, vy: 0.0003, radius: 0.35, color: 'rgba(59, 130, 246, 0.15)' },   // blue
      { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0002, radius: 0.45, color: 'rgba(245, 158, 11, 0.08)' },   // amber
      { x: 0.8, y: 0.6, vx: -0.0003, vy: -0.0001, radius: 0.3, color: 'rgba(124, 58, 237, 0.12)' },   // violet2
      { x: 0.1, y: 0.8, vx: 0.0001, vy: -0.0003, radius: 0.35, color: 'rgba(59, 130, 246, 0.1)' },    // blue2
    ]

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.scale(dpr, dpr)
    }

    function drawBlob(b: Blob) {
      const cx = b.x * width
      const cy = b.y * height
      const r = b.radius * Math.max(width, height)
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r)
      grad.addColorStop(0, b.color)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx!.fillStyle = grad
      ctx!.fillRect(cx - r, cy - r, r * 2, r * 2)
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      for (const b of blobs) {
        b.x += b.vx
        b.y += b.vy

        // Soft bounce
        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1
        if (b.y < -0.1 || b.y > 1.1) b.vy *= -1

        drawBlob(b)
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
