'use client'

import { Plus, Search, ChevronRight } from "lucide-react"

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  history: Array<{
    id: string
    date: string
    type: string
    description: string
    veterinarian: string
  }>
}

interface Owner {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  pets: Pet[]
}

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
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-[#1A202C] dark:text-white">Dueños y Mascotas</h2>
        <div className="w-full sm:w-auto flex-grow sm:flex-grow-0">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono o mascota..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>
        </div>
        <button
          onClick={onAddOwner}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#1fb2a4] transition-colors w-full sm:w-auto"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">Nuevo Dueño</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {owners.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8 lg:col-span-2">No hay dueños registrados. Agrega uno nuevo.</p>
        ) : (
          owners.map((owner) => (
            <div
              key={owner.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
              onClick={() => onOpenOwnerDetail(owner.id)}
            >
              {/* Owner Header */}
              <div className="flex items-start justify-between mb-3 flex-grow">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#1A202C] dark:text-white">{owner.name}</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {owner.email && <span className="flex items-center gap-1">📧 <span>{owner.email}</span></span>}
                    <span className="flex items-center gap-1">📱 <span>{owner.phone}</span></span>
                  </div>
                  {owner.address && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">📍 <span>{owner.address}</span></p>}
                </div>
                <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
              </div>

              {/* Pets Section */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Mascotas ({owner.pets.length})</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddPet(owner.id)
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#FBBF24] text-[#1A202C] rounded hover:bg-[#f9b234] transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Agregar
                  </button>
                </div>

                {owner.pets.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No hay mascotas registradas</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {owner.pets.map((pet) => (
                      <div
                        key={pet.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenPetDetail(owner.id, pet.id)
                        }}
                        className="bg-gray-50 dark:bg-gray-800 rounded p-3 border border-gray-100 dark:border-gray-700 hover:border-[#2DD4BF] hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <p className="font-medium text-[#1A202C] dark:text-white">{pet.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {pet.species} • {pet.breed} • {pet.age} años
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

