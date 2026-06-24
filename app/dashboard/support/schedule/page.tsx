"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LucideArrowLeft, LucideSearch } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getClients, getClientById } from "@/lib/services/client-service"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"

export default function ScheduleVisitPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientId = searchParams.get("clientId")
  const ticketId = searchParams.get("ticketId")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [formData, setFormData] = useState({
    client_id: "",
    ticket_id: ticketId || "",
    scheduled_date: "",
    scheduled_time: "",
    type: "",
    status: "scheduled",
    technician_name: "",
    notes: "",
  })

  // Cargar clientes y tickets al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const clientsData = await getClients()
        setClients(clientsData)

        // Si se proporciona un clientId en la URL, cargar ese cliente
        if (clientId) {
          const client = await getClientById(clientId)
          if (client) {
            setSelectedClient(client)
            setFormData((prev) => ({
              ...prev,
              client_id: client.id,
            }))

            // Cargar tickets asociados a este cliente
            const { data: clientTickets } = await supabase
              .from("support_tickets")
              .select("*")
              .eq("client_id", client.id)
              .order("created_at", { ascending: false })

            if (clientTickets) {
              setTickets(clientTickets)
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos necesarios",
          variant: "destructive",
        })
      }
    }

    loadData()
  }, [clientId, ticketId, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleClientSelect = async (id: string) => {
    try {
      const client = await getClientById(id)
      if (client) {
        setSelectedClient(client)
        setFormData((prev) => ({
          ...prev,
          client_id: client.id,
        }))

        // Cargar tickets asociados a este cliente
        const { data: clientTickets } = await supabase
          .from("support_tickets")
          .select("*")
          .eq("client_id", client.id)
          .order("created_at", { ascending: false })

        if (clientTickets) {
          setTickets(clientTickets)
        }
      }
    } catch (error) {
      console.error("Error al cargar cliente:", error)
      toast({
        title: "Error",
        description: "No se pudo cargar la información del cliente",
        variant: "destructive",
      })
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtrar clientes por término de búsqueda
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (filtered.length === 1) {
      handleClientSelect(filtered[0].id)
    } else if (filtered.length > 1) {
      toast({
        title: "Múltiples resultados",
        description: "Se encontraron varios clientes. Por favor, seleccione uno de la lista.",
      })
    } else {
      toast({
        title: "Sin resultados",
        description: "No se encontraron clientes con ese término de búsqueda.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Programar visita técnica
      const { data, error } = await supabase
        .from("technical_visits")
        .insert({
          client_id: formData.client_id,
          ticket_id: formData.ticket_id || null,
          scheduled_date: formData.scheduled_date,
          scheduled_time: formData.scheduled_time,
          type: formData.type,
          status: formData.status,
          technician_name: formData.technician_name || null,
          notes: formData.notes || null,
        })
        .select()

      if (error) throw error

      toast({
        title: "Visita programada",
        description: "La visita técnica ha sido programada exitosamente",
      })
      router.push("/dashboard/support/visits")
    } catch (error) {
      console.error("Error al programar visita:", error)
      toast({
        title: "Error",
        description: "No se pudo programar la visita. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Programar Visita Técnica" text="Agenda una visita técnica para un cliente">
        <Button variant="outline" asChild>
          <Link href="/dashboard/support/visits">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información de la Visita</CardTitle>
            <CardDescription>Ingresa los detalles de la visita técnica para programarla.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Seleccionar Cliente</h3>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Buscar cliente por nombre o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="button" onClick={handleSearch} size="icon" className="shrink-0">
                  <LucideSearch className="h-4 w-4" />
                </Button>
              </div>

              {selectedClient ? (
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{selectedClient.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ID: {selectedClient.id.substring(0, 8)}... • Plan: {selectedClient.plans?.name || "Sin plan"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{selectedClient.phone}</p>
                      <p className="text-sm text-muted-foreground">{selectedClient.address}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed p-4 text-center text-muted-foreground">
                  Busca y selecciona un cliente para programar una visita
                </div>
              )}
            </div>

            {selectedClient && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Detalles de la Visita</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {tickets.length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="ticket_id">Incidencia Relacionada</Label>
                        <Select
                          value={formData.ticket_id}
                          onValueChange={(value) => handleSelectChange("ticket_id", value)}
                        >
                          <SelectTrigger id="ticket_id">
                            <SelectValue placeholder="Selecciona una incidencia (opcional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Ninguna</SelectItem>
                            {tickets.map((ticket) => (
                              <SelectItem key={ticket.id} value={ticket.id}>
                                {ticket.type} - {new Date(ticket.created_at).toLocaleDateString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Visita</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                        required
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instalación">Instalación</SelectItem>
                          <SelectItem value="Reparación">Reparación</SelectItem>
                          <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                          <SelectItem value="Cambio de Equipo">Cambio de Equipo</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduled_date">Fecha Programada</Label>
                      <Input
                        id="scheduled_date"
                        name="scheduled_date"
                        type="date"
                        value={formData.scheduled_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduled_time">Hora Programada</Label>
                      <Input
                        id="scheduled_time"
                        name="scheduled_time"
                        type="time"
                        value={formData.scheduled_time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="technician_name">Técnico Asignado</Label>
                      <Input
                        id="technician_name"
                        name="technician_name"
                        placeholder="Nombre del técnico"
                        value={formData.technician_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Notas</Label>
                      <textarea
                        id="notes"
                        name="notes"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="Información adicional sobre la visita"
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/support/visits">Cancelar</Link>
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading || !selectedClient || !formData.scheduled_date || !formData.scheduled_time}
            >
              {isLoading ? "Programando..." : "Programar Visita"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}
