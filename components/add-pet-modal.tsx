'use client'

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
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

interface AddPetModalProps {
  onClose: () => void
  onSubmit: (data: {
    name: string
    species: string
    breed: string
    age: number
  }) => void
}

export function AddPetModal({ onClose, onSubmit }: AddPetModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.species && formData.breed && formData.age) {
      onSubmit({
        ...formData,
        age: Number.parseInt(formData.age),
      })
      setFormData({ name: "", species: "", breed: "", age: "" })
    }
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Nueva Mascota</DrawerTitle>
          <DrawerDescription>
            Añade una nueva mascota al sistema.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A202C] dark:text-gray-300 mb-1">Nombre *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Max"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A202C] dark:text-gray-300 mb-1">Especie *</label>
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            >
              <option value="">Selecciona una especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Pájaro">Pájaro</option>
              <option value="Roedor">Roedor</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A202C] dark:text-gray-300 mb-1">Raza *</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Ej: Labrador"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A202C] dark:text-gray-300 mb-1">Edad (años) *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ej: 3"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] bg-white dark:bg-gray-700 text-black dark:text-white"
              required
            />
          </div>

          <DrawerFooter className="flex-row gap-3 pt-4 px-0">
            <Button type="submit" className="flex-1">Guardar Mascota</Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
