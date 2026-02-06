"use client"

import { X, MessageCircle, Mail, Phone, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface Reminder {
  id: string
  date: string
  type: string
  description: string
}

interface Pet {
  id: string
  name: string
  species?: string
}

interface Owner {
  id: string
  name: string
  phone: string
  email?: string
}

interface ReminderContactModalProps {
  owner: Owner
  pet: Pet
  reminder: Reminder
  onClose: () => void
}

export function ReminderContactModal({ owner, pet, reminder, onClose }: ReminderContactModalProps) {
  const [message, setMessage] = useState(
    `Hola ${owner.name}, recordatorio de ClinicaVet: ${pet.name} tiene pendiente ${reminder.description}. ¿Desea agendar cita?`
  )
  const [copied, setCopied] = useState(false)

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${owner.phone.replace(/\s+/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const handleEmail = () => {
    if (!owner.email) return
    const subject = `Recordatorio Veterinario: ${pet.name}`
    const body = `${message}\n\nSaludos,\nEl equipo veterinario.`
    const mailtoUrl = `mailto:${owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    onClose()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Contactar Dueño
            <Badge variant="secondary" className="text-xs font-normal">
              {pet.name}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Seleccione un canal para enviar el recordatorio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="bg-muted/30 p-3 rounded-lg border border-border">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Vista Previa del Mensaje</Label>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
              </Button>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-sm resize-none bg-background min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="default"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white justify-start gap-3"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">WhatsApp</span>
                <span className="text-[10px] opacity-90 font-normal">{owner.phone}</span>
              </div>
            </Button>

            {owner.email && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={handleEmail}
              >
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="w-3 h-3" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-foreground">Correo Electrónico</span>
                  <span className="text-[10px] text-muted-foreground font-normal">{owner.email}</span>
                </div>
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => window.location.href = `tel:${owner.phone}`}
            >
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="w-3 h-3" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground">Llamada Telefónica</span>
                <span className="text-[10px] text-muted-foreground font-normal">Llamar ahora</span>
              </div>
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
