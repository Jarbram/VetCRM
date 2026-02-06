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
    <div className="bg-background sticky top-0 z-40 border-b border-border px-4 sm:px-8 py-3">
      <div className="flex flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Logo Area - Clinical & Precise */}
        <Link href="/dashboard" className="flex items-center gap-3 group" prefetch={false}>
          <div className="bg-primary/10 p-2 rounded-lg transition-colors group-hover:bg-primary/20">
            <PawPrint className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight leading-none">
              Ladrapp<span className="text-primary">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold hidden sm:block mt-0.5">
              {vetProfile.clinicName || "Panel Clínico"}
            </span>
          </div>
        </Link>

        {/* User Menu - Minimalist */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-lg hover:bg-secondary transition-all outline-none group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-none group-hover:text-primary transition-colors">
                  {vetProfile.doctorName}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5 uppercase tracking-wide">Veterinario</p>
              </div>

              <Avatar className="h-9 w-9 border border-border rounded-lg shadow-sm">
                <AvatarFallback className="bg-secondary text-primary font-bold text-xs rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <ChevronDown size={14} className="text-muted-foreground group-hover:text-primary transition-colors mr-1" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-lg border-border bg-popover">
            <DropdownMenuLabel className="font-normal p-3 bg-secondary/50 rounded-lg mb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-foreground">{vetProfile.doctorName}</p>
                <p className="text-xs text-muted-foreground truncate">{vetProfile.email}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-secondary focus:text-foreground">
              <Link href="/settings" className="flex items-center w-full py-2">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-border" />

            <form action={logoutAction}>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
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
