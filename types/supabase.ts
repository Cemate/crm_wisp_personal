export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          id_number: string | null
          plan_id: string | null
          installation_date: string | null
          payment_day: number | null
          payment_method: string | null
          status: string
          notes: string | null
          coordinates: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone: string
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          id_number?: string | null
          plan_id?: string | null
          installation_date?: string | null
          payment_day?: number | null
          payment_method?: string | null
          status?: string
          notes?: string | null
          coordinates?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          id_number?: string | null
          plan_id?: string | null
          installation_date?: string | null
          payment_day?: number | null
          payment_method?: string | null
          status?: string
          notes?: string | null
          coordinates?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          name: string
          speed: string
          price: number
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          speed: string
          price: number
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          speed?: string
          price?: number
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          client_id: string
          amount: number
          payment_date: string
          due_date: string
          method: string
          reference: string | null
          status: string
          period_start: string | null
          period_end: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          amount: number
          payment_date: string
          due_date: string
          method: string
          reference?: string | null
          status?: string
          period_start?: string | null
          period_end?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          amount?: number
          payment_date?: string
          due_date?: string
          method?: string
          reference?: string | null
          status?: string
          period_start?: string | null
          period_end?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          client_id: string
          type: string
          description: string
          status: string
          priority: string
          assigned_to: string | null
          resolution: string | null
          created_at: string
          updated_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          type: string
          description: string
          status?: string
          priority?: string
          assigned_to?: string | null
          resolution?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          type?: string
          description?: string
          status?: string
          priority?: string
          assigned_to?: string | null
          resolution?: string | null
          created_at?: string
          updated_at?: string
          resolved_at?: string | null
        }
      }
      technical_visits: {
        Row: {
          id: string
          client_id: string
          ticket_id: string | null
          scheduled_date: string
          scheduled_time: string
          type: string
          status: string
          technician_name: string | null
          notes: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          ticket_id?: string | null
          scheduled_date: string
          scheduled_time: string
          type: string
          status?: string
          technician_name?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          ticket_id?: string | null
          scheduled_date?: string
          scheduled_time?: string
          type?: string
          status?: string
          technician_name?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          client_id: string
          type: string
          content: string
          status: string
          sent_at: string | null
          delivered_at: string | null
          read_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          type: string
          content: string
          status?: string
          sent_at?: string | null
          delivered_at?: string | null
          read_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          type?: string
          content?: string
          status?: string
          sent_at?: string | null
          delivered_at?: string | null
          read_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      message_templates: {
        Row: {
          id: string
          name: string
          type: string
          content: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          content: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          content?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      company_settings: {
        Row: {
          id: string
          company_name: string
          tax_id: string | null
          email: string | null
          phone: string | null
          address: string | null
          logo_url: string | null
          currency: string
          timezone: string
          date_format: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          tax_id?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          logo_url?: string | null
          currency?: string
          timezone?: string
          date_format?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          tax_id?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          logo_url?: string | null
          currency?: string
          timezone?: string
          date_format?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      staff_users: {
        Row: {
          id: string
          auth_id: string | null
          name: string
          email: string
          role: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          name: string
          email: string
          role: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          name?: string
          email?: string
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
