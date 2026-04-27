import { Transaction } from '@/types/transactionType';

export function groupByDate(transactions: Transaction[]) {
  const map = new Map<string, Transaction[]>();
  for (const tr of transactions) {
    const list = map.get(tr.date) ?? [];
    list.push(tr);
    map.set(tr.date, list);
  }

  return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}

export function formatDateLabel(dateStr: string) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
