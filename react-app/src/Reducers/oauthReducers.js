import * as actions from '../Actions/actions'

export const initialState = {
    Credentials: {
        name: undefined,
        accessToken: undefined,
        loggedIn: false,
    },
    savedTrips: []
}

export default function oauthReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SAVEOAUTHDATA:
            {
                // console.log('saving oauth data');
                return { ...state, Credentials: action.payload }
            }

        case actions.STORESAVEDTRIPS:
            {
                // console.log('storing trips');

                return { ...state, savedTrips: action.payload }
            }

       
        default:
            {
                return state;
            }
    }
}

