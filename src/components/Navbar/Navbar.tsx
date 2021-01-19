import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Navbar/Navbar.module.sass';

export const Navbar: React.FC<any> = () => {

  return (
    <nav className={s.nav}>
      <NavLink to='/profile' activeClassName={s.activeLink}> Profile </NavLink>
      <NavLink to='/dialogs' activeClassName={s.activeLink}> Dialogs </NavLink>
      <NavLink to='/users' activeClassName={s.activeLink}> Users </NavLink>
      <NavLink to='/news' activeClassName={s.activeLink}> News </NavLink>
      <NavLink to='/music' activeClassName={s.activeLink}> Music </NavLink>
      <NavLink to='/setting' activeClassName={s.activeLink}> Setting </NavLink>
    </nav>
    )
}