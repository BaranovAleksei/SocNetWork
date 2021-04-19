import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import { initializeApp } from './redux/app-reducer'
import { Navbar } from './components/Navbar/Navbar'
import ProfileContainer  from './components/Profile/ProfileContainer'
import DialogsContainer  from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store, {AllAppTypes} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

class App extends Component<any, any> {

	componentDidMount() {
		//@ts-ignore
		this.props.initializeApp()
	}

	render () {

		if(!this.props.initialized) {
		  return <Preloader/>
		}

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

const AppContainer = compose<React.ComponentType>(
	withRouter,
  connect(mapStateToProps , {initializeApp}))(App);

const SamuraiJSApp = (props: any) => {
  return <BrowserRouter>
    <Provider store={ store }>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp