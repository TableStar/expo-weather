import { formatDateLabel, groupByDate } from '@/lib/date';
import { Transaction } from '@/types/transactionType';
import { SectionList, Text, View } from 'react-native';

export function TransactionsList({ transactions }: { transactions: Transaction[] }) {
  const sections = groupByDate(transactions);

  return (
    <SectionList
      sections={sections}
      contentContainerClassName="px-4"
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <View className="bg-background py-2">
          <Text className="text-lg font-bold text-foreground">{formatDateLabel(title)}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View className="flex-row items-center justify-between border-b border-border py-2">
          <View>
            <Text className="text-base text-foreground">{item.notes ?? 'No notes'}</Text>
            <Text className="text-sm text-muted-foreground">{item.time}</Text>
          </View>
          <Text
            className={`text-base font-semibold ${item.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
            {item.type === 'in' ? '+' : '-'} Rp{' '}
            {item.amount.toLocaleString('id-ID', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      )}
    />
  );
}
