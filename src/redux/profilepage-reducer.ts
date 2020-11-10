import {ActionType, PostPropsType} from "./state";

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

const profileReducer = (state: any, action: ActionType) => {
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

