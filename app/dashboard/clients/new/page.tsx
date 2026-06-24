"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/services/client-service"
import { getActivePlans } from "@/lib/services/plan-service"
import { useToast } from "@/hooks/use-toast"

export default function NewClientPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [plans, setPlans] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    id_number: "",
    plan_id: "",
    installation_date: "",
    payment_day: "",
    payment_method: "",
    notes: "",
    status: "active",
  })

  // Cargar planes activos al montar el componente
  useState(() => {
    const loadPlans = async () => {
      try {
        const plansData = await getActivePlans()
        setPlans(plansData)
      } catch (error) {
        console.error("Error al cargar planes:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los planes disponibles",
          variant: "destructive",
        })
      }
    }

    loadPlans()
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createClient(formData)
      toast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente",
      })
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Error al crear cliente:", error)
      toast({
        title: "Error",
        description: "No se pudo crear el cliente. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Nuevo Cliente" text="Agrega un nuevo cliente a tu sistema">
        <Button variant="outline" asChild>
          <Link href="/dashboard/clients">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Ingresa los datos del nuevo cliente para registrarlo en el sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Datos Personales</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre y apellidos"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id_number">Número de Identificación</Label>
                  <Input
                    id="id_number"
                    name="id_number"
                    placeholder="DNI/Cédula/Pasaporte"
                    value={formData.id_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dirección de Instalación</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Calle, número, colonia"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado/Provincia</Label>
                  <Input id="state" name="state" placeholder="Estado" value={formData.state} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Código Postal</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    placeholder="Código postal"
                    value={formData.postal_code}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detalles del Servicio</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan de Internet</Label>
                  <Select value={formData.plan_id} onValueChange={(value) => handleSelectChange("plan_id", value)}>
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Selecciona un plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - ${plan.price}/mes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installation_date">Fecha de Instalación</Label>
                  <Input
                    id="installation_date"
                    name="installation_date"
                    type="date"
                    value={formData.installation_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment_day">Día de Pago</Label>
                  <Select
                    value={formData.payment_day}
                    onValueChange={(value) => handleSelectChange("payment_day", value)}
                  >
                    <SelectTrigger id="payment_day">
                      <SelectValue placeholder="Selecciona el día" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment_method">Método de Pago Preferido</Label>
                  <Select
                    value={formData.payment_method}
                    onValueChange={(value) => handleSelectChange("payment_method", value)}
                  >
                    <SelectTrigger id="payment_method">
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
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Adicional</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <textarea
                  id="notes"
                  name="notes"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  placeholder="Información adicional sobre el cliente o la instalación"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard/clients">Cancelar</Link>
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Cliente"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}

