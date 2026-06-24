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
import { sampleTemplates } from "@/lib/sample-messages-data"

export function MessageForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipient: "",
    channel: "whatsapp",
    template: "",
    message: "",
  })

  const handleTemplateChange = (value: string) => {
    const tpl = sampleTemplates.find((t) => t.id === value)
    setFormData((prev) => ({ ...prev, template: value, message: tpl ? tpl.content : prev.message }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "El mensaje se envió correctamente al cliente.",
      })
      setIsLoading(false)
      router.push("/dashboard/messages")
    }, 600)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Nuevo Mensaje</CardTitle>
          <CardDescription>Envía un mensaje directo a un cliente por el canal que elijas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Destinatario</Label>
              <Input
                id="recipient"
                name="recipient"
                placeholder="Nombre o teléfono del cliente"
                value={formData.recipient}
                onChange={(e) => setFormData((p) => ({ ...p, recipient: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channel">Canal</Label>
              <Select
                value={formData.channel}
                onValueChange={(value) => setFormData((p) => ({ ...p, channel: value }))}
              >
                <SelectTrigger id="channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Correo Electrónico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Usar Plantilla (opcional)</Label>
            <Select value={formData.template} onValueChange={handleTemplateChange}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Selecciona una plantilla" />
              </SelectTrigger>
              <SelectContent>
                {sampleTemplates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <textarea
              id="message"
              name="message"
              className="w-full min-h-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/messages">Cancelar</Link>
          </Button>
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
