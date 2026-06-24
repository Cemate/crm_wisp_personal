import Link from "next/link"
import { LucideUsers, LucideWallet, LucideMessageSquare, LucideBarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">ISP CRM AI Manager</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Gestiona tus clientes ISP con IA</h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Registra pagos, automatiza comunicaciones por WhatsApp y mejora la atención al cliente con nuestro
                    CRM potenciado por Inteligencia Artificial.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">Comenzar Ahora</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/demo">Ver Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 lg:ml-auto">
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl font-bold">Características Principales</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Todo lo que necesitas para gestionar tu negocio ISP
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <LucideUsers className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">Gestión de Clientes</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Administra toda la información de tus clientes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <LucideWallet className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">Registro de Pagos</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Controla los pagos y genera reportes automáticos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <LucideMessageSquare className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">Integración con WhatsApp</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Comunicación automatizada con tus clientes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <LucideBarChart className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">Análisis y Reportes</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualiza el rendimiento de tu negocio
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Gestión de Clientes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Administra tu cartera de clientes
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Mantén toda la información de tus clientes organizada. Registra datos de contacto, planes contratados,
                  historial de pagos y más.
                </p>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Clientes Recientes</CardTitle>
                    <CardDescription>Ejemplo de la vista de clientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <LucideUsers className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Cliente Ejemplo {i}</h3>
                            <p className="text-sm text-gray-500">Plan Fibra 50Mbps</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">$500.00</div>
                            <div className="text-xs text-green-500">Al día</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex justify-center order-last lg:order-first">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Asistente IA para WhatsApp</CardTitle>
                    <CardDescription>Automatiza tus comunicaciones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                        <div className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            AI
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-sm">
                              Hola Juan, te recordamos que tu pago mensual vence en 3 días. Puedes realizarlo a través
                              de nuestra plataforma o responder a este mensaje para más opciones.
                            </p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Ver opciones
                              </Button>
                              <Button size="sm">Pagar ahora</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <LucideUsers className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">Gracias por el recordatorio. ¿Puedo pagar con tarjeta de crédito?</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                        <div className="flex items-start gap-4">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            AI
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              ¡Claro que sí! Puedes pagar con tarjeta de crédito a través de nuestro portal web o te
                              puedo enviar un link de pago. ¿Qué prefieres?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Comunicación Inteligente
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Automatiza tus comunicaciones con IA
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Nuestro asistente IA se integra con WhatsApp para enviar recordatorios de pago, responder consultas
                  frecuentes y mantener a tus clientes informados.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Recordatorios automáticos de pago</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Respuestas inteligentes a consultas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Notificaciones de corte y reconexión</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Soporte 24/7 automatizado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 ISP CRM AI Manager. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Términos
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Privacidad
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
