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

export type StoreType = {
  _state: RootStateType
  _onChange: () => void
  subscribe: (callback: () => void) => void
  getState: () => RootStateType
  // changeNewText: (newText: string) => void
  // addPost: ( ) => void
  dispatch: (action:  ActionType) => void
};

export type ActionType = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC>

export const addPostAC = (postText: string) => {
  return{
    type: 'ADD-POST',
    postText: postText
  } as const
};
export const changeNewTextAC = (newText: string) => {
  return{
    type: 'CHANGE-NEW-TEXT',
    newText: newText
  } as const
};

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
      messageForNewPost: '',
      posts: [
        {id: 1, message: 'hi world!!!', likesCount: 14},
        {id: 2, message: 'It\'s my first post', likesCount: 13},
        {id: 3, message: 'It\'s my secondary post', likesCount: 124},
        {id: 4, message: 'It\'s my third post', likesCount: 18}
      ],
    },
    // page dialogs
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
  },
  // changeNewText ( newText: string ) {
  //   this._state.ProfilePage.messageForNewPost = newText;
  //   store._onChange();
  // },
  // addPost () {
  //   const newPost: PostPropsType = {
  //     id: new Date().getTime(),
  //     message: postText,
  //     likesCount: 0
  //   }
  //   this._state.ProfilePage.posts.push( newPost )
  //   store._onChange();
  // },
  _onChange() {
    console.log('function onChange');
  },
  subscribe ( callback ) {
    this._onChange = callback;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    if (action.type === 'ADD-POST') {
      const newPost: PostPropsType = {
        id: new Date().getTime(),
        message: action.postText,
        likesCount: 0
      }
      this._state.ProfilePage.posts.unshift(newPost)
      store._onChange();
    } else if (action.type === 'CHANGE-NEW-TEXT') {
      this._state.ProfilePage.messageForNewPost = action.newText;
      store._onChange();
    }
  }
}

export default store;