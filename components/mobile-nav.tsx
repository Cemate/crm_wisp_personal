"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LucideMenu } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  // Cerrar el menú cuando cambia la ruta (navegación)
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }

    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <LucideMenu className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 sm:max-w-xs">
        <div className="px-2 py-6">
          <DashboardNav isCollapsed={false} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

