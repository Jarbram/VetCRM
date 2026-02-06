'use client'

import { X, Calendar as CalendarIcon, User, Plus, Edit, Check, Loader2, AlertTriangle, Clock, Syringe, Stethoscope, Scissors, FileText, Activity, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { format, addDays, addMonths, addWeeks } from "date-fns"
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
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

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
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

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

  const handleShowAddHistory = (type?: string) => {
    const today = new Date()
    const formattedDate = format(today, "dd/MM/yyyy")
    setHistoryForm({
      ...historyForm,
      date: formattedDate,
      type: type || "Consulta"
    })
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

  const setQuickReminderDate = (type: 'tomorrow' | 'week' | 'month') => {
    const today = new Date()
    let date = today
    if (type === 'tomorrow') date = addDays(today, 1)
    if (type === 'week') date = addWeeks(today, 1)
    if (type === 'month') date = addMonths(today, 1)

    setReminderForm({
      ...reminderForm,
      date: format(date, "dd/MM/yyyy")
    })
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[96vh] bg-background border-t border-border">
        <DrawerHeader className="text-left border-b border-border pb-4 px-6 bg-muted/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DrawerTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {pet.name}
                </DrawerTitle>
                <Badge variant="outline" className="text-xs font-mono font-medium px-2 py-0.5 border-border text-muted-foreground bg-background">
                  {pet.species.toUpperCase()}
                </Badge>
              </div>
              <DrawerDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                <User size={14} className="text-primary/70" />
                Propietario: <span className="font-medium text-foreground">{owner.name}</span>
              </DrawerDescription>
            </div>
            {!isEditingPet && (
              <Button variant="outline" size="sm" onClick={() => setIsEditingPet(true)} className="h-9 border-border text-muted-foreground hover:text-foreground">
                <Edit size={14} className="mr-2" />
                Editar Ficha
              </Button>
            )}
            {isEditingPet && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSavePet} className="bg-primary hover:bg-primary/90 h-9 px-4">
                  <Check size={16} className="mr-2" />
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setEditablePet(pet)
                  setIsEditingPet(false)
                }} className="h-9 px-4 border-border text-muted-foreground">
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </DrawerHeader>

        <div className="p-4 md:p-6 space-y-8 overflow-y-auto">
          {/* Medical Alerts - Clinical Caution */}
          <div className="bg-amber-500/5 rounded-xl p-5 border border-amber-500/20 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle className="w-24 h-24 text-amber-500" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
                  <AlertTriangle size={18} />
                  <h4 className="font-bold text-sm uppercase tracking-wider">Alertas Médicas</h4>
                </div>
                {saveStatus === "saving" && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Loader2 size={12} className="animate-spin" /> Guardando...
                  </span>
                )}
                {saveStatus === "saved" && (
                  <span className="text-xs text-primary flex items-center gap-1 animate-in fade-in slide-in-from-bottom-1">
                    <Check size={12} /> Guardado
                  </span>
                )}
              </div>
              <Textarea
                defaultValue={pet.medical_alerts}
                placeholder="Sin alertas registradas. Añadir alergias o condiciones crónicas..."
                className="w-full min-h-[60px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-foreground/90 placeholder:text-muted-foreground/50 resize-none text-base font-medium leading-relaxed"
                onBlur={(e) => {
                  const newValue = e.target.value
                  if (newValue !== pet.medical_alerts) {
                    setSaveStatus("saving")
                    onUpdatePet({ medical_alerts: newValue })
                    setTimeout(() => {
                      setSaveStatus("saved")
                      setTimeout(() => setSaveStatus("idle"), 2000)
                    }, 800)
                  }
                }}
              />
            </div>
          </div>

          {/* Pet Basic Info - Clinical Vitals */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Raza</p>
              {isEditingPet ? (
                <Input
                  value={editablePet.breed}
                  onChange={(e) => setEditablePet({ ...editablePet, breed: e.target.value })}
                  className="h-8 text-sm bg-secondary/10"
                />
              ) : (
                <p className="font-bold text-foreground text-sm truncate" title={pet.breed}>{pet.breed}</p>
              )}
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Edad</p>
              {isEditingPet ? (
                <div className="flex gap-1">
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={editablePet.age.toString().replace(/[^0-9]/g, '')}
                    onChange={(e) => {
                      const val = e.target.value
                      const isMonths = editablePet.age.toString().includes('mes')
                      setEditablePet({
                        ...editablePet,
                        age: isMonths ? `${val} meses` : parseInt(val) || 0
                      })
                    }}
                    className="h-8 w-full text-sm bg-secondary/10"
                    placeholder="0"
                  />
                  <select
                    value={editablePet.age.toString().includes('mes') ? 'meses' : 'años'}
                    onChange={(e) => {
                      const unit = e.target.value
                      const val = editablePet.age.toString().replace(/[^0-9]/g, '') || '0'
                      setEditablePet({
                        ...editablePet,
                        age: unit === 'meses' ? `${val} meses` : parseInt(val) || 0
                      })
                    }}
                    className="h-8 px-1 border border-border rounded text-[10px] bg-background text-foreground"
                  >
                    <option value="años">Años</option>
                    <option value="meses">Meses</option>
                  </select>
                </div>
              ) : (
                <p className="font-bold text-foreground text-sm">
                  {typeof pet.age === 'number' ? `${pet.age} años` : pet.age}
                </p>
              )}
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Peso Actual</p>
              <div className="flex items-baseline gap-1">
                <p className="font-bold text-foreground text-lg">
                  {pet.history.find(h => h.weight)?.weight?.toFixed(2) ?? "N/A"}
                </p>
                <span className="text-xs text-muted-foreground font-medium">kg</span>
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Especie</p>
              {isEditingPet ? (
                <Input
                  value={editablePet.species}
                  onChange={(e) => setEditablePet({ ...editablePet, species: e.target.value })}
                  className="h-8 text-sm bg-secondary/10"
                />
              ) : (
                <p className="font-bold text-foreground text-sm">{pet.species}</p>
              )}
            </div>
          </div>

          {/* Reminders Section */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Clock className="text-primary" size={16} />
                Plan de Salud
              </h3>
              <Button
                onClick={() => setShowAddReminder(!showAddReminder)}
                size="sm"
                variant={showAddReminder ? "ghost" : "outline"}
                className={!showAddReminder ? "h-8 text-xs border-dashed border-primary/50 text-primary hover:bg-primary/5" : "h-8 text-xs text-muted-foreground"}
              >
                {showAddReminder ? <X size={14} className="mr-1" /> : <Plus size={14} className="mr-1" />}
                {showAddReminder ? "Cancelar" : "Agendar"}
              </Button>
            </div>

            {showAddReminder && (
              <div className="bg-card rounded-xl p-4 border border-border mb-6 animate-in slide-in-from-top-2 shadow-sm">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha Programada</label>
                    <div className="flex flex-col gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal h-10 text-sm border-border bg-background"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {reminderForm.date ? (
                              format(new Date(reminderForm.date.split("/").reverse().join("-") + "T00:00:00"), "dd/MM/yyyy")
                            ) : (
                              <span className="text-muted-foreground">Seleccionar fecha</span>
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
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setQuickReminderDate('tomorrow')} className="h-7 text-xs">Mañana</Button>
                        <Button variant="secondary" size="sm" onClick={() => setQuickReminderDate('week')} className="h-7 text-xs">1 Sem</Button>
                        <Button variant="secondary" size="sm" onClick={() => setQuickReminderDate('month')} className="h-7 text-xs">1 Mes</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tipo y Descripción</label>
                    <div className="relative">
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
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background appearance-none focus:ring-1 focus:ring-primary"
                      >
                        {Object.keys(REMINDER_TEMPLATES).map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <Textarea
                      value={reminderForm.description}
                      onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
                      placeholder="Detalles del recordatorio..."
                      className="resize-none text-sm min-h-[60px] bg-background border-border"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button onClick={handleAddReminder} className="w-full bg-primary hover:bg-primary/90 h-10 text-sm font-bold">
                    Confirmar Recordatorio
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pet.reminders.filter(r => !r.completed).length === 0 ? (
                <div className="col-span-full text-center py-6 border border-dashed border-border rounded-xl bg-secondary/5">
                  <Clock className="mx-auto h-6 w-6 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground text-xs">Sin recordatorios pendientes</p>
                </div>
              ) : (
                pet.reminders.filter(r => !r.completed).map((reminder) => (
                  <div key={reminder.id} className="bg-card p-3 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-all group">
                    {editingReminderId === reminder.id && editableReminderForm ? (
                      <div className="space-y-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal h-9 text-sm">
                              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                              {editableReminderForm.date}
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
                        <Input
                          value={editableReminderForm.description}
                          onChange={(e) => setEditableReminderForm({ ...editableReminderForm, description: e.target.value })}
                          className="h-9 text-sm"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdateReminder} size="sm" className="flex-1 h-8 text-xs">Guardar</Button>
                          <Button onClick={handleCancelEditReminder} size="sm" variant="ghost" className="flex-1 h-8 text-xs">Cancelar</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge variant="outline" className="text-[10px] font-medium bg-secondary/20 border-border text-foreground">
                              {reminder.type}
                            </Badge>
                            <span className="text-xs font-bold text-primary flex items-center gap-1">
                              <CalendarIcon size={10} />
                              {reminder.date}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {reminder.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                          setEditingReminderId(reminder.id)
                          setEditableReminderForm(reminder)
                        }}>
                          <Edit size={12} className="text-muted-foreground hover:text-primary" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Weight Chart - Clinical Accordion */}
          {pet.history.filter(h => h.weight != null && h.weight > 0).length >= 2 && (
            <div className="border-t border-border pt-6">
              <Accordion type="single" collapsible className="bg-card rounded-xl border border-border shadow-sm">
                <AccordionItem value="weight-chart" className="border-none">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                    <div className="flex items-center gap-2">
                      <Activity size={18} className="text-primary" />
                      <span className="font-bold text-sm text-foreground">Curva de Peso</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="h-48 w-full">
                      <WeightChart history={pet.history} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Medical History - Clinical Timeline */}
          <div className="border-t border-border pt-6 pb-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="text-primary" size={16} />
                Historial Clínico
              </h3>
            </div>

            {/* Quick Add Buttons - Clinical Grid */}
            {!showAddHistory && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Consulta', icon: Stethoscope },
                  { label: 'Vacuna', icon: Syringe, type: 'Vacunación' },
                  { label: 'Cirugía', icon: Scissors },
                  { label: 'Otro', icon: Plus },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-3 flex flex-col gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors border-border bg-card"
                    onClick={() => handleShowAddHistory(action.type || action.label)}
                  >
                    <action.icon size={20} />
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                ))}
              </div>
            )}

            {showAddHistory && (
              <div className="bg-card rounded-xl p-4 md:p-6 border border-border mb-6 animate-in slide-in-from-top-2 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                  <h4 className="font-bold text-base flex items-center gap-2">
                    <Plus size={16} className="text-primary" />
                    Nuevo Evento: <span className="text-primary">{historyForm.type}</span>
                  </h4>
                  <Button variant="ghost" size="icon" onClick={() => setShowAddHistory(false)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <X size={18} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal h-10 text-sm bg-background border-border"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {historyForm.date ? (
                            format(new Date(historyForm.date.split("/").reverse().join("-") + "T00:00:00"), "dd/MM/yyyy")
                          ) : (
                            <span>Seleccionar fecha</span>
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Veterinario</label>
                    <Input
                      value={historyForm.veterinarian}
                      onChange={(e) => setHistoryForm({ ...historyForm, veterinarian: e.target.value })}
                      placeholder="Dr. Nombre"
                      className="h-10 text-sm bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tipo</label>
                    <div className="relative">
                      <select
                        value={historyForm.type}
                        onChange={(e) => setHistoryForm({ ...historyForm, type: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background appearance-none"
                      >
                        <option value="Consulta">Consulta</option>
                        <option value="Vacunación">Vacunación</option>
                        <option value="Cirugía">Cirugía</option>
                        <option value="Desparasitación">Desparasitación</option>
                        <option value="Análisis">Análisis</option>
                        <option value="Otro">Otro</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Peso (kg)</label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      value={historyForm.weight || ''}
                      onChange={(e) => setHistoryForm({ ...historyForm, weight: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="0.00"
                      className="h-10 text-sm bg-background border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Detalles Clínicos</label>
                  <Textarea
                    value={historyForm.description}
                    onChange={(e) => setHistoryForm({ ...historyForm, description: e.target.value })}
                    placeholder="Descripción del procedimiento, diagnóstico o tratamiento..."
                    rows={3}
                    className="text-sm min-h-[100px] bg-background border-border resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2 border-t border-border">
                  <Button variant="ghost" onClick={() => setShowAddHistory(false)} className="flex-1 h-10 text-muted-foreground">Cancelar</Button>
                  <Button onClick={handleAddHistory} className="flex-1 bg-primary hover:bg-primary/90 h-10 font-bold">Guardar en Historial</Button>
                </div>
              </div>
            )}

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto h-auto p-0 bg-transparent gap-2 border-b border-border pb-2 mb-4 no-scrollbar">
                <TabsTrigger value="all" className="rounded-full px-4 py-1.5 h-auto text-xs border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">Todo</TabsTrigger>
                <TabsTrigger value="Consulta" className="rounded-full px-4 py-1.5 h-auto text-xs border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">Consultas</TabsTrigger>
                <TabsTrigger value="Vacunación" className="rounded-full px-4 py-1.5 h-auto text-xs border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">Vacunas</TabsTrigger>
                <TabsTrigger value="Cirugía" className="rounded-full px-4 py-1.5 h-auto text-xs border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">Cirugías</TabsTrigger>
                <TabsTrigger value="Análisis" className="rounded-full px-4 py-1.5 h-auto text-xs border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">Análisis</TabsTrigger>
              </TabsList>

              {['all', 'Consulta', 'Vacunación', 'Cirugía', 'Análisis'].map(tab => (
                <TabsContent key={tab} value={tab} className="mt-6">
                  {pet.history.filter(h => tab === 'all' || h.type === tab).length === 0 ? (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                      <FileText className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                      <p className="text-base font-medium">No hay registros</p>
                      <p className="text-sm opacity-70">Agrega un evento para comenzar</p>
                    </div>
                  ) : (
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                      {pet.history.filter(h => tab === 'all' || h.type === tab).map((record) => (
                        <div key={record.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-slate-300 group-[.is-active]:bg-[#2DD4BF] text-slate-500 group-[.is-active]:text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            {record.type === 'Vacunación' ? <Syringe size={16} /> :
                              record.type === 'Cirugía' ? <Scissors size={16} /> :
                                <Stethoscope size={16} />}
                          </div>

                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            {editingHistoryId === record.id && editableHistoryForm ? (
                              <div className="space-y-3">
                                {/* Edit Mode */}
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-sm">Editar Evento</span>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancelEditHistory}><X size={16} /></Button>
                                </div>
                                <Input
                                  value={editableHistoryForm.description}
                                  onChange={(e) => setEditableHistoryForm({ ...editableHistoryForm, description: e.target.value })}
                                  className="text-base"
                                />
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={handleUpdateHistory} className="w-full h-9">Guardar</Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                  <div className="font-bold text-slate-900 dark:text-white">{record.type}</div>
                                  <time className="font-caveat font-medium text-[#2DD4BF] text-sm">{record.date}</time>
                                </div>
                                <div className="text-slate-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">{record.description}</div>
                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3 mt-1">
                                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                    <User size={14} /> {record.veterinarian}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 -mr-2" onClick={() => {
                                    setEditingHistoryId(record.id)
                                    setEditableHistoryForm(record)
                                  }}>
                                    <Edit size={14} />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        <DrawerFooter className="border-t border-gray-100 dark:border-gray-800 pt-4 pb-8 px-6 bg-white dark:bg-gray-900 z-20">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full h-12 text-base font-medium">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
