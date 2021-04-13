import React, {Component} from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import { initializeApp } from './redux/app-reducer'
import { Navbar } from './components/Navbar/Navbar'
import ProfileContainer  from './components/Profile/ProfileContainer'
import DialogsContainer  from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import {connect} from "react-redux";
import {compose} from "redux";
import {AllAppTypes} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

class App extends Component<any, any> {

	componentDidMount() {
		//@ts-ignore
		this.props.initializeApp()
	}

	render () {

		if(!this.props.initialized) { return <Preloader/> }

		return (
			<div className="App">
        <HeaderContainer />
        <Navbar />
        <Route path='/profile/:userId?'
               render = { () => <ProfileContainer />}/>
        <Route path='/dialogs'
               render = { () => <DialogsContainer />}/>
        <Route path='/users'
               render = { () => <UsersContainer />}/>
        <Route path='/login'
               render = { () => <Login /> } />
			</div>
			)
	}
}
type mapStateToPropsType = {
	initialized: boolean
}

const mapStateToProps = (state: AllAppTypes): mapStateToPropsType => ({
		initialized: state.App.initialized
})

export default compose<React.ComponentType>(
	withRouter,
  connect(mapStateToProps , {initializeApp}))(App);