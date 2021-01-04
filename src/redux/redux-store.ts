import { combineReducers, createStore, Store } from 'redux';
import profileReducer from "./profilepage-reducer";
import dialogsReducer from "./dialogspage-reducer";
import usersReducer from './userspage-reducer';
import authReducer from "./auth-reducer";

let reducers = combineReducers({
  ProfilePage: profileReducer,
  DialogsPage: dialogsReducer,
  UsersPage: usersReducer,
  Auth: authReducer
});

let store: Store = createStore( reducers );

export type AllAppTypes = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;

export default store;