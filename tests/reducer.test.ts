import { describe, it, expect } from 'vitest';
import { drumReducer, type Mode, initialState } from '../drumkit-app/reducer.ts';

describe('drumReducer', () => {
  it('should start recording', () => {
    const state = drumReducer(initialState, {
      type: 'START_RECORDING',
      time: 1000,
      name: 'Test'
    });

    expect(state.mode).toBe('recordingProgress');
    expect(state.recordings.length).toBe(1);
    expect(state.currentRecordingId).toBe('1000');
    expect(state.recordingStartTime).toBe(1000);
  });

  it('should add beat only in recordingProgress', () => {
    const started = drumReducer(initialState, {
      type: 'START_RECORDING',
      time: 1000,
      name: 'Test'
    });

    const updated = drumReducer(started, {
      type: 'ADD_BEAT',
      key: 'A',
      time: 1500
    });

    expect(updated.recordings[0]!.beats).toEqual([{ type: 'beat', key: 'A', timestamp: 1500 }]);
  });

  it('should not add beat if not recording', () => {
    const state = drumReducer(initialState, {
      type: 'ADD_BEAT',
      key: 'A',
      time: 1500
    });

    expect(state).toEqual(initialState);
  });

  it('should pause recording and add pause beat', () => {
    const started = drumReducer(initialState, {
      type: 'START_RECORDING',
      time: 1000,
      name: 'Test'
    });

    const paused = drumReducer(started, {
      type: 'PAUSE_RECORDING',
      time: 2000
    });

    expect(paused.mode).toBe('recordingPaused');
    expect(paused.recordingPauseTime).toBe(2000);
    expect(paused.recordings[0]!.beats[0]).toEqual({
      type: 'pause',
      timestamp: 2000
    });
  });

  it('should not pause if not recordingProgress', () => {
    const state = drumReducer(initialState, {
      type: 'PAUSE_RECORDING',
      time: 2000
    });

    expect(state).toEqual(initialState);
  });

  it('should resume recording and add resume beat', () => {
    const started = drumReducer(initialState, {
      type: 'START_RECORDING',
      time: 1000,
      name: 'Test'
    });

    const paused = drumReducer(started, {
      type: 'PAUSE_RECORDING',
      time: 2000
    });

    const resumed = drumReducer(paused, {
      type: 'RESUME_RECORDING',
      time: 3000
    });

    expect(resumed.mode).toBe('recordingProgress');
    expect(resumed.recordingPauseTime).toBeNull();
    expect(resumed.recordings[0]!.beats[1]).toEqual({
      type: 'resume',
      timestamp: 3000
    });
  });

  it('should not resume if not paused', () => {
    const state = drumReducer(initialState, {
      type: 'RESUME_RECORDING',
      time: 3000
    });

    expect(state).toEqual(initialState);
  });

  it('should not add beat if no currentRecordingId', () => {
    const state = {
      ...initialState,
      mode: 'recordingProgress' as Mode
    };

    const result = drumReducer(state, {
      type: 'ADD_BEAT',
      key: 'A',
      time: 1500
    });

    expect(result).toEqual(state);
  });

  it('should stop recording', () => {
    const started = drumReducer(initialState, {
      type: 'START_RECORDING',
      time: 1000,
      name: 'Test'
    });

    const stopped = drumReducer(started, {
      type: 'STOP_RECORDING'
    });

    expect(stopped.mode).toBe('normal');
    expect(stopped.currentRecordingId).toBeNull();
    expect(stopped.recordingStartTime).toBeNull();
  });

  it('should start playback', () => {
    const state = drumReducer(initialState, {
      type: 'START_PLAYBACK',
      time: 4000
    });

    expect(state.mode).toBe('playbackProgress');
    expect(state.playbackStartTime).toBe(4000);
  });

  it('should pause playback', () => {
    const started = drumReducer(initialState, {
      type: 'START_PLAYBACK',
      time: 4000
    });

    const paused = drumReducer(started, {
      type: 'PAUSE_PLAYBACK',
      time: 4500
    });

    expect(paused.mode).toBe('playbackPaused');
    expect(paused.playbackPauseTime).toBe(4500);
  });

  it('should not pause playback if not playing', () => {
    const state = drumReducer(initialState, {
      type: 'PAUSE_PLAYBACK',
      time: 4500
    });

    expect(state).toEqual(initialState);
  });

  it('should resume playback', () => {
    const started = drumReducer(initialState, {
      type: 'START_PLAYBACK',
      time: 4000
    });

    const paused = drumReducer(started, {
      type: 'PAUSE_PLAYBACK',
      time: 4500
    });

    const resumed = drumReducer(paused, {
      type: 'RESUME_PLAYBACK',
      time: 5000
    });

    expect(resumed.mode).toBe('playbackProgress');
    expect(resumed.playbackPauseTime).toBeNull();
  });

  it('should not resume playback if not paused', () => {
    const state = drumReducer(initialState, {
      type: 'RESUME_PLAYBACK',
      time: 5000
    });

    expect(state).toEqual(initialState);
  });

  it('should stop playback', () => {
    const started = drumReducer(initialState, {
      type: 'START_PLAYBACK',
      time: 4000
    });

    const stopped = drumReducer(started, {
      type: 'STOP_PLAYBACK'
    });

    expect(stopped.mode).toBe('normal');
    expect(stopped.playbackStartTime).toBeNull();
  });

  it('should handle full recording flow', () => {
    const state = drumReducer(initialState, {
      type: 'START_RECORDING',
      time: 1000,
      name: 'Flow'
    });

    const AddedBeat = drumReducer(state, {
      type: 'ADD_BEAT',
      key: 'A',
      time: 1500
    });

    const PausedState = drumReducer(AddedBeat, {
      type: 'PAUSE_RECORDING',
      time: 2000
    });

    const ResumeState = drumReducer(PausedState, {
      type: 'RESUME_RECORDING',
      time: 3000
    });

    const OneMoreBeatState = drumReducer(ResumeState, {
      type: 'ADD_BEAT',
      key: 'B',
      time: 3500
    });

    expect(OneMoreBeatState.recordings[0]!.beats).toEqual([
      { type: 'beat', key: 'A', timestamp: 1500 },
      { type: 'pause', timestamp: 2000 },
      { type: 'resume', timestamp: 3000 },
      { type: 'beat', key: 'B', timestamp: 3500 }
    ]);
  });
});
