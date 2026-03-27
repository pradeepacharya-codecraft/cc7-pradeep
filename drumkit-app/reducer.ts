export type Mode =
  | 'normal'
  | 'recordingProgress'
  | 'recordingPaused'
  | 'playbackProgress'
  | 'playbackPaused';

export type Beat =
  | { type: 'beat'; key: string; timestamp: number }
  | { type: 'pause'; timestamp: number }
  | { type: 'resume'; timestamp: number };

export type Recording = {
  id: string;
  name: string;
  beats: Beat[];
};

export type DrumState = {
  mode: Mode;

  recordings: Recording[];
  currentRecordingId: string | null;

  recordingStartTime: number | null;
  recordingPauseTime: number | null;

  playbackStartTime: number | null;
  playbackPauseTime: number | null;
};

export type DrumAction =
  | { type: 'START_RECORDING'; time: number; name: string }
  | { type: 'ADD_BEAT'; key: string; time: number }
  | { type: 'PAUSE_RECORDING'; time: number }
  | { type: 'RESUME_RECORDING'; time: number }
  | { type: 'STOP_RECORDING' }
  | { type: 'START_PLAYBACK'; time: number }
  | { type: 'PAUSE_PLAYBACK'; time: number }
  | { type: 'RESUME_PLAYBACK'; time: number }
  | { type: 'STOP_PLAYBACK' };

export const initialState: DrumState = {
  mode: 'normal',
  recordings: [],
  currentRecordingId: null,
  recordingStartTime: null,
  recordingPauseTime: null,
  playbackStartTime: null,
  playbackPauseTime: null
};

export const drumReducer = (state: DrumState, action: DrumAction): DrumState => {
  switch (action.type) {
    case 'START_RECORDING': {
      const newRecording: Recording = {
        id: action.time.toString(),
        name: action.name,
        beats: []
      };

      return {
        ...state,
        recordings: [...state.recordings, newRecording],
        currentRecordingId: newRecording.id,
        mode: 'recordingProgress',
        recordingStartTime: action.time,
        recordingPauseTime: null
      };
    }

    case 'ADD_BEAT': {
      if (state.mode !== 'recordingProgress') return state;
      if (!state.currentRecordingId) return state;

      return {
        ...state,
        recordings: state.recordings.map((rec) =>
          rec.id !== state.currentRecordingId
            ? rec
            : {
                ...rec,
                beats: [
                  ...rec.beats,
                  {
                    type: 'beat',
                    key: action.key,
                    timestamp: action.time
                  }
                ]
              }
        )
      };
    }

    case 'PAUSE_RECORDING': {
      if (state.mode !== 'recordingProgress') return state;
      if (!state.currentRecordingId) return state;

      return {
        ...state,
        mode: 'recordingPaused',
        recordingPauseTime: action.time,

        recordings: state.recordings.map((rec) =>
          rec.id !== state.currentRecordingId
            ? rec
            : {
                ...rec,
                beats: [...rec.beats, { type: 'pause', timestamp: action.time }]
              }
        )
      };
    }

    case 'RESUME_RECORDING': {
      if (state.mode !== 'recordingPaused') return state;
      if (!state.currentRecordingId) return state;

      return {
        ...state,
        mode: 'recordingProgress',
        recordingPauseTime: null,

        recordings: state.recordings.map((rec) =>
          rec.id !== state.currentRecordingId
            ? rec
            : {
                ...rec,
                beats: [...rec.beats, { type: 'resume', timestamp: action.time }]
              }
        )
      };
    }

    case 'STOP_RECORDING': {
      return {
        ...state,
        mode: 'normal',
        recordingStartTime: null,
        recordingPauseTime: null,
        currentRecordingId: null
      };
    }

    case 'START_PLAYBACK': {
      return {
        ...state,
        mode: 'playbackProgress',
        playbackStartTime: action.time,
        playbackPauseTime: null
      };
    }

    case 'PAUSE_PLAYBACK': {
      if (state.mode !== 'playbackProgress') return state;

      return {
        ...state,
        mode: 'playbackPaused',
        playbackPauseTime: action.time
      };
    }

    case 'RESUME_PLAYBACK': {
      if (state.mode !== 'playbackPaused') return state;

      return {
        ...state,
        mode: 'playbackProgress',
        playbackPauseTime: null
      };
    }

    case 'STOP_PLAYBACK': {
      return {
        ...state,
        mode: 'normal',
        playbackStartTime: null,
        playbackPauseTime: null
      };
    }

    default:
      return state;
  }
};
