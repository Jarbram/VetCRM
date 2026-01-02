
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  PawPrint,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Clock,
  Heart,
  TrendingUp,
  Users,
  CheckCircle2,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Stethoscope
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Historiales Clínicos",
      description: "Toda la info de tus pacientes en un solo lugar. ¡Adiós al papeleo!",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Directo",
      description: "Envía recordatorios y resultados al instante. Comunicación fluida = Clientes felices.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: BarChart3,
      title: "Reportes Claros",
      description: "Entiende cómo va tu clínica con gráficos simples. Toma decisiones inteligentes.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Tus datos están blindados. Encriptación de nivel bancario para tu tranquilidad.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Zap,
      title: "Súper Rápido",
      description: "Accede desde tu compu, tablet o cel. Todo sincronizado al momento.",
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <main className="flex flex-col items-center bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-cyan-50/50 to-white pt-24 pb-16 md:pt-32 md:pb-40">
        {/* Decorative Blobs - Optimized for mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[40%] md:w-[40%] bg-cyan-200/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[30%] md:w-[30%] bg-blue-200/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[35%] md:w-[35%] bg-teal-200/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Floating Icons - Hidden on mobile to keep it clean */}
        <div className="absolute top-20 left-[10%] text-cyan-300 animate-bounce duration-[3000ms] hidden md:block">
          <Dog size={48} />
        </div>
        <div className="absolute top-40 right-[15%] text-blue-300 animate-bounce duration-[4000ms] hidden md:block">
          <Cat size={48} />
        </div>
        <div className="absolute bottom-20 left-[20%] text-teal-300 animate-bounce duration-[3500ms] hidden md:block">
          <Rabbit size={32} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-4xl mx-auto">
            <Badge className="bg-white text-cyan-600 hover:bg-cyan-50 border-cyan-200 px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base shadow-sm rounded-full transition-transform hover:scale-105 whitespace-normal text-center h-auto">
              <PawPrint className="w-4 h-4 mr-2 fill-current inline-block flex-shrink-0" />
              <span>¡La forma divertida de gestionar tu veterinaria!</span>
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.15] md:leading-[1.1]">
              Tu clínica, más <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 bg-clip-text text-transparent relative inline-block pb-2">
                fácil y feliz
                <svg className="absolute w-full h-2 md:h-3 bottom-0 left-0 text-cyan-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-medium px-2">
              Olvídate del estrés y el papeleo. Con Ladrapp, tienes todo bajo control para que te dediques a lo que amas: <span className="text-cyan-600 font-bold">cuidar mascotas.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 w-full sm:w-auto px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#2DD4BF] hover:bg-[#20B5A1] text-white text-lg px-8 py-6 rounded-2xl shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl font-bold h-14 md:h-16"
              >
                <Link href="/auth/sign-up">
                  ¡Empezar Ahora! <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 text-gray-600 hover:text-cyan-700 transition-all font-semibold h-14 md:h-16"
              >
                <Link href="/#features">Ver Magia ✨</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="w-full py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Todo lo que necesitas, <br />
              <span className="text-cyan-500">sin complicaciones</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto px-4">
              Herramientas potentes con una interfaz tan amigable que te enamorarás.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group border-2 border-gray-100 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 rounded-3xl overflow-hidden bg-white"
                >
                  <CardHeader className="pb-2">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section - Alternating Layout */}
      <section className="w-full py-16 md:py-24 bg-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[2rem] opacity-20 blur-2xl transform rotate-3"></div>
                <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-gray-100 relative">
                  <div className="space-y-6 md:space-y-8">
                    {[
                      { icon: Clock, title: "Más Tiempo Libre", desc: "Ahorra hasta 10 horas a la semana. ¡Sal temprano!", color: "text-pink-500 bg-pink-50" },
                      { icon: Heart, title: "Clientes Felices", desc: "Ellos aman los recordatorios y tú amas que no falten.", color: "text-red-500 bg-red-50" },
                      { icon: TrendingUp, title: "Más Ingresos", desc: "Agenda llena y menos ausencias = Negocio próspero.", color: "text-green-500 bg-green-50" },
                      { icon: Users, title: "Equipo Sincronizado", desc: "Todos en la misma página, sin caos ni confusiones.", color: "text-purple-500 bg-purple-50" }
                    ].map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={index} className="flex gap-4 md:gap-6 items-start group">
                          <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${benefit.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <Icon className="w-6 h-6 md:w-7 md:h-7" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2 text-gray-900">{benefit.title}</h3>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left mb-8 lg:mb-0">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 mb-6 px-4 py-1 text-sm rounded-full">
                Beneficios Reales
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Más que software, <br />
                <span className="text-blue-600">tu superpoder diario</span> 🦸‍♂️
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Diseñamos Ladrapp para que sea tu compañero fiel. Te ayuda a organizar el caos para que puedas enfocarte en salvar vidas y dar amor a las mascotas.
              </p>

              <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
                {[
                  "Sin contratos",
                  "Soporte 24/7",
                  "Actualizaciones",
                  "Fácil de usar"
                ].map((item, i) => (
                  <div key={i} className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 md:gap-3">
                    <CheckCircle2 className="text-green-500 w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span className="font-medium text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 mb-4 px-4 py-1 rounded-full">
              Precios Transparentes
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Invierte en tu tranquilidad
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 px-4">
              Sin letras chiquitas. Todo incluido desde el día uno.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <Card className="w-full max-w-sm flex flex-col border-2 border-gray-100 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl rounded-[2rem] overflow-hidden">
              <CardHeader className="text-center pb-6 md:pb-8 bg-gray-50/50">
                <CardTitle className="text-2xl font-bold text-gray-700 mb-2">Mensual</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-extrabold text-gray-900">S/40</span>
                    <span className="text-gray-500 font-medium">/mes</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6 md:pt-8">
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Acceso total",
                    "Pacientes ilimitados",
                    "Citas ilimitadas",
                    "Recordatorios automáticos",
                    "Soporte por email",
                    "Actualizaciones incluidas"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-6 md:pb-8 px-6 md:px-8">
                <Button asChild variant="outline" className="w-full border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 h-12 md:h-14 text-lg rounded-xl font-bold transition-all">
                  <Link href="/auth/sign-up?plan=monthly">Elegir Mensual</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Yearly Plan - Destacado */}
            <Card className="w-full max-w-sm border-4 border-cyan-400 relative flex flex-col shadow-2xl shadow-cyan-200/50 rounded-[2rem] overflow-hidden transform lg:-translate-y-4">
              <div className="bg-cyan-400 text-white text-center py-2 font-bold text-sm tracking-wide uppercase">
                ¡La mejor opción! 🌟
              </div>
              <CardHeader className="text-center pb-6 md:pb-8 pt-6 md:pt-8 bg-cyan-50/30">
                <CardTitle className="text-2xl font-bold text-cyan-700 mb-2">Anual</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl md:text-6xl font-extrabold text-cyan-600">S/440</span>
                    <span className="text-cyan-600/70 font-medium">/año</span>
                  </div>
                  <Badge className="mt-3 bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                    Ahorras S/40 al año 💰
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6 md:pt-8">
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Todo lo del plan mensual",
                    "Soporte prioritario VIP",
                    "Capacitación personalizada",
                    "Migración de datos asistida",
                    "Acceso anticipado a novedades"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-bold text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-6 md:pb-8 px-6 md:px-8">
                <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 h-12 md:h-14 text-lg rounded-xl font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-105">
                  <Link href="/auth/sign-up?plan=yearly">Elegir Anual 🔥</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <p className="text-center text-gray-500 mt-12 max-w-xl mx-auto flex items-center justify-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-cyan-500" />
            Pago 100% seguro. Cancela cuando quieras. Sin dramas.
          </p>
        </div>
      </section>
    </main>
  );
}
