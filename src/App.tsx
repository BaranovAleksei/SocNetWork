import React, {Component} from 'react'
import './App.css'
import 'antd/dist/antd.css'
import {BrowserRouter, Route, withRouter, Switch, Redirect, Link} from 'react-router-dom'
import { initializeApp } from './redux/app-reducer'
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import store, {AllAppTypes} from "./redux/redux-store"
import {Preloader} from "./components/common/Preloader/Preloader"
import {withSuspense} from "./hoc/withSuspense"
import {LoginPage} from "./components/Login/LoginPage"
import {UsersPage} from "./components/Users/UsersContainer"

import {Breadcrumb, Layout, Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
import {Header} from "./components/Header/Header";

const { SubMenu } = Menu
const { Footer, Content, Sider } = Layout

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./Pages/Chat/ChatPage'))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

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
    if(!this.props.initialized) {return <Preloader/>}

    return (
      <Layout>
        <Header/>
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>My profile</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{padding: '24px 0'}}>
            <Sider width={200} className="site-layout-background">
              <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                  <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/dialogs'>Dialogs</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                  <Menu.Item key="3"><Link to = '/users'>Developers</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                  <Menu.Item key="4"><Link to = '/chatDev'>Chat Developers</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{padding: '0 24px', minHeight: 280}}>
                <Switch>
                  <Route exact path='/'
                         render = {() => <Redirect to = {'/profile'}/>}/>
                  <Route path='/profile/:userId?'
                         render = { () => <SuspendedProfile/> }/>
                  <Route path='/dialogs'
                         render = { () => <SuspendedDialogs/> }/>
                  <Route path='/users'
                         render = { () => <UsersPage pageTitle={'SAMYRAI'} /> } />
                  <Route path='/login'
                         render = { () => <LoginPage /> } />
                  <Route path='/chatDev'
                         render = { () => <SuspendedChatPage /> } />
                  <Route path='*'
                         render = { () => <div>404 - page not found</div> } />
                </Switch>
              </Content>
            </Layout>
          </Layout>
          </Content>
        <Footer style={{textAlign: 'center'}}>Social Network ©2021 Created by BaranovAleksei</Footer>
      </Layout>
    )
	}
}
// @ts-ignore
const mapStateToProps = (state: AllAppTypes) => ({
		initialized: state.App.initialized
})
// @ts-ignore
const AppContainer = compose<React.ComponentType>(
	withRouter,
  connect(mapStateToProps , {initializeApp}))(App);
// @ts-ignore
const SamuraiJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={ store }>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}
// @ts-ignore
export default SamuraiJSApp