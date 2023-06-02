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
import { useForm } from "react-hook-form";
import TextInput from "../forms/TextInput";
import DateInput from "../forms/DateInput";
import SelectInput from "../forms/SelectInput";
import { defaultPaymentOption, paymentMethodOptions } from "@/app/data/options";
import { sampleLineItem } from "@/app/data/sample_data";
import AddLineItemDialog from "./AddLineItemDialog";

export interface AddInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    newInvoice: InvoiceBaseRecord,
    lineItems: InvoiceBaseLineItem[]
  ) => void;
}

export default function AddInvoiceDialog(props: AddInvoiceDialogProps) {
  const [lineItems, setLineItems] = React.useState<InvoiceBaseLineItem[]>([]);
  const { onSave, onClose, open } = props;
  const { handleSubmit, reset, control } = useForm<InvoiceSaveForm>({
    defaultValues: {
      date: new Date(),
      place: "",
      payment_method: defaultPaymentOption.value,
      total: 0,
    },
  });
  const [showLineItemDialog, setShowLineItemDialog] =
    React.useState<boolean>(false);

  const onSubmit = handleSubmit((data) => {
    const newLineItem: InvoiceBaseLineItem[] = [...lineItems];
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

    const newData: InvoiceBaseRecord = {
      ...data,
      total_calculated: calculated_total,
      subtotal_calculated: subtotal,
      tax_calculated: tax,
      tip_calculated: tip,
    };

    reset({
      date: new Date(),
      place: "",
      payment_method: defaultPaymentOption.value,
      total: 0,
    });
    setLineItems([]);
    onSave(newData, newLineItem);
  });

  const handleClose = () => {
    reset({
      date: new Date(),
      place: "",
      payment_method: defaultPaymentOption.value,
      total: 0,
    });
    setLineItems([]);
    onClose();
  };

  const handleAddLineItem = () => {
    setShowLineItemDialog(true);
  };

  const handleClostLineItemDialog = () => {
    setShowLineItemDialog(false);
  };

  const handleConfirmLineItem = (newLineItem: InvoiceBaseLineItem) => {
    setLineItems((prev) => prev.concat([newLineItem]));
    setShowLineItemDialog(false);
  };

  const handleRemoveLineItem = (index: number) => {
    const newList = lineItems
      .slice(0, index)
      .concat(lineItems.slice(index + 1));
    setLineItems(newList);
  };

  const renderLineItems = (lineItems: InvoiceBaseLineItem[]) => {
    return lineItems.map(({ name, category, quantity, total }, index) => {
      return (
        <ListItem key={index}>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="body1">{name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">{category}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body1">{quantity}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">{total}</Typography>
            </Grid>
            <Grid item xs={3}>
              <ButtonGroup variant="outlined">
                <Button color="warning">Edit</Button>
                <Button
                  color="error"
                  onClick={() => handleRemoveLineItem(index)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </ListItem>
      );
    });
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
                  <AddLineItemDialog
                    open={showLineItemDialog}
                    onClose={handleClostLineItemDialog}
                    onSave={handleConfirmLineItem}
                  />
                </Grid>
              </Grid>
            </ListItem>
            {renderLineItems(lineItems)}
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
