import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PACKAGE_INFO } from './package-info.entity';

@Entity()
export class GUIDE_INFO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  expertise: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => PACKAGE_INFO, (packageEntity) => packageEntity.guide)
  packages: PACKAGE_INFO[];
}
