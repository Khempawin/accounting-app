import React from "react";
import { InvoiceBaseLineItem, InvoiceBaseRecord, InvoiceRecord, InvoiceSaveForm } from "@/app/interfaces/invoice";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import AddInvoiceDialog from "@/app/components/dialog/AddInvoiceDialog";
import axios from "axios";

function parseInvoiceResponse(invoiceData: any) {
  const parsedInvoice = invoiceData.map((val: any) => {
    return {
      ...val,
      date: new Date(val.date),
    };
  });
  return parsedInvoice;
}

async function getInvoiceListServerSide() {
  const invoice = await axios.get("http://localhost:5000/invoices");
  return invoice.data;
}

async function getInvoiceListClient() {
  const invoice = await axios.get("/api/get-invoice");
  return invoice.data;
}

async function createInvoice(newInvoice: InvoiceSaveForm) {
    const invoice: InvoiceBaseRecord = {
      date: newInvoice.date,
      place: newInvoice.place,
      payment_method: newInvoice.payment_method,
      total: newInvoice.total,
      total_calculated: newInvoice.total_calculated,
      subtotal_calculated: newInvoice.subtotal_calculated,
      tax_calculated: newInvoice.tax_calculated,
      tip_calculated: newInvoice.tip_calculated,
    };
    const lineItems: InvoiceBaseLineItem[] = newInvoice.lineitems || [];
    await axios.post(
      "/api/create-invoice",
      {
        invoice,
        lineItems,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  return;
}

export async function getServerSideProps(context: any) {
  const invoice = await getInvoiceListServerSide();
  return {
    props: {
      invoiceData: invoice,
    },
  };
}

export default function Invoice({
  invoiceData,
}: {
  invoiceData: InvoiceRecord[];
}) {
  const parsedInvoice = parseInvoiceResponse(invoiceData);

  const [invoiceRecords, setInvoiceRecords] = React.useState<InvoiceRecord[]>(
    parsedInvoice || []
  );
  const [showId, setShowId] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);

  const handleSaveNewInvoice = async (newInvoice: InvoiceSaveForm) => {
    console.log(newInvoice);
    await createInvoice(newInvoice);
    const newInvoiceList = await getInvoiceListClient();
    setInvoiceRecords(parseInvoiceResponse(newInvoiceList));
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
