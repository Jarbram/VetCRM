"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { QuickActionsWidget } from "@/components/quick-actions-widget"
import { OwnersListWidget } from "@/components/owners-list-widget"
import { AddOwnerModal } from "@/components/add-owner-modal"
import { AddPetModal } from "@/components/add-pet-modal"
import { OwnerDetailModal } from "@/components/owner-detail-modal"
import { markReminderAsDone } from "@/app/auth/actions"

interface Reminder {
  id: string
  date: string
  type: string
  description: string
  completed?: boolean
}

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
  reminders: Reminder[]
}

interface Owner {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  pets: Pet[]
}

interface VetProfile {
  doctorName: string
  clinicName: string
  email: string
  phone: string
}

export function DashboardClient() {
  const [vetProfile, setVetProfile] = useState<VetProfile>({
    doctorName: "Dr. Barea",
    clinicName: "Clínica Veterinaria Barea",
    email: "contact@clinicabarea.com",
    phone: "+34 666 123 789",
  })

  const [owners, setOwners] = useState<Owner[]>([
    {
      id: "1",
      name: "Carlos Ramírez",
      email: "carlos@email.com",
      phone: "+34 666 123 456",
      address: "Calle Mayor 123, Madrid",
      pets: [
        {
          id: "p1",
          name: "Max",
          species: "Perro",
          breed: "Labrador",
          age: 3,
          history: [
            {
              id: "h1",
              date: "2024-10-15",
              type: "Consulta",
              description: "Revisión general",
              veterinarian: "Dr. García",
            },
            {
              id: "h2",
              date: "2024-09-20",
              type: "Vacunación",
              description: "Vacuna antirrábica",
              veterinarian: "Dra. López",
            },
          ],
          reminders: [
            {
              id: "r1",
              date: new Date().toISOString().split("T")[0],
              type: "Vacunación",
              description: "Vacuna de refuerzo",
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Ana García",
      phone: "+34 666 789 012",
      pets: [
        {
          id: "p2",
          name: "Luna",
          species: "Gato",
          breed: "Siamés",
          age: 2,
          history: [
            {
              id: "h3",
              date: "2024-11-01",
              type: "Consulta",
              description: "Chequeo dental",
              veterinarian: "Dr. Martínez",
            },
          ],
          reminders: [],
        },
      ],
    },
  ])

  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false)
  const [showAddPetModal, setShowAddPetModal] = useState(false)
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)
  const [selectedOwnerDetail, setSelectedOwnerDetail] = useState<string | null>(null)
  const [selectedPetDetail, setSelectedPetDetail] = useState<{ ownerId: string; petId: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddOwner = (ownerData: Omit<Owner, "id" | "pets">) => {
    const newOwner: Owner = {
      ...ownerData,
      id: Date.now().toString(),
      pets: [],
    }
    setOwners([...owners, newOwner])
    setShowAddOwnerModal(false)
  }

  const handleAddPet = (petData: Omit<Pet, "id" | "history" | "reminders">) => {
    if (!selectedOwnerId) return

    setOwners(
      owners.map((owner) => {
        if (owner.id === selectedOwnerId) {
          return {
            ...owner,
            pets: [
              ...owner.pets,
              {
                ...petData,
                id: Date.now().toString(),
                history: [],
                reminders: [],
              },
            ],
          }
        }
        return owner
      }),
    )
    setShowAddPetModal(false)
    setSelectedOwnerId(null)
  }

  const handleAddPetHistory = (ownerId: string, petId: string, historyData: Omit<PetHistory, "id">) => {
    setOwners(
      owners.map((owner) => {
        if (owner.id === ownerId) {
          return {
            ...owner,
            pets: owner.pets.map((pet) => {
              if (pet.id === petId) {
                return {
                  ...pet,
                  history: [
                    ...pet.history,
                    {
                      ...historyData,
                      id: Date.now().toString(),
                    },
                  ],
                }
              }
              return pet
            }),
          }
        }
        return owner
      }),
    )
  }

  const handleAddReminder = (ownerId: string, petId: string, reminderData: Omit<Reminder, "id">) => {
    setOwners(
      owners.map((owner) => {
        if (owner.id === ownerId) {
          return {
            ...owner,
            pets: owner.pets.map((pet) => {
              if (pet.id === petId) {
                return {
                  ...pet,
                  reminders: [
                    ...pet.reminders,
                    {
                      ...reminderData,
                      id: Date.now().toString(),
                    },
                  ],
                }
              }
              return pet
            }),
          }
        }
        return owner
      }),
    )
  }

  const handleMarkReminderAsDone = async (reminderId: string) => {
    // Optimistic update
    setOwners((currentOwners) =>
      currentOwners.map((owner) => ({
        ...owner,
        pets: owner.pets.map((pet) => ({
          ...pet,
          reminders: pet.reminders.map((reminder) =>
            reminder.id === reminderId ? { ...reminder, completed: true } : reminder,
          ),
        })),
      })),
    )

    // Call server action
    await markReminderAsDone(reminderId)
  }

  const filteredOwners = owners.filter((owner) => {
    const query = searchQuery.toLowerCase()
    const matchesName = owner.name.toLowerCase().includes(query)
    const matchesPhone = owner.phone.toLowerCase().includes(query)
    const matchesPetName = owner.pets.some((pet) => pet.name.toLowerCase().includes(query))
    return matchesName || matchesPhone || matchesPetName
  })

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      <main className="flex-1 overflow-auto">
        <Header vetProfile={vetProfile} />

        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {/* Quick Action Widgets Row */}
          <div className="mb-8">
            <QuickActionsWidget owners={owners} onMarkAsDone={handleMarkReminderAsDone} />
          </div>

          <OwnersListWidget
            owners={filteredOwners}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddOwner={() => setShowAddOwnerModal(true)}
            onAddPet={(ownerId) => {
              setSelectedOwnerId(ownerId)
              setShowAddPetModal(true)
            }}
            onOpenOwnerDetail={(ownerId) => setSelectedOwnerDetail(ownerId)}
            onOpenPetDetail={(ownerId, petId) => setSelectedPetDetail({ ownerId, petId })}
          />

          {showAddOwnerModal && <AddOwnerModal onClose={() => setShowAddOwnerModal(false)} onSubmit={handleAddOwner} />}

          {showAddPetModal && selectedOwnerId && (
            <AddPetModal
              onClose={() => {
                setShowAddPetModal(false)
                setSelectedOwnerId(null)
              }}
              onSubmit={handleAddPet}
            />
          )}

          {selectedOwnerDetail && (
            <OwnerDetailModal
              owner={owners.find((o) => o.id === selectedOwnerDetail)!}
              onClose={() => setSelectedOwnerDetail(null)}
              onAddPet={(ownerId) => {
                setSelectedOwnerId(ownerId)
                setShowAddPetModal(true)
                setSelectedOwnerDetail(null)
              }}
              onOpenPetDetail={(petId) => setSelectedPetDetail({ ownerId: selectedOwnerDetail, petId })}
            />
          )}

          {selectedPetDetail && (
            <PetDetailModal
              owner={owners.find((o) => o.id === selectedPetDetail.ownerId)!}
              pet={
                owners
                  .find((o) => o.id === selectedPetDetail.ownerId)
                  ?.pets.find((p) => p.id === selectedPetDetail.petId)!
              }
              onClose={() => setSelectedPetDetail(null)}
              onAddHistory={(historyData) => {
                handleAddPetHistory(selectedPetDetail.ownerId, selectedPetDetail.petId, historyData)
              }}
              onAddReminder={(reminderData) => {
                handleAddReminder(selectedPetDetail.ownerId, selectedPetDetail.petId, reminderData)
              }}
            />
          )}
        </div>
      </main>
    </div>
  )
}
