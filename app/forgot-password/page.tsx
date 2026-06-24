import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">ISP CRM AI Manager</h1>
            <p className="text-sm text-muted-foreground">Recupera el acceso a tu cuenta</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recuperar Contraseña</CardTitle>
              <CardDescription>Ingresa tu correo electrónico para recibir instrucciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">Enviar Instrucciones</Button>
              <div className="text-center text-sm">
                <Link href="/login" className="text-primary hover:underline">
                  Volver a Iniciar Sesión
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

