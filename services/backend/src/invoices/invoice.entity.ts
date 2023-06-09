import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  place: string;

  @Column()
  payment_method: string;

  @Column("double")
  total: number;

  @Column("double")
  total_calculated: number;

  @Column("double")
  subtotal_calculated: number;

  @Column("double")
  tax_calculated: number;

  @Column("double")
  tip_calculated: number;
}
