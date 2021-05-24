import React, {Component} from 'react'
import './App.css'
import {BrowserRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import { initializeApp } from './redux/app-reducer'
import { Navbar } from './components/Navbar/Navbar'
import HeaderContainer from './components/Header/HeaderContainer'
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import store, {AllAppTypes} from "./redux/redux-store"
import {Preloader} from "./components/common/Preloader/Preloader"
import {withSuspense} from "./hoc/withSuspense"
import {LoginPage} from "./components/Login/LoginPage"
import {UsersPage} from "./components/Users/UsersContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializedApp: () => void }

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert ('Some error occured')
  }
  componentDidMount() {
    //@ts-ignore
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillMount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

	render () {
    if(!this.props.initialized) {
		  return <Preloader/>
		}
		return (
			<div className="App">
        <HeaderContainer />
        <Navbar />
        <Switch>
          <Route exact path='/'
                 render = { () => <Redirect to = {'/profile'}/> } />
          <Route path='/profile/:userId?'
                 render = { () => <SuspendedProfile/> }/>
          <Route path='/dialogs'
                 render = { () => <SuspendedDialogs/> }/>
          <Route path='/users'
                 render = { () => <UsersPage pageTitle={'SAMYRAI'} /> } />
          <Route path='/login'
                 render = { () => <LoginPage /> } />
          <Route path='*'
                 render = { () => <div>404 - page not found</div> } />
        </Switch>
			</div>
			)
	}
}

const mapStateToProps = (state: AllAppTypes) => ({
		initialized: state.App.initialized
})

const AppContainer = compose<React.ComponentType>(
	withRouter,
  connect(mapStateToProps , {initializeApp}))(App);

const SamuraiJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={ store }>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp
