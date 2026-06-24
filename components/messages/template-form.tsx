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
import type { MessageTemplate } from "@/lib/sample-messages-data"

export function TemplateForm({ template }: { template?: MessageTemplate }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: template?.name ?? "",
    type: template?.type ?? "",
    content: template?.content ?? "",
    status: template?.status ?? "Activo",
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
        title: template ? "Plantilla actualizada" : "Plantilla creada",
        description: `La plantilla "${formData.name}" se guardó correctamente.`,
      })
      setIsLoading(false)
      router.push("/dashboard/messages?tab=templates")
    }, 600)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{template ? "Editar Plantilla" : "Información de la Plantilla"}</CardTitle>
          <CardDescription>
            Usa variables como [nombre], [monto], [fecha] o [empresa] que se reemplazarán automáticamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Plantilla</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej. Recordatorio de Pago"
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
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                  <SelectItem value="Soporte">Soporte</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Informativa">Informativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Contenido del Mensaje</Label>
            <textarea
              id="content"
              name="content"
              className="w-full min-h-[160px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Escribe el contenido de la plantilla..."
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData((p) => ({ ...p, status: value }))}>
              <SelectTrigger id="status" className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/messages?tab=templates">Cancelar</Link>
          </Button>
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Plantilla"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
