import { GET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER } from '../actions/types';

const initialState = {
    players: [],
    addedPlayers: []
}

export default function(state = initialState, action)   {
    switch(action.type) {
        case GET_PLAYERS:
            return  {
                ...state,
                players: action.payload
            };
        case ADD_PLAYER:
            return  {
                ...state,
                addedPlayers: Array.isArray(action.payload) ? state.players : [...state.addedPlayers, action.payload]
            };
        case REMOVE_PLAYER:
            return  {
                ...state,
                addedPlayers: Array.isArray(action.payload) ? [] : state.addedPlayers.filter(currentRow => currentRow !== action.payload)
            }
        default:
            return state;
    }
}