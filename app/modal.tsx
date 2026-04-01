import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import { Text } from '@/components/nativewindui/Text';
import { useColorScheme } from '@/lib/useColorScheme';

export default function ModalScreen() {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : colorScheme === 'dark' ? 'light' : 'dark'}
      />
      <View className="pb-safe flex-1 items-center justify-center px-12">
        <Text variant="largeTitle" className="text-center">
          Modal Screen
        </Text>
        <Text variant="body" className="mt-4 text-center">
          This is a modal screen for settings.
        </Text>
      </View>
    </>
  );
}
