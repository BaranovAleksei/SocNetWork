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
export type PostsType = {
  id: number | null
  message: string
  likesCount: number | null
};
export type ProfilePageType = {
  profileInfa: profileInfaType
  posts: Array<PostsType>
};

type DialogsType = {
  id: number
  name: string
};
type MessagesType = {
  id: number
  message: string
};
export type DialogPageType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
};

type SideBarPageType = {

}

type RootStateType = {
  HeaderPage: HeaderPageType
  NavbarPage: NavbarPageType
  ProfilePage: ProfilePageType
  DialogsPage: DialogPageType
  SideBarPage: SideBarPageType
}

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
    posts: [
      {id: 1, message: 'hi world!!!', likesCount: 14},
      {id: 2, message: 'It\'s my first post', likesCount: 13},
      {id: 3, message: 'It\'s my secondary post', likesCount: 124},
      {id: 4, message: 'It\'s my third post', likesCount: 1243}
    ]
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
  SideBarPage: {}
};

export default state;