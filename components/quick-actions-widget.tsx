'use client'

import { useState } from "react"
import { Bell, Phone, Droplets, Stethoscope, CheckCircle, ArrowRight, ClipboardList } from "lucide-react"
import { ReminderContactModal } from "./reminder-contact-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Owner, Pet, Reminder } from "@/lib/types"

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

  const getPriorityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "vacunación": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "cirugía": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "control": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    }
  }

  return (
    <>
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-border bg-muted/5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-primary" />
            Tareas Pendientes
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            {todayActions.length} Hoy
          </Badge>
        </div>

        <ScrollArea className="flex-1 h-[300px]">
          {todayActions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
              </div>
              <p className="text-sm font-medium text-foreground">¡Todo al día!</p>
              <p className="text-xs text-muted-foreground mt-1">No hay acciones pendientes.</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {todayActions.map(({ owner, pet, reminder }) => {
                const Icon = getIcon(reminder.type)
                const priorityClass = getPriorityColor(reminder.type)

                return (
                  <div key={reminder.id} className="group flex items-start gap-3 p-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-all hover:shadow-sm">
                    <div className={`p-2 rounded-md ${priorityClass} shrink-0`}>
                      <Icon size={16} />
                    </div>

                    <div className="flex-1 min-w-0" onClick={() => setSelectedReminder({ owner, pet, reminder })}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-foreground truncate">{pet.name}</p>
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal text-muted-foreground">
                          {reminder.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                        {reminder.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] px-2 text-primary hover:text-primary hover:bg-primary/5 -ml-1"
                        >
                          Contactar <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-green-600 hover:border-green-600/30 hover:bg-green-50 dark:hover:bg-green-900/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        onMarkAsDone(reminder.id)
                      }}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
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

