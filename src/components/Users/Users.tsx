import React from "react"
import {UserType} from "../../redux/userspage-reducer"
import axios from 'axios'
import defaultImg from '../../img/defaultImg.png'
import s from './User.module.sass'

type UsersPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUserCount: number
  currentPage: number
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: Array<UserType>) => void
  setTotalUsersCount: (totalCount: number) => void
  setCurrentPage: (currentPage: number) => void
}

export class Users extends React.Component<UsersPropsType> {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}
    &count=${this.props.pageSize}`)
      .then( (response: any) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      })
  }
  onPageChanged  = ( pageNumber: number ) => {
    this.props.setCurrentPage( pageNumber )
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${ pageNumber }
    &count=${this.props.pageSize}`)
      .then( (response: any) => {
        this.props.setUsers(response.data.items);
      })
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUserCount / this.props.pageSize)
    let pages = []
    for (let i = 1; i<=pagesCount; i++ ){
      pages.push(i)
    }

    return <div>
      <div className={s.pagination}>
        { pages.map( p => {
          return <span className = { this.props.currentPage === p ? s.activePage : ''}
          onClick={ () => { this.onPageChanged(p) }}>{p}</span>
        })}
      </div>
      { this.props.users.map((u: UserType) => <div key={u.id}>
       <span>
         <div>
           <img src={ u.photos.small !== null ? u.photos.small : defaultImg } alt=""/>
         </div>
         <div>
           { u.followed ? <button onClick={ () => { this.props.unfollow(u.id)} } >Unfollow</button>
             : <button onClick={ () => { this.props.follow(u.id)} } >Follow</button>}
         </div>
       </span>
        <span>
         <span>
           <div>{u.name}</div>
           <div>{u.status}</div>
         </span>
         {/*<span>*/}
           {/*<div>location.city</div>*/}
           {/*<div>location.country</div>*/}
         {/*</span>*/}
       </span>
      </div> )}
    </div>
  }
}