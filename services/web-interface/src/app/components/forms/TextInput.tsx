import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function TextInput({
  name,
  control,
  label,
  text_type,
}: {
  name: string;
  control: any;
  label: string;
  text_type: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={(e) => {
            const floatVal = parseFloat(e.target.value);
            if (text_type == "number" && !isNaN(floatVal)) {
              onChange(floatVal);
            } else {
              onChange(e.target.value);
            }
          }}
          value={value}
          label={label}
          type={text_type}
        />
      )}
    />
  );
}
