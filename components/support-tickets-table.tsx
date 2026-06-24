import { getTickets } from "@/lib/services/support-service"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideMoreHorizontal, LucideCalendarPlus, LucideEdit, LucideTrash2 } from "lucide-react"
import Link from "next/link"

export async function SupportTicketsTable() {
  const tickets = await getTickets()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incidencias Recientes</CardTitle>
        <CardDescription>Lista de incidencias de soporte técnico reportadas por los clientes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left text-sm font-medium">Cliente</th>
                  <th className="p-2 text-left text-sm font-medium">Tipo</th>
                  <th className="p-2 text-left text-sm font-medium">Descripción</th>
                  <th className="p-2 text-left text-sm font-medium">Estado</th>
                  <th className="p-2 text-left text-sm font-medium">Prioridad</th>
                  <th className="p-2 text-left text-sm font-medium">Fecha</th>
                  <th className="p-2 text-right text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No hay incidencias registradas.
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b">
                      <td className="p-2 text-sm">
                        <div className="font-medium">{ticket.clients?.name}</div>
                        <div className="text-xs text-muted-foreground">{ticket.clients?.phone}</div>
                      </td>
                      <td className="p-2 text-sm">{ticket.type}</td>
                      <td className="p-2 text-sm max-w-[200px] truncate">{ticket.description}</td>
                      <td className="p-2 text-sm">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="p-2 text-sm">
                        <PriorityBadge priority={ticket.priority} />
                      </td>
                      <td className="p-2 text-sm">{new Date(ticket.created_at).toLocaleDateString()}</td>
                      <td className="p-2 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <LucideMoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/support/tickets/${ticket.id}`}>
                                <LucideEdit className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/support/schedule?clientId=${ticket.client_id}&ticketId=${ticket.id}`}
                              >
                                <LucideCalendarPlus className="mr-2 h-4 w-4" />
                                Programar Visita
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <LucideTrash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Pendiente
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          En Proceso
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Resuelto
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "low":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          Baja
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Media
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Alta
        </Badge>
      )
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

