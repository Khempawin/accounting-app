import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceLineItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  quantity: number;

  @Column("double")
  total: number;
}
