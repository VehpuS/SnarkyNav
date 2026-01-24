export type SoundEvent = {
  files: string[];
  fallback_text: string[];
  intensity?: 'low' | 'medium' | 'high';
};

export type SoundManifest = {
  schema_version: number;
  base_path: string;
  events: Record<string, SoundEvent>;
};

export type SoundEventKey = keyof SoundManifest['events'];

export const getSoundEvent = (
  manifest: SoundManifest,
  eventKey: SoundEventKey
): SoundEvent | null => {
  return manifest.events[eventKey] ?? null;
};
