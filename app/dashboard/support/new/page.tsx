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

export default function NewSupportTicketPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientId = searchParams.get("clientId")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [formData, setFormData] = useState({
    client_id: "",
    type: "",
    description: "",
    status: "pending",
    priority: "medium",
    assigned_to: "",
    resolution: "",
  })

  // Cargar clientes al montar el componente
  useEffect(() => {
    const loadClients = async () => {
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
          }
        }
      } catch (error) {
        console.error("Error al cargar clientes:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los clientes",
          variant: "destructive",
        })
      }
    }

    loadClients()
  }, [clientId, toast])

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
      // Crear ticket de soporte
      const { data, error } = await supabase
        .from("support_tickets")
        .insert({
          client_id: formData.client_id,
          type: formData.type,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          assigned_to: formData.assigned_to || null,
          resolution: formData.resolution || null,
        })
        .select()

      if (error) throw error

      toast({
        title: "Incidencia reportada",
        description: "La incidencia ha sido registrada exitosamente",
      })
      router.push("/dashboard/support")
    } catch (error) {
      console.error("Error al reportar incidencia:", error)
      toast({
        title: "Error",
        description: "No se pudo reportar la incidencia. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Reportar Incidencia" text="Registra una nueva incidencia de soporte técnico">
        <Button variant="outline" asChild>
          <Link href="/dashboard/support">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información de la Incidencia</CardTitle>
            <CardDescription>Ingresa los detalles de la incidencia para registrarla en el sistema.</CardDescription>
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
                  Busca y selecciona un cliente para reportar una incidencia
                </div>
              )}
            </div>

            {selectedClient && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Detalles de la Incidencia</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Incidencia</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                        required
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Conexión">Problema de Conexión</SelectItem>
                          <SelectItem value="Hardware">Problema de Hardware</SelectItem>
                          <SelectItem value="Velocidad">Problema de Velocidad</SelectItem>
                          <SelectItem value="Configuración">Problema de Configuración</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => handleSelectChange("priority", value)}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Selecciona la prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baja</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Descripción</Label>
                      <textarea
                        id="description"
                        name="description"
                        className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="Describe detalladamente el problema que presenta el cliente"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/support">Cancelar</Link>
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading || !selectedClient}>
              {isLoading ? "Reportando..." : "Reportar Incidencia"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}
