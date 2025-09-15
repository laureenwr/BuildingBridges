-- Workshops core tables

CREATE TYPE workshop_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE enrollment_status AS ENUM ('ENROLLED', 'CANCELLED', 'WAITLIST');

CREATE TABLE IF NOT EXISTS workshops (
  id serial PRIMARY KEY,
  title varchar(200) NOT NULL,
  slug varchar(200) NOT NULL UNIQUE,
  description text,
  starts_at timestamp,
  ends_at timestamp,
  location varchar(200),
  capacity integer,
  status workshop_status NOT NULL DEFAULT 'DRAFT',
  created_by integer REFERENCES users(id),
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workshop_mentors (
  workshop_id integer NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (workshop_id, user_id)
);

CREATE TABLE IF NOT EXISTS workshop_enrollments (
  id serial PRIMARY KEY,
  workshop_id integer NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status enrollment_status NOT NULL DEFAULT 'ENROLLED',
  created_at timestamp NOT NULL DEFAULT now(),
  CONSTRAINT uniq_enrollment UNIQUE (workshop_id, user_id)
);


