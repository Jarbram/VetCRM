'use client'

import { ChevronDown, LogOut, PawPrint } from "lucide-react"
import Link from "next/link"
import { logoutAction } from "@/app/auth/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

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
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
          <PawPrint className="h-6 w-6 text-cyan-600" />
          <span className="text-xl sm:text-2xl font-bold text-[#1A202C] dark:text-white">LadraApp</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:text-[#2DD4BF] transition-colors">
              <span className="text-base font-medium text-[#1A202C] dark:text-white">Hola, {vetProfile.doctorName}</span>
              <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{vetProfile.doctorName}</p>
                <p className="text-xs leading-none text-muted-foreground">{vetProfile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full text-left">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
