export type TransactionType = 'in' | 'out';

export type Transaction = {
  id: number;
  type: TransactionType;
  amount: number;
  notes: string | null;
  date: string;
  created_at: string;
  time: string;
  deleted_at: string | null;
};

export type TransactionFilters = {
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
};

export type TransactionState = {
  transactions: Transaction[];
  filters: TransactionFilters;
  previousBalance: number|null
};

export type TransactionActions = {
  addTransaction: (
    transaction: Omit<Transaction, 'id' | 'created_at' | 'deleted_at'>
  ) => Promise<void>;
  updateTransaction: (id: number, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  setFilters: (filters: TransactionFilters) => Promise<void>;
  loadTransactions: () => Promise<void>;
};

export type TransactionStore = TransactionState & TransactionActions;
