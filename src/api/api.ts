import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '3edab39c-8b84-4e3b-a130-42dfb20faf00'
  }
})

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
    return instance.get(`profile/${userId}`)
  }
}

export const authApi = {
  me() {
    return instance.get(`auth/me`)
      .then(response => {
        return response.data
      })
  }
}