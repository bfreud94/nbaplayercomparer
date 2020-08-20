import { GET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER} from './types';

const serverUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8000' : '';

export const getPlayers = () => dispatch => {
    fetch(`${serverUri}/nbaPlayerComparer/api/getAllPlayers`)
        .then(res => res.json())
        .then(players => dispatch({
            type: GET_PLAYERS,
            payload: players
        })
    );
}

export const addPlayer = (playerData) => dispatch => {
    dispatch({
        type: ADD_PLAYER,
        payload: playerData
    });
}

export const removePlayer = (playerData) => dispatch => {
    dispatch({
        type: REMOVE_PLAYER,
        payload: playerData
    });
}