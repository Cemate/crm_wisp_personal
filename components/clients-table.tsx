import { getClients } from "@/lib/services/client-service"
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
import {
  LucideMoreHorizontal,
  LucideEdit,
  LucideTrash2,
  LucideWallet,
  LucideWrench,
  LucideCalendarPlus,
} from "lucide-react"
import Link from "next/link"

export async function ClientsTable() {
  const clients = await getClients()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
        <CardDescription>Lista de clientes registrados en el sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left text-sm font-medium">Nombre</th>
                  <th className="p-2 text-left text-sm font-medium">Contacto</th>
                  <th className="p-2 text-left text-sm font-medium">Plan</th>
                  <th className="p-2 text-left text-sm font-medium">Estado</th>
                  <th className="p-2 text-left text-sm font-medium">Día de Pago</th>
                  <th className="p-2 text-right text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      No hay clientes registrados.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="p-2 text-sm">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {client.id.substring(0, 8)}...</div>
                      </td>
                      <td className="p-2 text-sm">
                        <div>{client.phone}</div>
                        <div className="text-xs text-muted-foreground">{client.email}</div>
                      </td>
                      <td className="p-2 text-sm">{client.plans?.name || "Sin plan"}</td>
                      <td className="p-2 text-sm">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="p-2 text-sm">{client.payment_day || "No definido"}</td>
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
                              <Link href={`/dashboard/clients/${client.id}`}>
                                <LucideEdit className="mr-2 h-4 w-4" />
                                Ver Detalles
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/payments/new?clientId=${client.id}`}>
                                <LucideWallet className="mr-2 h-4 w-4" />
                                Registrar Pago
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/support/new?clientId=${client.id}`}>
                                <LucideWrench className="mr-2 h-4 w-4" />
                                Reportar Incidencia
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/support/schedule?clientId=${client.id}`}>
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
    case "active":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Activo
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          Inactivo
        </Badge>
      )
    case "suspended":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Suspendido
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

