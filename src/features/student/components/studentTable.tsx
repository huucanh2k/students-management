import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { City, Student } from "../../../models"
import { Box, Button } from "@material-ui/core"
import { captializeString, getMarkColor } from "../../../utils"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  editBtn: {
    marginRight: theme.spacing(2),
  },
}))

export interface StudentTableProps {
  studentList: Student[]
  cityMap: {
    [key: string]: City
  }
  onEdit?: (student: Student) => void
  onRemove?: (student: Student) => void
}

const initialStudent: Student = {
  name: "",
  age: "",
  mark: 0,
  gender: "male",
  city: "",
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(false)
  const [selectedStudent, setSelectedStudent] =
    React.useState<Student>(initialStudent)

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemoveConfirm = () => {
    // Call onremove
    onRemove?.(selectedStudent)

    // Set off dialog
    setOpen(false)

    setSelectedStudent(initialStudent)
  }

  const handleRemoveClick = (student: Student) => {
    setOpen(true)
    setSelectedStudent(student)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell align="right" width={220}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{captializeString(student.gender)}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: getMarkColor(student.mark),
                      fontWeight: 500,
                    }}
                  >
                    {student.mark}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    className={classes.editBtn}
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure remove student{" "}
            <strong>
              {" "}
              <em>{selectedStudent.name}?</em>
            </strong>{" "}
            <br />
            This action can't undo!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={handleRemoveConfirm}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
