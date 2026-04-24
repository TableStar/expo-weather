import { Transaction, TransactionType } from '@/types/transactionType';
import { db } from './schema';

type AddTransactionData = {
  type: 'in' | 'out';
  amount: number;
  notes: string | null;
  date: string;
  time: string;
};

type GetTransactionsFilters = {
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
};

type UpdateTransactionData = Partial<Omit<Transaction, 'id' | 'created_at' | 'deleted_at'>>;

export async function addTransaction(data: AddTransactionData): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO transactions (type, amount, notes, date, time) VALUES (?,?,?,?,?)',
    data.type,
    data.amount,
    data.notes,
    data.date,
    data.time
  );
  return result.lastInsertRowId;
}

export async function getTransactions(filters?: GetTransactionsFilters): Promise<Transaction[]> {
  let sql = 'SELECT * FROM transactions WHERE deleted_at is NULL';
  const params: (string | number)[] = [];

  if (filters?.type) {
    sql += ' AND type = ?';
    params.push(filters.type);
  }

  if (filters?.startDate) {
    sql += ' AND date >= ?';
    params.push(filters.startDate);
  }
  if (filters?.endDate) {
    sql += ' AND date <= ?';
    params.push(filters.endDate);
  }

  sql += ' ORDER BY date DESC, time DESC';

  return db.getAllAsync<Transaction>(sql, ...params);
}

export async function updateTransaction(id: number, updates: UpdateTransactionData) {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (updates.type !== undefined) {
    fields.push('type = ?');
    values.push(updates.type);
  }
  if (updates.amount !== undefined) {
    fields.push('amount = ?');
    values.push(updates.amount);
  }
  if (updates.notes !== undefined) {
    fields.push('notes = ?');
    values.push(updates.notes);
  }
  if (updates.date !== undefined) {
    fields.push('date = ?');
    values.push(updates.date);
  }
  if (updates.time !== undefined) {
    fields.push('time = ?');
    values.push(updates.time);
  }

  if (fields.length === 0) {
    return;
  }

  values.push(id);
  const sql = `UPDATE transactions SET ${fields.join(', ')} WHERE id = ?`;
  await db.runAsync(sql, ...values);
}

export async function deleteTransaction(id: number): Promise<void> {
  await db.runAsync(
    "UPDATE transactions SET deleted_at = datetime('now', 'localtime') WHERE id = ?",
    id
  );
}

export async function getTotalsByDateRange(startDate: string, endDate: string) {
  const sql = `
        SELECT type, SUM(amount) as total
        FROM transactions
        WHERE deleted_at IS NULL and date BETWEEN ? AND ?
        GROUP BY type
    `;

  const rows = await db.getAllAsync<{ type: 'in' | 'out'; total: number }>(sql, startDate, endDate);

  let income = 0;
  let expense = 0;

  for (const row of rows) {
    if (row.type === 'in') {
      income = row.total;
    } else {
      expense = row.total;
    }
  }

  return { income, expense };
}
