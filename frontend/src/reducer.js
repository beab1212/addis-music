export const actions = ['TOGGLE_PLAY_PAUSE', 'TOGGLE_MUTE', 'SET_LOADING', 'SET_VOLUME', 'SET_CURRENT_TRACK', 'SET_REPEAT', 'SET_LOADING', 'SET_ERROR', 'CLEAR_ERROR', 'SET_AUDIO_REF', 'UPDATE_PROGRESS']

const initialState = {
    audioRef: null,
    player: {
        audioSrc: "http://localhost:5000/audio/output.m3u8",
        isPlaying: false,
        volumeLevel: 100,
        isRepeat: false,
        isMuted: false,
        isShuffle: false,
        progress: {
            time: null,
            percent: 0,
        }
    },
    currentPlay: {
        currentTrack: null,
    },
    user: {
        isAuthenticated: false,
        user: null
    },
    appState: {
        isLoading: false,
        error: null
    }
};

function reducer(state=initialState, action) {
    if (action.type === 'TOGGLE_PLAY_PAUSE') {
        const newState = Object.assign({}, state)
        newState.player.isPlaying = !newState.player.isPlaying;
        return newState;
    } else if ((action.type === 'TOGGLE_MUTE')) {
        const newState = Object.assign({}, state);
        newState.player.isMuted = !newState.player.isMuted;
        return newState;
    } else if ((action.type === 'SET_VOLUME')) {
        const newState = Object.assign({}, state);
        newState.player.volumeLevel = action.payload;
        return newState;
    } else if (action.type === 'SET_REPEAT') {
        const newState = Object.assign({}, state);
        newState.player.isRepeat = !newState.player.isRepeat;
        return newState;
    } else if (action.type === 'SET_CURRENT_TRACK') {
        const newState = Object.assign({}, state);
        newState.currentPlay.currentTrack = action.payload;
        return newState;
    } else if (action.type === 'SET_LOADING') {
        const newState = Object.assign({}, state);
        newState.appState.isLoading = !newState.appState.isLoading;
        return newState;
    } else if (action.type === 'SET_ERROR') {
        const newState = Object.assign({}, state);
        newState.appState.error = action.payload;
        return newState;
    } else if (action.type ===  'CLEAR_ERROR') {
        const newState = Object.assign({}, state);
        newState.appState.error = null;
        return newState;
    } else if (action.type === 'UPDATE_PROGRESS') {
        const newState = Object.assign({}, state);
        newState.player.progress = { percent: action.payload.percent, time: action.payload.time };
        return newState;
    } else if (action.type === 'SET_AUDIO_REF') {
        const newState = Object.assign({}, state);
        newState.audioRef = action.payload;
        return newState;
    }
    return state
}

export default reducer;
