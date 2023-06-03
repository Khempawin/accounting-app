import {
  InvoiceBaseLineItem,
  InvoiceLineItem,
  InvoiceRecord,
} from "../interfaces/invoice";

export const sampleInvoiceLineItem: InvoiceLineItem = {
  id: 1,
  invoice_id: 1,
  name: "luggage cart",
  category: "services",
  quantity: 1,
  total: 6,
};

export const sampleInvoiceRecords: InvoiceRecord[] = [
  {
    id: 1,
    date: new Date("2022-07-25T00:00:00-0600"),
    place: "airport",
    payment_method: "travel card",
    total: 6,
    subtotal_calculated: 6,
    tax_calculated: 0,
    tip_calculated: 0,
  },
  {
    id: 2,
    date: new Date("2022-07-25T00:00:00-0600"),
    place: "potbelly sandwich shop",
    payment_method: "travel card",
    total: 5.22,
    subtotal_calculated: 4.79,
    tax_calculated: 0.43,
    tip_calculated: 0,
  },
];

export const sampleLineItem: InvoiceBaseLineItem = {
  name: "luggage cart",
  category: "services",
  quantity: 1,
  total: 6,
};
