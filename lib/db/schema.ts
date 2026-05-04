import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('finance.db');

export async function initDb() {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS transactions (
      -- Auto-incrementing primary key
      id          INTEGER PRIMARY KEY AUTOINCREMENT,

      -- 'in' for cash in, 'out' for cash out
      type        TEXT NOT NULL CHECK(type IN ('in', 'out')),

      -- Amount in smallest currency unit (e.g. 6500 = Rp 6.500)
      -- INTEGER avoids floating point issues
      -- Its REAL now, not INTEGER anymore
      amount      REAL NOT NULL CHECK(amount > 0),

      -- Optional note like 'warung kopu', 'gaji'
      notes       TEXT,

      -- Stored separately so filtering by date is straightforward
      -- date: 'YYYY-MM-DD'  e.g. '2026-04-01'
      -- time: 'HH:MM'       e.g. '15:22'
      date        TEXT NOT NULL,
      time        TEXT NOT NULL,

      -- When the row was inserted (auto-set by SQLite)
      created_at  TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),

      -- Soft delete: NULL means not deleted, otherwise holds deletion timestamp
      -- This lets us show a 'Deleted Transactions' recovery screen later
      deleted_at  TEXT
    );

    -- Speed up the most common query: list transactions by date, excluding deleted
    CREATE INDEX IF NOT EXISTS idx_transactions_date
      ON transactions(date)
      WHERE deleted_at IS NULL;
  `);

  const count = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM transactions WHERE deleted_at IS NULL'
  );

  if (count && count.count === 0) {
    // Dynamic import to avoid circular dependency:
    // schema.ts → transactions.ts already imports db from schema.ts
    const { seedMockData } = await import('./transactions');
    await seedMockData();
  }
}
