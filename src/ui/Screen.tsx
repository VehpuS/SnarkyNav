import React from 'react';
import { StatusBar, View } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
  testID?: string;
};

export function Screen({ children, testID }: ScreenProps) {
  return (
    <View className="flex-1 bg-background" testID={testID}>
      <StatusBar barStyle="default" />
      {children}
    </View>
  );
}
