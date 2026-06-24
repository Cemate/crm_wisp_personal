import type React from "react"
import Link from "next/link"
import {
  LucideHome,
  LucideUsers,
  LucideWallet,
  LucideMessageSquare,
  LucideSettings,
  LucideBarChart,
  LucideWrench,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed?: boolean
}

export function DashboardNav({ className, isCollapsed, ...props }: NavProps) {
  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LucideHome,
    },
    {
      title: "Clientes",
      href: "/dashboard/clients",
      icon: LucideUsers,
    },
    {
      title: "Pagos",
      href: "/dashboard/payments",
      icon: LucideWallet,
    },
    {
      title: "Mensajes",
      href: "/dashboard/messages",
      icon: LucideMessageSquare,
    },
    {
      title: "Soporte",
      href: "/dashboard/support",
      icon: LucideWrench,
    },
    {
      title: "Reportes",
      href: "/dashboard/reports",
      icon: LucideBarChart,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: LucideSettings,
    },
  ]

  return (
    <nav className={cn("grid items-start gap-2", className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isCollapsed ? "justify-center" : "justify-start",
            )}
          >
            <Icon className="h-4 w-4" />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        )
      })}
    </nav>
  )
}

