import { CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { LucideSearch, LucideUsers, LucideCheck, LucidePlus, LucideFilter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { sampleTemplates, sampleCampaigns } from "@/lib/sample-messages-data"

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const validTabs = ["conversations", "templates", "campaigns", "settings"]
  const defaultTab = tab && validTabs.includes(tab) ? tab : "conversations"

  return (
    <DashboardShell>
      <DashboardHeader heading="Mensajes" text="Gestiona las comunicaciones con tus clientes">
        <div className="flex space-x-2">
          <Button variant="outline">
            <LucideFilter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button asChild>
            <Link href="/dashboard/messages/new">
              <LucidePlus className="mr-2 h-4 w-4" />
              Nuevo Mensaje
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversations">Conversaciones</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input placeholder="Buscar conversaciones..." />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="closed">Cerradas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="shrink-0">
              <LucideSearch className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <div className="md:col-span-2 rounded-md border">
              <div className="p-2 border-b">
                <Input placeholder="Buscar cliente..." />
              </div>
              <div className="divide-y">
                {[
                  { name: "Juan Pérez", lastMessage: "Gracias por la información", time: "10:30", unread: true },
                  { name: "María López", lastMessage: "¿Cuándo vence mi pago?", time: "Ayer", unread: false },
                  {
                    name: "Carlos Rodríguez",
                    lastMessage: "Tengo problemas con mi conexión",
                    time: "Ayer",
                    unread: true,
                  },
                  { name: "Ana Martínez", lastMessage: "Ya realicé el pago", time: "Lun", unread: false },
                  { name: "Roberto Sánchez", lastMessage: "Necesito cambiar mi plan", time: "Dom", unread: false },
                ].map((conversation, i) => (
                  <div key={i} className={`p-3 hover:bg-muted/50 cursor-pointer ${i === 0 ? "bg-muted/50" : ""}`}>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <LucideUsers className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.name}</p>
                          <p className="text-xs text-muted-foreground">{conversation.time}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 rounded-md border flex flex-col">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <LucideUsers className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">Juan Pérez</p>
                    <p className="text-xs text-muted-foreground">En línea</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Ver Perfil
                  </Button>
                  <Button variant="outline" size="sm">
                    Historial
                  </Button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[400px]">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <LucideUsers className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hola, quisiera saber cuándo vence mi próximo pago</p>
                    <p className="text-xs text-muted-foreground mt-1">10:15</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      Hola Juan, tu próximo pago vence el 15 de abril por un monto de $500.00. ¿Deseas realizar el pago
                      ahora?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">10:18</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    AI
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <LucideUsers className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Sí, me gustaría pagar ahora. ¿Qué opciones tengo?</p>
                    <p className="text-xs text-muted-foreground mt-1">10:25</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Puedes realizar el pago de las siguientes formas:</p>
                    <ul className="list-disc list-inside text-sm mt-1">
                      <li>Tarjeta de crédito/débito a través de nuestro portal</li>
                      <li>Transferencia bancaria</li>
                      <li>Pago en efectivo en nuestras oficinas</li>
                    </ul>
                    <p className="text-sm mt-2">¿Qué método prefieres?</p>
                    <p className="text-xs text-muted-foreground mt-1">10:28</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    AI
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <LucideUsers className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Prefiero pagar con tarjeta. ¿Me puedes enviar el link?</p>
                    <p className="text-xs text-muted-foreground mt-1">10:30</p>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Escribe un mensaje..." />
                  <Button>Enviar</Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <LucideCheck className="h-4 w-4 mr-1" />
                      Respuestas Rápidas
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      Usar IA
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Plantillas de Mensajes</CardTitle>
                  <CardDescription>Crea y gestiona plantillas para comunicaciones automáticas</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/messages/templates/new">
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Nueva Plantilla
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left text-sm font-medium">Nombre</th>
                      <th className="p-2 text-left text-sm font-medium">Tipo</th>
                      <th className="p-2 text-left text-sm font-medium">Contenido</th>
                      <th className="p-2 text-left text-sm font-medium">Estado</th>
                      <th className="p-2 text-right text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleTemplates.map((template) => (
                      <tr key={template.id} className="border-b">
                        <td className="p-2 text-sm">{template.name}</td>
                        <td className="p-2 text-sm">{template.type}</td>
                        <td className="p-2 text-sm truncate max-w-[200px]">{template.content}</td>
                        <td className="p-2 text-sm">
                          <Badge variant={template.status === "Activo" ? "default" : "outline"}>
                            {template.status}
                          </Badge>
                        </td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/messages/templates/${template.id}/edit`}>Editar</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/messages/templates/${template.id}`}>Ver</Link>
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

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campañas de Mensajes</CardTitle>
                  <CardDescription>Crea y gestiona campañas de comunicación masiva</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/messages/campaigns/new">
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Nueva Campaña
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left text-sm font-medium">Nombre</th>
                      <th className="p-2 text-left text-sm font-medium">Tipo</th>
                      <th className="p-2 text-left text-sm font-medium">Destinatarios</th>
                      <th className="p-2 text-left text-sm font-medium">Estado</th>
                      <th className="p-2 text-left text-sm font-medium">Fecha</th>
                      <th className="p-2 text-right text-sm font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b">
                        <td className="p-2 text-sm">{campaign.name}</td>
                        <td className="p-2 text-sm">{campaign.type}</td>
                        <td className="p-2 text-sm">{campaign.recipients}</td>
                        <td className="p-2 text-sm">
                          <Badge
                            variant={
                              campaign.status === "Completada"
                                ? "default"
                                : campaign.status === "Programada"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="p-2 text-sm">{campaign.date}</td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/messages/campaigns/${campaign.id}/edit`}>Editar</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/messages/campaigns/${campaign.id}`}>Ver</Link>
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

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Mensajes</CardTitle>
              <CardDescription>Configura las opciones de mensajería y comunicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuración General</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-response">Respuestas Automáticas</Label>
                      <p className="text-sm text-muted-foreground">
                        Activar respuestas automáticas para mensajes entrantes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-response"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ai-assistant">Asistente IA</Label>
                      <p className="text-sm text-muted-foreground">Usar IA para responder consultas comunes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="ai-assistant"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="business-hours">Horario de Atención</Label>
                      <p className="text-sm text-muted-foreground">Configurar horario para respuestas automáticas</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="business-hours"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Horario de Atención</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Hora de Inicio</Label>
                    <Input id="start-time" type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">Hora de Fin</Label>
                    <Input id="end-time" type="time" defaultValue="20:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Días de Atención</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {["L", "M", "X", "J", "V", "S", "D"].map((day, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <Label htmlFor={`day-${i}`} className="text-sm">
                          {day}
                        </Label>
                        <input
                          type="checkbox"
                          id={`day-${i}`}
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={i < 5}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Mensaje Fuera de Horario</h3>
                <div className="space-y-2">
                  <Label htmlFor="out-of-hours-message">Mensaje</Label>
                  <textarea
                    id="out-of-hours-message"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    defaultValue="Gracias por tu mensaje. Nuestro horario de atención es de lunes a viernes de 8:00 a 20:00. Te responderemos tan pronto como sea posible."
                  ></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuración de WhatsApp</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="whatsapp-number">Número de WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">Número principal para comunicaciones</p>
                    </div>
                    <Input id="whatsapp-number" className="w-[200px]" defaultValue="+1234567890" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="whatsapp-name">Nombre de Perfil</Label>
                      <p className="text-sm text-muted-foreground">Nombre visible para los clientes</p>
                    </div>
                    <Input id="whatsapp-name" className="w-[200px]" defaultValue="Mi Proveedor ISP" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
