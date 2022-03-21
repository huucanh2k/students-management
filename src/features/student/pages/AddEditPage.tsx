import { Box, Typography } from "@material-ui/core"
import { ChevronLeft } from "@material-ui/icons"
import * as React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import studentApi from "../../../api/studentApi"
import { Student } from "../../../models"
import StudentForm from "../components/StudentForm"
import { toast } from "react-toastify"

export function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>()
  const [student, setStudent] = React.useState<Student>()
  const navigate = useNavigate()
  const isEdit = Boolean(studentId)

  React.useEffect(() => {
    if (!studentId) return
    ;(async () => {
      try {
        const data = await studentApi.getById(studentId)
        setStudent(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      try {
        await studentApi.update(formValues)
      } catch (error: any) {
        throw new Error(error.message)
      }
    } else {
      try {
        await studentApi.add(formValues)
      } catch (error: any) {
        throw new Error(error.message)
      }
    }
    toast.success("Save student success!")
    navigate("/admin/students")
  }

  const initialValues: Student = {
    name: "",
    age: "",
    mark: 0,
    gender: "male",
    city: "",
    ...student,
  } as Student

  return (
    <Box>
      <Link
        to="/admin/students"
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            color: "#000",
            fontSize: "14px",
          }}
        >
          <ChevronLeft />
          <span style={{ marginLeft: "5px" }}>Back to student list</span>
        </Typography>
      </Link>
      <Typography
        component="h2"
        variant="h3"
        style={{ margin: "10px 0", color: "#3F51B5" }}
      >
        {isEdit ? `Edit student information` : "Add new student"}
      </Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  )
}
