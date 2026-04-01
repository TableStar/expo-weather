export type TransactionType = 'expense' | 'income';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
};

export type TransactionFilters = {
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
};

export type TransactionState = {
  transactions: Transaction[];
  filters: TransactionFilters;
};

export type TransactionActions = {
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: TransactionFilters) => void;
  resetFilters: () => void;
};

export type TransactionStore = TransactionState & TransactionActions;
