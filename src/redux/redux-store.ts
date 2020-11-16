import { combineReducers, createStore } from 'redux';
import profileReducer from "./profilepage-reducer";
import dialogsReducer from "./dialogspage-reducer";
import { StoreType } from "./state";


let reducers = combineReducers({
  ProfilePage: profileReducer,
  DialogsPage: dialogsReducer
});

let store: StoreType = createStore( reducers );

export default store;