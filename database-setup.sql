-- STYRCON Website Database Setup
-- This script creates the necessary tables and security policies for user authentication

-- Create profiles table in public schema (following Supabase best practices)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(email)
);

-- Create contact_inquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create products table for STYRCON products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  technical_specs JSONB DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS contact_inquiries_status_idx ON public.contact_inquiries(status);
CREATE INDEX IF NOT EXISTS contact_inquiries_created_at_idx ON public.contact_inquiries(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can submit contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Authenticated users can view contact inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON public.products;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for contact_inquiries table
-- Anyone can submit contact inquiries
CREATE POLICY "Anyone can submit contact inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view contact inquiries (implement admin role later)
CREATE POLICY "Authenticated users can view contact inquiries" ON public.contact_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create RLS policies for products table
-- Products are publicly readable
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Only authenticated users can modify products (implement admin role later)
CREATE POLICY "Authenticated users can manage products" ON public.products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at timestamps
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER contact_inquiries_updated_at
  BEFORE UPDATE ON public.contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample STYRCON product data
INSERT INTO public.products (name, description, technical_specs, images) VALUES
('STYRCON 50', 'Paropriepustná tepelnoizolačná doska hrúbky 50mm', 
 '{"thickness": "50mm", "thermal_conductivity": "0.039 W/mK", "fire_class": "A1", "density": "160 kg/m3"}',
 '{"https://example.com/styrcon-50.jpg"}'),
('STYRCON 80', 'Paropriepustná tepelnoizolačná doska hrúbky 80mm', 
 '{"thickness": "80mm", "thermal_conductivity": "0.039 W/mK", "fire_class": "A1", "density": "160 kg/m3"}',
 '{"https://example.com/styrcon-80.jpg"}'),
('STYRCON 100', 'Paropriepustná tepelnoizolačná doska hrúbky 100mm', 
 '{"thickness": "100mm", "thermal_conductivity": "0.039 W/mK", "fire_class": "A1", "density": "160 kg/m3"}',
 '{"https://example.com/styrcon-100.jpg"}')
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, authenticated, service_role;

-- Additional security: Revoke all permissions on auth schema from anon users
REVOKE ALL ON SCHEMA auth FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA auth FROM anon;

COMMIT;