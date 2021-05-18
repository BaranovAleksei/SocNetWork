import axios from "axios";
import {PhotoType, UserType} from "../Types/Types";

export const instance = axios.create({
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