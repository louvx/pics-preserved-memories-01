
-- Create storage bucket for photo uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photo-uploads', 'photo-uploads', true);

-- Create policy to allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'photo-uploads' AND auth.role() = 'authenticated');

-- Create policy to allow public access to uploaded files
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'photo-uploads');
