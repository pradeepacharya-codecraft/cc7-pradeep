type Beat = { timestamp: number; key: string };
import type { Recording } from './reducer.ts';

export type { Recording };

type Listener = (beatIndex: number, totalBeats: number) => void;

type Timeout = ReturnType<typeof setTimeout>; // ReturnType helps you to derive the return type of a function.

type NormalizedBeat = {
  key: string;
  timestamp: number;
};
/**
 * normalize the timestamp of the record. handling of the pause,resume timestamp and setting the initial beat timestamp to 0.
 * @param recording is an object
 * @returns  normalized record .
 */
export function normalizeRecording(recording: Recording): NormalizedBeat[] {
  const result: NormalizedBeat[] = [];

  let pauseStart: number | null = null;
  let lastPauseStart: number | null = null;
  let pauseduration = 0;
  //Here, item is just the collection of the events
  for (const item of recording.beats) {
    if (item.type === 'pause') {
      pauseStart = item.timestamp;
      lastPauseStart = item.timestamp;
      continue;
    }

    if (item.type === 'resume') {
      if (pauseStart !== null) {
        pauseduration += item.timestamp - pauseStart;
        pauseStart = null;
      }
      continue;
    }

    if (item.type === 'beat') {
      let normalizedTime: number;

      if (lastPauseStart !== null) {
        normalizedTime = lastPauseStart;
        lastPauseStart = null;
      } else {
        normalizedTime = item.timestamp - pauseduration;
      }

      result.push({
        key: item.key,
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
  resumeOffset: number = 0;

  sheduledPlaybackTimers: Timeout[] = [];

  beatIndex: number = 0;

  normalizedBeats: NormalizedBeat[] = [];

  //currentTimeout: Timeout | null = null;

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
  /**
   * Starts playback for the given recording name.
   * Finds the matching recording, normalizes its beats, and schedules playback.
   * @param currentPlayback - Name of the recording to play
   */
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

    const currentTimeout = setTimeout(() => {
      this.playback({
        key: beat!.key,
        timestamp: beat!.timestamp
      });

      this.beatIndex++;

      this.notify();

      this.scheduleNext();
    }, delay);

    this.sheduledPlaybackTimers.push(currentTimeout);
  }

  pause() {
    this.sheduledPlaybackTimers.forEach((t) => clearTimeout(t));
    this.sheduledPlaybackTimers = [];
  }

  resume() {
    if (this.beatIndex >= this.normalizedBeats.length) return;

    const remainingBeats = this.normalizedBeats.slice(this.beatIndex);
    if (remainingBeats.length === 0) return;

    const start = remainingBeats[0]!.timestamp;

    this.normalizedBeats = remainingBeats.map((b) => ({
      ...b,
      timestamp: b.timestamp - start
    }));

    this.beatIndex = 0;

    this.scheduleNext();
  }
}
