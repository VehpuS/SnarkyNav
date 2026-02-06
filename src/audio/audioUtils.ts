import type { SoundEvent } from '../types/SoundManifest';

export const pickAudioFile = (files: string[]): string | null => {
  if (!files.length) {
    return null;
  }
  const index = Math.floor(Math.random() * files.length);
  return files[index] ?? null;
};

export const pickFallbackText = (fallbackText: string[]): string | null => {
  if (!fallbackText.length) {
    return null;
  }
  const index = Math.floor(Math.random() * fallbackText.length);
  return fallbackText[index] ?? null;
};

export const pickPlayableEntry = (event: SoundEvent) => ({
  file: pickAudioFile(event.files),
  fallbackText: pickFallbackText(event.fallback_text),
});
