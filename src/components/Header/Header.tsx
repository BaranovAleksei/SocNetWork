import React from 'react';
import s from './Header.module.sass';
import krasty from '../../img/krasty.png'

export const Header: React.FC<any> = (props) => {

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
        </header>
    )
};
