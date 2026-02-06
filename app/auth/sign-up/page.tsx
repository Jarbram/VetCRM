"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Building2, User, Mail, Lock, Stethoscope } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      console.log("[v0] Signup error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error al registrarse"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Registro Clínico</CardTitle>
            <CardDescription>
              Crea una cuenta para administrar tu veterinaria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-3 h-3" />
                  Información de la Clínica
                </div>
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="clinic" className="sr-only">Nombre de la clínica</Label>
                    <Input
                      id="clinic"
                      type="text"
                      placeholder="Nombre de la Clínica Veterinaria"
                      required
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor" className="sr-only">Nombre del doctor</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctor"
                        type="text"
                        placeholder="Nombre del Doctor Principal"
                        required
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Credenciales de Acceso
                </div>
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="email" className="sr-only">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="correo@clinica.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="password" className="sr-only">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm" className="sr-only">Confirmar contraseña</Label>
                      <Input
                        id="confirm"
                        type="password"
                        placeholder="Confirmar"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="py-2 text-xs">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Crear cuenta profesional"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
