// Re-export the new client creation functions
export { createClient as createClientClient } from './supabase/client'
export { createClient as createServerClient } from './supabase/server'

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

export interface UserProfile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  company: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}