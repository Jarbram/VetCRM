'use client'

import { useState } from "react"
import { Bell, Phone, Droplets, Stethoscope, CheckCircle } from "lucide-react"
import { ReminderContactModal } from "./reminder-contact-modal"
import { Button } from "./ui/button"

interface Reminder {
  id: string
  date: string
  type: string
  description: string
  completed?: boolean
}

interface Pet {
  id: string
  name: string
  reminders: Reminder[]
}

interface Owner {
  id: string
  name: string
  phone: string
  email?: string
  pets: Pet[]
}

interface QuickActionsWidgetProps {
  owners: Owner[]
  onMarkAsDone: (reminderId: string) => void
}

export function QuickActionsWidget({ owners, onMarkAsDone }: QuickActionsWidgetProps) {
  const today = new Date().toISOString().split("T")[0]
  const [selectedReminder, setSelectedReminder] = useState<{
    owner: Owner
    pet: Pet
    reminder: Reminder
  } | null>(null)

  const todayActions = owners.flatMap((owner) =>
    owner.pets.flatMap((pet) =>
      pet.reminders
        .filter((reminder) => reminder.date.split("T")[0] === today && !reminder.completed)
        .map((reminder) => ({
          owner,
          pet,
          reminder,
        })),
    ),
  )

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "vacunación":
        return Bell
      case "baño":
        return Droplets
      case "consulta":
        return Phone
      case "control":
        return Stethoscope
      default:
        return Bell
    }
  }

  const getColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "vacunación":
        return "bg-[#FBBF24]"
      case "baño":
        return "bg-[#2DD4BF]"
      case "consulta":
        return "bg-[#FF6B6B]"
      case "control":
        return "bg-[#7C3AED]"
      default:
        return "bg-[#FBBF24]"
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1A202C] dark:text-white mb-4">Acciones para Hoy ({todayActions.length})</h2>
        {todayActions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No hay acciones pendientes para hoy</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {todayActions.map(({ owner, pet, reminder }) => {
              const Icon = getIcon(reminder.type)
              const colorClass = getColor(reminder.type)
              return (
                <div
                  key={reminder.id}
                  className="w-full flex flex-col gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left border border-gray-100 dark:border-gray-700"
                >
                  <div
                    className="flex items-start gap-3 cursor-pointer flex-grow"
                    onClick={() => setSelectedReminder({ owner, pet, reminder })}
                  >
                    <div className={`p-2 rounded-lg ${colorClass} text-white mt-0.5 flex-shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.description}</p>
                      <p className="text-sm font-medium text-[#1A202C] dark:text-white">
                        <strong>{pet.name}</strong> (Dueño: {owner.name})
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkAsDone(reminder.id)
                    }}
                    className="w-full"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Marcar como hecho
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selectedReminder && (
        <ReminderContactModal
          owner={selectedReminder.owner}
          pet={selectedReminder.pet}
          reminder={selectedReminder.reminder}
          onClose={() => setSelectedReminder(null)}
        />
      )}
    </>
  )
}

