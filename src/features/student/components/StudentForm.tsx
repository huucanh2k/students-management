import { Box, Button, CircularProgress } from "@material-ui/core"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useAppSelector } from "../../../app/hooks"
import {
  InputField,
  RadioGroupField,
  SelectField,
} from "../../../components/FormFields"
import { Student } from "../../../models"
import { selectCityOptions } from "../../city/citySlice"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Alert } from "@material-ui/lab"

export interface StudentFormProps {
  initialValues: Student
  onSubmit: (formValues: Student) => void
}

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup
      .number()
      .positive("Please enter a postive number.")
      .min(10, "Min is 10")
      .max(60, "Max is 60")
      .integer("Please enter an integer.")
      .required("Please enter age.")
      .typeError("Please enter a valid number"),
    mark: yup
      .number()
      .min(0, "Min is 5")
      .max(10, "Max is 10")
      .required("Please enter mark.")
      .typeError("Please enter a valid number"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Please select either male or female")
      .required("Please enter gender."),
    city: yup.string().required("Please select city."),
  })
  .required()

export default function StudentForm({
  initialValues,
  onSubmit,
}: StudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  const cityOptions = useAppSelector(selectCityOptions)

  const [error, setError] = React.useState<string>("")

  const handleFormSubmit = async (formValues: Student) => {
    console.log("Submit: ", formValues)
    try {
      setError("")
      await onSubmit?.(formValues)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          disable={false}
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
        <SelectField
          name="city"
          label="City"
          control={control}
          options={cityOptions}
          disable={false}
        />
        {error && <Alert severity="error">{error}</Alert>}

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} />}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}
