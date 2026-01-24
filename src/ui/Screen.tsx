import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
  testID?: string;
};

export function Screen({ children, testID }: ScreenProps) {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <View className="flex-1 bg-background" testID={testID}>
      <StatusBar barStyle={barStyle} />
      {children}
    </View>
  );
}
