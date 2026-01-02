"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Eye, EyeOff, CreditCard, Loader2, User, Building, Lock, ShieldCheck, Mail, Phone, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface VetProfile {
  doctorName: string
  clinicName: string
  email: string
  phone: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [profile, setProfile] = useState<VetProfile>({
    doctorName: "",
    clinicName: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        const { data: vet, error: vetError } = await supabase
          .from("vets")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (vetError) throw vetError

        if (vet) {
          setProfile({
            doctorName: vet.doctor_name || "",
            clinicName: vet.clinic_name || "",
            email: vet.email || user.email || "",
            phone: vet.phone || "",
          })
        }
      } catch (err) {
        console.error("Error loading profile:", err)
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar el perfil.",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router, supabase, toast])

  const handleInputChange = (field: keyof VetProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Las contraseñas no coinciden.",
      })
      return
    }

    setSaving(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) throw new Error("No hay sesión activa")

      // Update profile data
      const { error: updateError } = await supabase
        .from("vets")
        .update({
          doctor_name: profile.doctorName,
          clinic_name: profile.clinicName,
          email: profile.email,
          phone: profile.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)

      if (updateError) throw updateError

      // Update password if provided
      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password
        })

        if (passwordError) throw passwordError

        setPassword("")
        setConfirmPassword("")
      }

      toast({
        title: "Cambios guardados",
        description: "Tu perfil ha sido actualizado exitosamente.",
      })
    } catch (err) {
      console.error("Error saving profile:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar los cambios.",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2DD4BF]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header vetProfile={profile} />

      <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <p className="text-gray-500">Gestiona tu perfil y preferencias</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile & Clinic */}
          <div className="lg:col-span-2 space-y-8">
            {/* Clinic Info */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
                    <Building size={24} />
                  </div>
                  <div>
                    <CardTitle>Información de la Clínica</CardTitle>
                    <CardDescription>Datos visibles para tus pacientes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Nombre de la Clínica</Label>
                  <Input
                    id="clinicName"
                    value={profile.clinicName}
                    onChange={(e) => handleInputChange("clinicName", e.target.value)}
                    className="h-11"
                    placeholder="Ej. Clínica Veterinaria San Francisco"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Doctor Info */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <User size={24} />
                  </div>
                  <div>
                    <CardTitle>Perfil Profesional</CardTitle>
                    <CardDescription>Tus datos personales de contacto</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Nombre del Doctor</Label>
                  <Input
                    id="doctorName"
                    value={profile.doctorName}
                    onChange={(e) => handleInputChange("doctorName", e.target.value)}
                    className="h-11"
                    placeholder="Ej. Dr. Juan Pérez"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-11"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 h-11"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Lock size={24} />
                  </div>
                  <div>
                    <CardTitle>Seguridad</CardTitle>
                    <CardDescription>Actualiza tu contraseña</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Nueva Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-11 pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Actions & Billing */}
          <div className="space-y-8">
            {/* Save Actions */}
            <Card className="border-none shadow-sm bg-[#2DD4BF]/5 border-2 border-[#2DD4BF]/20">
              <CardContent className="pt-6">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full h-12 text-lg font-bold bg-[#2DD4BF] hover:bg-[#20B5A1] shadow-lg shadow-cyan-500/20"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Última actualización: {new Date().toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <CardTitle>Suscripción</CardTitle>
                    <CardDescription>Plan actual y facturación</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">Plan Profesional</h4>
                      <p className="text-sm text-gray-500">Facturación Mensual</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                      Activo
                    </Badge>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">S/40</span>
                    <span className="text-xs text-gray-500">/mes</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Próximo cobro</span>
                    <span className="font-medium">01 Feb 2026</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Método de pago</span>
                    <span className="font-medium">Visa •••• 4242</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => toast({ description: "Redirigiendo al portal de pagos..." })}>
                  Gestionar Suscripción
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
