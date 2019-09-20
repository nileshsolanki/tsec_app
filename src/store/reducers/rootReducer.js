import { combineReducers } from 'redux'
import authReducer from './authReducer'
import noticeReducer from './noticeReducer'
import libraryReducer from './libraryReducer'
import { firebaseReducer } from 'react-redux-firebase'
import storageReducer from './storageReducer'
import groupReducer from './groupReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    notice: noticeReducer,
    firebase: firebaseReducer,
    library: libraryReducer,
    storage: storageReducer,
    group: groupReducer
})

export default rootReducer