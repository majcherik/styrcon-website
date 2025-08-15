import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

// Database types
export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'responded'
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  technical_specs: Record<string, unknown>
  images: string[]
  videos: string[]
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'super_admin'
  created_at: string
}