export interface InvoiceBaseRecord {
  date: Date;
  place: string;
  payment_method: string;
  total: number;
  total_calculated?: number;
  subtotal_calculated?: number;
  tax_calculated?: number;
  tip_calculated?: number;
}

export interface InvoiceRecord extends InvoiceBaseRecord {
  id: number;
  line_item?: InvoiceLineItem[];
}

export interface InvoiceBaseLineItem {
  name: string;
  category: string;
  quantity: number;
  total: number;
}

export interface InvoiceLineItem extends InvoiceBaseLineItem {
  id: number;
  invoice_id: number;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface InvoiceSaveForm extends InvoiceBaseRecord {
  lineitems?: InvoiceBaseLineItem[];
}
