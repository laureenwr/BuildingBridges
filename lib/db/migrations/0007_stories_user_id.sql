ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS user_id integer REFERENCES users(id);
