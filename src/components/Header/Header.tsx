import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selector";
import {logout} from '../../redux/auth-reducer'
import {Avatar, Button, Col, Layout, Menu, Row } from 'antd'

export type MapPropsType = {}

class UserOutlined extends React.Component {
  render() {
    return null;
  }
}

export const Header: React.FC<MapPropsType> = (props) => {

  const isAuth = useSelector(selectIsAuth )
  const login = useSelector(selectCurrentUserLogin)
  const dispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout())
  }
  const {Header} = Layout

  return (
        <Header className = 'header'>
            <Row>
              <Col span={18}>
                <Menu theme = 'dark' mode='horizontal' defaultSelectedKeys={['2']}>
                  <Menu.Item key='1'><Link to='developers'>Developers</Link> </Menu.Item>
                </Menu>
              </Col>
              {isAuth
                ?<> <Col span={1}>
                  <Avatar alt = {login || ''} style={{backgroundColor: '#87d068'}} icon = {<UserOutlined/>}/>
                </Col>
                  <Col span ={ 5}>
                    <Button onClick={logoutCallback}>Log out</Button>
                  </Col>
                </>
                : <Col span={6}>
                  <Button>
                    <Link to={'/login'}>Login</Link>
                  </Button>
                </Col>}
            </Row>
        </Header>
    )
};
