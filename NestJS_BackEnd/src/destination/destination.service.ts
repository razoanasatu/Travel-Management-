import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDestinationDTO } from '../destination/dto/create-destination.dto';
import { UpdateDestinationDTO } from '../destination/dto/update-destination.dto';
import { DESTINATION_INFO } from '../entities/destination-info.entity';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(DESTINATION_INFO)
    private destinationRepository: Repository<DESTINATION_INFO>,
  ) {}

  async create(
    createDestinationDto: CreateDestinationDTO,
  ): Promise<DESTINATION_INFO> {
    const destination = this.destinationRepository.create(createDestinationDto);
    return await this.destinationRepository.save(destination);
  }

  async findAll(): Promise<DESTINATION_INFO[]> {
    return await this.destinationRepository.find();
  }

  async findOne(id: number): Promise<DESTINATION_INFO> {
    const destination = await this.destinationRepository.findOne({
      where: { id },
    });
    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    return destination;
  }

  async update(
    id: number,
    updateDestinationDto: UpdateDestinationDTO,
  ): Promise<DESTINATION_INFO> {
    const destination = await this.destinationRepository.preload({
      id,
      ...updateDestinationDto,
    });

    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return this.destinationRepository.save(destination);
  }

  async remove(id: number): Promise<void> {
    const destination = await this.findOne(id);
    await this.destinationRepository.remove(destination);
  }
}
