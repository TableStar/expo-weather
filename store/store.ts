import { TransactionState, TransactionStore } from '@/types/transactionType';
import {
  addTransaction as addTransactionDb,
  getTransactions,
  updateTransaction as updateTransactionDb,
  deleteTransaction as deleteTransactionDb,
  getBalance,
} from '@/lib/db/transactions';
import { create } from 'zustand';

const initialState: TransactionState & { isLoading: boolean } = {
  transactions: [],
  filters: {},
  isLoading: false,
  previousBalance: null,
};

export const useTransactions = create<TransactionStore & { isLoading: boolean }>((set) => ({
  ...initialState,
  addTransaction: async (transaction) => {
    set({ isLoading: true });
    try {
      await addTransactionDb({
        type: transaction.type,
        amount: transaction.amount,
        notes: transaction.notes,
        date: transaction.date,
        time: transaction.time,
      });
      const rows = await getTransactions();
      set({ transactions: rows, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  updateTransaction: async (id, updates) => {
    set({ isLoading: true });
    try {
      await updateTransactionDb(id, updates);
      const rows = await getTransactions();
      set({ isLoading: false, transactions: rows });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  deleteTransaction: async (id) => {
    set({ isLoading: true });
    try {
      await deleteTransactionDb(id);
      const rows = await getTransactions();
      set({ transactions: rows, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  setFilters: async (filters) => {
    try {
      if (!filters.startDate) {
        const rows = await getTransactions(filters);
        set({ transactions: rows, isLoading: false, previousBalance: null });
        return;
      }
      const [rows, balance] = await Promise.all([
        getTransactions(filters),
        getBalance(filters.startDate),
      ]);
      set({ transactions: rows, isLoading: false, previousBalance: balance });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  loadTransactions: async () => {
    set({ isLoading: true });
    try {
      const rows = await getTransactions();
      set({ transactions: rows, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
