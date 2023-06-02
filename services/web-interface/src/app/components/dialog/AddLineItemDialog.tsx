import {
  defaultLineItemCategoryOption,
  lineItemCategoryOptions,
  paymentMethodOptions,
} from "@/app/data/options";
import { InvoiceBaseLineItem } from "@/app/interfaces/invoice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../forms/SelectInput";
import TextInput from "../forms/TextInput";

export interface AddLineItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (lineItems: InvoiceBaseLineItem) => void;
}

export default function AddLineItemDialog(props: AddLineItemDialogProps) {
  const { onSave, onClose, open } = props;
  const { handleSubmit, reset, control } = useForm<InvoiceBaseLineItem>({
    defaultValues: {
      name: "",
      category: defaultLineItemCategoryOption.value,
      quantity: 0,
      total: 0,
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formattedData: InvoiceBaseLineItem = {
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      total: data.total,
    };
    reset({
      name: "",
      category: defaultLineItemCategoryOption.value,
      quantity: 0,
      total: 0,
    });
    onSave(formattedData);
  });

  const handleClose = () => {
    reset({
      name: "",
      category: defaultLineItemCategoryOption.value,
      quantity: 0,
      total: 0,
    });
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <form onSubmit={onSubmit}>
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new invoice. Fill in the details below.
          </DialogContentText>
          <List>
            <ListItem>
              <TextInput
                name="name"
                control={control}
                label="Name"
                text_type="text"
              />
            </ListItem>
            <ListItem>
              <SelectInput
                name="category"
                control={control}
                label="Category"
                options={lineItemCategoryOptions}
              />
            </ListItem>
            <ListItem>
              <TextInput
                name="quantity"
                control={control}
                label="Quantity"
                text_type="number"
              />
            </ListItem>
            <ListItem>
              <TextInput
                name="total"
                control={control}
                label="Total"
                text_type="number"
              />
            </ListItem>
          </List>
          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
