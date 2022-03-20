import * as React from "react"
import { useParams } from "react-router-dom"

export function AddEditPage() {
  const params = useParams()
  console.log("Params: ", params?.studentId)
  return <div>Add edit page</div>
}
