export const actions = ['TOGGLE_PLAY_PAUSE', 'SET_AUDIO_SOURCE', 'SET_CURRENT_SONG', 'TOGGLE_MUTE', 'SET_VOLUME', 'SET_CURRENT_TRACK', 'SET_REPEAT', 'SET_LOADING', 'SET_AUDIO_REF', 'UPDATE_PROGRESS', 'SET_DURATION', 'SET_CURRENT_SONG'];
export const appStateActions = ['SET_LOADING', 'CLEAR_ERROR', 'SET_ERROR', 'SHOW_ALERT', 'DISMISS_ALERT'];
export const userActions = ['SET_USER', 'UPDATE_USER', 'LOGOUT_USER'];

const initialState = {
    audioRef: null,
    volumeLevel: 100,
    player: {
        audioSrc: "http://localhost:5000/api/v1/song/stream/6704edb59130920e6c0a71a6/",
        isPlaying: false,
        isRepeat: false,
        isMuted: false,
        isShuffle: false,
        duration: null,
        progress: {
            time: null,
            percent: 0,
        }
    },
    currentSong: null,
    user: {
        isAuthenticated: false,
        token: null,
        user: null
    },
    appState: {
        isLoading: false,
        error: null,
        alert: {
            show: false,
            message: "",
            type: "info",
            dismiss: 8000
        }
    }
};

function reducer(state=initialState, action) {
    if (action.type === 'TOGGLE_PLAY_PAUSE') {
        const newState = Object.assign({}, state)
        newState.player.isPlaying = !newState.player.isPlaying;
        return newState;
    } else if ((action.type === 'PLAY')) {
        const newState = Object.assign({}, state);
        newState.player.isPlaying = true;
        return newState;
    } else if ((action.type === 'TOGGLE_MUTE')) {
        const newState = Object.assign({}, state);
        newState.player.isMuted = !newState.player.isMuted;
        return newState;
    } else if ((action.type === 'SET_AUDIO_SOURCE')) {
        const newState = Object.assign({}, state);
        newState.player.audioSrc = action.payload;
        newState.player.isPlaying = false;
        return newState;
    } else if ((action.type === 'SET_CURRENT_SONG')) {
        const newState = Object.assign({}, state);
        newState.currentSong = action.payload;
        return newState;
    } else if ((action.type === 'SET_VOLUME')) {
        const newState = Object.assign({}, state);
        newState.volumeLevel = action.payload;
        newState.volumeLevel = action.payload;
        return newState;
    } else if (action.type === 'SET_REPEAT') {
        const newState = Object.assign({}, state);
        newState.player.isRepeat = !newState.player.isRepeat;
        return newState;
    } else if (action.type === 'SET_DURATION') {
        const newState = Object.assign({}, state);
        newState.player.duration = action.payload;
        return newState;
    } else if (action.type === 'UPDATE_PROGRESS') {
        const newState = Object.assign({}, state);
        newState.player.progress = { percent: action.payload.percent, time: action.payload.time };
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
    } else if (action.type === 'SET_AUDIO_REF') {
        const newState = Object.assign({}, state);
        newState.audioRef = action.payload;
        return newState;
    } else if (action.type === 'SHOW_ALERT') {
        const newState = Object.assign({}, state);
        newState.appState.alert = { 
            show: true, message: action.payload.message,
            type: action.payload.type,
            dismiss: action.payload?.dismiss || 5000
        };
        return newState;
    } else if (action.type === 'DISMISS_ALERT') {
        const newState = Object.assign({}, state);
        newState.appState.alert = { show: false, message: '', type: 'success', dismiss: 8000 };
        return newState;
    } else if (action.type === 'SET_USER') {
        const newState = Object.assign({}, state);
        newState.user = {
            isAuthenticated: action.payload?.isAuthenticated,
            token: action.payload?.token,
            user: action.payload?.user
        };
        return newState;
    } else if (action.type === 'UPDATE_USER') {
        const newState = Object.assign({}, state);
        newState.user.user = action.payload?.user;
        return newState;
    } else if (action.type === 'LOGOUT_USER') {
        const newState = Object.assign({}, state);
        newState.user = {
            isAuthenticated: false,
            token: null,
            user: null
        };
        // if it possible return app to initial state
        return newState;
    }
    return state
}

export default reducer;
