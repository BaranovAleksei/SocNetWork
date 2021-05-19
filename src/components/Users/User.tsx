import React from "react"
import defaultImg from '../../img/defaultImg.png'
import s from './User.module.sass'
import { NavLink } from "react-router-dom"
import {UserType} from "../../Types/Types";

type PropsType = {
  user: UserType
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
}

export const User:React.FC<PropsType> = ( {user, followingInProgress, unfollow, follow } ) => {
  return <div>
     <span>
       <div>
         <NavLink to = {'/profile/'+ user.id }>
           <img src={ user.photos.small !== null ? user.photos.small : defaultImg } alt=""/>
         </NavLink>
       </div>
       <div>
         { user.followed ?
           <button disabled = { followingInProgress.some( (id: number) => id === user.id )}
                   onClick={ () => { unfollow(user.id)}}>
             Unfollow</button>
           : <button  disabled = { followingInProgress.some( (id: number) => id === user.id)}
                      onClick={ () => { follow(user.id)}}>
             Follow</button>
         }
       </div>
     </span>
      <span>
       <span>
         <div>{user.name}</div>
         <div>{user.status}</div>
       </span>
     </span>
  </div>
}