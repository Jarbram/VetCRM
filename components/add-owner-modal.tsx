'use client'

import React, { useState } from "react"
import { User, Phone, Mail, MapPin } from "lucide-react"
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

interface AddOwnerModalProps {
  onClose: () => void
  onSubmit: (data: {
    name: string
    email?: string
    phone: string
    address?: string
  }) => void
}

export function AddOwnerModal({ onClose, onSubmit }: AddOwnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+51",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      onSubmit({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address || undefined,
      })
      setFormData({ name: "", email: "", phone: "", address: "" })
    }
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background border-t border-border">
        <DrawerHeader className="text-left border-b border-border pb-4">
          <DrawerTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Nuevo Expediente
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground">
            Ingrese los datos del propietario para crear un nuevo expediente clínico.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              Nombre Completo <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Carlos Ramírez"
                className="pl-9 bg-secondary/10 border-border focus:border-primary focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                Teléfono <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+51"
                  className="pl-9 bg-secondary/10 border-border focus:border-primary focus:ring-primary/20 font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="opcional"
                  className="pl-9 bg-secondary/10 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Dirección
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej: Av. Principal 123"
                className="pl-9 bg-secondary/10 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          <DrawerFooter className="flex-row gap-3 pt-4 px-0 border-t border-border mt-6">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">Crear Expediente</Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1 border-border text-muted-foreground hover:text-foreground">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
