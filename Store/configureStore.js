// Store/configureStore.js

import {createStore, combineReducers} from 'redux';
import setProfile from './Reducers/loginReducer'
import setLocalEvents from './Reducers/mapReducer'
import setEvent from './Reducers/eventReducer'

export default createStore(combineReducers({setProfile, setLocalEvents, setEvent}))
