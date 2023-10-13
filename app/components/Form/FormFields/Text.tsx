import React from "react";

import TextField from "@material-ui/core/TextField";

interface TextFieldProps {
  id: string;
  type: React.InputHTMLAttributes<unknown>["type"];
  label: string;
  testId?: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function Text({
  id,
  type,
  label,
  testId,
  value,
  handleChange,
  handleBlur,
  error,
  errorMessage,
}: TextFieldProps) {
  return (
    <TextField
      fullWidth
      id={id}
      name={id}
      label={label}
      variant="outlined"
      inputProps={{ "data-testid": testId }}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={error && errorMessage}
      margin="normal"
    />
  );
}
