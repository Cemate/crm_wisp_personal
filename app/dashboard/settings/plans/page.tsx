"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getPlans, createPlan, updatePlan, deletePlan } from "@/lib/services/plan-service"
import { useToast } from "@/hooks/use-toast"
import { LucidePlus, LucideEdit, LucideTrash2 } from "lucide-react"
import Link from "next/link"

export default function PlansPage() {
  const { toast } = useToast()
  const [plans, setPlans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    description: "",
    is_active: true,
  })

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    setIsLoading(true)
    try {
      const plansData = await getPlans()
      setPlans(plansData)
    } catch (error) {
      console.error("Error al cargar planes:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los planes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }))
  }

  const handleAddPlan = () => {
    setSelectedPlan(null)
    setFormData({
      name: "",
      speed: "",
      price: "",
      description: "",
      is_active: true,
    })
    setIsDialogOpen(true)
  }

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan)
    setFormData({
      name: plan.name,
      speed: plan.speed,
      price: plan.price.toString(),
      description: plan.description || "",
      is_active: plan.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDeletePlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const planData = {
        name: formData.name,
        speed: formData.speed,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        is_active: formData.is_active,
      }

      if (selectedPlan) {
        // Actualizar plan existente
        await updatePlan(selectedPlan.id, planData)
        toast({
          title: "Plan actualizado",
          description: "El plan ha sido actualizado exitosamente",
        })
      } else {
        // Crear nuevo plan
        await createPlan(planData)
        toast({
          title: "Plan creado",
          description: "El plan ha sido creado exitosamente",
        })
      }

      setIsDialogOpen(false)
      loadPlans()
    } catch (error) {
      console.error("Error al guardar plan:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el plan. Intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleConfirmDelete = async () => {
    if (!selectedPlan) return

    try {
      await deletePlan(selectedPlan.id)
      toast({
        title: "Plan eliminado",
        description: "El plan ha sido eliminado exitosamente",
      })
      setIsDeleteDialogOpen(false)
      loadPlans()
    } catch (error) {
      console.error("Error al eliminar plan:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el plan. Intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Planes de Internet" text="Gestiona los planes que ofreces a tus clientes">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">Volver</Link>
          </Button>
          <Button onClick={handleAddPlan}>
            <LucidePlus className="mr-2 h-4 w-4" />
            Agregar Plan
          </Button>
        </div>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Planes de Internet</CardTitle>
          <CardDescription>Configura los planes que ofreces a tus clientes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left text-sm font-medium">Nombre</th>
                  <th className="p-2 text-left text-sm font-medium">Velocidad</th>
                  <th className="p-2 text-left text-sm font-medium">Precio</th>
                  <th className="p-2 text-left text-sm font-medium">Estado</th>
                  <th className="p-2 text-right text-sm font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                      Cargando planes...
                    </td>
                  </tr>
                ) : plans.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                      No hay planes registrados.
                    </td>
                  </tr>
                ) : (
                  plans.map((plan) => (
                    <tr key={plan.id} className="border-b">
                      <td className="p-2 text-sm">{plan.name}</td>
                      <td className="p-2 text-sm">{plan.speed}</td>
                      <td className="p-2 text-sm">${plan.price.toFixed(2)}</td>
                      <td className="p-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Switch checked={plan.is_active} disabled />
                          <span>{plan.is_active ? "Activo" : "Inactivo"}</span>
                        </div>
                      </td>
                      <td className="p-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                            <LucideEdit className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan)}>
                            <LucideTrash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo para agregar/editar plan */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPlan ? "Editar Plan" : "Agregar Plan"}</DialogTitle>
            <DialogDescription>
              {selectedPlan ? "Modifica los detalles del plan seleccionado." : "Ingresa los detalles del nuevo plan."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Plan</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Fibra Básico"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="speed">Velocidad</Label>
                <Input
                  id="speed"
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                  placeholder="Ej. 20Mbps"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio Mensual</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción del plan"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="is_active">Plan Activo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{selectedPlan ? "Guardar Cambios" : "Crear Plan"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el plan "{selectedPlan?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
