import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import manifest from '../../assets/sound_manifest.json';
import type { SoundEventKey, SoundManifest } from '../types/SoundManifest';
import { getSoundEvent } from '../types/SoundManifest';
import { pickPlayableEntry } from './audioUtils';

export type AudioAdapters = {
  playFileAsync: (uri: string) => Promise<void>;
  speakAsync: (text: string) => Promise<void>;
  stopAllAsync: () => Promise<void>;
};

const createDefaultAdapters = (): AudioAdapters => {
  let activeSound: Audio.Sound | null = null;

  return {
    async playFileAsync(uri: string) {
      if (activeSound) {
        await activeSound.stopAsync();
        await activeSound.unloadAsync();
        activeSound = null;
      }
      const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
      activeSound = sound;
    },
    async speakAsync(text: string) {
      await new Promise<void>((resolve) => {
        Speech.speak(text, {
          onDone: resolve,
          onStopped: resolve,
          onError: () => resolve(),
        });
      });
    },
    async stopAllAsync() {
      Speech.stop();
      if (activeSound) {
        await activeSound.stopAsync();
        await activeSound.unloadAsync();
        activeSound = null;
      }
    },
  };
};

export class AudioManager {
  private readonly manifest: SoundManifest;
  private readonly adapters: AudioAdapters;

  constructor(adapters: AudioAdapters = createDefaultAdapters()) {
    this.manifest = manifest as SoundManifest;
    this.adapters = adapters;
  }

  async playEvent(eventKey: SoundEventKey): Promise<void> {
    const event = getSoundEvent(this.manifest, eventKey);
    if (!event) {
      console.warn(`AudioManager: missing event "${String(eventKey)}"`);
      return;
    }

    const { file, fallbackText } = pickPlayableEntry(event);
    if (file) {
      await this.adapters.playFileAsync(`${this.manifest.base_path}${file}`);
      return;
    }

    if (fallbackText) {
      await this.adapters.speakAsync(fallbackText);
      return;
    }

    console.warn(`AudioManager: no playable entry for "${String(eventKey)}"`);
  }

  async stopAll(): Promise<void> {
    await this.adapters.stopAllAsync();
  }
}

export const audioManager = new AudioManager();
