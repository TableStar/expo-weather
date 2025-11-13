import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/cn';
import { fetchCitySuggestions } from '@/lib/queryFn';
import { useWeather } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TextInput, View, FlatList, Text, Pressable, ActivityIndicator } from 'react-native';

type Props = {};

export const SearchInput = (props: Props) => {
  const [inputVal, setInputVal] = useState('');
  const debouncedInputVal = useDebounce(inputVal,300)

  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setPlace } = useWeather();

  const { data: suggestions, isLoading: isSuggestionsLoading } = useQuery({
    queryKey: ['suggestions', debouncedInputVal],
    queryFn: () => fetchCitySuggestions(debouncedInputVal),
    enabled: debouncedInputVal.length >= 3,
  });

  const handleSelectCity = (cityName: string) => {
    setPlace(cityName);
    setInputVal('');
    setShowSuggestions(false);
  };

  return (
    <View className="relative">
      <TextInput
        className={cn('rounded-lg border border-input bg-background p-3 text-foreground ')}
        value={inputVal}
        onChangeText={setInputVal}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Cari Lokasi..."
      />

      {showSuggestions && (
        <View
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border bg-background shadow-lg',
            'border-border'
          )}>
          {isSuggestionsLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectCity(item)}>
                  <Text className="p-2 text-white">{item}</Text>
                </Pressable>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};
