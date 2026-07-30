"use client"

import { useMemo, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  LucideChevronDown,
  LucideMessageCircle,
  LucideMail,
  LucidePhone,
  LucideSend,
  LucideBookOpen,
  LucideClock,
  LucideSearch,
  LucideCircleCheck,
  LucideTriangleAlert,
  LucideLifeBuoy,
} from "lucide-react"
import {
  helpChannels,
  helpFaqs,
  helpGuides,
  helpTickets,
  helpTicketStatusLabels,
  helpTicketPriorityLabels,
  platformStatus,
  type HelpTicket,
} from "@/lib/mock-help"

const channelIcons: Record<string, typeof LucideMessageCircle> = {
  chat: LucideMessageCircle,
  whatsapp: LucideSend,
  email: LucideMail,
  phone: LucidePhone,
}

export default function HelpPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [openFaq, setOpenFaq] = useState<string | null>(helpFaqs[0]?.id ?? null)
  const [tickets, setTickets] = useState<HelpTicket[]>(helpTickets)
  const [form, setForm] = useState({ subject: "", category: "", priority: "medium", message: "" })

  const filteredFaqs = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return helpFaqs
    return helpFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.category.toLowerCase().includes(term),
    )
  }, [search])

  const filteredGuides = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return helpGuides
    return helpGuides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(term) ||
        guide.description.toLowerCase().includes(term) ||
        guide.category.toLowerCase().includes(term),
    )
  }, [search])

  const statusVariant = (status: HelpTicket["status"]) =>
    status === "resolved" ? "secondary" : status === "in_progress" ? "default" : "outline"

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.subject || !form.message) {
      toast({
        title: "Faltan datos",
        description: "Escribe un asunto y describe tu problema para enviar la solicitud.",
        variant: "destructive",
      })
      return
    }

    const newTicket: HelpTicket = {
      id: `SOP-${1043 + tickets.length}`,
      subject: form.subject,
      category: form.category || "General",
      status: "open",
      priority: form.priority as HelpTicket["priority"],
      createdAt: new Date().toISOString().slice(0, 10),
      lastUpdate: "hace unos segundos",
      agent: null,
    }

    setTickets((prev) => [newTicket, ...prev])
    setForm({ subject: "", category: "", priority: "medium", message: "" })
    toast({
      title: "Solicitud enviada",
      description: `Creamos el ticket ${newTicket.id}. Te responderemos por correo.`,
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Centro de Ayuda"
        text="Encuentra respuestas, guías y contacta al equipo de soporte de la plataforma"
      >
        <Button variant="outline" asChild>
          <a href="mailto:soporte@ispcrm.mx">
            <LucideLifeBuoy className="mr-2 h-4 w-4" />
            Contactar soporte
          </a>
        </Button>
      </DashboardHeader>

      <div className="relative">
        <LucideSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Busca en preguntas frecuentes y guías (ej. instalación, WhatsApp, pagos)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Buscar en el centro de ayuda"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {helpChannels.map((channel) => {
          const Icon = channelIcons[channel.id] ?? LucideMessageCircle
          return (
            <Card key={channel.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  {channel.online ? (
                    <Badge>{channel.availability}</Badge>
                  ) : (
                    <Badge variant="outline">{channel.availability}</Badge>
                  )}
                </div>
                <CardTitle className="pt-2 text-base">{channel.name}</CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{channel.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="guides">Guías</TabsTrigger>
          <TabsTrigger value="tickets">Mis Solicitudes</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                {filteredFaqs.length} {filteredFaqs.length === 1 ? "resultado" : "resultados"}
                {search ? ` para "${search}"` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredFaqs.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No encontramos resultados. Intenta con otras palabras o contáctanos directamente.
                </p>
              )}
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id
                return (
                  <div key={faq.id} className="rounded-md border">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{faq.category}</Badge>
                        <span className="text-sm font-medium">{faq.question}</span>
                      </div>
                      <LucideChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t px-4 py-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline">{guide.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <LucideClock className="h-3 w-3" />
                      {guide.minutes} min
                    </span>
                  </div>
                  <CardTitle className="pt-2 text-base">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      toast({ title: guide.title, description: "La guía se abrirá en la documentación." })
                    }
                  >
                    <LucideBookOpen className="mr-2 h-4 w-4" />
                    Leer guía
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filteredGuides.length === 0 && (
              <p className="py-6 text-sm text-muted-foreground">No hay guías que coincidan con tu búsqueda.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis Solicitudes de Soporte</CardTitle>
              <CardDescription>Seguimiento de los reportes que abriste con el equipo de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                      <Badge variant={statusVariant(ticket.status)}>{helpTicketStatusLabels[ticket.status]}</Badge>
                      <Badge variant="outline">{helpTicketPriorityLabels[ticket.priority]}</Badge>
                    </div>
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.category} · Creado el {ticket.createdAt} · Actualizado {ticket.lastUpdate}
                      {ticket.agent ? ` · Atiende ${ticket.agent}` : " · Sin asignar"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast({ title: `Solicitud ${ticket.id}`, description: "Abriendo la conversación completa." })
                    }
                  >
                    Ver detalle
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Enviar una Solicitud</CardTitle>
                <CardDescription>Describe tu problema y nuestro equipo te responderá por correo</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      placeholder="Ej. No puedo registrar un pago"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clientes">Clientes</SelectItem>
                          <SelectItem value="Facturación">Facturación</SelectItem>
                          <SelectItem value="WhatsApp IA">WhatsApp IA</SelectItem>
                          <SelectItem value="Soporte técnico">Soporte técnico</SelectItem>
                          <SelectItem value="Cuenta">Cuenta y accesos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select value={form.priority} onValueChange={(value) => setForm({ ...form, priority: value })}>
                        <SelectTrigger id="priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baja</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Descripción</Label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Cuéntanos qué ocurrió, qué esperabas y desde cuándo sucede."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <Button type="submit">
                    <LucideSend className="mr-2 h-4 w-4" />
                    Enviar solicitud
                  </Button>
                </CardContent>
              </form>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estado de la Plataforma</CardTitle>
                <CardDescription>{platformStatus.overall}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {platformStatus.services.map((service) => {
                  const ok = service.status === "Operativo"
                  return (
                    <div key={service.name} className="flex items-center justify-between gap-2">
                      <span className="text-sm">{service.name}</span>
                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${
                          ok ? "text-muted-foreground" : "text-destructive"
                        }`}
                      >
                        {ok ? (
                          <LucideCircleCheck className="h-3.5 w-3.5" />
                        ) : (
                          <LucideTriangleAlert className="h-3.5 w-3.5" />
                        )}
                        {service.status}
                      </span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
