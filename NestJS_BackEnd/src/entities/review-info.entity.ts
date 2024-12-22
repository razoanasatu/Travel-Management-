import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { USER_INFO } from './user-info.entity';

@Entity()
export class REVIEW_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'user_id' })
  user_id: USER_INFO;

  @ManyToOne(() => USER_INFO)
  @JoinColumn({ name: 'target_id' })
  target_id: USER_INFO;

  @Column()
  review_text: string;

  @Column()
  rating: number;
}
