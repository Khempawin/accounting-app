import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './invoice.entity';
import { InvoiceLineItem } from './invoiceLineItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceLineItem])],
  providers: [InvoicesService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
