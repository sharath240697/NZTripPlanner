import * as actions from '../Actions/actions'

export const initialState = {
    openWeatherData: {}
}

export default function weatherReducers(state = initialState, action) {
    switch (action.type) {
        case actions.STOREWEATHER:
            {
                return { ...state, openWeatherData: action.payload }
            }
        default:
            return state
    }
}