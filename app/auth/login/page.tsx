"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useTransition } from "react"
import { loginAction } from "@/app/auth/actions"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        console.log("[v0] Starting login with email:", email)
        const result = await loginAction(email, password)

        if (result.error) {
          setError(result.error)
        } else if (result.success) {
          console.log("[v0] Login successful, redirecting to dashboard")
          window.location.href = "/dashboard"
        }
      } catch (error: unknown) {
        console.log("[v0] Caught error:", error)
        if (error instanceof Error && !error.message.includes("NEXT_REDIRECT")) {
          const errorMessage = error.message || "Error al iniciar sesión"
          setError(errorMessage)
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-[#1A202C] mb-2">Iniciar sesión</h1>
          <p className="text-gray-600 mb-8">Ingresa con tu cuenta para continuar</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#1A202C] font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@clinica.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#1A202C] font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 border-gray-300"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-medium"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/sign-up" className="text-[#2DD4BF] font-medium hover:underline">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
