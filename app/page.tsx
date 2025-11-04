import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  // Show landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#1A202C]">VetCRM</div>
          <div className="flex gap-4">
            <a href="/auth/login" className="px-6 py-2 text-[#1A202C] hover:text-[#2DD4BF] transition-colors">
              Iniciar sesión
            </a>
            <a
              href="/auth/sign-up"
              className="px-6 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#14B8A6] transition-colors"
            >
              Registrarse
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-8 py-24 text-center">
          <h1 className="text-5xl font-bold text-[#1A202C] mb-6 text-balance">
            Gestiona tu clínica veterinaria con facilidad
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-balance max-w-2xl mx-auto">
            VetCRM es la solución completa para administrar dueños, mascotas, historiales médicos y recordatorios de
            forma intuitiva y eficiente.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/auth/sign-up"
              className="px-8 py-3 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#14B8A6] transition-colors font-medium"
            >
              Comenzar ahora
            </a>
            <a
              href="/auth/login"
              className="px-8 py-3 border-2 border-[#2DD4BF] text-[#2DD4BF] rounded-lg hover:bg-[#F0FFFE] transition-colors font-medium"
            >
              Ya tengo cuenta
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-[#1A202C] text-center mb-16">Características principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#F8F9FA] rounded-lg">
                <div className="text-3xl mb-4">🐾</div>
                <h3 className="text-xl font-bold text-[#1A202C] mb-3">Gestión de mascotas</h3>
                <p className="text-gray-600">
                  Registra y organiza la información de todas las mascotas de tus clientes en un solo lugar.
                </p>
              </div>
              <div className="p-8 bg-[#F8F9FA] rounded-lg">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-[#1A202C] mb-3">Historiales médicos</h3>
                <p className="text-gray-600">
                  Mantén un registro completo del historial de cada mascota con consultas, vacunaciones y tratamientos.
                </p>
              </div>
              <div className="p-8 bg-[#F8F9FA] rounded-lg">
                <div className="text-3xl mb-4">🔔</div>
                <h3 className="text-xl font-bold text-[#1A202C] mb-3">Recordatorios automáticos</h3>
                <p className="text-gray-600">
                  Nunca olvides una cita, vacunación o baño con recordatorios que aparecen en tu panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A202C] text-white py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p>VetCRM © 2025. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}