
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-white pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              La gestión de tu clínica veterinaria, <span className="text-cyan-600">simplificada</span>.
            </h1>
            <p className="text-lg text-gray-600">
              Recupera tu tiempo y optimiza la atención a tus pacientes con Ladrapp, la plataforma todo-en-uno diseñada por y para veterinarios.
            </p>
            <div className="flex gap-4 justify-center md:justify-start mt-4">
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Link href="/auth/sign-up">Empezar Ahora <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#features">Descubrir Funciones</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.jpg"
              alt="Veterinaria sonriendo mientras atiende a un perro"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Feature Flow Section */}
      <section id="features" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col gap-20">
          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg bg-gray-200">
               <Image
                src="/placeholder.svg"
                alt="Interfaz de gestión de clientes de Ladrapp"
                layout="fill"
                objectFit="contain"
                className="p-8"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Centraliza el historial de tus pacientes</h2>
              <p className="text-gray-600 mb-4">
                Accede al historial completo de cada paciente con un solo clic. Consultas, vacunas, tratamientos y más, todo en un perfil unificado y fácil de navegar.
              </p>
              
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 relative h-80 rounded-lg bg-gray-200">
              <Image
                src="/placeholder.svg"
                alt="Calendario de citas de Ladrapp"
                layout="fill"
                objectFit="contain"
                className="p-8"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl font-bold mb-4">Agenda inteligente y recordatorios automáticos</h2>
              <p className="text-gray-600 mb-4">
                Minimiza las ausencias con nuestro sistema de agenda y recordatorios automáticos por WhatsApp o email. Tus clientes lo amarán y tu clínica también.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      

      {/* Pricing Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Elige el plan perfecto para tu clínica
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Simple, transparente y con todas las funciones incluidas desde el primer día.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
            {/* Monthly Plan */}
            <Card className="w-full max-w-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-cyan-600">Plan Mensual</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold">$49 <span className="text-lg font-normal text-gray-500">/mes</span></p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>✓ Acceso a todas las funciones</li>
                  <li>✓ Pacientes y citas ilimitadas</li>
                  <li>✓ Soporte por email</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/sign-up?plan=monthly">Seleccionar Plan</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Yearly Plan */}
            <Card className="w-full max-w-sm border-2 border-cyan-600 relative flex flex-col">
              <Badge className="absolute -top-3 right-4 bg-cyan-600">AHORRA 2 MESES</Badge>
              <CardHeader>
                <CardTitle className="text-cyan-600">Plan Anual</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold">$490 <span className="text-lg font-normal text-gray-500">/año</span></p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>✓ Acceso a todas las funciones</li>
                  <li>✓ Pacientes y citas ilimitadas</li>
                  <li>✓ Soporte prioritario por chat</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Link href="/auth/sign-up?plan=yearly">Seleccionar Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
