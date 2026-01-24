import React from 'react';
import { Pressable, View } from 'react-native';
import { ThemedText } from './ThemedText';

type ButtonVariant = 'solid' | 'outline' | 'ghost';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: 'bg-primary',
  outline: 'border border-border',
  ghost: 'bg-transparent',
};

const labelClasses: Record<ButtonVariant, string> = {
  solid: 'text-on-primary',
  outline: 'text-foreground',
  ghost: 'text-foreground',
};

export function Button({
  label,
  onPress,
  disabled,
  variant = 'solid',
  icon,
  className,
  testID,
  accessibilityLabel,
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      className={`rounded-lg px-4 py-3 ${variantClasses[variant]} ${disabled ? 'opacity-50' : ''} ${className ?? ''}`.trim()}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      <View className="flex-row items-center justify-center gap-2">
        {icon ? <View className="shrink-0">{icon}</View> : null}
        <ThemedText className={labelClasses[variant]}>{label}</ThemedText>
      </View>
    </Pressable>
  );
}
