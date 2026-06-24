import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucideMessageSquare, LucideUsers, LucideCheck, LucideX, LucidePlus } from "lucide-react"
import Link from "next/link"

export default function WhatsAppAIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">ISP CRM AI Manager</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline">Mi Cuenta</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Asistente IA para WhatsApp</h2>
              <p className="text-muted-foreground mt-2">
                Configura y gestiona tu asistente de IA para comunicaciones automáticas con tus clientes.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Asistente</CardTitle>
                <CardDescription>Personaliza cómo funciona tu asistente de IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assistant-name">Nombre del Asistente</Label>
                  <Input id="assistant-name" defaultValue="Asistente ISP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Mensaje de Bienvenida</Label>
                  <textarea
                    id="welcome-message"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    defaultValue="¡Hola! Soy el asistente virtual de tu proveedor de internet. Estoy aquí para ayudarte con consultas, pagos y soporte técnico. ¿En qué puedo ayudarte hoy?"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <Label>Capacidades del Asistente</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="capability-payments"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="capability-payments" className="text-sm font-medium">
                        Gestión de pagos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="capability-support"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="capability-support" className="text-sm font-medium">
                        Soporte técnico básico
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="capability-info"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="capability-info" className="text-sm font-medium">
                        Información de planes y servicios
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="capability-schedule"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="capability-schedule" className="text-sm font-medium">
                        Programación de visitas técnicas
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Guardar Configuración</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conexión con WhatsApp</CardTitle>
                <CardDescription>Conecta tu número de WhatsApp Business para comenzar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <LucideMessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp Business</h3>
                      <p className="text-sm text-muted-foreground">Conectado: +1234567890</p>
                    </div>
                  </div>
                  <Button variant="outline">Reconectar</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nombre del Negocio</Label>
                  <Input id="business-name" defaultValue="Mi Proveedor ISP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-description">Descripción del Negocio</Label>
                  <Input
                    id="business-description"
                    defaultValue="Proveedor de servicios de internet de alta velocidad"
                  />
                </div>
                <div className="pt-4">
                  <Button>Actualizar Información</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plantillas de Mensajes</CardTitle>
                <CardDescription>Crea y gestiona plantillas para comunicaciones automáticas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Plantillas Activas</h3>
                  <Button size="sm">
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Nueva Plantilla
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Recordatorio de Pago", status: "Activo" },
                    { name: "Confirmación de Pago", status: "Activo" },
                    { name: "Aviso de Corte", status: "Activo" },
                    { name: "Bienvenida", status: "Inactivo" },
                    { name: "Soporte Técnico", status: "Activo" },
                  ].map((template, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {template.status === "Activo" ? (
                            <span className="flex items-center text-green-500">
                              <LucideCheck className="mr-1 h-3 w-3" />
                              Activo
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <LucideX className="mr-1 h-3 w-3" />
                              Inactivo
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Simulador de Conversación</CardTitle>
                <CardDescription>Prueba cómo funciona tu asistente de IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-gray-50 p-4 h-[400px] flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-sm">
                          ¡Hola! Soy el asistente virtual de tu proveedor de internet. Estoy aquí para ayudarte con
                          consultas, pagos y soporte técnico. ¿En qué puedo ayudarte hoy?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 justify-end">
                      <div className="flex-1 rounded-lg bg-primary/10 p-3 shadow-sm max-w-[80%]">
                        <p className="text-sm">Hola, quisiera saber cuándo vence mi próximo pago</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <LucideUsers className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-sm">
                          Claro, puedo ayudarte con eso. Para acceder a la información de tu cuenta, necesito verificar
                          tu identidad. ¿Podrías proporcionarme tu número de cliente o el número de teléfono asociado a
                          tu cuenta?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 justify-end">
                      <div className="flex-1 rounded-lg bg-primary/10 p-3 shadow-sm max-w-[80%]">
                        <p className="text-sm">Mi número es 555-123-4567</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <LucideUsers className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-sm">
                          Gracias por la información. He verificado tu cuenta y tu próximo pago vence el 15 de abril de
                          2025 por un monto de $500.00. ¿Te gustaría realizar el pago ahora o configurar un
                          recordatorio?
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Pagar ahora
                          </Button>
                          <Button size="sm">Recordatorio</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Input placeholder="Escribe un mensaje..." className="flex-1" />
                    <Button>Enviar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
