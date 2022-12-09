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
  getById(id: string): Promise<Student> {
    const url = "/students"
    return axiosClient.get(`${url}/${id}`)
  },

  add(student: Student): Promise<Student> {
    const url = "/students"
    return axiosClient.post(url, student)
  },

  update(student: Partial<Student>): Promise<Student> {
    const url = `/students/${student._id}`
    return axiosClient.put(url, student)
  },

  remove(id: string): Promise<any> {
    const url = "/students"
    return axiosClient.delete(`${url}/${id}`)
  },
}
export default studentApi
