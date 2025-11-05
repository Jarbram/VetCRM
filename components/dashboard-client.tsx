'use client'

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { QuickActionsWidget } from "@/components/quick-actions-widget"
import { OwnersListWidget } from "@/components/owners-list-widget"
import { AddOwnerModal } from "@/components/add-owner-modal"
import { AddPetModal } from "@/components/add-pet-modal"
import { OwnerDetailModal } from "@/components/owner-detail-modal"
import { PetDetailModal } from "@/components/pet-detail-modal"
import { Owner, Pet, PetHistory, Reminder, VetProfile } from "@/lib/types"

interface ClientDashboardProps {
  vetProfile: VetProfile
}

export function ClientDashboard({ vetProfile }: ClientDashboardProps) {
  const supabase = createClient()
  const [owners, setOwners] = useState<Owner[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false)
  const [showAddPetModal, setShowAddPetModal] = useState(false)
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)
  const [selectedOwnerDetail, setSelectedOwnerDetail] = useState<string | null>(
    null,
  )
  const [selectedPetDetail, setSelectedPetDetail] = useState<{
    ownerId: string
    petId: string
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          return
        }

        const { data: vetData } = await supabase
          .from("vets")
          .select("id")
          .eq("user_id", user.id)
          .single()

        if (!vetData) {
          return
        }

        // Get owners and related data
        const { data: ownersData, error: ownersError } = await supabase
          .from("owners")
          .select("*")
          .eq("vet_id", vetData.id)
          .order("created_at", { ascending: false })

        if (ownersError) {
          throw ownersError
        }

        // Get pets for each owner
        const ownersWithPets = await Promise.all(
          ownersData.map(async (owner) => {
            const { data: petsData } = await supabase
              .from("pets")
              .select("*")
              .eq("owner_id", owner.id)

            // Get history and reminders for each pet
            const petsWithDetails = await Promise.all(
              (petsData || []).map(async (pet) => {
                const { data: historyData } = await supabase
                  .from("pet_history")
                  .select("*")
                  .eq("pet_id", pet.id)
                  .order("history_date", { ascending: false })

                const { data: remindersData } = await supabase
                  .from("reminders")
                  .select("*")
                  .eq("pet_id", pet.id)

                return {
                  id: pet.id,
                  name: pet.name,
                  species: pet.species,
                  breed: pet.breed,
                  age: pet.age,
                  medical_alerts: pet.medical_alerts,
                  history: (historyData || []).map((h: any) => ({
                    id: h.id,
                    date: h.history_date,
                    type: h.type,
                    description: h.description,
                    veterinarian: h.veterinarian,
                    weight: h.weight,
                  })),
                  reminders: (remindersData || []).map((r: any) => ({
                    id: r.id,
                    date: r.reminder_date,
                    type: r.type,
                    description: r.description,
                    completed: r.completed, // Add this line
                  })),
                }
              }),
            )

            return {
              id: owner.id,
              name: owner.name,
              email: owner.email,
              phone: owner.phone,
              address: owner.address,
              pets: petsWithDetails,
            }
          }),
        )

        setOwners(ownersWithPets)
      } catch (error) {
        console.error("[v0] Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase])

  const handleAddOwner = async (ownerData: Omit<Owner, "id" | "pets">) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: vetData } = await supabase
        .from("vets")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (!vetData) return

      const { data: newOwner, error } = await supabase
        .from("owners")
        .insert({
          name: ownerData.name,
          email: ownerData.email,
          phone: ownerData.phone,
          address: ownerData.address,
          vet_id: vetData.id,
        })
        .select()
        .single()

      if (error) throw error

      setOwners([
        {
          ...ownerData,
          id: newOwner.id,
          pets: [],
        },
        ...owners,
      ])
      setShowAddOwnerModal(false)
    } catch (error) {
      console.error("[v0] Error adding owner:", error)
    }
  }

  const handleAddPet = async (
    petData: Omit<Pet, "id" | "history" | "reminders">,
  ) => {
    if (!selectedOwnerId) return

    try {
      const { data: newPet, error } = await supabase
        .from("pets")
        .insert({
          name: petData.name,
          species: petData.species,
          breed: petData.breed,
          age: petData.age,
          owner_id: selectedOwnerId,
        })
        .select()
        .single()

      if (error) throw error

      setOwners(
        owners.map((owner) => {
          if (owner.id === selectedOwnerId) {
            return {
              ...owner,
              pets: [
                ...owner.pets,
                {
                  ...petData,
                  id: newPet.id,
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
    } catch (error) {
      console.error("[v0] Error adding pet:", error)
    }
  }

  const handleAddPetHistory = async (
    ownerId: string,
    petId: string,
    historyData: Omit<PetHistory, "id">,
  ) => {
    try {
      const [day, month, year] = historyData.date.split("/")
      const formattedDate = `${year}-${month}-${day}`

      const { data: newHistory, error } = await supabase
        .from("pet_history")
        .insert({
          pet_id: petId,
          history_date: formattedDate,
          type: historyData.type,
          description: historyData.description,
          veterinarian: historyData.veterinarian,
          weight: historyData.weight,
        })
        .select()
        .single()

      if (error) throw error

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
                        id: newHistory.id,
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
    } catch (error) {
      console.error("[v0] Error adding history:", error)
    }
  }

  const handleUpdatePetHistory = async (
    ownerId: string,
    petId: string,
    historyId: string,
    historyData: Partial<Omit<PetHistory, "id">>,
  ) => {
    try {
      const [day, month, year] = historyData.date!.split("/")
      const formattedDate = `${year}-${month}-${day}`

      const { error } = await supabase
        .from("pet_history")
        .update({
          history_date: formattedDate,
          type: historyData.type,
          description: historyData.description,
          veterinarian: historyData.veterinarian,
          weight: historyData.weight,
        })
        .eq("id", historyId)

      if (error) throw error

      setOwners(
        owners.map((owner) => {
          if (owner.id === ownerId) {
            return {
              ...owner,
              pets: owner.pets.map((pet) => {
                if (pet.id === petId) {
                  return {
                    ...pet,
                    history: pet.history.map((history) =>
                      history.id === historyId ? { ...history, ...historyData } : history,
                    ),
                  }
                }
                return pet
              }),
            }
          }
          return owner
        }),
      )
    } catch (error) {
      console.error("[v0] Error updating history:", error)
    }
  }

  const handleAddReminder = async (
    ownerId: string,
    petId: string,
    reminderData: Omit<Reminder, "id">,
  ) => {
    try {
      const [day, month, year] = reminderData.date.split("/")
      const formattedDate = `${year}-${month}-${day}`
      const { data: newReminder, error } = await supabase
        .from("reminders")
        .insert({
          pet_id: petId,
          reminder_date: formattedDate,
          type: reminderData.type,
          description: reminderData.description,
          completed: false, // Default to not completed
        })
        .select()
        .single()

      if (error) throw error

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
                        id: newReminder.id,
                        date: newReminder.reminder_date,
                        type: newReminder.type,
                        description: newReminder.description,
                        completed: newReminder.completed,
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
    } catch (error) {
      console.error("[v0] Error adding reminder:", error)
    }
  }

  const handleUpdateReminder = async (
    ownerId: string,
    petId: string,
    reminderId: string,
    reminderData: Partial<Omit<Reminder, "id">>,
  ) => {
    try {
      const [day, month, year] = reminderData.date!.split("/")
      const formattedDate = `${year}-${month}-${day}`

      const { error } = await supabase
        .from("reminders")
        .update({
          reminder_date: formattedDate,
          type: reminderData.type,
          description: reminderData.description,
        })
        .eq("id", reminderId)

      if (error) throw error

      setOwners(
        owners.map((owner) => {
          if (owner.id === ownerId) {
            return {
              ...owner,
              pets: owner.pets.map((pet) => {
                if (pet.id === petId) {
                  return {
                    ...pet,
                    reminders: pet.reminders.map((reminder) =>
                      reminder.id === reminderId ? { ...reminder, ...reminderData } : reminder,
                    ),
                  }
                }
                return pet
              }),
            }
          }
          return owner
        }),
      )
    } catch (error) {
      console.error("[v0] Error updating reminder:", error)
    }
  }

  const handleMarkAsDone = async (reminderId: string) => {
    try {
      const { error } = await supabase
        .from("reminders")
        .update({ completed: true })
        .eq("id", reminderId)

      if (error) throw error

      setOwners(
        owners.map((owner) => ({
          ...owner,
          pets: owner.pets.map((pet) => ({
            ...pet,
            reminders: pet.reminders.map((reminder) =>
              reminder.id === reminderId
                ? { ...reminder, completed: true }
                : reminder,
            ),
          })),
        })),
      )
    } catch (error) {
      console.error("[v0] Error marking reminder as done:", error)
    }
  }

  const handleUpdateOwner = async (
    ownerId: string,
    data: Partial<Omit<Owner, "id" | "pets">>,
  ) => {
    try {
      const { error } = await supabase.from("owners").update(data).eq("id", ownerId)

      if (error) throw error

      setOwners(
        owners.map((owner) =>
          owner.id === ownerId ? { ...owner, ...data } : owner,
        ),
      )
    } catch (error) {
      console.error("[v0] Error updating owner:", error)
    }
  }

  const handleUpdatePet = async (
    ownerId: string,
    petId: string,
    data: Partial<Omit<Pet, "id" | "history" | "reminders">>,
  ) => {
    try {
      const { error } = await supabase.from("pets").update(data).eq("id", petId)

      if (error) throw error

      setOwners(
        owners.map((owner) => {
          if (owner.id === ownerId) {
            return {
              ...owner,
              pets: owner.pets.map((pet) =>
                pet.id === petId ? { ...pet, ...data } : pet,
              ),
            }
          }
          return owner
        }),
      )
    } catch (error) {
      console.error("[v0] Error updating pet:", error)
    }
  }

  const filteredOwners = owners.filter((owner) => {
    const query = searchQuery.toLowerCase()
    const matchesName = owner.name.toLowerCase().includes(query)
    const matchesPhone = owner.phone.toLowerCase().includes(query)
    const matchesPetName = owner.pets.some((pet) =>
      pet.name.toLowerCase().includes(query),
    )
    return matchesName || matchesPhone || matchesPetName
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <p className="text-gray-600">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      <main className="flex-1 overflow-auto">
        <Header vetProfile={vetProfile} />

        <div className="p-8 max-w-7xl">
          <div className="mb-8">
            <QuickActionsWidget owners={owners} onMarkAsDone={handleMarkAsDone} />
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
            onOpenPetDetail={(ownerId, petId) =>
              setSelectedPetDetail({ ownerId, petId })
            }
          />

          {showAddOwnerModal && (
            <AddOwnerModal
              onClose={() => setShowAddOwnerModal(false)}
              onSubmit={handleAddOwner}
            />
          )}

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
              onOpenPetDetail={(petId) =>
                setSelectedPetDetail({ ownerId: selectedOwnerDetail, petId })
              }
              onUpdateOwner={handleUpdateOwner}
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
                handleAddPetHistory(
                  selectedPetDetail.ownerId,
                  selectedPetDetail.petId,
                  historyData,
                )
              }}
              onUpdateHistory={(historyId, historyData) => {
                handleUpdatePetHistory(
                  selectedPetDetail.ownerId,
                  selectedPetDetail.petId,
                  historyId,
                  historyData,
                )
              }}
              onAddReminder={(reminderData) => {
                handleAddReminder(
                  selectedPetDetail.ownerId,
                  selectedPetDetail.petId,
                  reminderData,
                )
              }}
              onUpdateReminder={(reminderId, reminderData) => {
                handleUpdateReminder(
                  selectedPetDetail.ownerId,
                  selectedPetDetail.petId,
                  reminderId,
                  reminderData,
                )
              }}
              onUpdatePet={(petData) => {
                handleUpdatePet(
                  selectedPetDetail.ownerId,
                  selectedPetDetail.petId,
                  petData,
                )
              }}
            />
          )}
        </div>
      </main>
    </div>
  )
}