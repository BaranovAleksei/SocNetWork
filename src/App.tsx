import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';

import state from './redux/state';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header title = { state.HeaderPage.HeaderInfo.title} logoUrl={ state.HeaderPage.HeaderInfo.logoUrl } />
        <Navbar navbar={ state.NavbarPage.navbar}/>
        <Route path='/profile' render = { () => <Profile profileInfa = { state.ProfilePage.profileInfa }
                                                         posts = {state.ProfilePage.posts} />}/>

        <Route path='/dialogs' render = { () => <Dialogs dialogs  = { state.DialogsPage.dialogs }
                                                         messages = { state.DialogsPage.messages } />}/>
      </div>
    </BrowserRouter>
  );
}

export default App;