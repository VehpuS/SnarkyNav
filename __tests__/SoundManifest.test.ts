import * as manifest from '../assets/sound_manifest.json';
import { getSoundEvent, SoundManifest } from '../src/types/SoundManifest';

describe('sound manifest', () => {
  it('parses BOOT_UP event', () => {
    expect(manifest.schema_version).toBe(1);
    expect(manifest.base_path).toBe('./assets/audio/');
    expect(manifest.events.BOOT_UP).toBeDefined();
    expect(Array.isArray(manifest.events.BOOT_UP.files)).toBe(true);
    expect(Array.isArray(manifest.events.BOOT_UP.fallback_text)).toBe(true);
    const typedManifest = manifest as unknown as SoundManifest;
    expect(getSoundEvent(typedManifest, 'BOOT_UP' as keyof typeof typedManifest.events)).toBe(
      manifest.events.BOOT_UP
    );
    expect(getSoundEvent(typedManifest, 'MISSING' as keyof typeof typedManifest.events)).toBeNull();
  });
});
