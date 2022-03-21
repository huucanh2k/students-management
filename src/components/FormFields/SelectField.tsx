import { FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import React from "react"
import { Control, useController } from "react-hook-form"

export interface SelectOption {
  label?: string
  value: number | string
}

export interface SelectFieldProps {
  name: string
  control: Control<any>
  label?: string
  options: SelectOption[]
  disable?: boolean
}

export function SelectField({
  name,
  control,
  label,
  disable,
  options,
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <FormControl
      component="fieldset"
      margin="normal"
      error={invalid}
      size="small"
      variant="outlined"
      disabled={disable}
      fullWidth
    >
      <FormControl variant="outlined" fullWidth size="small">
        <InputLabel id={`${name}_label`}>{label}</InputLabel>
        <Select
          labelId={`${name}_label`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
        >
          {options &&
            options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}
