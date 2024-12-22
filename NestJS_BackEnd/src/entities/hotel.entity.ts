import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BOOKING_INFO } from './booking-info.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  totalRooms: number;

  @Column()
  pricePerRoom: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => BOOKING_INFO, (booking) => booking.hotel)
  bookings: BOOKING_INFO[];
}
