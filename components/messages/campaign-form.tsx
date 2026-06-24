"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { sampleTemplates, type Campaign } from "@/lib/sample-messages-data"

export function CampaignForm({ campaign }: { campaign?: Campaign }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: campaign?.name ?? "",
    type: campaign?.type ?? "",
    recipients: campaign?.status === "Borrador" || !campaign ? "todos" : "todos",
    template: campaign?.template ?? "",
    message: campaign?.message ?? "",
    date: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: campaign ? "Campaña actualizada" : "Campaña creada",
        description: `La campaña "${formData.name}" se guardó correctamente.`,
      })
      setIsLoading(false)
      router.push("/dashboard/messages?tab=campaigns")
    }, 600)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{campaign ? "Editar Campaña" : "Nueva Campaña"}</CardTitle>
          <CardDescription>Configura una campaña de comunicación masiva para tus clientes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Campaña</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej. Recordatorio Mensual"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData((p) => ({ ...p, type: value }))}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Informativa">Informativa</SelectItem>
                  <SelectItem value="Feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipients">Destinatarios</Label>
              <Select
                value={formData.recipients}
                onValueChange={(value) => setFormData((p) => ({ ...p, recipients: value }))}
              >
                <SelectTrigger id="recipients">
                  <SelectValue placeholder="Selecciona destinatarios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los clientes</SelectItem>
                  <SelectItem value="activos">Clientes activos</SelectItem>
                  <SelectItem value="vencidos">Clientes con pago vencido</SelectItem>
                  <SelectItem value="por-vencer">Clientes por vencer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Fecha de Envío</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="template">Plantilla Base (opcional)</Label>
              <Select
                value={formData.template}
                onValueChange={(value) => setFormData((p) => ({ ...p, template: value }))}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Selecciona una plantilla" />
                </SelectTrigger>
                <SelectContent>
                  {sampleTemplates.map((t) => (
                    <SelectItem key={t.id} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <textarea
              id="message"
              name="message"
              className="w-full min-h-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Escribe el mensaje de la campaña..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/messages?tab=campaigns">Cancelar</Link>
          </Button>
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Campaña"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
