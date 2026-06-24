import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"

export default function EditClientPage({ params }: { params: { id: string } }) {
  // En una aplicación real, obtendríamos los datos del cliente desde una API o base de datos
  const client = {
    id: params.id,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+1234567890",
    address: "Calle Principal 123, Colonia Centro",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "12345",
    plan: "fibra-50",
    status: "active",
    amount: "500.00",
    nextPayment: "2025-04-15",
    installationDate: "2024-01-10",
    paymentDay: "15",
    paymentMethod: "card",
    notes: "Cliente desde enero 2024. Instalación sin problemas.",
    idNumber: "ABC123456",
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Editar Cliente: ${client.name}`} text={`ID: ${client.id}`}>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/clients/${client.id}`}>
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
          <CardDescription>Actualiza los datos del cliente en el sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Datos Personales</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" defaultValue={client.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue={client.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" defaultValue={client.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id-number">Número de Identificación</Label>
                <Input id="id-number" defaultValue={client.idNumber} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dirección de Instalación</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue={client.address} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" defaultValue={client.city} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado/Provincia</Label>
                <Input id="state" defaultValue={client.state} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Código Postal</Label>
                <Input id="postal-code" defaultValue={client.postalCode} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input id="country" defaultValue="México" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Detalles del Servicio</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="plan">Plan de Internet</Label>
                <Select defaultValue={client.plan}>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Selecciona un plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fibra-20">Fibra 20Mbps - $300/mes</SelectItem>
                    <SelectItem value="fibra-50">Fibra 50Mbps - $500/mes</SelectItem>
                    <SelectItem value="fibra-100">Fibra 100Mbps - $750/mes</SelectItem>
                    <SelectItem value="fibra-200">Fibra 200Mbps - $1,000/mes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="installation-date">Fecha de Instalación</Label>
                <Input id="installation-date" type="date" defaultValue={client.installationDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-day">Día de Pago</Label>
                <Select defaultValue={client.paymentDay}>
                  <SelectTrigger id="payment-day">
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
                <Label htmlFor="payment-method">Método de Pago Preferido</Label>
                <Select defaultValue={client.paymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Selecciona un método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Tarjeta de Crédito/Débito</SelectItem>
                    <SelectItem value="transfer">Transferencia Bancaria</SelectItem>
                    <SelectItem value="cash">Efectivo</SelectItem>
                    <SelectItem value="mobile">Pago Móvil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Estado de la Cuenta</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select defaultValue={client.status}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Al día</SelectItem>
                    <SelectItem value="pending">Por vencer</SelectItem>
                    <SelectItem value="overdue">Vencido</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="next-payment">Próximo Pago</Label>
                <Input id="next-payment" type="date" defaultValue={client.nextPayment} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Adicional</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <textarea
                id="notes"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                defaultValue={client.notes}
              ></textarea>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/clients/${client.id}`}>Cancelar</Link>
          </Button>
          <div className="flex space-x-2">
            <Button variant="destructive">Eliminar Cliente</Button>
            <Button>Guardar Cambios</Button>
          </div>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
