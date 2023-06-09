import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceLineItem } from './invoiceLineItem.entity';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { CreateInvoiceLineItemDto } from './dtos/create-invoice-lineitem.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceLineItem)
    private lineItemRepo: Repository<InvoiceLineItem>,
  ) {}

  async createInvoice(
    invoiceRecord: CreateInvoiceDto,
    lineItems: CreateInvoiceLineItemDto[],
  ) {
    const invoice = this.invoiceRepo.create(invoiceRecord);
    await this.invoiceRepo.insert(invoice);
    const itemsWithInvoiceId = lineItems.map((val) => {
      return { invoice_id: invoice.id, ...val };
    });
    await this.lineItemRepo.insert(itemsWithInvoiceId);
  }

  async getInvoiceList() {
    return await this.invoiceRepo.find();
  }

  async getInvoiceLineItem(invoice_id: number) {
    return await this.lineItemRepo.find({
      where: {
        invoice_id,
      },
    });
  }
}
