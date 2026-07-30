"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  LucideMail,
  LucidePhone,
  LucideShieldCheck,
  LucideMonitor,
  LucideSmartphone,
  LucideLaptop,
  LucideCalendarDays,
  LucideActivity,
} from "lucide-react"
import { currentUser, activeSessions, recentActivity, getInitials, formatDate } from "@/lib/mock-account"

export default function AccountPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") ?? "profile"
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    position: currentUser.position,
  })
  const [twoFactor, setTwoFactor] = useState(currentUser.twoFactorEnabled)
  const [sessions, setSessions] = useState(activeSessions)
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    payments: true,
    tickets: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const revokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    toast({ title: "Sesión cerrada", description: "El dispositivo ya no tiene acceso a tu cuenta." })
  }

  const deviceIcon = (device: string) => {
    if (device.toLowerCase().includes("iphone")) return LucideSmartphone
    if (device.toLowerCase().includes("macbook")) return LucideLaptop
    return LucideMonitor
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Mi Cuenta" text="Administra tu perfil, seguridad y preferencias" />

      <Card>
        <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <Badge>{currentUser.role}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{currentUser.position}</p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <LucideMail className="h-3.5 w-3.5" aria-hidden="true" />
                  {currentUser.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <LucidePhone className="h-3.5 w-3.5" aria-hidden="true" />
                  {currentUser.phone}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-2 text-sm sm:text-right">
            <span className="flex items-center gap-1.5 text-muted-foreground sm:justify-end">
              <LucideCalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Miembro desde {formatDate(currentUser.memberSince)}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground sm:justify-end">
              <LucideActivity className="h-3.5 w-3.5" aria-hidden="true" />
              Último acceso hoy, 09:42
            </span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={initialTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="sessions">Sesiones</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza los datos asociados a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Puesto</Label>
                <Input id="position" name="position" value={profile.position} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => toast({ title: "Perfil actualizado", description: "Tus datos se guardaron correctamente." })}>
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones realizadas con tu usuario</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((entry) => (
                  <div key={entry.id} className="flex items-start justify-between gap-4 px-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{entry.action}</p>
                      <p className="text-xs text-muted-foreground">{entry.detail}</p>
                    </div>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>Usa una contraseña única de al menos 8 caracteres</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => toast({ title: "Contraseña actualizada", description: "Tu contraseña se cambió correctamente." })}>
                Actualizar Contraseña
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticación en Dos Pasos</CardTitle>
              <CardDescription>Añade una capa extra de seguridad al iniciar sesión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <LucideShieldCheck className="mt-0.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium">Verificación por código</p>
                    <p className="text-sm text-muted-foreground">
                      Recibirás un código en tu teléfono cada vez que inicies sesión.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={twoFactor ? "default" : "outline"}>{twoFactor ? "Activo" : "Inactivo"}</Badge>
                  <Switch
                    checked={twoFactor}
                    onCheckedChange={(checked) => {
                      setTwoFactor(checked)
                      toast({
                        title: checked ? "2FA activado" : "2FA desactivado",
                        description: checked
                          ? "Tu cuenta ahora requiere un código adicional."
                          : "Se desactivó la verificación en dos pasos.",
                      })
                    }}
                    aria-label="Activar autenticación en dos pasos"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>Dispositivos donde tu cuenta tiene sesión abierta</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {sessions.map((session) => {
                  const Icon = deviceIcon(session.device)
                  return (
                    <div key={session.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-medium">{session.device}</p>
                            {session.current && <Badge variant="secondary">Este dispositivo</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.browser} · {session.location} · {session.ip}
                          </p>
                          <p className="text-xs text-muted-foreground">Última actividad: {session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm" onClick={() => revokeSession(session.id)}>
                          Cerrar sesión
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSessions((prev) => prev.filter((s) => s.current))
                  toast({ title: "Sesiones cerradas", description: "Se cerró la sesión en todos los demás dispositivos." })
                }}
              >
                Cerrar todas las demás
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias Regionales</CardTitle>
              <CardDescription>Configura idioma y zona horaria de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecciona un idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select defaultValue="mexico">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecciona una zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mexico">America/Mexico_City (GMT-6)</SelectItem>
                    <SelectItem value="bogota">America/Bogota (GMT-5)</SelectItem>
                    <SelectItem value="madrid">Europe/Madrid (GMT+2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Elige qué avisos quieres recibir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email", label: "Correo electrónico", desc: "Resúmenes y avisos generales del sistema" },
                { key: "whatsapp", label: "WhatsApp", desc: "Alertas inmediatas en tu teléfono" },
                { key: "payments", label: "Pagos recibidos", desc: "Notificar cuando un cliente registra un pago" },
                { key: "tickets", label: "Nuevos tickets", desc: "Notificar cuando se abre un ticket de soporte" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                    aria-label={`Activar notificaciones de ${item.label}`}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => toast({ title: "Preferencias guardadas", description: "Tus preferencias se actualizaron." })}>
                Guardar Preferencias
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
