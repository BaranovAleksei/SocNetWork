import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';

import store, {ActionType, StoreType} from "./redux/state";

type PropsType = {
  store: StoreType
  dispatch: (action: ActionType) => void
}

const App: React.FC<PropsType> = ( props ) => {

  const state = props.store.getState();

  return (
    <BrowserRouter>
      <div className="App">
        <Header title = { state.HeaderPage.HeaderInfo.title} logoUrl={ state.HeaderPage.HeaderInfo.logoUrl } />
        <Navbar navbar = { state.NavbarPage.navbar}/>
        <Route path='/profile' render = { () => <Profile profileInfo = { state.ProfilePage.profileInfo }
                                                         posts = {state.ProfilePage.posts}
                                                         messageForNewPost = { state.ProfilePage.messageForNewPost }
                                                         dispatch={ props.dispatch.bind(store)}
                                                         />}/>

        <Route path='/dialogs' render = { () => <Dialogs dialogs  = { state.DialogsPage.dialogs }
                                                         messages = { state.DialogsPage.messages }
                                                         messageForNewMessage = { state.DialogsPage.messageForNewMessage }
                                                         dispatch = { props.dispatch.bind(store)}
                                                          />}/>
      </div>
    </BrowserRouter>
  );
}

export default App;