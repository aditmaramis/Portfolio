-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  bg_image TEXT NOT NULL,
  link TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  link TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create settings table for general site settings
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on settings" ON settings FOR SELECT USING (true);

-- Create policies for authenticated admin write access
CREATE POLICY "Allow authenticated insert on projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on services" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on services" ON services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on services" ON services FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on settings" ON settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on settings" ON settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on settings" ON settings FOR DELETE TO authenticated USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

-- Create storage policies
CREATE POLICY "Allow public read access on portfolio-images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Allow authenticated upload on portfolio-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-images');
CREATE POLICY "Allow authenticated update on portfolio-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-images');
CREATE POLICY "Allow authenticated delete on portfolio-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-images');

-- Insert initial data from existing assets
INSERT INTO services (title, description, icon, order_index) VALUES
  ('full stack web app', 'building and programming website', 'web_icon', 1),
  ('UI/UX design', 'UI/UX design focuses on creating a seamless user experience', 'ui_icon', 2),
  ('graphics design', 'creative design solutions to enhance visual communication', 'graphics_icon', 3);

INSERT INTO projects (title, description, bg_image, order_index) VALUES
  ('frontend', 'web design', '/work-1.webp', 1),
  ('geo based app', 'mobile app', '/work-2.webp', 2),
  ('photography', 'web design', '/work-3.webp', 3),
  ('UI/UX designing', 'UI/UX design', '/work-4.webp', 4);
