import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BOOKING_INFO } from './booking-info.entity';

@Entity()
export class PAYMENT_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BOOKING_INFO, (booking) => booking.payments)
  @JoinColumn({ name: 'booking_id' })
  booking: BOOKING_INFO;

  @Column()
  payment_method: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  transaction_no: string;
}
