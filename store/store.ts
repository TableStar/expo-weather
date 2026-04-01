import { TransactionStore } from '@/types/transactionType';
import { create } from 'zustand';

const initialState = {
  transactions: [],
  filters: {},
};

export const useTransactions = create<TransactionStore>((set) => ({
  ...initialState,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        {
          ...transaction,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} }),
}));
