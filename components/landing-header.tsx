
'use client'

import Link from 'next/link'
import { PawPrint } from 'lucide-react'
import { Button } from './ui/button'

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <PawPrint className="h-6 w-6 text-cyan-600" />
          <span className="text-lg font-bold text-gray-900 dark:text-gray-50">Ladrapp</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
            <Link href="/auth/sign-up">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
