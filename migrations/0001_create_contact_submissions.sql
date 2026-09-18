CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_date TEXT,
  guest_count INTEGER,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'in_progress', 'closed')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_created
  ON contact_submissions (status, created_at DESC);
