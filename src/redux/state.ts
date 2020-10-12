import { renderTree } from "../render";

export type HeaderInfoType = {
  title: string
  logoUrl: string
};
type HeaderPageType = {
  HeaderInfo: HeaderInfoType
};

type NavbarType = {
  id: number
  menuItem: string
};
export type NavbarPageType = {
  navbar: Array<NavbarType>
};

type profileInfaType = {
  text: string
  img: string
  likes: number | null
};

export type PostPropsType = {
  id: number | null
  message: string
  likesCount: number | null
};

export type ProfilePageType = {
  profileInfa: profileInfaType
  messageForNewPost: string
  posts: Array<PostPropsType>
  chengeNewText: (newText: string) => void
  addPost: ( post: string ) => void
};

export type DialogsType = {
  id: number
  name: string
};
export type MessagesType = {
  id: number
  message: string
};
export type DialogPageType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
};

type SideBarPageType = {
}

export type RootStateType = {
  HeaderPage: HeaderPageType
  NavbarPage: NavbarPageType
  ProfilePage: ProfilePageType
  DialogsPage: DialogPageType
  SideBarPage: SideBarPageType
};

//function state

export const addPost = (postText: string) => {
  const newPost: PostPropsType = {
    id: new Date().getTime(),
    message: postText,
    likesCount: 0
  }
  state.ProfilePage.posts.push( newPost )
  renderTree( state );
};

export const chengeNewText= (newText: string) => {
  state.ProfilePage.messageForNewPost = newText;
  renderTree(state);
};


//my state
let state: RootStateType = {
  HeaderPage: {
    HeaderInfo: {
      title: 'Social Network',
      logoUrl: 'https://regnum.ru/uploads/pictures/news/2020/02/08/regnum_picture_1581171734102077_normal.png'
    }
  },
  NavbarPage: {
    navbar: [
    {id: 1, menuItem: 'Profile'},
    {id: 2, menuItem: 'Dialogs'},
    {id: 3, menuItem: 'News'},
    {id: 4, menuItem: 'Music'},
    {id: 5, menuItem: 'Setting'}
    ]
  },
  ProfilePage: {
    profileInfa: {
      text: 'BLA-bla-bol',
      img: 'https://avatarko.ru/img/kartinka/2/Gubka_Bob.jpg',
      likes: 50
    },
    messageForNewPost: '',
    posts: [
      {id: 1, message: 'hi world!!!', likesCount: 14},
      {id: 2, message: 'It\'s my first post', likesCount: 13},
      {id: 3, message: 'It\'s my secondary post', likesCount: 124},
      {id: 4, message: 'It\'s my third post', likesCount: 18}
    ],
    addPost,
    chengeNewText
  },

  DialogsPage: {
    dialogs: [
      {id: 1, name: 'Dimon'},
      {id: 1, name: 'Andrew'},
      {id: 1, name: 'Sveta'},
      {id: 1, name: 'Sasha'},
      {id: 1, name: 'Viktor'},
      {id: 1, name: 'Valera'}
    ],
    messages: [
      {id: 1, message: 'Nihay'},
      {id: 1, message: 'What is you name?'},
      {id: 1, message: 'when?'},
      {id: 1, message: 'Whot?'},
      {id: 1, message: 'Ho?'}
      ]
  },
  SideBarPage: { }
};

export default state;