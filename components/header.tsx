'use client'

import { ChevronDown, LogOut, PawPrint, Settings, User } from "lucide-react"
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
import { Avatar, AvatarFallback } from "./ui/avatar"

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
  // Get initials for avatar
  const initials = vetProfile.doctorName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-8 py-3 shadow-sm">
      <div className="flex flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Logo Area */}
        <Link href="/dashboard" className="flex items-center gap-3 group" prefetch={false}>
          <div className="bg-cyan-100 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <PawPrint className="h-6 w-6 text-cyan-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
              Ladrapp<span className="text-cyan-500">.</span>
            </span>
            <span className="text-xs text-gray-500 font-medium hidden sm:block">
              {vetProfile.clinicName || "Panel Veterinario"}
            </span>
          </div>
        </Link>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 outline-none group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200 leading-none group-hover:text-cyan-600 transition-colors">
                  {vetProfile.doctorName}
                </p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Veterinario</p>
              </div>

              <Avatar className="h-9 w-9 border-2 border-white shadow-sm group-hover:border-cyan-100 transition-colors">
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <ChevronDown size={16} className="text-gray-400 group-hover:text-cyan-500 transition-colors mr-1" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-xl border-gray-100">
            <DropdownMenuLabel className="font-normal p-3 bg-gray-50 rounded-lg mb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-gray-900">{vetProfile.doctorName}</p>
                <p className="text-xs text-gray-500 truncate">{vetProfile.email}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-cyan-50 focus:text-cyan-700">
              <Link href="/settings" className="flex items-center w-full py-2">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <form action={logoutAction}>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                <button type="submit" className="w-full flex items-center py-2">
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
