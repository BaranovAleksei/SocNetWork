import {instance, GetItemsType, APIResponseType} from "./api"

export const usersApi = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data
      })
  },
  delete(id: number) {
    return instance.delete(`follow/${id}`)
      .then(response => {
        return response.data
      })
  },
  post(id: number) {
    return instance.post<APIResponseType>(`follow/${id}`, {})
      .then(response => {
        return response.data
      })
  }
  // getProfile(userId: number) {
  //   return profileAPI.getProfile(userId)
  // }
}