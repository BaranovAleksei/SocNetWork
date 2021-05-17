import {Action, applyMiddleware, combineReducers, compose, createStore, Store} from 'redux'
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from './users-reducer'
import authReducer from "./auth-reducer"
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let rootReducers = combineReducers({
  ProfilePage: profileReducer,
  DialogsPage: dialogsReducer,
  UsersPage: usersReducer,
  Auth: authReducer,
  App: appReducer,
  form: formReducer
});

// type RootReducerType = typeof rootReducers; // (globalstate: AppStateType) => AppStateType
export type AllAppTypes = ReturnType<typeof rootReducers>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AllAppTypes, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers( applyMiddleware(thunkMiddleware)));

export default store;