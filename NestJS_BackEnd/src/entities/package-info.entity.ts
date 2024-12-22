import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BOOKING_INFO } from './booking-info.entity';
import { DESTINATION_INFO } from './destination-info.entity';
import { GUIDE_INFO } from './guide-info.entity';

@Entity()
export class PACKAGE_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => DESTINATION_INFO, (destination) => destination.packages)
  destination: DESTINATION_INFO;

  @ManyToOne(() => GUIDE_INFO, (guide) => guide.packages)
  guide: GUIDE_INFO;

  @OneToMany(() => BOOKING_INFO, (booking) => booking.package)
  bookings: BOOKING_INFO[];
}
