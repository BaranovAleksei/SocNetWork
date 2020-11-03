import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Navbar/Navbar.module.sass';

import {NavbarPageType} from './../../redux/state'

export const Navbar: React.FC<NavbarPageType> = (props) => {
    return (
        <nav className={s.nav}>
            <ul>
              { props.navbar.map( el => {
                return (<li>
                  <NavLink to = { el.menuItem } activeClassName={s.activeLink}> {el.menuItem}  </NavLink></li>)
                }
              )
              }
            </ul>
        </nav>
    )
}