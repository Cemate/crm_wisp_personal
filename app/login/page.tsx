import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">ISP CRM AI Manager</h1>
            <p className="text-sm text-muted-foreground">Inicia sesión para acceder a tu cuenta</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="remember" className="text-sm font-medium">
                  Recordarme
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" asChild>
                <Link href="/dashboard">Iniciar Sesión</Link>
              </Button>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Regístrate
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
