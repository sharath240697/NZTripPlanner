import { combineReducers } from 'redux'

import postsReducer from './postsReducer';
import placeReducer from './placereducers';
import oauthReducer from './oauthReducers';
import weatherReducer from './weatherReducers';


const rootReducer = combineReducers({
  posts: postsReducer,
  places: placeReducer,
  oauth: oauthReducer,
  weather: weatherReducer
})

export default rootReducer