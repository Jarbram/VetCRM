import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientDashboard } from "@/components/dashboard-client"

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

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth/login")
  }

  const { data: vetData, error: vetError } = await supabase.from("vets").select("*").eq("user_id", user.id).single()

  if (vetError || !vetData) {
    // Handle the case where the vet profile doesn't exist or there's an error
    // For example, you could redirect to a profile creation page
    return redirect("/settings") // Or show an error message
  }

  const vetProfile: VetProfile = {
    doctorName: vetData.doctor_name || "Doctor",
    clinicName: vetData.clinic_name || "Clínica",
    email: vetData.email || "",
    phone: vetData.phone || "",
  }

  return <ClientDashboard vetProfile={vetProfile} />
}
