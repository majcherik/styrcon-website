-- Supabase Database Schema for STYRCON Website
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Inquiries Table
CREATE TABLE contact_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  technical_specs JSONB,
  images TEXT[],
  videos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Contact Inquiries Policies
-- Anyone can insert (submit contact form)
CREATE POLICY "Anyone can submit contact inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Only authenticated admin users can read/update contact inquiries
CREATE POLICY "Admin users can read contact inquiries" ON contact_inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Admin users can update contact inquiries" ON contact_inquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Products Policies
-- Anyone can read products (public)
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT USING (true);

-- Only admin users can modify products
CREATE POLICY "Admin users can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Admin Users Policies
-- Only super admin can manage admin users
CREATE POLICY "Super admin can manage admin users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE email = auth.jwt() ->> 'email' AND role = 'super_admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial admin user (replace with your email)
-- INSERT INTO admin_users (email, role) VALUES ('erik@e-ma-sk.com', 'super_admin');

-- Insert sample product (STYRCON)
INSERT INTO products (name, description, technical_specs, images, videos) VALUES (
  'STYRCON Tepelnoizolačné dosky',
  'Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 s výnimočnou paropriepustnosťou pre sanačné zateplenie a moderné stavby.',
  '{
    "fire_class": "A1",
    "thermal_conductivity": "0,041 W/mK",
    "vapor_permeability": "μ ≤ 3",
    "density": "120-140 kg/m³",
    "compressive_strength": "≥ 60 kPa",
    "water_absorption": "< 1 kg/m²",
    "dimensions": {
      "length": "1000 mm",
      "width": "500 mm",
      "thickness": ["50", "60", "80", "100", "120", "140", "160", "180", "200"]
    }
  }',
  ARRAY['10.jpg'],
  ARRAY['10.mp4']
);