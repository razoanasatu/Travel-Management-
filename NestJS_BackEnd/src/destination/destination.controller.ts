import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDestinationDTO } from '../destination/dto/create-destination.dto';
import { UpdateDestinationDTO } from '../destination/dto/update-destination.dto';
import { DESTINATION_INFO } from '../entities/destination-info.entity';
import { DestinationService } from './destination.service';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  async create(
    @Body() createDestinationDto: CreateDestinationDTO,
  ): Promise<DESTINATION_INFO> {
    return this.destinationService.create(createDestinationDto);
  }

  @Get('all')
  async findAll(): Promise<DESTINATION_INFO[]> {
    return this.destinationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DESTINATION_INFO> {
    return this.destinationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDestinationDto: UpdateDestinationDTO,
  ): Promise<DESTINATION_INFO> {
    return this.destinationService.update(id, updateDestinationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.destinationService.remove(id);
  }
}
