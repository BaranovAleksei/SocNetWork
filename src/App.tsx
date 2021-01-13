import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar'
import ProfileContainer  from './components/Profile/ProfileContainer'
import DialogsContainer  from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'

const App: React.FC<any> = () => {
	return (
		<div className="App">
			<HeaderContainer />
			<Navbar />
			<Route path='/profile/:userId?' render = { () => <ProfileContainer />}/>
			<Route path='/dialogs' render = { () => <DialogsContainer />}/>
			<Route path='/users' render = { () => <UsersContainer />}/>

			<Route path='/login' render = { () => <Login /> } />
		</div>
	);
}

export default App;