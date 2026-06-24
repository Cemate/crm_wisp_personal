import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Esta función crea un cliente de Supabase para el lado del servidor
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )
}

// Alias para mantener compatibilidad con las importaciones que usan `createClient`
export const createClient = createServerClient
