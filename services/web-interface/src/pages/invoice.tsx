import React from "react";
import { InvoiceBaseLineItem, InvoiceBaseRecord, InvoiceRecord } from "@/app/interfaces/invoice";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { sampleInvoiceRecords } from "@/app/data/sample_data";
import AddInvoiceDialog from "@/app/components/dialog/AddInvoiceDialog";

export default function Invoice() {
  const [invoiceRecords, setInvoiceRecords] =
    React.useState<InvoiceRecord[]>(sampleInvoiceRecords);
  const [showId, setShowId] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);

  const handleSaveNewInvoice = (newInvoice: InvoiceBaseRecord, lineItems: InvoiceBaseLineItem[]) => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowInvoiceDetails = (id: number) => {
    console.log(`Display details of ${id}`);
    setShowId(id);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      width: 50,
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      valueFormatter: (params) => format(params.value, "dd-MMM-yy"),
    },
    {
      field: "place",
      headerName: "Place",
      width: 200,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 150,
    },
    {
      field: "subtotal_calculated",
      headerName: "Subtotal",
      width: 100,
    },
    {
      field: "tax_calculated",
      headerName: "Tax",
      width: 100,
    },
    {
      field: "tip_calculated",
      headerName: "Tip",
      width: 100,
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleShowInvoiceDetails(params.row["id"])}>
          Show Details
        </Button>
      ),
      sortable: false,
    },
  ];

  const handleClickAdd = () => {
    setOpen(true);
  };

  return (
    <div>
      <h1>Invoice</h1>
      <div>
        <h2>Action buttons</h2>
        <Button variant="outlined" onClick={handleClickAdd}>
          Add
        </Button>
        <AddInvoiceDialog
          open={open}
          onClose={handleClose}
          onSave={handleSaveNewInvoice}
        />
      </div>
      <div>
        <h2>List of invoice {`| Showing ID ${showId}`}</h2>
        <DataGrid rows={invoiceRecords} columns={columns} />
      </div>
    </div>
  );
}
