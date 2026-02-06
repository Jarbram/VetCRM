'use client'

import { Plus, Search, ChevronRight, Phone, Mail, MapPin, Dog, Cat, Bird, Rabbit, AlertTriangle, FileText } from "lucide-react"
import { Owner, Pet } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OwnersListWidgetProps {
  owners: Owner[]
  searchQuery: string
  onSearchChange: (query: string) => void
  onAddOwner: () => void
  onAddPet: (ownerId: string) => void
  onOpenOwnerDetail: (ownerId: string) => void
  onOpenPetDetail: (ownerId: string, petId: string) => void
}

export function OwnersListWidget({
  owners,
  searchQuery,
  onSearchChange,
  onAddOwner,
  onAddPet,
  onOpenOwnerDetail,
  onOpenPetDetail,
}: OwnersListWidgetProps) {

  const getPetIcon = (species: string) => {
    const s = species.toLowerCase()
    if (s.includes('gato') || s.includes('cat') || s.includes('felino')) return <Cat size={14} />
    if (s.includes('pajaro') || s.includes('ave') || s.includes('bird')) return <Bird size={14} />
    if (s.includes('conejo') || s.includes('rabbit')) return <Rabbit size={14} />
    return <Dog size={14} />
  }

  return (
    <div className="space-y-6">
      {/* Search Bar - Clinical & Technical */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar por Expediente, Nombre o Mascota..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all placeholder:text-muted-foreground/70"
          />
        </div>
        <Button
          onClick={onAddOwner}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
        >
          <Plus size={16} className="mr-2" />
          Nuevo Expediente
        </Button>
      </div>

      {/* Owners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {owners.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-xl border border-dashed border-border">
            <div className="bg-secondary/50 p-4 rounded-full mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              {searchQuery ? "Sin resultados" : "Consultorio vacío"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              {searchQuery
                ? "No se encontró ningún expediente con esos datos."
                : "Comienza registrando tu primer paciente para generar su historia clínica."}
            </p>
            {!searchQuery && (
              <Button onClick={onAddOwner} className="bg-primary hover:bg-primary/90">
                Crear Primer Expediente
              </Button>
            )}
          </div>
        ) : (
          owners.map((owner) => (
            <div
              key={owner.id}
              className="group bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-sm transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Owner Header - Clinical Card Style */}
              <div
                className="p-4 cursor-pointer border-b border-border bg-secondary/10 hover:bg-secondary/20 transition-colors"
                onClick={() => onOpenOwnerDetail(owner.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                      {owner.name}
                    </h3>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Expediente #{owner.id.slice(0, 6)}</span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={12} className="text-primary/70" />
                    <span className="font-medium text-foreground/80">{owner.phone}</span>
                  </div>
                  {owner.email && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail size={12} className="text-primary/70" />
                      <span className="truncate">{owner.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pets Section */}
              <div className="p-3 bg-card flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Pacientes ({owner.pets.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddPet(owner.id)
                    }}
                    className="h-6 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-md"
                  >
                    <Plus size={12} className="mr-1" />
                    Añadir
                  </Button>
                </div>

                <div className="space-y-2">
                  {owner.pets.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-border rounded-lg bg-secondary/5">
                      <p className="text-xs text-muted-foreground">Sin pacientes registrados</p>
                    </div>
                  ) : (
                    owner.pets.map((pet) => (
                      <button
                        key={pet.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenPetDetail(owner.id, pet.id)
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer group/pet text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-secondary text-foreground flex items-center justify-center border border-border group-hover/pet:border-primary/30 transition-colors">
                            {getPetIcon(pet.species)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-foreground text-sm leading-none">
                                {pet.name}
                              </span>
                              {pet.medical_alerts && pet.medical_alerts.length > 0 && (
                                <AlertTriangle size={10} className="text-destructive fill-destructive/10" />
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {pet.breed}
                            </p>
                          </div>
                        </div>
                        {/* Age Tag */}
                        <div className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-medium text-foreground border border-border">
                          {typeof pet.age === 'number' ? `${pet.age} años` : pet.age}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
