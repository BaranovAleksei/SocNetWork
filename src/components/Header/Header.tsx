import React from 'react';
import s from './Header.module.sass';
// import {HeaderInfoType} from './../../redux/state'

export const Header: React.FC<any> = (props) => {

  const HeaderPage = {
    HeaderInfo: {
      title: 'Social Network',
      logoUrl: 'https://regnum.ru/uploads/pictures/news/2020/02/08/regnum_picture_1581171734102077_normal.png'
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
