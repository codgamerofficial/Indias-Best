import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      colleges: {
        Row: {
          id: string
          name: string
          type: 'government' | 'private'
          location: string
          description: string
          rating: number
          fees: number
          courses: string[]
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'government' | 'private'
          location: string
          description: string
          rating?: number
          fees: number
          courses: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'government' | 'private'
          location?: string
          description?: string
          rating?: number
          fees?: number
          courses?: string[]
          created_at?: string
        }
      }
      scholarships: {
        Row: {
          id: string
          title: string
          description: string
          amount: number
          eligibility: string
          deadline: string
          provider: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          amount: number
          eligibility: string
          deadline: string
          provider: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          amount?: number
          eligibility?: string
          deadline?: string
          provider?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          created_at?: string
        }
      }
    }
  }
}