import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Configuración" text="Administra la configuración de tu sistema" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="plans">Planes y Servicios</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>Configura la información básica de tu empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input id="company-name" defaultValue="Mi Proveedor ISP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Identificación Fiscal</Label>
                  <Input id="tax-id" defaultValue="ABC123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" defaultValue="contacto@miproveedor.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+1234567890" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" defaultValue="Calle Principal 123, Ciudad" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo de la Empresa</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline">Cambiar Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración Regional</CardTitle>
              <CardDescription>Configura la moneda, zona horaria y formato de fecha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select defaultValue="MXN">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Selecciona una moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                      <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                      <SelectItem value="ARS">Peso Argentino (ARS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select defaultValue="America/Mexico_City">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecciona una zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                      <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                      <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Los Ángeles (GMT-8)</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Fecha</Label>
                  <Select defaultValue="DD/MM/YYYY">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Selecciona un formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planes de Internet</CardTitle>
              <CardDescription>Configura los planes que ofreces a tus clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button asChild>
                  <Link href="/dashboard/settings/plans">Administrar Planes</Link>
                </Button>
              </div>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left text-sm font-medium">Nombre</th>
                      <th className="p-2 text-left text-sm font-medium">Velocidad</th>
                      <th className="p-2 text-left text-sm font-medium">Precio</th>
                      <th className="p-2 text-left text-sm font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        <Link href="/dashboard/settings/plans" className="text-primary hover:underline">
                          Haga clic aquí para administrar los planes
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Servicios Adicionales</CardTitle>
              <CardDescription>Configura servicios adicionales que puedes ofrecer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button>Agregar Servicio</Button>
              </div>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left text-sm font-medium">Nombre</th>
                      <th className="p-2 text-left text-sm font-medium">Descripción</th>
                      <th className="p-2 text-left text-sm font-medium">Precio</th>
                      <th className="p-2 text-left text-sm font-medium">Estado</th>
                      <th className="p-2 text-right text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Instalación", description: "Instalación de equipos", price: "$500.00", active: true },
                      {
                        name: "Router Premium",
                        description: "Router de alto rendimiento",
                        price: "$1,200.00",
                        active: true,
                      },
                      { name: "IP Fija", description: "Dirección IP estática", price: "$200.00/mes", active: true },
                      {
                        name: "Soporte Prioritario",
                        description: "Atención preferencial",
                        price: "$150.00/mes",
                        active: true,
                      },
                      { name: "TV por Internet", description: "Servicio de IPTV", price: "$300.00/mes", active: false },
                    ].map((service, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 text-sm">{service.name}</td>
                        <td className="p-2 text-sm">{service.description}</td>
                        <td className="p-2 text-sm">{service.price}</td>
                        <td className="p-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Switch checked={service.active} />
                            <span>{service.active ? "Activo" : "Inactivo"}</span>
                          </div>
                        </td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo se envían las notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificaciones de Pago</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-reminder">Recordatorio de Pago</Label>
                      <p className="text-sm text-muted-foreground">Enviar recordatorio antes del vencimiento</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="payment-reminder" defaultChecked />
                      <Select defaultValue="3">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Días" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 día</SelectItem>
                          <SelectItem value="3">3 días</SelectItem>
                          <SelectItem value="5">5 días</SelectItem>
                          <SelectItem value="7">7 días</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-confirmation">Confirmación de Pago</Label>
                      <p className="text-sm text-muted-foreground">Enviar confirmación cuando se registra un pago</p>
                    </div>
                    <Switch id="payment-confirmation" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-overdue">Aviso de Pago Vencido</Label>
                      <p className="text-sm text-muted-foreground">Enviar aviso cuando el pago está vencido</p>
                    </div>
                    <Switch id="payment-overdue" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificaciones de Soporte</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="support-new">Nueva Incidencia</Label>
                      <p className="text-sm text-muted-foreground">Notificar cuando se registra una nueva incidencia</p>
                    </div>
                    <Switch id="support-new" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="support-update">Actualización de Incidencia</Label>
                      <p className="text-sm text-muted-foreground">Notificar cuando se actualiza una incidencia</p>
                    </div>
                    <Switch id="support-update" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="support-resolved">Incidencia Resuelta</Label>
                      <p className="text-sm text-muted-foreground">Notificar cuando se resuelve una incidencia</p>
                    </div>
                    <Switch id="support-resolved" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canales de Notificación</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="channel-whatsapp">WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">Enviar notificaciones por WhatsApp</p>
                    </div>
                    <Switch id="channel-whatsapp" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="channel-email">Correo Electrónico</Label>
                      <p className="text-sm text-muted-foreground">Enviar notificaciones por correo electrónico</p>
                    </div>
                    <Switch id="channel-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="channel-sms">SMS</Label>
                      <p className="text-sm text-muted-foreground">Enviar notificaciones por SMS</p>
                    </div>
                    <Switch id="channel-sms" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
              <CardDescription>Configura las integraciones con servicios externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp Business API</h3>
                      <p className="text-sm text-muted-foreground">Conectado</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" asChild>
                      <Link href="/whatsapp-ai">Configurar</Link>
                    </Button>
                    <Button variant="outline">Desconectar</Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Pasarela de Pagos</h3>
                      <p className="text-sm text-muted-foreground">No conectado</p>
                    </div>
                  </div>
                  <Button>Conectar</Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Sistema de Monitoreo</h3>
                      <p className="text-sm text-muted-foreground">No conectado</p>
                    </div>
                  </div>
                  <Button>Conectar</Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Sistema Contable</h3>
                      <p className="text-sm text-muted-foreground">No conectado</p>
                    </div>
                  </div>
                  <Button>Conectar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios del Sistema</CardTitle>
              <CardDescription>Administra los usuarios que tienen acceso al sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button>Agregar Usuario</Button>
              </div>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left text-sm font-medium">Nombre</th>
                      <th className="p-2 text-left text-sm font-medium">Correo Electrónico</th>
                      <th className="p-2 text-left text-sm font-medium">Rol</th>
                      <th className="p-2 text-left text-sm font-medium">Estado</th>
                      <th className="p-2 text-right text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Administrador", email: "admin@miproveedor.com", role: "Administrador", active: true },
                      { name: "Soporte Técnico", email: "soporte@miproveedor.com", role: "Técnico", active: true },
                      { name: "Ventas", email: "ventas@miproveedor.com", role: "Ventas", active: true },
                      {
                        name: "Contabilidad",
                        email: "contabilidad@miproveedor.com",
                        role: "Contabilidad",
                        active: true,
                      },
                      { name: "Operador", email: "operador@miproveedor.com", role: "Operador", active: false },
                    ].map((user, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 text-sm">{user.name}</td>
                        <td className="p-2 text-sm">{user.email}</td>
                        <td className="p-2 text-sm">{user.role}</td>
                        <td className="p-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Switch checked={user.active} />
                            <span>{user.active ? "Activo" : "Inactivo"}</span>
                          </div>
                        </td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>Configura los roles y permisos del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button>Agregar Rol</Button>
              </div>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left text-sm font-medium">Rol</th>
                      <th className="p-2 text-left text-sm font-medium">Descripción</th>
                      <th className="p-2 text-right text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Administrador", description: "Acceso completo al sistema" },
                      { name: "Técnico", description: "Gestión de soporte técnico y visitas" },
                      { name: "Ventas", description: "Gestión de clientes y ventas" },
                      { name: "Contabilidad", description: "Gestión de pagos y finanzas" },
                      { name: "Operador", description: "Acceso limitado a funciones básicas" },
                    ].map((role, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2 text-sm">{role.name}</td>
                        <td className="p-2 text-sm">{role.description}</td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
