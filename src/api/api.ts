import axios from "axios";
import {PhotoType, ProfileType, UserType} from "../Types/Types";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '3edab39c-8b84-4e3b-a130-42dfb20faf00'
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}
export type SavePhotoResponseDataType = {
  photos: PhotoType
}

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10){
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data
      })
  },
  delete(id: number){
    return instance.delete(`follow/${id}`)
      .then(response => {
        return response.data
      })
  },
  post(id: number){
    return instance.post(`follow/${id}`, {})
      .then(response => {
        return response.data
      })
  },
  getProfile (userId: number) {
    console.warn('Obsolete method. Please profileAPI object.')
    return profileAPI.getProfile(userId)
  }
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then(res => res.data)
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status`, {status: status}).then(res => res.data);
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile).then(res => res.data);
  }
}


type MeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginResponseDataType = {
  userId: number
}
export const authApi = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then(res => res.data)
  },
  login(email: string, password: string, rememberMe:boolean = false , captcha: string) {
    return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`,
                                                                 {email, password, rememberMe, captcha})
      .then(res => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
      .then(res => res.data)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
      .then(res => res.data)
  }
}
