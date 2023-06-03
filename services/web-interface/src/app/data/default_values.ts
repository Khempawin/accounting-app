import { InvoiceBaseLineItem, InvoiceSaveForm } from "../interfaces/invoice";
import { defaultPaymentOption } from "./options";

export const defaultLineItem: InvoiceBaseLineItem = {
  name: "",
  category: "food",
  quantity: 0,
  total: 0,
};

export const defaultInvoiceSaveForm: InvoiceSaveForm = {
  date: new Date(),
  place: "",
  payment_method: defaultPaymentOption.value,
  total: 0,
  lineitems: [],
};
