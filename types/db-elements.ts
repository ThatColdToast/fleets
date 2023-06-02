import { Database } from '@/types/supabase'

export type User = Database["public"]["Tables"]["profiles"]["Row"];
export type Ship = Database["public"]["Tables"]["ships"]["Row"];