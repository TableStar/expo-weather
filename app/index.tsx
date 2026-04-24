import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <ScrollView className="flex-1 px-4 pt-2">
        <Text className="mt-10 text-center text-muted-foreground">Transaction here</Text>
      </ScrollView>
      <View className=" flex-row items-center justify-around gap-3 px-4 py-2">
        <TouchableOpacity className="flex-1 rounded-xl bg-green-400 px-4 py-2">
          <Text className="text-center text-xl font-semibold text-white">Income</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 rounded-xl bg-red-600 px-4 py-2">
          <Text className="text-center text-xl font-semibold text-white">Expense</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-evenly gap-2 border-t border-border bg-card px-4 pt-2 pb-3">
        <View>
          <Text className="text-sm text-green-500">Total Income</Text>
          <Text className="font-bold  text-green-500">Rp 1.500.000</Text>
        </View>
        <View>
          <Text className="text-sm  text-red-700">Total Expense</Text>
          <Text className="font-bold  text-red-700">Rp 1.500.000</Text>
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Balance</Text>
          <Text className="font-bold text-foreground">Rp 1.500.000</Text>
        </View>
      </View>
    </View>
  );
}
