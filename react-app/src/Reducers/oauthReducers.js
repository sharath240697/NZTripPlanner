import * as actions from '../Actions/actions'

export const initialState = {
    Credentials: {

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