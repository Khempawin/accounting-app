import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { CreateInvoiceLineItemDto } from './dtos/create-invoice-lineitem.dto';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoiceService: InvoicesService) {}

  @Post('/create')
  createInvoice(
    @Body()
    body: {
      invoice: CreateInvoiceDto;
      lineItems: CreateInvoiceLineItemDto[];
    },
  ) {
    this.invoiceService.createInvoice(body.invoice, body.lineItems);
  }

  @Get()
  getInvoiceList(){
    return this.invoiceService.getInvoiceList();
  }

  @Get('/items/:id')
  getLineItem(@Param() param: { id: number }) {
    return this.invoiceService.getInvoiceLineItem(param.id);
  }
}
