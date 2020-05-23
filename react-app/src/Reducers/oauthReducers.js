import * as actions from '../Actions/actions'

export const initialState = {
    Credentials: {
        name: undefined,
        accessToken: undefined,
        loggedIn: false,
        LoginDetails: undefined,
        expiry: undefined
    }
}

export default function oauthReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SAVEOAUTHDATA:
            {
                console.log('saving oauth data');
                return { ...state, Credentials: action.payload }
            }

        default:
            {
                return state;
            }
    }
}