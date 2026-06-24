import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Verificar que las variables de entorno estén definidas
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("NEXT_PUBLIC_SUPABASE_URL no está definida")
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida")
}

// Crear un singleton para el cliente de Supabase
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance

  supabaseInstance = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return supabaseInstance
}

// Para compatibilidad con código existente
export const supabase = getSupabase()
