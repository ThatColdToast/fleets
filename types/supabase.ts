export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          username?: string | null
        }
      }
      ships: {
        Row: {
          created_at: string | null
          id: string
          owner: string | null
          shipdata: Json | null
          xpos: number | null
          ypos: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner?: string | null
          shipdata?: Json | null
          xpos?: number | null
          ypos?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          owner?: string | null
          shipdata?: Json | null
          xpos?: number | null
          ypos?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
