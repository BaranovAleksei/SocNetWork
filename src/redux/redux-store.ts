import {applyMiddleware, combineReducers, compose, createStore, Store} from 'redux'
import profileReducer from "./profilepage-reducer"
import dialogsReducer from "./dialogspage-reducer"
import usersReducer from './userspage-reducer'
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
  ProfilePage: profileReducer,
  DialogsPage: dialogsReducer,
  UsersPage: usersReducer,
  Auth: authReducer,
  App: appReducer,
  form: formReducer
});

// type RootReducerType = typeof reducers; // (globalstate: AppStateType) => AppStateType
export type AllAppTypes = ReturnType<typeof reducers>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunkMiddleware)));

export default store;