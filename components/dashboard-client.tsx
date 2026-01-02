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
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Users, Calendar, AlertCircle, CheckSquare, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ClientDashboardProps {
  vetProfile: VetProfile
}

export function ClientDashboard({ vetProfile }: ClientDashboardProps) {
  const supabase = createClient()
  const { toast } = useToast()
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

        // 🚀 OPTIMIZED: Single query with JOINs instead of N+1 queries
        // This fetches owners, pets, history, and reminders in ONE database call
        const { data: ownersData, error: ownersError } = await supabase
          .from("owners")
          .select(`
            *,
            pets (
              *,
              pet_history (
                id,
                history_date,
                type,
                description,
                veterinarian,
                weight
              ),
              reminders (
                id,
                reminder_date,
                type,
                description,
                completed
              )
            )
          `)
          .eq("vet_id", vetData.id)
          .order("created_at", { ascending: false })
          .order("history_date", {
            referencedTable: "pets.pet_history",
            ascending: false
          })

        if (ownersError) {
          throw ownersError
        }

        // Transform the nested data structure to match our types
        const ownersWithPets = (ownersData || []).map((owner: any) => ({
          id: owner.id,
          name: owner.name,
          email: owner.email,
          phone: owner.phone,
          address: owner.address,
          pets: (owner.pets || []).map((pet: any) => ({
            id: pet.id,
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age,
            medical_alerts: pet.medical_alerts,
            history: (pet.pet_history || []).map((h: any) => ({
              id: h.id,
              date: h.history_date,
              type: h.type,
              description: h.description,
              veterinarian: h.veterinarian,
              weight: h.weight,
            })),
            reminders: (pet.reminders || []).map((r: any) => ({
              id: r.id,
              date: r.reminder_date,
              type: r.type,
              description: r.description,
              completed: r.completed,
            })),
          })),
        }))

        setOwners(ownersWithPets)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
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

      // Chain to Add Pet Flow
      setSelectedOwnerId(newOwner.id)
      setShowAddPetModal(true)

      toast({
        title: "Cliente agregado",
        description: `${ownerData.name} ha sido registrado. Ahora agrega su mascota.`,
      })
    } catch (error) {
      console.error("[v0] Error adding owner:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo agregar el cliente. Inténtalo de nuevo.",
      })
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
          age: petData.age.toString(),
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
      toast({
        title: "Mascota agregada",
        description: `${petData.name} ha sido registrado exitosamente.`,
      })
    } catch (error) {
      console.error("[v0] Error adding pet:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `No se pudo agregar la mascota. ${error instanceof Error ? error.message : 'Error desconocido'}`,
      })
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
      toast({
        title: "Historial actualizado",
        description: "Se ha agregado un nuevo evento al historial.",
      })
    } catch (error) {
      console.error("[v0] Error adding history:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo agregar el evento.",
      })
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
      toast({
        title: "Historial actualizado",
        description: "El evento ha sido modificado exitosamente.",
      })
    } catch (error) {
      console.error("[v0] Error updating history:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el evento.",
      })
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
      toast({
        title: "Recordatorio creado",
        description: "Se te notificará en la fecha programada.",
      })
    } catch (error) {
      console.error("[v0] Error adding reminder:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el recordatorio.",
      })
    }
  }

  const handleUpdateReminder = async (
    ownerId: string,
    petId: string,
    reminderId: string,
    reminderData: Partial<Omit<Reminder, "id">>,
  ) => {
    try {
      const { date, ...rest } = reminderData
      let reminder_date: string | undefined
      if (date) {
        const [day, month, year] = date.split("/")
        reminder_date = `${year}-${month}-${day}`
      }

      const { error } = await supabase
        .from("reminders")
        .update({ ...rest, reminder_date })
        .eq("id", reminderId)

      if (error) {
        console.error("Error updating reminder:", error)
        throw error
      }

      const localUpdateData = { ...reminderData }
      if (reminder_date) {
        localUpdateData.date = reminder_date
      }

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
                      reminder.id === reminderId
                        ? { ...reminder, ...localUpdateData }
                        : reminder,
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
      toast({
        title: "Recordatorio actualizado",
        description: "Los cambios han sido guardados.",
      })
    } catch (error) {
      // The error is already logged by the time it gets here.
      // console.error("[v0] Error updating reminder:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el recordatorio.",
      })
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
      toast({
        title: "Completado",
        description: "El recordatorio ha sido marcado como completado.",
      })
    } catch (error) {
      console.error("[v0] Error marking reminder as done:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado.",
      })
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
      toast({
        title: "Cliente actualizado",
        description: "La información ha sido guardada.",
      })
    } catch (error) {
      console.error("[v0] Error updating owner:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la información.",
      })
    }
  }

  const handleUpdatePet = async (
    ownerId: string,
    petId: string,
    data: Partial<Omit<Pet, "id" | "history" | "reminders">>,
  ) => {
    try {
      console.log("Updating pet:", petId, "with data:", data)
      // Smart age handling: try to send as number if possible (for legacy DB support), else string
      const updateData: any = { ...data }
      if (updateData.age !== undefined) {
        const ageStr = updateData.age.toString()
        // Check if it's a pure number
        if (/^\d+$/.test(ageStr)) {
          updateData.age = parseInt(ageStr, 10)
        } else {
          updateData.age = ageStr
        }
      }

      const { error } = await supabase.from("pets").update(updateData).eq("id", petId)

      if (error) {
        console.error("Supabase update error details:", JSON.stringify(error, null, 2))
        throw error
      }

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
      toast({
        title: "Mascota actualizada",
        description: "La información ha sido guardada.",
      })
    } catch (error) {
      console.error("[v0] Error updating pet:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `No se pudo actualizar la información. ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      })
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
      <div className="flex h-screen bg-[#F8F9FA]">
        <main className="flex-1 overflow-auto">
          <Header vetProfile={vetProfile} />
          <div className="p-8 max-w-7xl space-y-8">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
            {/* Quick Actions Skeleton */}
            <Skeleton className="h-64 rounded-lg" />
            {/* List Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-64" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      <main className="flex-1 overflow-auto">
        <Header vetProfile={vetProfile} />

        <div className="p-8 max-w-7xl">
          {/* Getting Started Checklist - Only show if no owners */}
          {owners.length === 0 && (
            <div className="bg-gradient-to-r from-[#2DD4BF] to-[#20B5A1] rounded-xl p-6 mb-8 text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">¡Bienvenido a LadraApp! 🐾</h2>
                  <p className="text-blue-50">Completa estos pasos para configurar tu consultorio digital.</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckSquare size={32} className="text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/settings" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-[#2DD4BF] flex items-center justify-center font-bold">1</div>
                    <span className="font-medium">Configura tu Perfil</span>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <button onClick={() => setShowAddOwnerModal(true)} className="bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors flex items-center justify-between group text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-[#2DD4BF] flex items-center justify-center font-bold">2</div>
                    <span className="font-medium">Agrega tu 1er Paciente</span>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3 opacity-75">
                  <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center font-bold">3</div>
                  <span className="font-medium">Crea un Recordatorio</span>
                </div>
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
            <div className="bg-white dark:bg-gray-900 p-2 md:p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <div className="p-2 md:p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 break-words leading-tight">Pacientes Totales</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {owners.reduce((acc, owner) => acc + owner.pets.length, 0)}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-2 md:p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <div className="p-2 md:p-3 bg-amber-100 text-amber-600 rounded-full shrink-0">
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 break-words leading-tight">Recordatorios Hoy</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {owners.reduce((acc, owner) =>
                    acc + owner.pets.reduce((pAcc, pet) =>
                      pAcc + pet.reminders.filter(r =>
                        r.date.split('T')[0] === new Date().toISOString().split('T')[0] && !r.completed
                      ).length
                      , 0)
                    , 0)}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-2 md:p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <div className="p-2 md:p-3 bg-red-100 text-red-600 rounded-full shrink-0">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 break-words leading-tight">Alertas Médicas</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {owners.reduce((acc, owner) =>
                    acc + owner.pets.filter(p => p.medical_alerts && p.medical_alerts.length > 0).length
                    , 0)}
                </p>
              </div>
            </div>
          </div>



          {owners.reduce((acc, owner) =>
            acc + owner.pets.reduce((pAcc, pet) =>
              pAcc + pet.reminders.filter(r =>
                r.date.split('T')[0] === new Date().toISOString().split('T')[0] && !r.completed
              ).length
              , 0)
            , 0) > 0 && (
              <div className="mb-8">
                <QuickActionsWidget owners={owners} onMarkAsDone={handleMarkAsDone} />
              </div>
            )}

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
      </main >
    </div >
  )
}