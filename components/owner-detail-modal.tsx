'use client'

import { X, Plus, Phone, Mail, MapPin, Edit, Save, PawPrint, ChevronRight } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

import { Owner, Pet } from "@/lib/types"

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
      <DrawerContent className="bg-background border-t border-border max-h-[90vh]">
        <DrawerHeader className="text-left border-b border-border pb-4 bg-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold text-foreground">Expediente del Propietario</DrawerTitle>
              <DrawerDescription className="text-muted-foreground">
                ID: <span className="font-mono text-xs bg-muted px-1 rounded">{owner.id.slice(0, 8)}</span>
              </DrawerDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 border-border text-muted-foreground hover:text-foreground">
                <Edit size={14} className="mr-2" />
                Editar
              </Button>
            ) : (
              <Button size="sm" onClick={handleSave} className="h-8 bg-primary hover:bg-primary/90">
                <Save size={14} className="mr-2" />
                Guardar
              </Button>
            )}
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-8 overflow-y-auto">
          {/* Owner Identity Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4">
              Información de Contacto
            </h3>

            {isEditing ? (
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Nombre Completo</Label>
                  <Input
                    value={editedOwner.name}
                    onChange={(e) => setEditedOwner({ ...editedOwner, name: e.target.value })}
                    className="bg-card"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input
                      value={editedOwner.phone}
                      onChange={(e) => setEditedOwner({ ...editedOwner, phone: e.target.value })}
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={editedOwner.email}
                      onChange={(e) => setEditedOwner({ ...editedOwner, email: e.target.value })}
                      className="bg-card"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dirección</Label>
                  <Input
                    value={editedOwner.address}
                    onChange={(e) => setEditedOwner({ ...editedOwner, address: e.target.value })}
                    className="bg-card"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {owner.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{owner.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <MapPin size={12} />
                      {owner.address || "Sin dirección registrada"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50">
                    <Phone size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{owner.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50">
                    <Mail size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{owner.email || "No registrado"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pets Section */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pacientes Asignados ({owner.pets.length})</h4>
              <Button
                onClick={() => onAddPet(owner.id)}
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                <Plus size={14} className="mr-1" />
                Añadir Paciente
              </Button>
            </div>

            {owner.pets.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border rounded-xl bg-secondary/5">
                <PawPrint className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No hay pacientes registrados en este expediente</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {owner.pets.map((pet) => (
                  <div
                    key={pet.id}
                    onClick={() => onOpenPetDetail(pet.id)}
                    className="group bg-card hover:bg-secondary/20 rounded-xl p-4 border border-border hover:border-primary/50 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                        <PawPrint className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground group-hover:text-primary transition-colors">{pet.name}</h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal text-muted-foreground">
                            {pet.species}
                          </Badge>
                          <span className="text-xs text-muted-foreground">• {pet.breed}</span>
                          <span className="text-xs text-muted-foreground">• {typeof pet.age === 'number' ? `${pet.age} años` : pet.age}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DrawerFooter className="pt-2 border-t border-border">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full border-border text-muted-foreground hover:text-foreground">Cerrar Expediente</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
