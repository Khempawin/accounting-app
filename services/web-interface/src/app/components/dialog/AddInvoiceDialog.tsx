import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  InvoiceBaseRecord,
  InvoiceBaseLineItem,
} from "@/app/interfaces/invoice";
import { DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";


export interface AddInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    newInvoice: InvoiceBaseRecord,
    lineItems: InvoiceBaseLineItem[]
  ) => void;
}

export default function AddInvoiceDialog(props: AddInvoiceDialogProps) {
  const { onSave, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
