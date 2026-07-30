"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideUser, LucideSettings, LucideLogOut, LucideShieldCheck, LucideChevronDown } from "lucide-react"
import { currentUser, getInitials } from "@/lib/mock-account"

export function UserAccountNav() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 pl-1.5 pr-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary text-[10px] font-semibold text-primary-foreground">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">Mi Cuenta</span>
          <LucideChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium leading-none">{currentUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/account" className="cursor-pointer gap-2">
            <LucideUser className="h-4 w-4" aria-hidden="true" />
            Mi Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/account?tab=security" className="cursor-pointer gap-2">
            <LucideShieldCheck className="h-4 w-4" aria-hidden="true" />
            Seguridad
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer gap-2">
            <LucideSettings className="h-4 w-4" aria-hidden="true" />
            Configuración
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive" onSelect={() => router.push("/login")}>
          <LucideLogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
