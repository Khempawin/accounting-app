import { IsDate, IsString, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsDate()
  date: Date;

  @IsString()
  place: string;

  @IsString()
  payment_method: string;

  @IsNumber()
  total: number;

  @IsNumber()
  total_calculated: number;

  @IsNumber()
  subtotal_calculated: number;

  @IsNumber()
  tax_calculated: number;

  @IsNumber()
  tip_calculated: number;
}
