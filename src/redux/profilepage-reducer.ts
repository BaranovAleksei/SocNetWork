import {ActionType, PostPropsType, ProfilePageType} from "./state";

export const changeNewTextAC = (textChange: string) => {
  return {
    type: 'CHANGE-NEW-POST',
    newText: textChange
  } as const
};
export const addPostAC = (postText: string) => {
  return {
    type: 'ADD-POST',
    postText: postText,
  } as const
};

const initialState: ProfilePageType = {
  profileInfo: {
    text: 'BLA-bla-bol',
    img: 'https://avatarko.ru/img/kartinka/2/Gubka_Bob.jpg',
    likes: 50
  },
  posts: [
    {id: 1, message: 'hi world!!!', likesCount: 14},
    {id: 2, message: 'It\'s my first post', likesCount: 13},
    {id: 3, message: 'It\'s my secondary post', likesCount: 124},
    {id: 4, message: 'It\'s my third post', likesCount: 18}
  ],
  messageForNewPost: ''
}

const profileReducer = (state = initialState, action: ActionType) => {

  switch (action.type) {

    case 'ADD-POST':
      const newPost: PostPropsType = {
        "id": new Date().getTime(),
        "message": action.postText,
        "likesCount": 0
      }
      state.posts.unshift(newPost);
      state.messageForNewPost = '';
      return state;

    case 'CHANGE-NEW-POST':
      state.messageForNewPost = action.newText;
      return state;

    default:
      return state;
  }
};

export default profileReducer;

