"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LucideMessageSquare, LucideUsers, LucideCheck, LucideX, LucidePlus } from "lucide-react"
import Link from "next/link"

type Template = {
  id: number
  name: string
  content: string
  status: "Activo" | "Inactivo"
}

type ChatMessage = {
  id: number
  role: "ai" | "user"
  text: string
}

const initialTemplates: Template[] = [
  {
    id: 1,
    name: "Recordatorio de Pago",
    content: "Hola {nombre}, te recordamos que tu pago de {monto} vence el {fecha}. Gracias por tu preferencia.",
    status: "Activo",
  },
  {
    id: 2,
    name: "Confirmación de Pago",
    content: "¡Gracias {nombre}! Hemos recibido tu pago de {monto}. Tu servicio está activo.",
    status: "Activo",
  },
  {
    id: 3,
    name: "Aviso de Corte",
    content: "Estimado {nombre}, tu servicio será suspendido el {fecha} por falta de pago. Regulariza tu situación.",
    status: "Activo",
  },
  {
    id: 4,
    name: "Bienvenida",
    content: "¡Bienvenido {nombre}! Gracias por elegirnos como tu proveedor de internet.",
    status: "Inactivo",
  },
  {
    id: 5,
    name: "Soporte Técnico",
    content: "Hola {nombre}, hemos recibido tu reporte. Un técnico se pondrá en contacto contigo pronto.",
    status: "Activo",
  },
]

function generateAIReply(message: string): string {
  const text = message.toLowerCase()
  if (text.includes("pago") || text.includes("vence") || text.includes("deuda")) {
    return "Tu próximo pago vence el 15 de abril de 2025 por un monto de $500.00. ¿Te gustaría realizar el pago ahora o configurar un recordatorio?"
  }
  if (text.includes("internet") || text.includes("lento") || text.includes("falla") || text.includes("soporte")) {
    return "Lamento los inconvenientes. Para ayudarte con el soporte técnico, ¿podrías indicarme si las luces de tu módem están encendidas? También puedo agendar una visita técnica."
  }
  if (text.includes("plan") || text.includes("precio") || text.includes("velocidad")) {
    return "Contamos con planes desde 50 Mbps hasta 500 Mbps. ¿Te gustaría que te comparta los detalles y precios de cada uno?"
  }
  if (text.includes("hola") || text.includes("buenas") || text.includes("buenos")) {
    return "¡Hola! Soy el asistente virtual de tu proveedor de internet. ¿En qué puedo ayudarte hoy?"
  }
  return "Gracias por tu mensaje. Estoy procesando tu consulta. ¿Podrías darme más detalles para poder ayudarte mejor?"
}

export default function WhatsAppAIPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)

  // Template dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"new" | "edit" | "view">("new")
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null)
  const [formName, setFormName] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formActive, setFormActive] = useState(true)

  // Chat simulator state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "ai",
      text: "¡Hola! Soy el asistente virtual de tu proveedor de internet. Estoy aquí para ayudarte con consultas, pagos y soporte técnico. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [chatInput, setChatInput] = useState("")

  function openNewTemplate() {
    setDialogMode("new")
    setActiveTemplate(null)
    setFormName("")
    setFormContent("")
    setFormActive(true)
    setDialogOpen(true)
  }

  function openEditTemplate(template: Template) {
    setDialogMode("edit")
    setActiveTemplate(template)
    setFormName(template.name)
    setFormContent(template.content)
    setFormActive(template.status === "Activo")
    setDialogOpen(true)
  }

  function openViewTemplate(template: Template) {
    setDialogMode("view")
    setActiveTemplate(template)
    setFormName(template.name)
    setFormContent(template.content)
    setFormActive(template.status === "Activo")
    setDialogOpen(true)
  }

  function saveTemplate() {
    if (!formName.trim()) return
    const status: Template["status"] = formActive ? "Activo" : "Inactivo"
    if (dialogMode === "new") {
      setTemplates((prev) => [
        ...prev,
        { id: Date.now(), name: formName.trim(), content: formContent.trim(), status },
      ])
    } else if (dialogMode === "edit" && activeTemplate) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === activeTemplate.id ? { ...t, name: formName.trim(), content: formContent.trim(), status } : t,
        ),
      )
    }
    setDialogOpen(false)
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = chatInput.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setChatInput("")
    const reply = generateAIReply(trimmed)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: reply }])
    }, 600)
  }

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
                  <Button size="sm" onClick={openNewTemplate}>
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Nueva Plantilla
                  </Button>
                </div>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between rounded-lg border p-4">
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
                        <Button variant="outline" size="sm" onClick={() => openEditTemplate(template)}>
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openViewTemplate(template)}>
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
                    {messages.map((msg) =>
                      msg.role === "ai" ? (
                        <div key={msg.id} className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs shrink-0">
                            AI
                          </div>
                          <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div key={msg.id} className="flex items-start gap-4 justify-end">
                          <div className="flex-1 rounded-lg bg-primary/10 p-3 shadow-sm max-w-[80%]">
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <LucideUsers className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  <form onSubmit={sendMessage} className="mt-4 flex items-center gap-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      className="flex-1"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <Button type="submit">Enviar</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "new"
                ? "Nueva Plantilla"
                : dialogMode === "edit"
                  ? "Editar Plantilla"
                  : "Ver Plantilla"}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "view"
                ? "Detalles de la plantilla de mensaje."
                : "Define el nombre y el contenido del mensaje. Usa variables como {nombre}, {monto} o {fecha}."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="template-name">Nombre de la plantilla</Label>
              <Input
                id="template-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                disabled={dialogMode === "view"}
                placeholder="Ej. Recordatorio de Pago"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-content">Contenido del mensaje</Label>
              <textarea
                id="template-content"
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:opacity-70"
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                disabled={dialogMode === "view"}
                placeholder="Escribe el contenido del mensaje..."
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="template-active">Plantilla activa</Label>
              <Switch
                id="template-active"
                checked={formActive}
                onCheckedChange={setFormActive}
                disabled={dialogMode === "view"}
              />
            </div>
          </div>
          <DialogFooter>
            {dialogMode === "view" ? (
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cerrar
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveTemplate} disabled={!formName.trim()}>
                  {dialogMode === "new" ? "Crear Plantilla" : "Guardar Cambios"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
