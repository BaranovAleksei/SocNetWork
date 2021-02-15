import {profileAPI, usersAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AllAppTypes} from "./redux-store";

type ContactType = {
  facebook?: string
  website?: string
  vk?: string
  twitter?: string
  instagram?: string
  youtube?: string
  github?: string
  mainLink?: string
}
type sizePhoto = {
  small?: string
  large?: string
}
export type profileInfoType = {
  aboutMe: string
  contacts: ContactType
  lookingForAJob: boolean
  lookingForAJobDescription?: string
  fullName: string
  userId: number
  photos: sizePhoto
};
export type PostPropsType = {
  id: number | null
  message: string | null
  likesCount: number | null
};
export type ProfilePageType = {
  profileInfo: profileInfoType | null
  posts: Array<PostPropsType>
  // messageForNewPost: string
  isFetching: boolean
  status: string
}

const initialState: ProfilePageType = {
  profileInfo: null,
  posts: [
    { id: 1, message: 'hi world!!!', likesCount: 14 },
    { id: 2, message: 'It\'s my first post', likesCount: 13 },
    { id: 3, message: 'It\'s my secondary post', likesCount: 124 },
    { id: 4, message: 'It\'s my third post', likesCount: 18 }
  ],
  // messageForNewPost: '',
  isFetching: true,
  status: ''
}

// type postOnChangeType = {
//   type: 'CHANGE_NEW_POST'
//   newText: string
// }
// export const postOnChange = (textChange: string): postOnChangeType => {
//   return {
//     type: 'CHANGE_NEW_POST',
//     newText: textChange
//   }
// }

type addPostType = {
  type: 'ADD_POST'
  postText: string
}
export const addPost = (postText: string): addPostType => {
  return {
    type: 'ADD_POST',
    postText: postText,
  }
}

type setUserProfileType = {
  type: 'SET_USER_PROFILE'
  profileInfo: profileInfoType
}
export const setUserProfile = (profileInfo: profileInfoType): setUserProfileType => {
  return {
    type: 'SET_USER_PROFILE',
    profileInfo
  }
}

type setIsFetchingType = {
  type: 'TOGGLE_IS_FETCHING'
  isFetching: boolean
}
export const setIsFetching = ( isFetching: boolean): setIsFetchingType => {
  return {
    type: 'TOGGLE_IS_FETCHING',
    isFetching
  }
}

type setStatusType = {
  type: 'SET_STATUS'
  status: string
}
export const setStatus = (status: string): setStatusType => {
  return {
    type: 'SET_STATUS',
    status
  }
}

type ActionTypeProfilePage = addPostType | setUserProfileType
  | setIsFetchingType | setStatusType

const profileReducer = (state = initialState, action: ActionTypeProfilePage): ProfilePageType => {

  switch (action.type) {
    case 'ADD_POST':
      const newPost: PostPropsType = {
        "id": new Date().getTime(),
        "message": action.postText,
        "likesCount": 0
      }
      return {
        ...state,
        // messageForNewPost: '',
        posts: [ newPost,...state.posts]
      }
    // case 'CHANGE_NEW_POST':
    //   return {
    //     ...state,
    //     messageForNewPost: action.newText
    //   }
    case 'SET_USER_PROFILE':
      return {...state, profileInfo: action.profileInfo}
    case 'TOGGLE_IS_FETCHING':
      return{
      ...state,
      isFetching: action.isFetching
    }
    case "SET_STATUS":
      return {
        ...state,
        status: action.status
      }
    default:
      return state;
  }
};


type ThunkType = ThunkAction<Promise<void>, AllAppTypes, unknown, ActionTypeProfilePage>

export const getUserProfile = (userId: number): ThunkType => {
 return async (dispatch) => {
    usersAPI.getProfile(userId)
      .then(response => {
        dispatch(setIsFetching(false))
        dispatch(setUserProfile(response.data))
      })
  }
}

export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    profileAPI.getStatus(userId)
      .then(res => {
        dispatch(setStatus(res.data))
      })
  }
}
export const updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    profileAPI.updateStatus(status)
      .then(res => {
        if(res.data.resultCode === 0){
          dispatch(setStatus(status))
        }
      })
  }
}

export default profileReducer;

