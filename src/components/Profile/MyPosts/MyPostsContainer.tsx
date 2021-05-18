import React from 'react'
import { actions } from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts"
import {connect} from "react-redux"
import {PostType} from "../../../Types/Types";
import {AllAppTypes} from "../../../redux/redux-store";
import {compose} from "redux";

type mapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string
}
type mapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AllAppTypes): mapStateToPropsType => {
    return {
        posts: state.ProfilePage.posts,
        newPostText: state.ProfilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType,{}, AllAppTypes>(
  mapStateToProps, mapDispatchToProps)(MyPosts);

export default compose<React.ComponentType>(MyPostsContainer)