import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selector";
import {logout} from '../../redux/auth-reducer'
import {Avatar, Button, Col, Layout, Menu, Row } from 'antd'
import s from './Header.module.sass'
import krasty from '../../img/krasty.png'

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
        <Header className = {s.header}>
            <Row>
              <Col span={18} className={s.logo}>
                <img src={krasty} alt=""/>
              </Col>
              {isAuth
                ?<> <Col span={1}>
                  <Avatar alt = {login || ''} style={{backgroundColor: '#0000fe'}} icon = {<UserOutlined/>}/>
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
