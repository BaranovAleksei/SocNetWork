import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, withRouter} from 'react-router-dom';
import { initializeApp } from './redux/app-reducer'
import { Navbar } from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store, {AllAppTypes} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

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
               render = { () => <SuspendedProfile/> }/>
        <Route path='/dialogs'
               render = { () => <SuspendedDialogs/> }/>
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
  return <HashRouter>
    <Provider store={ store }>
      <AppContainer/>
    </Provider>
  </HashRouter>
}

export default SamuraiJSApp