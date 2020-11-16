import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { ActionType, StoreType} from "./redux/state";
import store from './redux/redux-store';

type PropsType = {
  store: StoreType
  dispatch: (action: ActionType ) => void
}

const App: React.FC< PropsType > = ( props ) => {

  const state = props.store.getState();

   return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Route path='/profile' render = { () => <ProfileContainer store = {props.store} />}/>
        <Route path='/dialogs' render = { () => <DialogsContainer store = {props.store} />}/>
      </div>
    </BrowserRouter>
  );
}

export default App;