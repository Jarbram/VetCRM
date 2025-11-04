"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [clinicName, setClinicName] = useState("")
  const [doctorName, setDoctorName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!clinicName || !doctorName) {
      setError("Por favor completa todos los campos")
      return
    }

    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      console.log("[v0] Starting signup with email:", email)

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        console.log("[v0] Auth error:", authError)
        throw authError
      }

      console.log("[v0] Auth successful, user ID:", authData.user?.id)

      if (authData.user) {
        const profileRes = await fetch("/api/auth/create-vet-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: authData.user.id,
            clinic_name: clinicName,
            doctor_name: doctorName,
            email: email,
          }),
        })

        if (!profileRes.ok) {
          const profileError = await profileRes.json()
          console.log("[v0] Profile insert error:", profileError)
          throw new Error(profileError.message || "Error al crear el perfil")
        }
      }

      console.log("[v0] Signup successful, redirecting to dashboard...")
      router.push("/dashboard")
    } catch (error: unknown) {
      console.log("[v0] Signup error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al registrarse"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-[#1A202C] mb-2">Crear cuenta</h1>
          <p className="text-gray-600 mb-8">Registra tu clínica veterinaria</p>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Label htmlFor="clinic" className="text-[#1A202C] font-medium">
                Nombre de la clínica
              </Label>
              <Input
                id="clinic"
                type="text"
                placeholder="Clínica Veterinaria..."
                required
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="mt-2 border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="doctor" className="text-[#1A202C] font-medium">
                Nombre del doctor
              </Label>
              <Input
                id="doctor"
                type="text"
                placeholder="Dr. Juan..."
                required
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="mt-2 border-gray-300"
              />
            </div>

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

            <div>
              <Label htmlFor="confirm" className="text-[#1A202C] font-medium">
                Confirmar contraseña
              </Label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 border-gray-300"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-medium"
            >
              {isLoading ? "Registrando..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="text-[#2DD4BF] font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
