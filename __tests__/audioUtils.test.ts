import { pickAudioFile, pickFallbackText } from '../src/audio/audioUtils';

describe('audioUtils', () => {
  it('returns null for empty lists', () => {
    expect(pickAudioFile([])).toBeNull();
    expect(pickFallbackText([])).toBeNull();
  });

  it('selects from available entries', () => {
    expect(pickAudioFile(['one'])).toBe('one');
    expect(pickFallbackText(['hello'])).toBe('hello');
  });
});
