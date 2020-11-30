import {v1} from "uuid";

export const followtAC = (userId: string) => {
  return {
    type: 'FOLLOW',
    userId
  }
};
export const unfollowAC = (userId: string) => {
  return {
    type: 'UNFOLLOW',
    userId
  }
};
export const setUsersAC = ( users: Array<UserType>) => {
  return {
    type: 'SET-USERS',
    users
  }
};

type LocationType = {
  city: string
  country: string
};
export type UserType = {
  id: string
  photoURL: string
  followed: boolean
  fullName: string
  status: string
  location: LocationType
};

type UsersPageTP = {
  users: Array<UserType>
};

const initialState: UsersPageTP = {
  users: [
  //   { id: v1(),photoURL: 'https://cursor.style/resources/pointers/thumb/5e4fa625d86cb.png',
  //     followed: false, fullName: 'Dima', status: 'I am a boss', location: {city: 'Minck', country: 'Belarus'} },
  //   { id: v1(),photoURL: 'https://cursor.style/resources/pointers/thumb/5e4fa625d86cb.png',
  //     followed: true, fullName: 'Maha', status: 'I am Bigg boss', location: {city: 'Minsk', country: 'Belarus'} },
  //   { id: v1(),photoURL: 'https://cursor.style/resources/pointers/thumb/5e4fa625d86cb.png',
  //     followed: false, fullName: 'Miha', status: 'I am Bigg-bigg boss', location: {city: 'Minsk', country: 'Belarus'} },
  //   { id: v1(), photoURL: 'https://cursor.style/resources/pointers/thumb/5e4fa625d86cb.png',
  //     followed: true, fullName: 'Sasha', status: 'I am Bigg-wefwe w ef', location: {city: 'Minsk', country: 'Belarus'} },
  ]
};

type ActionTypeUsersPage = ReturnType<typeof followtAC>
                         & ReturnType<typeof unfollowAC>
                         & ReturnType<typeof setUsersAC>;

const usersReducer = (state = initialState, action: ActionTypeUsersPage): UsersPageTP => {

  switch (action.type) {

    case 'SET-USERS':
      return {
        ...state,
        users: [...state.users, ...action.users]
      }
    case 'FOLLOW':
      return {
      ...state,
        users: state.users.map( u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          } return u;
        })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map( u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          } return u;
        })
      }
    default:
      return state;
  }
};

export default usersReducer;
