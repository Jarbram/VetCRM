"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react"

interface VetProfile {
  doctorName: string
  clinicName: string
  email: string
  phone: string
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<VetProfile>({
    doctorName: "Dr. Barea",
    clinicName: "Clínica Veterinaria Barea",
    email: "contact@clinicabarea.com",
    phone: "+34 666 123 789",
  })

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleInputChange = (field: keyof VetProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-[#1A202C]" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-[#1A202C]">Configuración de Cuenta</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-[#D1FAE5] border border-[#2DD4BF] rounded-lg text-[#1A202C]">
              Configuración guardada exitosamente
            </div>
          )}

          {/* Clinic Info Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-[#1A202C] mb-6">Información de la Clínica</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Nombre de la Clínica</label>
                <input
                  type="text"
                  value={profile.clinicName}
                  onChange={(e) => handleInputChange("clinicName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all"
                  placeholder="Nombre de tu clínica"
                />
              </div>
            </div>
          </div>

          {/* Doctor Info Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-[#1A202C] mb-6">Información del Doctor</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Nombre del Doctor</label>
                <input
                  type="text"
                  value={profile.doctorName}
                  onChange={(e) => handleInputChange("doctorName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all"
                  placeholder="+34 666 123 789"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-[#1A202C] mb-6">Cambiar Contraseña</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Nueva Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all"
                    placeholder="Ingresa nueva contraseña"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#1A202C]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A202C] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent transition-all"
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#1A202C]"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#20B5A1] transition-colors font-medium"
            >
              <Save size={20} />
              Guardar Cambios
            </button>
            <Link href="/">
              <button className="px-6 py-3 bg-gray-200 text-[#1A202C] rounded-lg hover:bg-gray-300 transition-colors font-medium">
                Volver
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
