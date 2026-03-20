import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Player, type Recording, normalizeRecording } from '../drumkit-app/player.ts';

vi.useFakeTimers();

describe('Player', () => {
  let player: Player;
  let playbackMock: ReturnType<typeof vi.fn>;

  const recordings: Recording[] = [
    {
      id: '1',
      name: 'first record',
      beats: [
        { type: 'beat', key: 'A', timestamp: 1000 },
        { type: 'beat', key: 'S', timestamp: 2000 },
        { type: 'beat', key: 'D', timestamp: 3000 },
        { type: 'pause', timestamp: 3500 },
        { type: 'resume', timestamp: 4500 },
        { type: 'beat', key: 'F', timestamp: 6000 }
      ]
    }
  ];

  beforeEach(() => {
    playbackMock = vi.fn();
    player = new Player(recordings, playbackMock);
  });

  it('should normalize recording correctly', () => {
    const result = normalizeRecording(recordings[0]);

    expect(result).toEqual([
      { key: 'A', timestamp: 0 },
      { key: 'S', timestamp: 1000 },
      { key: 'D', timestamp: 2000 },
      { key: 'F', timestamp: 2500 }
    ]);
  });

  it('should play, pause, and resume correctly', () => {
    player.play('first record');

    vi.advanceTimersByTime(0);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'A', timestamp: 0 });

    vi.advanceTimersByTime(1000);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'S', timestamp: 1000 });

    player.pause();

    vi.advanceTimersByTime(2000);
    expect(playbackMock).toHaveBeenCalledTimes(2);

    player.resume();

    vi.advanceTimersByTime(1000);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'D', timestamp: 2000 });

    vi.advanceTimersByTime(500);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'F', timestamp: 2500 });

    expect(playbackMock).toHaveBeenCalledTimes(4);
  });

  it('should handle multiple pause and resume cycles correctly', () => {
    player.play('first record');

    vi.advanceTimersByTime(0);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'A', timestamp: 0 });

    vi.advanceTimersByTime(1000);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'S', timestamp: 1000 });

    player.pause();

    vi.advanceTimersByTime(1500);
    expect(playbackMock).toHaveBeenCalledTimes(2);

    player.resume();

    vi.advanceTimersByTime(1000);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'D', timestamp: 2000 });

    player.pause();

    vi.advanceTimersByTime(2000);
    expect(playbackMock).toHaveBeenCalledTimes(3);

    player.resume();

    vi.advanceTimersByTime(500);
    expect(playbackMock).toHaveBeenCalledWith({ key: 'F', timestamp: 2500 });

    expect(playbackMock).toHaveBeenCalledTimes(4);
  });
});
