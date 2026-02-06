
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
      {/* Hero Section - Clinical & Precise */}
      <section className="w-full relative bg-background pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-4xl mx-auto">

            {/* Clinical Badge */}
            <Badge variant="outline" className="bg-secondary/50 text-secondary-foreground border-border px-4 py-1.5 md:px-6 md:py-2 text-sm font-medium rounded-full shadow-sm">
              <Shield className="w-4 h-4 mr-2 text-primary fill-current opacity-20" />
              <span>Gestión veterinaria profesional y segura</span>
            </Badge>

            {/* High Contrast Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Tu clínica, operando con <br className="hidden md:block" />
              <span className="text-primary">precisión quirúrgica</span>.
            </h1>

            {/* Professional Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal px-2">
              Elimina el caos administrativo. Ladrapp te ofrece el control total de historias clínicas, citas y facturación en una interfaz tan limpia como tu quirófano.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 w-full sm:w-auto px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-sm transition-all font-semibold h-14"
              >
                <Link href="/auth/sign-up">
                  Abrir Consulta <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl border-border hover:bg-secondary text-secondary-foreground transition-all font-medium h-14"
              >
                <Link href="/#features">Explorar Funcionalidades</Link>
              </Button>
            </div>

            {/* Trust Indicators / Micro-data */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Datos Encriptados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Soporte 24/7</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      {/* Features Section - Clinical Cards */}
      <section id="features" className="w-full py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Sistema Integral de <span className="text-primary">Gestión Clínica</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas diseñadas para optimizar el flujo de trabajo veterinario sin distracciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-md rounded-xl overflow-hidden"
                >
                  <CardHeader className="pb-3 flex flex-row items-center gap-4 space-y-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-[15px] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section - Alternating Layout */}
      {/* Benefits Section - Clinical Efficiency */}
      <section className="w-full py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div className="order-2 lg:order-1 relative">
              {/* Abstract representation of order vs chaos - perhaps a clean interface mockup */}
              <div className="bg-secondary/20 rounded-2xl p-8 border border-border/60">
                <div className="space-y-6">
                  {[
                    { icon: Clock, title: "Optimización de Tiempo", desc: "Reduce tiempos administrativos en un 40%.", color: "text-blue-600" },
                    { icon: Heart, title: "Fidelización de Pacientes", desc: "Recordatorios automáticos que mejoran la asistencia.", color: "text-rose-600" },
                    { icon: TrendingUp, title: "Rentabilidad", desc: "Control financiero exacto. Sin fugas.", color: "text-emerald-600" },
                    { icon: Users, title: "Coordinación de Equipo", desc: "Roles y permisos granulares para todo el staff.", color: "text-violet-600" }
                  ].map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex gap-4 items-start p-4 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-border">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center ${benefit.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1 text-foreground">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 text-primary bg-primary/5 rounded-full font-medium">
                Eficiencia Operativa
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-[1.2]">
                Más que software, <br />
                <span className="text-primary">tu infraestructura digital</span>.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Diseñamos Ladrapp para ser invisible. Una herramienta que organiza el flujo clínico para que tú puedas enfocarte en el diagnóstico y tratamiento, no en el software.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Sin contratos forzosos",
                  "Soporte técnico prioritario",
                  "Actualizaciones continuas",
                  "Curva de aprendizaje cero"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* Pricing Section - Transparent Service Menu */}
      <section id="pricing" className="w-full bg-muted/30 py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planes Transparentes
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Sin costos ocultos ni compromisos a largo plazo no deseados.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">

            {/* Monthly Plan - Standard */}
            <Card className="w-full max-w-sm flex flex-col border border-border bg-card shadow-sm hover:shadow-md transition-all rounded-xl">
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-xl font-semibold text-foreground mb-2">Plan Mensual</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">S/40</span>
                  <span className="text-muted-foreground font-medium">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 px-4">
                  {[
                    "Acceso completo al sistema",
                    "Pacientes ilimitados",
                    "Soporte por email",
                    "Copias de seguridad diarias"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8 px-8">
                <Button asChild variant="outline" className="w-full border-border hover:bg-secondary text-foreground font-medium h-11 rounded-lg">
                  <Link href="/auth/sign-up?plan=monthly">Seleccionar Mensual</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Yearly Plan - Recommended */}
            <Card className="w-full max-w-sm flex flex-col border border-primary/30 bg-card shadow-md relative rounded-xl overflow-hidden">
              <div className="bg-primary/10 text-primary text-center py-1.5 text-xs font-bold uppercase tracking-wider border-b border-primary/10">
                Recomendado para Clínicas
              </div>
              <CardHeader className="text-center pb-6 pt-6">
                <CardTitle className="text-xl font-semibold text-foreground mb-2">Plan Anual</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">S/440</span>
                  <span className="text-muted-foreground font-medium">/año</span>
                </div>
                <p className="text-xs text-primary font-medium mt-2">Ahorra 2 meses de servicio</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 px-4">
                  {[
                    "Todo lo del plan mensual",
                    "Soporte prioritario",
                    "Capacitación inicial remota",
                    "Migración de datos básica"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8 px-8">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 rounded-lg shadow-sm">
                  <Link href="/auth/sign-up?plan=yearly">Seleccionar Anual</Link>
                </Button>
              </CardFooter>
            </Card>

          </div>

          <p className="text-center text-muted-foreground mt-12 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Garantía de satisfacción de 30 días.
          </p>
        </div>
      </section>
    </main>
  );
}
