
import { Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";

export default function DateInput({
  name,
  control,
  label,
}: {
  name: string;
  control: any;
  label: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MobileDatePicker label={label} value={value} onChange={onChange} />
      )}
    />
  );
}
