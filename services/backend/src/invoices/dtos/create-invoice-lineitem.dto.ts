import { IsString, IsNumber } from 'class-validator';

export class CreateInvoiceLineItemDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}
