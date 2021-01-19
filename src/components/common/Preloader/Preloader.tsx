import React from "react";
import s from './preloader.module.sass'
import preloader from '../../../img/preloader.gif'

export const Preloader = ( ) => {
	return <div className={s.preloader}>
		<img src={preloader} alt={'descriptions'}/>
	</div>
}