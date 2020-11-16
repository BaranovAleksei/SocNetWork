import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Navbar/Navbar.module.sass';

type NavbarType = {
  id: number
  menuItem: string
};

export const Navbar: React.FC<any> = () => {

  const navbar: Array<NavbarType> =  [
      {id: 1, menuItem: 'profile'},
      {id: 2, menuItem: 'dialogs'},
      {id: 3, menuItem: 'news'},
      {id: 4, menuItem: 'music'},
      {id: 5, menuItem: 'setting'}
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