import { getVisits } from "@/lib/services/visit-service"
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
import { LucideMoreHorizontal, LucideEdit, LucideTrash2, LucideCheck } from "lucide-react"
import Link from "next/link"

export async function VisitsTable() {
  const visits = await getVisits()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitas Programadas</CardTitle>
        <CardDescription>Lista de visitas técnicas programadas para los clientes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left text-sm font-medium">Cliente</th>
                  <th className="p-2 text-left text-sm font-medium">Tipo</th>
                  <th className="p-2 text-left text-sm font-medium">Fecha</th>
                  <th className="p-2 text-left text-sm font-medium">Hora</th>
                  <th className="p-2 text-left text-sm font-medium">Técnico</th>
                  <th className="p-2 text-left text-sm font-medium">Estado</th>
                  <th className="p-2 text-right text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No hay visitas programadas.
                    </td>
                  </tr>
                ) : (
                  visits.map((visit) => (
                    <tr key={visit.id} className="border-b">
                      <td className="p-2 text-sm">
                        <div className="font-medium">{visit.clients?.name}</div>
                        <div className="text-xs text-muted-foreground">{visit.clients?.phone}</div>
                      </td>
                      <td className="p-2 text-sm">{visit.type}</td>
                      <td className="p-2 text-sm">{new Date(visit.scheduled_date).toLocaleDateString()}</td>
                      <td className="p-2 text-sm">{visit.scheduled_time}</td>
                      <td className="p-2 text-sm">{visit.technician_name || "No asignado"}</td>
                      <td className="p-2 text-sm">
                        <StatusBadge status={visit.status} />
                      </td>
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
                              <Link href={`/dashboard/support/visits/${visit.id}`}>
                                <LucideEdit className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <LucideCheck className="mr-2 h-4 w-4" />
                              Marcar como Completada
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <LucideTrash2 className="mr-2 h-4 w-4" />
                              Cancelar Visita
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
    case "scheduled":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Programada
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          En Proceso
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Completada
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Cancelada
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
