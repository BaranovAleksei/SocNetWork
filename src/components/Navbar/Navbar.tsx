import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Navbar/Navbar.module.sass';
import {v1} from "uuid";

type NavbarType = {
  id: string
  menuItem: string
};

export const Navbar: React.FC<any> = () => {

  const navbar: Array<NavbarType> =  [
      {id: v1(), menuItem: 'profile'},
      {id: v1(), menuItem: 'users'},
      {id: v1(), menuItem: 'dialogs'},
      {id: v1(), menuItem: 'news'},
      {id: v1(), menuItem: 'music'},
      {id: v1(), menuItem: 'setting'}
    ];

    return (
      <nav className={s.nav}>
        <ul>
          {navbar.map(el => {
            return (<li>
              <NavLink to = { el.menuItem } activeClassName={s.activeLink}> { el.menuItem } </NavLink>
            </li>)
            }
          )
          }
        </ul>
      </nav>
    )
}