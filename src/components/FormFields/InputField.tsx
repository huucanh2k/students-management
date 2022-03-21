import { TextField } from "@material-ui/core"
import * as React from "react"
import { Control, useController } from "react-hook-form"

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
  label?: string
}

export function InputField({
  name,
  control,
  label,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      label={label}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  )
}
