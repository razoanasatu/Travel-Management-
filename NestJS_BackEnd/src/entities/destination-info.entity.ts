import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PACKAGE_INFO } from './package-info.entity';

@Entity()
export class DESTINATION_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  description: string;

  @Column()
  best_season: string;

  @Column({ nullable: true })
  imagePath: string;

  @OneToMany(() => PACKAGE_INFO, (packageEntity) => packageEntity.destination)
  packages: PACKAGE_INFO[];
}
