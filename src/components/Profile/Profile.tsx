import React, { ChangeEvent } from 'react';
import { Post } from './Post';
import s from './Profile.module.sass';
import {PostPropsType, profileInfoType} from "../../redux/profilepage-reducer";
import ProfileInfo from "./ProfileInfo";

export type ProfilePropsType = {
  profileInfo: profileInfoType | null
  posts: Array<PostPropsType>
  messageForNewPost: string
  postOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void
  addPost: (postText: string) => void
  isFetching: boolean
  status: string
  updateStatus: (status: string) => void
}

export const Profile: React.FC<ProfilePropsType> = ( props: ProfilePropsType) => {

  return <>
     <div className = {s.profile}>
       <img className = {s.imgProfile} src = {props.profileInfo?.photos.large} alt=""/>
       <div className={s.description}>
         <span>{props.profileInfo?.aboutMe}</span>
       </div>
       <div className={s.OverlayContact}>
         <ul>
           { props.profileInfo?.contacts.facebook ?
             <li><a href={props.profileInfo?.contacts.facebook}>
               {props.profileInfo?.contacts.facebook}</a></li> : null }

           { props.profileInfo?.contacts.github ?
             <li><a href={props.profileInfo?.contacts.github}>
               {props.profileInfo?.contacts.github}</a></li> : null}

           { props.profileInfo?.contacts.instagram ?
             <li><a href={props.profileInfo?.contacts.instagram}>
               {props.profileInfo?.contacts.instagram}</a></li> : null}

           { props.profileInfo?.contacts.mainLink ?
             <li><a href={props.profileInfo?.contacts.mainLink}>
               {props.profileInfo?.contacts.mainLink}</a></li> : null}

           { props.profileInfo?.contacts.twitter ?
             <li><a href={props.profileInfo?.contacts.twitter}>
               {props.profileInfo?.contacts.twitter}</a></li> : null}

           { props.profileInfo?.contacts.vk ?
             <li><a href={props.profileInfo?.contacts.vk}>
               {props.profileInfo?.contacts.vk}</a></li> : null}

           { props.profileInfo?.contacts.website ?
             <li><a href={props.profileInfo?.contacts.website}>
             {props.profileInfo?.contacts.website}</a></li> : null }
         </ul>
       </div>
       <ProfileInfo status = {props.status}
                    updateStatus = {props.updateStatus} />
       <hr />
       <div className={s.newPost}>
         <input value={ props.messageForNewPost }
                onChange={ props.postOnChange }>
         </input>
         <button onClick={ () => { props.addPost(props.messageForNewPost) }}> add post </button>
       </div>
       <div className={s.OverlayPosts}>
         {
           props.posts.map( (el: PostPropsType) => (
           <Post
                 key = {el.id}
                 id = {el.id}
                 message = {el.message}
                 likesCount = {el.likesCount}
             />
           ))
         }
       </div>
     </div>
  </>
}