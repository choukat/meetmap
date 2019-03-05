// Store/configureStore.js

import {createStore} from 'redux';
import setProfile from './Reducers/loginReducer'

export default createStore(setProfile)
