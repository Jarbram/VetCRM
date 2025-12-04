'use client'

import { X, Calendar as CalendarIcon, User, Plus, Edit } from "lucide-react"
import { useState, useEffect } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Owner, Pet, PetHistory, Reminder } from "@/lib/types"
import { WeightChart } from "@/components/weight-chart"
import { Input } from "@/components/ui/input"

interface PetDetailModalProps {
  owner: Owner
  pet: Pet
  onClose: () => void
  onAddHistory: (history: Omit<PetHistory, "id">) => void
  onUpdateHistory: (historyId: string, history: Partial<Omit<PetHistory, "id">>) => void
  onAddReminder: (reminder: Omit<Reminder, "id">) => void
  onUpdateReminder: (reminderId: string, reminder: Partial<Omit<Reminder, "id">>) => void
  onUpdatePet: (petData: Partial<Omit<Pet, "id" | "history" | "reminders">>) => void
}

export function PetDetailModal({ owner, pet, onClose, onAddHistory, onUpdateHistory, onAddReminder, onUpdateReminder, onUpdatePet }: PetDetailModalProps) {
  const [showAddHistory, setShowAddHistory] = useState(false)
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [isEditingPet, setIsEditingPet] = useState(false)
  const [editablePet, setEditablePet] = useState(pet)
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null)
  const [editableHistoryForm, setEditableHistoryForm] = useState<PetHistory | null>(null)
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null)
  const [editableReminderForm, setEditableReminderForm] = useState<Reminder | null>(null)

  const REMINDER_TEMPLATES: { [key: string]: string } = {
    "Control": "Realizar control general de salud.",
    "Baño": "Programar baño y peluquería.",
    "Vacunación": "Aplicar vacuna: [especificar tipo de vacuna].",
    "Consulta": "Realizar consulta por: [especificar motivo].",
    "Desparasitación": "Administrar desparasitante: [especificar producto].",
    "Otro": ""
  };

  const parseDate = (dateString: string | undefined | null) => {
    if (!dateString) return undefined
    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/")
      return new Date(`${year}-${month}-${day}T00:00:00`)
    }
    return new Date(`${dateString}T00:00:00`)
  }

  useEffect(() => {
    setEditablePet(pet)
  }, [pet])

  const [historyForm, setHistoryForm] = useState({
    date: "",
    type: "Consulta",
    description: "",
    veterinarian: "",
    weight: undefined as number | undefined,
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
      setHistoryForm({ date: "", type: "Consulta", description: "", veterinarian: "", weight: undefined })
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

  const handleSavePet = () => {
    onUpdatePet(editablePet)
    setIsEditingPet(false)
  }

  const handleUpdateHistory = () => {
    if (editableHistoryForm && editableHistoryForm.id && editableHistoryForm.date && editableHistoryForm.description && editableHistoryForm.veterinarian) {
      onUpdateHistory(editableHistoryForm.id, editableHistoryForm)
      setEditingHistoryId(null)
      setEditableHistoryForm(null)
    }
  }

  const handleCancelEditHistory = () => {
    setEditingHistoryId(null)
    setEditableHistoryForm(null)
  }

  const handleUpdateReminder = () => {
    if (editableReminderForm && editableReminderForm.id && editableReminderForm.date && editableReminderForm.description) {
      onUpdateReminder(editableReminderForm.id, editableReminderForm)
      setEditingReminderId(null)
      setEditableReminderForm(null)
    }
  }

  const handleCancelEditReminder = () => {
    setEditingReminderId(null)
    setEditableReminderForm(null)
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-between">
            <DrawerTitle>Detalles de {pet.name}</DrawerTitle>
            {!isEditingPet && (
              <Button variant="outline" size="sm" onClick={() => setIsEditingPet(true)}>
                <Edit size={16} className="mr-2" />
                Editar
              </Button>
            )}
            {isEditingPet && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSavePet}>
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setEditablePet(pet)
                  setIsEditingPet(false)
                }}>
                  Cancelar
                </Button>
              </div>
            )}
          </div>
          <DrawerDescription>
            Dueño: {owner.name}
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Pet Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Especie</p>
              {isEditingPet ? (
                <Input
                  value={editablePet.species}
                  onChange={(e) => setEditablePet({ ...editablePet, species: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="font-semibold text-[#1A202C] dark:text-white">{pet.species}</p>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Raza</p>
              {isEditingPet ? (
                <Input
                  value={editablePet.breed}
                  onChange={(e) => setEditablePet({ ...editablePet, breed: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="font-semibold text-[#1A202C] dark:text-white">{pet.breed}</p>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Edad</p>
              {isEditingPet ? (
                <Input
                  type="number"
                  value={editablePet.age}
                  onChange={(e) => setEditablePet({ ...editablePet, age: parseInt(e.target.value) })}
                  className="mt-1"
                />
              ) : (
                <p className="font-semibold text-[#1A202C] dark:text-white">{pet.age} años</p>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">Peso Actual</p>
              <p className="font-semibold text-[#1A202C] dark:text-white">
                {pet.history.find(h => h.weight)?.weight?.toFixed(2) ?? "N/A"} kg
              </p>
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
                  onChange={(e) => {
                    const newType = e.target.value;
                    setReminderForm({
                      ...reminderForm,
                      type: newType,
                      description: REMINDER_TEMPLATES[newType] || ""
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  {Object.keys(REMINDER_TEMPLATES).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
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

            {pet.reminders.filter(reminder => !reminder.completed).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No hay recordatorios pendientes</p>
            ) : (
              <div className="space-y-2 mb-6">
                {pet.reminders.filter(reminder => !reminder.completed).map((reminder) => (
                  <div key={reminder.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    {editingReminderId === reminder.id && editableReminderForm ? (
                      <div className="space-y-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {editableReminderForm.date ? (
                                format(parseDate(editableReminderForm.date), "dd/MM/yyyy")
                              ) : (
                                <span>Elige una fecha</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={parseDate(editableReminderForm.date)}
                              onSelect={(date) =>
                                setEditableReminderForm({ ...editableReminderForm, date: format(date!, "dd/MM/yyyy") })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <select
                          value={editableReminderForm.type}
                          onChange={(e) => {
                            const newType = e.target.value;
                            setEditableReminderForm({
                              ...editableReminderForm,
                              type: newType,
                              description: REMINDER_TEMPLATES[newType] || ""
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                        >
                          {Object.keys(REMINDER_TEMPLATES).map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <textarea
                          value={editableReminderForm.description}
                          onChange={(e) => setEditableReminderForm({ ...editableReminderForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                          placeholder="Descripción del recordatorio"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdateReminder} className="flex-1" size="sm">Guardar</Button>
                          <Button onClick={handleCancelEditReminder} className="flex-1" variant="outline" size="sm">Cancelar</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-[#1A202C] dark:text-white text-sm">{format(parseDate(reminder.date), "dd/MM/yyyy")}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{reminder.type}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{reminder.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                          setEditingReminderId(reminder.id)
                          setEditableReminderForm(reminder)
                        }}>
                          <Edit size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Medical Alerts */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h4 className="text-lg font-semibold text-[#1A202C] dark:text-white mb-2">Alertas Médicas</h4>
            <textarea
              defaultValue={pet.medical_alerts}
              placeholder="Alergias, condiciones crónicas, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
              rows={2}
              onBlur={(e) => onUpdatePet({ medical_alerts: e.target.value })}
            />
             <p className="text-xs text-gray-500 mt-1">Los cambios se guardan al perder el foco.</p>
          </div>

          {/* Weight Chart */}
          {pet.history.filter(h => h.weight != null && h.weight > 0).length >= 2 && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="weight-chart">
                  <AccordionTrigger className="flex items-center justify-between w-full py-2 px-4 font-semibold text-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md [&[data-state=open]>svg]:rotate-180">
                    <h4 className="font-semibold text-[#1A202C] dark:text-white">Evolución del Peso</h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="h-48 w-full">
                      <WeightChart history={pet.history} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Medical History with Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-[#1A202C] dark:text-white">Historial Médico</h4>
              <Button onClick={handleShowAddHistory} size="sm">
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
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={historyForm.type}
                    onChange={(e) => setHistoryForm({ ...historyForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                  >
                    <option value="Consulta">Consulta</option>
                    <option value="Vacunación">Vacunación</option>
                    <option value="Cirugía">Cirugía</option>
                    <option value="Desparasitación">Desparasitación</option>
                    <option value="Análisis">Análisis</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <input
                    type="number"
                    value={historyForm.weight || ''}
                    onChange={(e) => setHistoryForm({ ...historyForm, weight: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                    placeholder="Peso (kg)"
                  />
                </div>
                <textarea
                  value={historyForm.description}
                  onChange={(e) => setHistoryForm({ ...historyForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="Descripción del evento"
                  rows={3}
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

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Todo</TabsTrigger>
                <TabsTrigger value="Consulta">Consultas</TabsTrigger>
                <TabsTrigger value="Vacunación">Vacunas</TabsTrigger>
                <TabsTrigger value="Cirugía">Cirugías</TabsTrigger>
                <TabsTrigger value="Análisis">Análisis</TabsTrigger>
              </TabsList>
              
              {['all', 'Consulta', 'Vacunación', 'Cirugía', 'Análisis'].map(tab => (
                <TabsContent key={tab} value={tab}>
                  {pet.history.filter(h => tab === 'all' || h.type === tab).length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">No hay registros en esta categoría.</p>
                  ) : (
                    <div className="space-y-4 mt-4">
                      {pet.history.filter(h => tab === 'all' || h.type === tab).map((record) => (
                        <div key={record.id} className="relative pl-8 sm:pl-10 group">
                          <div className="h-full w-1 bg-gray-200 dark:bg-gray-700 absolute left-2.5 top-0 group-last:h-7"></div>
                          <div className="w-5 h-5 rounded-full bg-[#2DD4BF] absolute left-0 top-0 flex items-center justify-center">
                            <CalendarIcon size={12} className="text-white" />
                          </div>
                          {editingHistoryId === record.id && editableHistoryForm ? (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-4 space-y-3">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {editableHistoryForm.date ? (
                                      format(new Date(editableHistoryForm.date.split("/").reverse().join("-") + "T00:00:00"), "dd/MM/yyyy")
                                    ) : (
                                      <span>Elige una fecha</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={editableHistoryForm.date ? new Date(editableHistoryForm.date.split("/").reverse().join("-") + "T00:00:00") : undefined}
                                    onSelect={(date) =>
                                      setEditableHistoryForm({ ...editableHistoryForm, date: format(date!, "dd/MM/yyyy") })
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <div className="grid grid-cols-2 gap-3">
                                <select
                                  value={editableHistoryForm.type}
                                  onChange={(e) => setEditableHistoryForm({ ...editableHistoryForm, type: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                                >
                                  <option value="Consulta">Consulta</option>
                                  <option value="Vacunación">Vacunación</option>
                                  <option value="Cirugía">Cirugía</option>
                                  <option value="Desparasitación">Desparasitación</option>
                                  <option value="Análisis">Análisis</option>
                                  <option value="Otro">Otro</option>
                                </select>
                                <Input
                                  type="number"
                                  value={editableHistoryForm.weight || ''}
                                  onChange={(e) => setEditableHistoryForm({ ...editableHistoryForm, weight: e.target.value ? parseFloat(e.target.value) : undefined })}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                                  placeholder="Peso (kg)"
                                />
                              </div>
                              <textarea
                                value={editableHistoryForm.description}
                                onChange={(e) => setEditableHistoryForm({ ...editableHistoryForm, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                                placeholder="Descripción del evento"                                rows={3}
                              />
                              <Input
                                type="text"
                                value={editableHistoryForm.veterinarian}
                                onChange={(e) => setEditableHistoryForm({ ...editableHistoryForm, veterinarian: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-black dark:text-white"
                                placeholder="Veterinario"
                              />
                              <div className="flex gap-2">
                                <Button onClick={handleUpdateHistory} className="flex-1" size="sm">Guardar</Button>
                                <Button onClick={handleCancelEditHistory} className="flex-1" variant="outline" size="sm">Cancelar</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <div className="flex items-center gap-2 mb-1 sm:mb-0">
                                  <span className="font-medium text-[#1A202C] dark:text-white text-sm">
                                    {record.date && !isNaN(new Date(record.date.split("/").reverse().join("-") + "T00:00:00").getTime())
                                      ? format(new Date(record.date.split("/").reverse().join("-") + "T00:00:00"), "dd/MM/yyyy")
                                      : (console.log("Invalid date for record:", record.date), "Fecha inválida")}
                                  </span>
                                  <span className="text-xs bg-[#FBBF24] text-[#1A202C] px-2 py-1 rounded-full">{record.type}</span>
                                  {record.weight && <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{record.weight} kg</span>}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <User size={14} />
                                  <span>{record.veterinarian}</span>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                    setEditingHistoryId(record.id)
                                    setEditableHistoryForm(record)
                                  }}>
                                    <Edit size={14} />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{record.description}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
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
