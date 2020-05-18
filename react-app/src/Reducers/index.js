import { combineReducers } from 'redux'

import postsReducer from './postsReducer';
import placeReducer from './placereducers'
import weatherReducer from './weatherReducers'


const rootReducer = combineReducers({
  posts: postsReducer,
  places: placeReducer,
  weather: weatherReducer
})

export default rootReducer