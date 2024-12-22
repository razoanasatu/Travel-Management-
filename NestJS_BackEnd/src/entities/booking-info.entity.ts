import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { PACKAGE_INFO } from './package-info.entity';
import { PAYMENT_INFO } from './payment-info.entity';
import { TRANSPORT_INFO } from './transport-info.entity';
import { USER_INFO } from './user-info.entity';

@Entity()
export class BOOKING_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => USER_INFO, (user) => user.bookings)
  user: USER_INFO;

  @ManyToOne(() => PACKAGE_INFO, (packageEntity) => packageEntity.bookings)
  package: PACKAGE_INFO;

  @ManyToOne(() => TRANSPORT_INFO, (transport) => transport.bookings)
  transport: TRANSPORT_INFO;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel: Hotel;

  @Column({ nullable: true })
  bookingDate: Date;

  @Column({ nullable: true })
  travelDate: Date;

  @Column()
  seats: number;

  @Column()
  roomType: string;

  // @Column()
  // hotelCount: number;

  // Adding status, cancellation fee and refund amount fields
  @Column({ default: 'confirmed' }) // 'confirmed', 'cancelled', etc.
  status: string;

  @Column({ nullable: true })
  cancellationFee: number; // Cancellation fee, null if not cancelled

  @Column({ nullable: true })
  refundAmount: number; // Refund amount, null if not cancelled

  @OneToMany(() => PAYMENT_INFO, (payment) => payment.booking)
  payments: PAYMENT_INFO[];
}
