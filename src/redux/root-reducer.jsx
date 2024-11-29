import { combineReducers } from 'redux'
import heroSlice from './heros/slice'

export default combineReducers({
  hero: heroSlice,
})