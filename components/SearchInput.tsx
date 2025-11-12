import { cn } from '@/lib/cn';
import { fetchCitySuggestions } from '@/lib/queryFn';
import { useWeather } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

type Props = {};

export const SearchInput = (props: Props) => {
  const [inputVal, setInputVal] = useState('');

  const [showSuggestions, setShowSuggestions] = useState(false);
  const { place, setPlace } = useWeather();

  const {} = useQuery({
    queryKey: ['suggestions', inputVal],
    queryFn: () => fetchCitySuggestions(inputVal),
    enabled: inputVal.length >= 3,
  });
  return (
    <View>
      <TextInput
        className={cn('rounded-lg border border-input bg-background p-3 text-foreground ')}
        value={inputVal}
        onChangeText={setInputVal}
        placeholder="Cari Lokasi..."
      />
    </View>
  );
};
