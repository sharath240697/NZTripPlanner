import { combineReducers } from 'redux'

import postsReducer from './postsReducer';
import placeReducer from './placereducers';
import oauthReducer from './oauthReducers';

const rootReducer = combineReducers({
  posts: postsReducer,
  places: placeReducer,
  oauth: oauthReducer
})

export default rootReducer