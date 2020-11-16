import profileReducer, {addPostAC, changeNewTextAC } from "./profilepage-reducer";
import dialogsReducer, {changeMessageBodyAC, sendMessageAC} from "./dialogspage-reducer";


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
export type profileInfoType = {
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
  profileInfo: profileInfoType
  messageForNewPost: string
  posts: Array<PostPropsType>
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
  messageForNewMessage: string
};
type SideBarPageType = {}
export type RootStateType = {
  HeaderPage: HeaderPageType
  NavbarPage: NavbarPageType
  ProfilePage: ProfilePageType
  DialogsPage: DialogPageType
  SideBarPage: SideBarPageType
};
export type StoreType = {
  _state: RootStateType
  _onChange: () => void
  subscribe: (callback: () => void) => void
  getState: () => RootStateType
  dispatch: (action: ActionType ) => void
};

export type ActionType = ReturnType<typeof changeMessageBodyAC>
                       | ReturnType<typeof sendMessageAC>
                       | ReturnType<typeof addPostAC>
                       | ReturnType<typeof changeNewTextAC>

const store: StoreType = {
  _state: {
    // HEADER
    HeaderPage: {
      HeaderInfo: {
        title: 'Social Network',
        logoUrl: 'https://regnum.ru/uploads/pictures/news/2020/02/08/regnum_picture_1581171734102077_normal.png'
      }
    },
    // Left menu
    NavbarPage: {
      navbar: [
        {id: 1, menuItem: 'Profile'},
        {id: 2, menuItem: 'Dialogs'},
        {id: 3, menuItem: 'News'},
        {id: 4, menuItem: 'Music'},
        {id: 5, menuItem: 'Setting'}
      ]
    },
    // page profile
    ProfilePage: {
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
      messageForNewPost: '',
    },
    // page dialogs
    DialogsPage: {
      dialogs: [
        {id: 1, name: 'Dimon'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
      ],
      messages: [
        {id: 1, message: 'Nihay'},
        {id: 2, message: 'What is you name?'},
        {id: 3, message: 'when?'},
        {id: 4, message: 'Whot?'},
        {id: 5, message: 'Ho?'}
      ],
      messageForNewMessage: ''
    },
    SideBarPage: {}
  },
   _onChange() {
    console.log('function onChange');
  },
  subscribe(callback) {
    this._onChange = callback;
  },
  getState() {
    return this._state;
  },
  dispatch(action: ActionType) {
    this._state.ProfilePage = profileReducer( this._state.ProfilePage, action );
    this._state.DialogsPage = dialogsReducer(this._state.DialogsPage, action );
    this._onChange();
  }
}

export default store;