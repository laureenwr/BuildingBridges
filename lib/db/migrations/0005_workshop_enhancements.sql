-- Add missing columns to workshops table
ALTER TABLE workshops ADD COLUMN IF NOT EXISTS room varchar(100);
ALTER TABLE workshops ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;
ALTER TABLE workshops ADD COLUMN IF NOT EXISTS image_url text;

-- Create workshop_files table
CREATE TABLE IF NOT EXISTS workshop_files (
  id serial PRIMARY KEY,
  workshop_id integer NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  file_name varchar(255) NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  file_type varchar(100),
  uploaded_by integer REFERENCES users(id),
  created_at timestamp NOT NULL DEFAULT now()
);
