import { combineReducers } from 'redux'

import postsReducer from './postsReducer';
import placeReducer from './placereducers'

const rootReducer = combineReducers({
  posts: postsReducer,
  places: placeReducer
})

export default rootReducer