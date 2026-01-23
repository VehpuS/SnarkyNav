import { Screen } from './src/ui/Screen';
import { ThemedText } from './src/ui/ThemedText';
import { Button } from './src/ui/Button';

export default function App() {
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
        onPress={() => {}}
        variant="solid"
        testID="boot-up-button"
        className="mx-6 mt-6"
      />
    </Screen>
  );
}
