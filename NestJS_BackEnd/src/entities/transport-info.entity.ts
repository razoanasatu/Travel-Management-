import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BOOKING_INFO } from './booking-info.entity';

@Entity()
export class TRANSPORT_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  availableSeats: number;

  @Column()
  pricePerSeat: number;

  @OneToMany(() => BOOKING_INFO, (booking) => booking.transport)
  bookings: BOOKING_INFO[];
}
