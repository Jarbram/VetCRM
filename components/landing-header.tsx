'use client'

import Link from 'next/link'
import { PawPrint, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border py-2"
          : "bg-background border-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
            <PawPrint className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Ladrapp<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/#features" className="hover:text-primary transition-colors">Funciones</Link>
            <Link href="/#pricing" className="hover:text-primary transition-colors">Precios</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="rounded-full font-medium hover:bg-secondary hover:text-foreground">
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold shadow-sm transition-all hover:-translate-y-0.5">
              <Link href="/auth/sign-up">¡Empezar!</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:bg-secondary rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link
            href="/#features"
            className="p-3 hover:bg-secondary rounded-lg font-medium text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Funciones
          </Link>
          <Link
            href="/#pricing"
            className="p-3 hover:bg-secondary rounded-lg font-medium text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Precios
          </Link>
          <div className="h-px bg-border my-1" />
          <Link
            href="/auth/login"
            className="p-3 hover:bg-secondary rounded-lg font-medium text-center text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/sign-up"
            className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-center shadow-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            ¡Empezar Ahora!
          </Link>
        </div>
      )}
    </header>
  )
}
