
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  PawPrint,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Clock,
  Heart,
  TrendingUp,
  Users,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Historiales Clínicos Digitales",
      description: "Registra y consulta toda la información médica de tus pacientes en un solo lugar, siempre disponible."
    },
    {
      icon: Calendar,
      title: "Agenda Inteligente",
      description: "Sistema de citas con recordatorios automáticos que reduce las ausencias hasta en un 70%."
    },
    {
      icon: MessageSquare,
      title: "Comunicación WhatsApp",
      description: "Envía recordatorios, resultados y notificaciones directamente al WhatsApp de tus clientes."
    },
    {
      icon: BarChart3,
      title: "Reportes y Análisis",
      description: "Visualiza el rendimiento de tu clínica con métricas clave y reportes personalizados."
    },
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Tus datos están protegidos con encriptación de nivel bancario y copias de seguridad automáticas."
    },
    {
      icon: Zap,
      title: "Acceso desde Cualquier Lugar",
      description: "Trabaja desde tu computadora, tablet o móvil. Tus datos sincronizados en tiempo real."
    }
  ];

  const stats = [
    { value: "500+", label: "Clínicas Activas" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Soporte" },
    { value: "50k+", label: "Pacientes Registrados" }
  ];

  return (
    <main className="flex flex-col items-center bg-gradient-to-b from-white via-gray-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50 -z-10" />
        <div className="absolute inset-0 opacity-30 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
            <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-200 px-4 py-1">
              <PawPrint className="w-4 h-4 mr-2" />
              La plataforma #1 para clínicas veterinarias
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              La gestión de tu clínica,{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                simplificada
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Recupera tu tiempo y optimiza la atención a tus pacientes con Ladrapp,
              la plataforma todo-en-uno diseñada por y para veterinarios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 shadow-lg shadow-cyan-500/30 text-lg px-8"
              >
                <Link href="/auth/sign-up">
                  Empezar Ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2">
                <Link href="/#features">Descubrir Funciones</Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="w-full py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-200 mb-4">
              Funcionalidades
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas específicamente para clínicas veterinarias modernas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-200 mb-4">
                Beneficios
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Más que un software, tu aliado en el día a día
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Clock, title: "Ahorra hasta 10 horas semanales", desc: "Automatiza tareas repetitivas y enfócate en lo importante" },
                  { icon: Heart, title: "Mejora la experiencia de tus clientes", desc: "Recordatorios automáticos y comunicación profesional" },
                  { icon: TrendingUp, title: "Incrementa tus ingresos", desc: "Reduce ausencias y optimiza tu agenda" },
                  { icon: Users, title: "Equipo siempre sincronizado", desc: "Todos trabajan con la misma información actualizada" }
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg">Sin contratos de permanencia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg">Actualización constante</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg">Migración de datos gratuita</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg">Capacitación incluida</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg">Soporte en español</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-200 mb-4">
              Precios
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Elige el plan perfecto para tu clínica
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Simple, transparente y con todas las funciones incluidas desde el primer día
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <Card className="w-full max-w-sm flex flex-col border-2 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-gray-700 mb-2">Plan Mensual</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-gray-900">S/40</span>
                  </div>
                  <p className="text-gray-500 mt-2">por mes</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {[
                    "Acceso a todas las funciones",
                    "Pacientes ilimitados",
                    "Citas ilimitadas",
                    "Recordatorios automáticos",
                    "Soporte por email",
                    "Actualizaciones incluidas"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-8">
                <Button asChild variant="outline" className="w-full border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 h-12 text-lg">
                  <Link href="/auth/sign-up?plan=monthly">Seleccionar Plan</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Yearly Plan - Destacado */}
            <Card className="w-full max-w-sm border-2 border-cyan-600 relative flex flex-col shadow-2xl shadow-cyan-500/20 lg:-mt-6 lg:mb-6">
              <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-2 text-sm shadow-lg">
                AHORRA S/40 AL AÑO
              </Badge>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl text-cyan-600 mb-2">Plan Anual</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      S/440
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2">por año</p>
                  <p className="text-sm text-cyan-600 font-semibold mt-1">
                    Equivalente a S/36.67/mes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {[
                    "Acceso a todas las funciones",
                    "Pacientes ilimitados",
                    "Citas ilimitadas",
                    "Recordatorios automáticos",
                    "Soporte prioritario por chat",
                    "Actualizaciones incluidas",
                    "Capacitación personalizada",
                    "Migración de datos asistida"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-8">
                <Button asChild className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 h-12 text-lg shadow-lg shadow-cyan-500/30">
                  <Link href="/auth/sign-up?plan=yearly">Seleccionar Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <p className="text-center text-gray-600 mt-12 max-w-2xl mx-auto">
            <Shield className="w-5 h-5 inline-block mr-2 text-cyan-600" />
            Pago 100% seguro. Cancela cuando quieras sin penalización.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Únete a cientos de veterinarios que ya confían en Ladrapp
          </h2>
          <p className="text-xl text-cyan-100 mb-12 max-w-2xl mx-auto">
            Empieza hoy y transforma la gestión de tu clínica veterinaria
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-cyan-700 hover:bg-gray-100 text-lg px-12 h-14 shadow-2xl"
          >
            <Link href="/auth/sign-up">
              Crear Cuenta Gratis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-cyan-100 mt-6">
            No requiere tarjeta de crédito • Configuración en menos de 5 minutos
          </p>
        </div>
      </section>
    </main>
  );
}
