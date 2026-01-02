
export interface Reminder {
  id: string
  date: string
  type: string
  description: string
  completed?: boolean
}

export interface PetHistory {
  id: string
  date: string
  type: string
  description: string
  veterinarian: string
  weight?: number
}

export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: string | number
  history: PetHistory[]
  reminders: Reminder[]
  medical_alerts?: string
}

export interface Owner {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  pets: Pet[]
}

export interface VetProfile {
  doctorName: string
  clinicName: string
  email: string
  phone: string
}
