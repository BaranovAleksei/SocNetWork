import React from 'react'
import { actions } from "../../../redux/profile-reducer"
import MyPosts, {MapPropsType, DispatchPropsType} from "./MyPosts"
import {connect} from "react-redux"
import {AllAppTypes} from "../../../redux/redux-store"

const mapStateToProps = (state: AllAppTypes) => {
    return {
        posts: state.ProfilePage.posts
    }
}

const MyPostsContainer = connect< MapPropsType, DispatchPropsType,{}, AllAppTypes>(mapStateToProps,
  {addPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer