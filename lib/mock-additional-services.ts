// Datos mock de Servicios Adicionales (coinciden con la sección de Configuración).
// En una app real esto vendría de la base de datos.

export type BillingType = "once" | "monthly"

export interface AdditionalService {
  id: string
  name: string
  description: string
  price: number
  billing: BillingType
  active: boolean
}

export const additionalServices: AdditionalService[] = [
  {
    id: "instalacion",
    name: "Instalación",
    description: "Instalación de equipo y configuración inicial en domicilio",
    price: 500,
    billing: "once",
    active: true,
  },
  {
    id: "router-premium",
    name: "Router Premium",
    description: "Router de alto rendimiento con cobertura extendida",
    price: 200,
    billing: "monthly",
    active: true,
  },
  {
    id: "ip-fija",
    name: "IP Fija",
    description: "Dirección IP pública fija para el cliente",
    price: 150,
    billing: "monthly",
    active: true,
  },
  {
    id: "soporte-prioritario",
    name: "Soporte Prioritario",
    description: "Atención preferente y tiempos de respuesta reducidos",
    price: 100,
    billing: "monthly",
    active: true,
  },
  {
    id: "tv-internet",
    name: "TV por Internet",
    description: "Paquete de canales por streaming incluido",
    price: 250,
    billing: "monthly",
    active: false,
  },
]

// Servicios activos disponibles para ofrecer/contratar.
export const availableAdditionalServices = additionalServices.filter((s) => s.active)

// Ayuda para formatear el precio con su periodicidad.
export function formatServicePrice(service: AdditionalService): string {
  const amount = `$${service.price.toFixed(2)}`
  return service.billing === "monthly" ? `${amount}/mes` : `${amount} (único)`
}
