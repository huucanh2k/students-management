import { Student } from "../models/student"
import { ListParams, ListResponse } from "./../models/common"
import axiosClient from "./axiosClient"
const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = "/students"
    return axiosClient.get(url, {
      params: params,
    })
  },

  add(student: Student): Promise<Student> {
    const url = "/students"
    return axiosClient.post(url, student)
  },

  update(id: string, student: Student): Promise<Student> {
    const url = `/students/${id}`
    return axiosClient.put(url, student)
  },

  remove(id: string): Promise<any> {
    const url = "/students"
    return axiosClient.delete(`${url}/${id}`)
  },
}
export default studentApi
