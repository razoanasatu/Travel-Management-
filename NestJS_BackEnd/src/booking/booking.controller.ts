import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { BookingService } from './booking.service';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return {
      message: 'Booking created successfully',
      booking: await this.bookingService.createBooking(
        createBookingDto,
        userId,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateBooking(
    @Param('id') bookingId: number,
    @Request() req,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const userId = req.user.sub;
    return {
      message: 'Booking updated successfully',
      booking: await this.bookingService.updateBooking(
        userId,
        bookingId,
        updateBookingDto,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async cancelBooking(
    @Param('id') bookingId: number,
    @Request() req,
    @Body() cancelBookingDto: CancelBookingDto,
  ) {
    const userId = req.user.sub;
    return {
      message: 'Booking cancelled successfully',
      booking: await this.bookingService.cancelBooking(
        userId,
        bookingId,
        cancelBookingDto,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBookingDetails(@Param('id') bookingId: number, @Request() req) {
    const userId = req.user.sub;
    return {
      message: 'Booking details fetched successfully',
      booking: await this.bookingService.getBookingDetails(userId, bookingId),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('payment-status')
  async updatePaymentStatus(@Body() paymentStatusDto: PaymentStatusDto) {
    await this.bookingService.updatePaymentStatus(paymentStatusDto);
    return { message: 'Payment status updated successfully' };
  }
}
