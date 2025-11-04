'use client'

import { ChevronDown, LogOut } from "lucide-react"
import Link from "next/link"
import { logoutAction } from "@/app/auth/actions"
import { Button } from "./ui/button"

interface VetProfile {
  doctorName: string
  clinicName: string
  email: string
  phone: string
}

interface HeaderProps {
  vetProfile: VetProfile
}

export function Header({ vetProfile }: HeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 py-4">
      <div className="flex flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <Link href="/settings">
          <button className="flex items-center gap-2 hover:text-[#2DD4BF] transition-colors">
            <h1 className="text-xl sm:text-3xl font-bold text-[#1A202C] dark:text-white">Hola, {vetProfile.doctorName}</h1>
            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
          </button>
        </Link>

        <form action={logoutAction}>
          <Button variant="outline" size="icon" className="sm:hidden rounded-full">
            <LogOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="hidden sm:flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
