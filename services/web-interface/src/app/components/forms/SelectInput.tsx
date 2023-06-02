import { Controller } from "react-hook-form";
import { ISelectOption } from "@/app/interfaces/invoice";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Select } from "@mui/material";

export default function SelectInput({
  name,
  control,
  label,
  options,
}: {
  name: string;
  control: any;
  label: string;
  options: ISelectOption[];
}) {
  const renderOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl>
          <InputLabel>{label}</InputLabel>
          <Select onChange={onChange} value={value} label={label}>
            {renderOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
}
