import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import ProfileContainer  from './components/Profile/ProfileContainer';
import DialogsContainer  from './components/Dialogs/DialogsContainer';
import UsersContainer from "./components/Users/UsersContainer";


const App: React.FC<any> = () => {
	return (
		<div className="App">
			<Header />
			<Navbar />
			<Route path='/profile/:userId?' render = { () => <ProfileContainer />}/>
			<Route path='/dialogs' render = { () => <DialogsContainer />}/>
			<Route path='/users' render = { () => <UsersContainer />}/>
		</div>
	);
}

export default App;