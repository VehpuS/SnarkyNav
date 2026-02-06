import { useState } from 'react';
import { Screen } from './src/ui/Screen';
import { ThemedText } from './src/ui/ThemedText';
import { Button } from './src/ui/Button';
import { audioManager } from './src/audio/AudioManager';

export default function App() {
  const [lastEvent, setLastEvent] = useState<string>('None');
  const showDebug = __DEV__;

  const handleBootUp = async () => {
    setLastEvent('BOOT_UP');
    try {
      await audioManager.playEvent('BOOT_UP');
    } catch (error) {
      console.warn('AudioManager failed to play BOOT_UP', error);
    }
  };

  return (
    <Screen>
      <ThemedText variant="h1" className="px-6 pt-6">
        SnarkyNav
      </ThemedText>
      <ThemedText className="px-6 pt-2 text-sm">
        We only speak up when you ignore the obvious.
      </ThemedText>
      <Button
        label="Boot up"
        onPress={handleBootUp}
        variant="solid"
        testID="boot-up-button"
        className="mx-6 mt-6"
      />
      {showDebug ? (
        <ThemedText className="px-6 pt-4 text-sm" testID="last-event">
          Last event: {lastEvent}
        </ThemedText>
      ) : null}
    </Screen>
  );
}
