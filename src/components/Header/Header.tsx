import React from 'react';
import s from './Header.module.sass';
import krasty from '../../img/krasty.png'
import { NavLink } from 'react-router-dom';
import { AuthContainerType } from "./HeaderContainer";

type HeaderPropsType = AuthContainerType

export const Header: React.FC<HeaderPropsType> = (props: HeaderPropsType) => {

  const HeaderPage = {
    HeaderInfo: {
      title: 'At the bottom of the Sea',
      logoUrl: krasty
    }
  };
    return (
        <header>
            <div className = {s.logo}>
                <img src = {HeaderPage.HeaderInfo.logoUrl} alt=""/>
            </div>
            <h3 className = {s.nameCompany}> {HeaderPage.HeaderInfo.title} </h3>
            <div className={s.loginBlockOverlay}>
              { props.isAuth ? props.login : <NavLink to={'/login'}> Login </NavLink> }
            </div>
        </header>
    )
};
