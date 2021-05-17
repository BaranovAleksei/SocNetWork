import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotoType, PostType, ProfileType} from "../Types/Types";
import {ThunkAction} from "redux-thunk";
import {AllAppTypes} from "./redux-store";

const ADD_POST = 'PROFILE/ADD-POST'
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
const SET_STATUS = 'PROFILE/SET_STATUS'
const DELETE_POST = 'PROFILE/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11},
      {id: 3, message: 'Blabla', likesCount: 11},
      {id: 4, message: 'Dada', likesCount: 11}
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ''
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case SAVE_PHOTO_SUCCESS:
            debugger;
            return {...state, profile: {...state.profile, photos: action.photos }as ProfileType}
        default:
            return state;
    }
}

type AddPostActionCreatorType = { type: typeof ADD_POST, newPostText: string}
type SetUserProfileType = {type: typeof SET_USER_PROFILE, profile: ProfileType}
type SetStatusType = {type: typeof SET_STATUS, status: string}
type DeletePostType = {type: typeof DELETE_POST, postId: number}
type SavePhotoSuccessType = {type: typeof SAVE_PHOTO_SUCCESS, photos: PhotoType}

type ActionType = AddPostActionCreatorType | SetUserProfileType | SetStatusType
                  | DeletePostType | SavePhotoSuccessType

//Action
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType =>
  ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: ProfileType): SetUserProfileType =>
  ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusType =>
  ({type: SET_STATUS, status})
export const deletePost = (postId: number): DeletePostType =>
  ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos: PhotoType): SavePhotoSuccessType =>
  ({type: SAVE_PHOTO_SUCCESS, photos})


//Thunk
type ThunkType = ThunkAction<Promise<void>, AllAppTypes, unknown, ActionType>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);

    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch,
                                                                       getState) => {
    const userId = getState().Auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      if (userId != null) {
        dispatch(getUserProfile(userId))
      } else {
        throw new Error("userId can't be null")
      }
    } else {
      // @ts-ignore
      dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }))
      return Promise.reject(data.messages[0])
    }
}

export default profileReducer;
