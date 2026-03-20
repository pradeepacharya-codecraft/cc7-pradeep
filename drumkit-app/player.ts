type Beat = { timestamp: number; key: string };
import type { Recording } from './reducer.ts';

export type { Recording };

type Listener = (beatIndex: number, totalBeats: number) => void;

type Timeout = ReturnType<typeof setTimeout>; // ReturnType helps you to derive the return type of a function.

type NormalizedBeat = {
  key: string;
  timestamp: number;
};
export function normalizeRecording(recording: Recording): NormalizedBeat[] {
  const result: NormalizedBeat[] = [];

  let pauseStart: number | null = null;
  let lastPauseStart: number | null = null;
  let pauseduration = 0;

  for (const event of recording.beats) {
    if (event.type === 'pause') {
      pauseStart = event.timestamp;
      lastPauseStart = event.timestamp;
      continue;
    }

    if (event.type === 'resume') {
      if (pauseStart !== null) {
        pauseduration += event.timestamp - pauseStart;
        pauseStart = null;
      }
      continue;
    }

    if (event.type === 'beat') {
      let normalizedTime: number;

      if (lastPauseStart !== null) {
        normalizedTime = lastPauseStart;
        lastPauseStart = null;
      } else {
        normalizedTime = event.timestamp - pauseduration;
      }

      result.push({
        key: event.key,
        timestamp: normalizedTime
      });
    }
  }

  if (result.length > 0) {
    const start = result[0]!.timestamp;
    return result.map((beat) => ({
      ...beat,
      timestamp: beat.timestamp - start
    }));
  }

  return result;
}
export class Player {
  listeners: Listener[] = [];

  sheduledPlaybackTimers: Timeout[] = [];

  beatIndex: number = 0;

  normalizedBeats: NormalizedBeat[] = [];

  currentTimeout: Timeout | null = null;

  constructor(
    private recording: Recording[],
    private playback: (beat: Beat) => void
  ) {}

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }
  get totalBeats() {
    return this.normalizedBeats.length;
  }
  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.beatIndex, this.totalBeats));
  }

  play(currentPlayback: string) {
    for (const item of this.recording) {
      if (item.name === currentPlayback) {
        this.normalizedBeats = normalizeRecording(item);

        this.pause();

        this.beatIndex = 0;

        this.scheduleNext();

        break;
      }
    }
  }

  scheduleNext() {
    if (this.beatIndex >= this.normalizedBeats.length) return;

    const beat = this.normalizedBeats[this.beatIndex];

    const prevTime = this.beatIndex === 0 ? 0 : this.normalizedBeats[this.beatIndex - 1]!.timestamp;

    const delay = beat!.timestamp - prevTime;

    this.currentTimeout = setTimeout(() => {
      this.playback({
        key: beat!.key,
        timestamp: beat!.timestamp
      });

      this.beatIndex++;

      this.notify();

      this.scheduleNext();
    }, delay);

    this.sheduledPlaybackTimers.push(this.currentTimeout);
  }

  pause() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }

    this.sheduledPlaybackTimers.forEach((t) => clearTimeout(t));
    this.sheduledPlaybackTimers = [];
  }

  resume() {
    if (this.beatIndex >= this.normalizedBeats.length) return;

    this.scheduleNext();
  }
}
