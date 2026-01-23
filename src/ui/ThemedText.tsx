import React from 'react';
import { Text } from 'react-native';

type ThemedTextVariant = 'h1' | 'body' | 'caption';

type ThemedTextProps = {
  children: React.ReactNode;
  variant?: ThemedTextVariant;
  className?: string;
  testID?: string;
};

const variantClasses: Record<ThemedTextVariant, string> = {
  h1: 'text-2xl font-semibold',
  body: 'text-base',
  caption: 'text-sm',
};

export function ThemedText({
  children,
  variant = 'body',
  className,
  testID,
}: ThemedTextProps) {
  return (
    <Text
      className={`text-foreground text-start ${variantClasses[variant]} ${className ?? ''}`.trim()}
      testID={testID}
    >
      {children}
    </Text>
  );
}
