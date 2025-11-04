'use client'

import { X, Calendar as CalendarIcon, User, Plus } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Reminder {
  id: string
  date: string
  type: string
  description: string
}

interface PetHistory {
  id: string
  date: string
  type: string
  description: string
  veterinarian: string
}

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  history: PetHistory[]
  reminders: Reminder[]
}

interface Owner {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  pets: Pet[]
}

interface PetDetailModalProps {
  owner: Owner
  pet: Pet
  onClose: () => void
  onAddHistory: (history: Omit<PetHistory, "id">) => void
  onAddReminder: (reminder: Omit<Reminder, "id">) => void
}

export function PetDetailModal({ owner, pet, onClose, onAddHistory, onAddReminder }: PetDetailModalProps) {
  const [showAddHistory, setShowAddHistory] = useState(false)
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [historyForm, setHistoryForm] = useState({
    date: "",
    type: "Consulta",
    description: "",
    veterinarian: "",
  })
  const [reminderForm, setReminderForm] = useState({
    date: "",
    type: "Control",
    description: "",
  })

  const handleShowAddHistory = () => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    setHistoryForm({ ...historyForm, date: formattedDate })
    setShowAddHistory(true)
  }

  const handleAddHistory = () => {
    if (historyForm.date && historyForm.description && historyForm.veterinarian) {
      onAddHistory(historyForm)
      setHistoryForm({ date: "", type: "Consulta", description: "", veterinarian: "" })
      setShowAddHistory(false)
    }
  }

  const handleAddReminder = () => {
    if (reminderForm.date && reminderForm.description) {
      onAddReminder(reminderForm)
      setReminderForm({ date: "", type: "Control", description: "" })
      setShowAddReminder(false)
    }
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Detalles de {pet.name}</DrawerTitle>
          <DrawerDescription>
            Dueño: {owner.name}
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Pet Information */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Especie</p>
              <p className="font-semibold text-[#1A202C] dark:text-white">{pet.species}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Raza</p>
              <p className="font-semibold text-[#1A202C] dark:text-white">{pet.breed}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Edad</p>
              <p className="font-semibold text-[#1A202C] dark:text-white">{pet.age} años</p>
            </div>
          </div>

          {/* Reminders Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-[#1A202C] dark:text-white">Recordatorios</h4>
              <Button
                onClick={() => setShowAddReminder(!showAddReminder)}
                size="sm"
              >
                <Plus size={16} className="mr-2" />
                Agregar Recordatorio
              </Button>
            </div>

            {showAddReminder && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-4 space-y-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reminderForm.date ? (
                        format(new Date(reminderForm.date.split("/").reverse().join("-") + "T00:00:00"), "dd/MM/yyyy")
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={reminderForm.date ? new Date(reminderForm.date.split("/").reverse().join("-") + "T00:00:00") : undefined}
                      onSelect={(date) =>
                        setReminderForm({ ...reminderForm, date: date ? format(date, "dd/MM/yyyy") : "" })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <select
                  value={reminderForm.type}
                  onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="Control">Control</option>
                  <option value="Baño">Baño</option>
                  <option value="Vacunación">Vacunación</option>
                  <option value="Consulta">Consulta</option>
                </select>
                <textarea
                  value={reminderForm.description}
                  onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="Descripción del recordatorio"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddReminder} className="flex-1" size="sm">Guardar Recordatorio</Button>
                  <Button onClick={() => setShowAddReminder(false)} className="flex-1" variant="outline" size="sm">Cancelar</Button>
                </div>
              </div>
            )}

            {pet.reminders.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No hay recordatorios</p>
            ) : (
              <div className="space-y-2 mb-6">
                {pet.reminders.map((reminder) => (
                  <div key={reminder.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-[#1A202C] dark:text-white text-sm">{format(new Date(reminder.date + "T00:00:00"), "dd/MM/yyyy")}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{reminder.type}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{reminder.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Medical History */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-[#1A202C] dark:text-white">Historial Médico</h4>
              <Button
                onClick={handleShowAddHistory}
                size="sm"
              >
                <Plus size={16} className="mr-2" />
                Agregar Evento
              </Button>
            </div>

            {showAddHistory && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-4 space-y-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {historyForm.date ? (
                        format(new Date(historyForm.date.split("/").reverse().join("-") + "T00:00:00"), "dd/MM/yyyy")
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={historyForm.date ? new Date(historyForm.date.split("/").reverse().join("-") + "T00:00:00") : undefined}
                      onSelect={(date) =>
                        setHistoryForm({ ...historyForm, date: format(date!, "dd/MM/yyyy") })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <select
                  value={historyForm.type}
                  onChange={(e) => setHistoryForm({ ...historyForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="Consulta">Consulta</option>
                  <option value="Vacunación">Vacunación</option>
                  <option value="Cirugía">Cirugía</option>
                  <option value="Baño">Baño</option>
                  <option value="Otro">Otro</option>
                </select>
                <textarea
                  value={historyForm.description}
                  onChange={(e) => setHistoryForm({ ...historyForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="Descripción del evento"
                  rows={2}
                />
                <input
                  type="text"
                  value={historyForm.veterinarian}
                  onChange={(e) => setHistoryForm({ ...historyForm, veterinarian: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="Veterinario"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddHistory} className="flex-1" size="sm">Guardar Evento</Button>
                  <Button onClick={() => setShowAddHistory(false)} className="flex-1" variant="outline" size="sm">Cancelar</Button>
                </div>
              </div>
            )}

            {pet.history.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No hay registros en el historial</p>
            ) : (
              <div className="space-y-4">
                {pet.history.map((record) => (
                  <div key={record.id} className="relative pl-8 sm:pl-10 group">
                    <div className="h-full w-1 bg-gray-200 dark:bg-gray-700 absolute left-2.5 top-0 group-last:h-7"></div>
                    <div className="w-5 h-5 rounded-full bg-[#2DD4BF] absolute left-0 top-0 flex items-center justify-center">
                      <CalendarIcon size={12} className="text-white" />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <div className="flex items-center gap-2 mb-1 sm:mb-0">
                          <span className="font-medium text-[#1A202C] dark:text-white text-sm">{format(new Date(record.date + "T00:00:00"), "dd/MM/yyyy")}</span>
                          <span className="text-xs bg-[#FBBF24] text-[#1A202C] px-2 py-1 rounded-full">{record.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User size={14} />
                          <span>{record.veterinarian}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{record.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
