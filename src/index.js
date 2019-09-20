import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'materialize-css'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import firebase from './config/firebaseConfig'
import { createStore, applyMiddleware, compose } from 'redux';


const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase })),
        reactReduxFirebase(firebase, { userProfile: 'users', attachAuthIsReady: true })
    )
)



store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

})

serviceWorker.register();