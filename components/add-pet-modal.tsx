'use client'

import React, { useState } from "react"
import { PawPrint, Dog, Cat, Bird, Rabbit, HelpCircle, Calendar, FileText } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AddPetModalProps {
  onClose: () => void
  onSubmit: (data: {
    name: string
    species: string
    breed: string
    age: string | number
  }) => void
}

export function AddPetModal({ onClose, onSubmit }: AddPetModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  })

  // State helper for age unit
  const [ageUnit, setAgeUnit] = useState("años")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpeciesSelect = (species: string) => {
    setFormData(prev => ({ ...prev, species }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.species && formData.breed && formData.age) {
      // Construct final age string/number
      const ageVal = parseInt(formData.age)
      const finalAge = ageUnit === 'meses' ? `${ageVal} meses` : ageVal

      onSubmit({
        ...formData,
        age: finalAge,
      })
      setFormData({ name: "", species: "", breed: "", age: "" })
    }
  }

  const speciesOptions = [
    { label: "Perro", icon: Dog },
    { label: "Gato", icon: Cat },
    { label: "Conejo", icon: Rabbit },
    { label: "Ave", icon: Bird },
    { label: "Otro", icon: HelpCircle },
  ]

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background border-t border-border">
        <DrawerHeader className="text-left border-b border-border pb-4">
          <DrawerTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-primary" />
            Registro de Paciente
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground">
            Complete la ficha básica de la mascota.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Species Selector - Visual */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Especie <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {speciesOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleSpeciesSelect(opt.label)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border min-w-[70px] transition-all",
                    formData.species === opt.label
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "bg-card border-border text-muted-foreground hover:bg-secondary hover:border-primary/50"
                  )}
                >
                  <opt.icon className="h-6 w-6 mb-1.5" />
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              Nombre del Paciente <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Max"
                className="pl-9 bg-secondary/10 border-border focus:border-primary focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                Raza <span className="text-destructive">*</span>
              </Label>
              <Input
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="Ej: Labrador"
                className="bg-secondary/10 border-border focus:border-primary focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                Edad <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Ej: 4"
                    min="0"
                    className="pl-9 bg-secondary/10 border-border focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
                <select
                  value={ageUnit}
                  onChange={(e) => setAgeUnit(e.target.value)}
                  className="w-24 px-2 py-2 bg-secondary/10 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="años">Años</option>
                  <option value="meses">Meses</option>
                </select>
              </div>
            </div>
          </div>

          <DrawerFooter className="flex-row gap-3 pt-4 px-0 border-t border-border mt-6">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">Registrar Paciente</Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1 border-border text-muted-foreground hover:text-foreground">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
