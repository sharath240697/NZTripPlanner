import { combineReducers } from 'redux'

import postsReducer from './postsReducer';
import myReducer from './placereducers'

const rootReducer = combineReducers({
  posts: postsReducer,
  places: myReducer
})

export default rootReducer