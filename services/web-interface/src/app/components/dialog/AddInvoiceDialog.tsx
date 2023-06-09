import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  InvoiceBaseRecord,
  InvoiceBaseLineItem,
  InvoiceSaveForm,
} from "@/app/interfaces/invoice";
import {
  Box,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import TextInput from "../forms/TextInput";
import DateInput from "../forms/DateInput";
import SelectInput from "../forms/SelectInput";
import {
  defaultPaymentOption,
  lineItemCategoryOptions,
  paymentMethodOptions,
} from "@/app/data/options";
import AddLineItemDialog from "./AddLineItemDialog";
import {
  defaultInvoiceSaveForm,
  defaultLineItem,
} from "@/app/data/default_values";

export interface AddInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newInvoice: InvoiceSaveForm) => void;
}

export default function AddInvoiceDialog(props: AddInvoiceDialogProps) {
  const { onSave, onClose, open } = props;
  const { handleSubmit, reset, control, watch } = useForm<InvoiceSaveForm>({
    defaultValues: defaultInvoiceSaveForm,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineitems",
  });

  const watchLineItem = watch("lineitems") || [];
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchLineItem[index],
    };
  });

  const onSubmit = handleSubmit((data) => {
    const newLineItem: InvoiceBaseLineItem[] = [];
    let subtotal = 0;
    let tax = 0;
    let tip = 0;
    let calculated_total = 0;

    // Aggregate items
    for (const item of newLineItem) {
      if (item.category == "tax") {
        tax += item.total;
      } else if (item.category == "tip") {
        tip += item.total;
      } else {
        subtotal += item.total;
      }
    }
    calculated_total = subtotal + tax + tip;

    const newData: InvoiceSaveForm = {
      ...data,
      total_calculated: calculated_total,
      subtotal_calculated: subtotal,
      tax_calculated: tax,
      tip_calculated: tip,
    };

    reset(defaultInvoiceSaveForm);
    onSave(newData);
  });

  const handleClose = () => {
    reset(defaultInvoiceSaveForm);
    onClose();
  };

  const handleAddLineItem = () => {
    append(defaultLineItem);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="lg">
      <form onSubmit={onSubmit}>
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new invoice. Fill in the details below.
          </DialogContentText>
          <List>
            <ListItem>
              <DateInput name="date" control={control} label="Date" />
            </ListItem>
            <ListItem>
              <TextInput
                name="place"
                control={control}
                label="Place"
                text_type="text"
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
            <ListItem>
              <SelectInput
                name="payment_method"
                control={control}
                label="Payment Method"
                options={paymentMethodOptions}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">Line items</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" onClick={handleAddLineItem}>
                    Add Line Item
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            {controlledFields.map((field, index) => {
              return (
                <ListItem key={field.id}>
                  <Grid container>
                    <Grid item xs={3} style={{ margin: "2px 5px" }}>
                      <TextInput
                        name={`lineitems.${index}.name`}
                        control={control}
                        label="Name"
                        text_type="text"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "2px 5px",
                      }}
                    >
                      <SelectInput
                        name={`lineitems.${index}.category`}
                        control={control}
                        label="Category"
                        options={lineItemCategoryOptions}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "2px 5px",
                      }}
                    >
                      <TextInput
                        name={`lineitems.${index}.quantity`}
                        control={control}
                        label="Quantity"
                        text_type="number"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "2px 5px",
                      }}
                    >
                      <TextInput
                        name={`lineitems.${index}.total`}
                        control={control}
                        label="Total"
                        text_type="number"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "2px 5px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
