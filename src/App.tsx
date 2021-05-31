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

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

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
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/dialogs'>Dialogs</Link></Menu.Item>
                {/*<Menu.Item key="3">option3</Menu.Item>*/}
                {/*<Menu.Item key="4">option4</Menu.Item>*/}
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                <Menu.Item key="3"><Link to = '/users'>Developers</Link></Menu.Item>
                {/*<Menu.Item key="6">option6</Menu.Item>*/}
                {/*<Menu.Item key="7">option7</Menu.Item>*/}
                {/*<Menu.Item key="8">option8</Menu.Item>*/}
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                <Menu.Item key="4"><Link to = '/chatDev'>Chat Developers</Link></Menu.Item>
              {/*  <Menu.Item key="10">option10</Menu.Item>*/}
              {/*  <Menu.Item key="11">option11</Menu.Item>*/}
              {/*  <Menu.Item key="12">option12</Menu.Item>*/}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
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