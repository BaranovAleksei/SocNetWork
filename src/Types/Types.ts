export type PhotoType = {
  small: string | null
  large: string | null
}
export type UserType = {
  id: number
  photos: PhotoType
  followed: boolean
  name: string
  status: string
}
export type UsersPageType = {
  users: Array<UserType>
  pageSize: number
  totalUserCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}
export type PostType = {
  id: number
  message: string
  likesCount: number
}
export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ProfileType ={
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotoType
  aboutMe: string
}
