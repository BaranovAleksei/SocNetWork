import React from 'react';
import s from './Header.module.sass';
import {HeaderInfoType} from './../../redux/state'

export const Header: React.FC<HeaderInfoType> = (props) => {
    return (
        <header>
            <div className={s.logo}>
                <img src={props.logoUrl} alt=""/>
            </div>
            <h3 className={s.nameCompany}>{props.title}</h3>
        </header>
    )
};
