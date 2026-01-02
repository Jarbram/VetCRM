'use client'

import { Plus, Search, ChevronRight, Phone, Mail, MapPin, Dog, Cat, Bird, Rabbit, AlertTriangle, MoreVertical } from "lucide-react"
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
    if (s.includes('gato') || s.includes('cat') || s.includes('felino')) return <Cat size={16} />
    if (s.includes('pajaro') || s.includes('ave') || s.includes('bird')) return <Bird size={16} />
    if (s.includes('conejo') || s.includes('rabbit')) return <Rabbit size={16} />
    return <Dog size={16} />
  }

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-10">
        <div className="relative w-full sm:max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cliente o mascota..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] bg-gray-50 dark:bg-gray-800 text-black dark:text-white text-sm transition-all"
          />
        </div>
        <Button
          onClick={onAddOwner}
          className="w-full sm:w-auto bg-[#2DD4BF] hover:bg-[#20B5A1] text-white shadow-sm hover:shadow transition-all"
        >
          <Plus size={18} className="mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Owners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {owners.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "No se encontraron resultados" : "Sin clientes registrados"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6 text-sm">
              {searchQuery
                ? "Intenta buscar por otro nombre, teléfono o nombre de mascota."
                : "Comienza agregando tu primer cliente para gestionar sus mascotas y expedientes."}
            </p>
            {!searchQuery && (
              <Button onClick={onAddOwner} className="bg-[#2DD4BF] hover:bg-[#20B5A1]">
                Agregar Primer Cliente
              </Button>
            )}
          </div>
        ) : (
          owners.map((owner) => (
            <div
              key={owner.id}
              className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#2DD4BF]/50 dark:hover:border-[#2DD4BF]/50 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Owner Header */}
              <div
                className="p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50"
                onClick={() => onOpenOwnerDetail(owner.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-[#2DD4BF] transition-colors">
                    {owner.name}
                  </h3>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-[#2DD4BF] transition-colors" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone size={14} className="text-gray-400" />
                    <span>{owner.phone}</span>
                  </div>
                  {owner.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail size={14} className="text-gray-400" />
                      <span className="truncate">{owner.email}</span>
                    </div>
                  )}
                  {owner.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="truncate">{owner.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pets Section */}
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Mascotas ({owner.pets.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddPet(owner.id)
                    }}
                    className="h-7 px-2 text-[#2DD4BF] hover:text-[#20B5A1] hover:bg-[#2DD4BF]/10"
                  >
                    <Plus size={14} className="mr-1" />
                    Agregar
                  </Button>
                </div>

                <div className="space-y-2">
                  {owner.pets.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500">Sin mascotas</p>
                    </div>
                  ) : (
                    owner.pets.map((pet) => (
                      <div
                        key={pet.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenPetDetail(owner.id, pet.id)
                        }}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-[#2DD4BF] hover:bg-[#2DD4BF]/5 transition-all cursor-pointer group/pet"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 group-hover/pet:text-[#2DD4BF] group-hover/pet:bg-white transition-colors">
                            {getPetIcon(pet.species)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">
                                {pet.name}
                              </span>
                              {pet.medical_alerts && pet.medical_alerts.length > 0 && (
                                <AlertTriangle size={12} className="text-red-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {pet.breed} • {typeof pet.age === 'number' ? `${pet.age} años` : pet.age}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover/pet:text-[#2DD4BF] opacity-0 group-hover/pet:opacity-100 transition-all" />
                      </div>
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
