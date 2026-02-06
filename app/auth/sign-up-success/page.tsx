import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <Card className="border-border shadow-sm pt-8">
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">¡Registro Exitoso!</h1>
              <p className="text-sm text-muted-foreground">
                Tu cuenta ha sido creada correctamente.
                <br />
                Por favor revisa tu correo para confirmar.
              </p>
            </div>

            <div className="pt-4">
              <Button asChild className="w-full" size="lg">
                <Link href="/auth/login">
                  Ir a Iniciar Sesión
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
