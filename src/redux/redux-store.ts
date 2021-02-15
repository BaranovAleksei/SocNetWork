import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import profileReducer from "./profilepage-reducer"
import dialogsReducer from "./dialogspage-reducer"
import usersReducer from './userspage-reducer'
import authReducer from "./auth-reducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
  ProfilePage: profileReducer,
  DialogsPage: dialogsReducer,
  UsersPage: usersReducer,
  Auth: authReducer,
  form: formReducer
});

// type RootReducerType = typeof reducers; // (globalstate: AppStateType) => AppStateType
export type AllAppTypes = ReturnType<typeof reducers>


const store: Store = createStore( reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;

export default store;