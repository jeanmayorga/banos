'use client'

import { Header } from '#/components/Header'
import { Nav } from '#/components/Nav'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <Header />
      <Nav />
    </div>
  )
}