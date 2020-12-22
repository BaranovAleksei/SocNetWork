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
  messageForNewPost: string
  isFetching: boolean
}

const initialState: ProfilePageType = {
  profileInfo: null,
  posts: [
    { id: 1, message: 'hi world!!!', likesCount: 14 },
    { id: 2, message: 'It\'s my first post', likesCount: 13 },
    { id: 3, message: 'It\'s my secondary post', likesCount: 124 },
    { id: 4, message: 'It\'s my third post', likesCount: 18 }
  ],
  messageForNewPost: '',
  isFetching: true
}

export const postOnChange = (textChange: string) => {
  return {
    type: 'CHANGE-NEW-POST',
    newText: textChange
  }
};
export const addPost = (postText: string) => {
  return {
    type: 'ADD-POST',
    postText: postText,
  }
};
export const setUserProfile = (profileInfo: profileInfoType) => {
  return {
    type: 'SET-USER-PROFILE',
    profileInfo
  }
};
export const setIsFetching = ( isFetching: boolean) => {
  return {
    type: 'TOGGLE-IS-FETCHING',
    isFetching
  }
}

type ActionTypeProfilePage = ReturnType<typeof postOnChange>
                           & ReturnType<typeof addPost>
                           & ReturnType<typeof setUserProfile>
                           & ReturnType<typeof setIsFetching>

const profileReducer = (state = initialState, action: ActionTypeProfilePage): ProfilePageType => {

  switch (action.type) {
    case 'ADD-POST':
      const newPost: PostPropsType = {
        "id": new Date().getTime(),
        "message": action.postText,
        "likesCount": 0
      }
      return {
        ...state,
        messageForNewPost: '',
        posts: [ newPost,...state.posts]
      }
    case 'CHANGE-NEW-POST':
      return {
        ...state,
        messageForNewPost: action.newText
      }
    case 'SET-USER-PROFILE':
      return {...state, profileInfo: action.profileInfo}
    case 'TOGGLE-IS-FETCHING':
      return{
      ...state,
      isFetching: action.isFetching
    }
    default:
      return state;
  }
};

export default profileReducer;

