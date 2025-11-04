"use client"

import { X, MessageCircle, Mail, PhoneIcon } from "lucide-react"

interface Reminder {
  id: string
  date: string
  type: string
  description: string
}

interface Pet {
  id: string
  name: string
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
  const handleWhatsApp = () => {
    const message = `Hola ${owner.name}, recordatorio: ${reminder.description} para tu mascota ${pet.name}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${owner.phone.replace(/\s+/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const handleEmail = () => {
    if (!owner.email) {
      alert("No hay correo registrado para este dueño")
      return
    }
    const subject = `Recordatorio: ${reminder.description}`
    const body = `Hola ${owner.name},\n\nEste es un recordatorio para ${pet.name}:\n${reminder.description}\n\n¡Gracias!`
    const mailtoUrl = `mailto:${owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    onClose()
  }

  const handleCall = () => {
    window.location.href = `tel:${owner.phone}`
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#1A202C]">Contactar Dueño</h2>
            <p className="text-sm text-gray-600 mt-1">
              {pet.name} - {reminder.description}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-medium text-[#1A202C]">{owner.name}</p>
            <p className="text-sm text-gray-600">{owner.phone}</p>
            {owner.email && <p className="text-sm text-gray-600">{owner.email}</p>}
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-[#2DD4BF] hover:bg-[#1EB9A0] text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <MessageCircle size={20} />
            Enviar por WhatsApp
          </button>

          {owner.email && (
            <button
              onClick={handleEmail}
              className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <Mail size={20} />
              Enviar por Correo
            </button>
          )}

          <button
            onClick={handleCall}
            className="w-full flex items-center justify-center gap-2 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1A202C] font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <PhoneIcon size={20} />
            Llamar
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-[#1A202C] font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
