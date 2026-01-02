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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <div className="bg-cyan-100 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <PawPrint className="h-6 w-6 text-cyan-600" />
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            Ladrapp<span className="text-cyan-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/#features" className="hover:text-cyan-600 transition-colors">Funciones</Link>
            <Link href="/#pricing" className="hover:text-cyan-600 transition-colors">Precios</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="rounded-full font-semibold hover:bg-cyan-50 hover:text-cyan-700">
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button asChild className="bg-[#2DD4BF] hover:bg-[#20B5A1] text-white rounded-full px-6 font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5">
              <Link href="/auth/sign-up">¡Empezar!</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link
            href="/#features"
            className="p-3 hover:bg-gray-50 rounded-lg font-medium text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Funciones
          </Link>
          <Link
            href="/#pricing"
            className="p-3 hover:bg-gray-50 rounded-lg font-medium text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Precios
          </Link>
          <div className="h-px bg-gray-100 my-1" />
          <Link
            href="/auth/login"
            className="p-3 hover:bg-gray-50 rounded-lg font-medium text-center text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/sign-up"
            className="p-3 bg-[#2DD4BF] text-white rounded-xl font-bold text-center shadow-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            ¡Empezar Ahora!
          </Link>
        </div>
      )}
    </header>
  )
}
