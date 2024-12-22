import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BOOKING_INFO } from './booking-info.entity';

@Entity()
export class USER_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'phone_no', length: 15, nullable: true })
  phone_no: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ length: 10, nullable: true })
  gender: string;

  @Column({ name: 'nid_no', length: 20, nullable: true })
  nid_no: string;

  @Column({ name: 'nid_pic_path', length: 255, nullable: true })
  nid_pic_path: string;

  @Column({ name: 'profile_pic_path', length: 255, nullable: true })
  profile_pic_path: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'user_type', length: 50, nullable: true })
  user_type: string;

  @OneToMany(() => BOOKING_INFO, (booking) => booking.user)
  bookings: BOOKING_INFO[];
}
