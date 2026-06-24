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
import { createPayment } from "@/lib/services/payment-service"
import { getClients, getClientById } from "@/lib/services/client-service"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewPaymentPage() {
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
    amount: "",
    payment_date: new Date().toISOString().split("T")[0],
    due_date: "",
    method: "",
    reference: "",
    status: "completed",
    period_start: "",
    period_end: "",
    notes: "",
    send_receipt: false,
    send_confirmation: false,
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
              amount: client.plans?.price?.toString() || "",
              due_date: new Date().toISOString().split("T")[0], // Fecha actual como fecha de vencimiento por defecto
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleClientSelect = async (id: string) => {
    try {
      const client = await getClientById(id)
      if (client) {
        setSelectedClient(client)
        setFormData((prev) => ({
          ...prev,
          client_id: client.id,
          amount: client.plans?.price?.toString() || "",
          due_date: new Date().toISOString().split("T")[0], // Fecha actual como fecha de vencimiento por defecto
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
    // Esta es una búsqueda simple en el cliente, en producción debería hacerse en el servidor
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (filtered.length === 1) {
      handleClientSelect(filtered[0].id)
    } else if (filtered.length > 1) {
      // Mostrar resultados para que el usuario seleccione
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
      // Preparar datos para enviar
      const paymentData = {
        client_id: formData.client_id,
        amount: Number.parseFloat(formData.amount),
        payment_date: formData.payment_date,
        due_date: formData.due_date,
        method: formData.method,
        reference: formData.reference,
        status: formData.status,
        period_start: formData.period_start || null,
        period_end: formData.period_end || null,
        notes: formData.notes,
      }

      await createPayment(paymentData)

      // Enviar notificaciones si están marcadas
      if (formData.send_receipt || formData.send_confirmation) {
        // Aquí iría la lógica para enviar notificaciones
        console.log("Enviando notificaciones:", {
          whatsapp: formData.send_receipt,
          email: formData.send_confirmation,
        })
      }

      toast({
        title: "Pago registrado",
        description: "El pago ha sido registrado exitosamente",
      })
      router.push("/dashboard/payments")
    } catch (error) {
      console.error("Error al registrar pago:", error)
      toast({
        title: "Error",
        description: "No se pudo registrar el pago. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Registrar Pago" text="Registra un nuevo pago en el sistema">
        <Button variant="outline" asChild>
          <Link href="/dashboard/payments">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Pago</CardTitle>
            <CardDescription>Ingresa los datos del pago para registrarlo en el sistema.</CardDescription>
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
                      <p className="font-medium">${selectedClient.plans?.price?.toFixed(2) || "0.00"}</p>
                      <p className="text-sm text-muted-foreground">
                        Vence:{" "}
                        {selectedClient.payment_day ? `Día ${selectedClient.payment_day} de cada mes` : "No definido"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed p-4 text-center text-muted-foreground">
                  Busca y selecciona un cliente para registrar su pago
                </div>
              )}
            </div>

            {selectedClient && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Detalles del Pago</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Monto</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment_date">Fecha de Pago</Label>
                      <Input
                        id="payment_date"
                        name="payment_date"
                        type="date"
                        value={formData.payment_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Método de Pago</Label>
                      <Select
                        value={formData.method}
                        onValueChange={(value) => handleSelectChange("method", value)}
                        required
                      >
                        <SelectTrigger id="method">
                          <SelectValue placeholder="Selecciona un método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                          <SelectItem value="Transferencia">Transferencia Bancaria</SelectItem>
                          <SelectItem value="Efectivo">Efectivo</SelectItem>
                          <SelectItem value="Pago Móvil">Pago Móvil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference">Referencia/Comprobante</Label>
                      <Input
                        id="reference"
                        name="reference"
                        placeholder="Número de referencia o comprobante"
                        value={formData.reference}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Periodo de Pago</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="period_start">Inicio del Periodo</Label>
                      <Input
                        id="period_start"
                        name="period_start"
                        type="date"
                        value={formData.period_start}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period_end">Fin del Periodo</Label>
                      <Input
                        id="period_end"
                        name="period_end"
                        type="date"
                        value={formData.period_end}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Opciones Adicionales</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="send_receipt"
                      checked={formData.send_receipt}
                      onCheckedChange={(checked) => handleCheckboxChange("send_receipt", checked as boolean)}
                    />
                    <Label htmlFor="send_receipt" className="text-sm font-medium">
                      Enviar recibo por WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="send_confirmation"
                      checked={formData.send_confirmation}
                      onCheckedChange={(checked) => handleCheckboxChange("send_confirmation", checked as boolean)}
                    />
                    <Label htmlFor="send_confirmation" className="text-sm font-medium">
                      Enviar confirmación por correo electrónico
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="Información adicional sobre el pago"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/payments">Cancelar</Link>
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading || !selectedClient}>
              {isLoading ? "Registrando..." : "Registrar Pago"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}

