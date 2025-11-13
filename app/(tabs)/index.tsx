import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/nativewindui/Text';
import { SearchInput } from '@/components/SearchInput';

export default function Screen() {
  return (
    <View className="flex-1">
      <SearchInput />
    </View>
  );
}
