CREATE TABLE IF NOT EXISTS story_format_ratings (
  id serial PRIMARY KEY,
  story_key text NOT NULL,
  format text NOT NULL,
  recognition smallint CHECK (recognition BETWEEN 1 AND 5),
  less_alone smallint CHECK (less_alone BETWEEN 1 AND 5),
  stronger smallint CHECK (stronger BETWEEN 1 AND 5),
  felt_story smallint CHECK (felt_story BETWEEN 1 AND 5),
  respect smallint CHECK (respect BETWEEN 1 AND 5),
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS story_format_ratings_story_key_format_idx
  ON story_format_ratings (story_key, format);
