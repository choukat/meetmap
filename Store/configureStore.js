// Store/configureStore.js

import {createStore, combineReducers} from 'redux';
import setProfile from './Reducers/loginReducer'
import setLocalEvents from './Reducers/mapReducer'

export default createStore(combineReducers({setProfile, setLocalEvents}))
