import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DESTINATION_INFO } from '../entities/destination-info.entity';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
@Module({
  imports: [TypeOrmModule.forFeature([DESTINATION_INFO])],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
