import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {userReducer}  from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, combineEpics  }from  'redux-observable';
import * as  actions from  './actions';
const rootEpic = combineEpics(actions.userAction, actions.usersGet);
const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
    return createStore(
        userReducer,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware, epicMiddleware)
        )
    )
}