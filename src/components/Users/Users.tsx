import React from "react";
import {UserType} from "../../redux/userspage-reducer";
import {v1} from "uuid";
import * as axios from 'axios';

type UsersPropsType = {
  users: Array<UserType>
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: Array<UserType>) => void
}

export const Users: React.FC<UsersPropsType> = (props: UsersPropsType) => {

  if (props.users.length === 0) {
    axios.get('https://social-network.samuraijs.com/api/1.0/users')
      .then( (response:any) => {
        props.setUsers(response.data.items);
      })
      // {
      //   id: v1(), photoURL: 'https://cursor.style/resources/pointers/thumb/5e4fa625d86cb.png',
      //   followed: true, fullName: 'Sasha', status: 'I am Bigg-wefwe w ef', location: {city: 'Minsk', country: 'Belarus'}
      // },
  };

 return (
   <div>
     { props.users.map((u: UserType) => <div key={u.id}>
       <span>
         <div>
           <img src={u.photoURL} alt=""/>
         </div>
         <div>
           { u.followed ? <button onClick={ () => { props.unfollow(u.id)} } >Unfollow</button>
                        : <button onClick={ () => { props.follow(u.id)} } >Follow</button>}
         </div>
       </span>
       <span>
         <span>
           <div>{u.fullName}</div>
           <div>{u.status}</div>
         </span>
         <span>
           <div>{u.location.city}</div>
           <div>{u.location.country}</div>
         </span>
       </span>
     </div> )}
   </div>
 )
}