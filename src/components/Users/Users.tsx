import React from "react"
import {UserType} from "../../redux/userspage-reducer"

import defaultImg from '../../img/defaultImg.png'
import s from './User.module.sass'


export type UsersPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setCurrentPage: (currentPage: number) => void
  onPageChanged: (page: number) => void
}

export const Users = ( props:UsersPropsType ) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i<=pagesCount; i++ ){
      pages.push(i)
    }

    return <div>
      <div className={s.pagination}>
        { pages.map( p => {
          return <span className = { props.currentPage === p ? s.activePage : ''}
          onClick={ () => { props.onPageChanged(p) }}>{p}</span>
        })}
      </div>
      { props.users.map((u: UserType) => <div key={u.id}>
       <span>
         <div>
           <img src={ u.photos.small !== null ? u.photos.small : defaultImg } alt=""/>
         </div>
         <div>
           { u.followed ? <button onClick={ () => { props.unfollow(u.id)} } >Unfollow</button>
             : <button onClick={ () => { props.follow(u.id)} } >Follow</button>}
         </div>
       </span>
        <span>
         <span>
           <div>{u.name}</div>
           <div>{u.status}</div>
         </span>
       </span>
      </div> )}
    </div>
  }