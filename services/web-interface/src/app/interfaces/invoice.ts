export interface InvoiceBaseRecord{
    date: Date;
    place: string;
    payment_method: string;
    total: number;
    total_calculated?: number;
    subtotal_calculated?: number;
    tax_calculated?: number;
    tip_calculated?: number;
}

export interface InvoiceRecord extends InvoiceBaseRecord{
    id: number;
}

export interface InvoiceBaseLineItem{
    name: string;
    category: string;
    quantity: number;
    total: number;
}

export interface InvoiceLineItem extends InvoiceBaseLineItem{
    invoice_id: number;
}