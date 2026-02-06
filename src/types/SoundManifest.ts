export type SoundEvent = {
  files: string[];
  fallback_text: string[];
  intensity?: 'low' | 'medium' | 'high';
};

export type SoundManifest<
  Events extends Record<string, SoundEvent> = Record<string, SoundEvent>
> = {
  schema_version: number;
  base_path: string;
  events: Events;
};

export type SoundEventKey<M extends SoundManifest = SoundManifest> = keyof M['events'];

export const getSoundEvent = <M extends SoundManifest>(
  manifest: M,
  eventKey: SoundEventKey<M>
): SoundEvent | null => {
  return (manifest.events as Record<string, SoundEvent>)[eventKey as string] ?? null;
};
