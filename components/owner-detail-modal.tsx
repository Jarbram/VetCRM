'use client'

import { X, Plus, Phone, Mail, MapPin, Edit, Save } from "lucide-react"
import { useState } from "react"
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
}

interface Owner {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  pets: Pet[]
}

interface OwnerDetailModalProps {
  owner: Owner
  onClose: () => void
  onAddPet: (ownerId: string) => void
  onOpenPetDetail: (petId: string) => void
  onUpdateOwner: (ownerId: string, data: Partial<Omit<Owner, "id" | "pets">>) => void
}

export function OwnerDetailModal({ owner, onClose, onAddPet, onOpenPetDetail, onUpdateOwner }: OwnerDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOwner, setEditedOwner] = useState({
    name: owner.name,
    email: owner.email || "",
    phone: owner.phone,
    address: owner.address || "",
  })

  const handleSave = () => {
    onUpdateOwner(owner.id, editedOwner)
    setIsEditing(false)
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Detalles del Dueño</DrawerTitle>
          <DrawerDescription>
            Información de {owner.name} y sus mascotas.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Owner Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              {isEditing ? (
                <Input
                  value={editedOwner.name}
                  onChange={(e) => setEditedOwner({ ...editedOwner, name: e.target.value })}
                  className="text-2xl font-bold"
                />
              ) : (
                <h3 className="text-2xl font-bold text-[#1A202C] dark:text-white">{owner.name}</h3>
              )}
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit size={16} className="mr-2" />
                  Editar
                </Button>
              ) : (
                <Button size="sm" onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  Guardar
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Phone size={18} className="text-[#2DD4BF]" />
                {isEditing ? (
                  <Input
                    value={editedOwner.phone}
                    onChange={(e) => setEditedOwner({ ...editedOwner, phone: e.target.value })}
                  />
                ) : (
                  <span>{owner.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Mail size={18} className="text-[#2DD4BF]" />
                {isEditing ? (
                  <Input
                    value={editedOwner.email}
                    onChange={(e) => setEditedOwner({ ...editedOwner, email: e.target.value })}
                  />
                ) : (
                  <span>{owner.email || "N/A"}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="text-[#2DD4BF]" />
                {isEditing ? (
                  <Input
                    value={editedOwner.address}
                    onChange={(e) => setEditedOwner({ ...editedOwner, address: e.target.value })}
                  />
                ) : (
                  <span>{owner.address || "N/A"}</span>
                )}
              </div>
            </div>
          </div>

          {/* Pets Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-[#1A202C] dark:text-white">Mascotas ({owner.pets.length})</h4>
              <Button
                onClick={() => onAddPet(owner.id)}
                size="sm"
              >
                <Plus size={16} className="mr-2" />
                Nueva Mascota
              </Button>
            </div>

            {owner.pets.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No hay mascotas registradas</p>
            ) : (
              <div className="space-y-3">
                {owner.pets.map((pet) => (
                  <div
                    key={pet.id}
                    onClick={() => onOpenPetDetail(pet.id)}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-[#2DD4BF] hover:shadow-md transition-all cursor-pointer"
                  >
                    <h5 className="font-semibold text-[#1A202C] dark:text-white mb-1">{pet.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pet.species} • {pet.breed} • {pet.age} años
                    </p>
                    <p className="text-sm text-[#2DD4BF] mt-2">Ver detalles y historial →</p>
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
