import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BOOKING_INFO } from 'src/entities/booking-info.entity';
import { PAYMENT_INFO } from 'src/entities/payment-info.entity';
import { Repository } from 'typeorm';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BOOKING_INFO)
    private readonly bookingRepository: Repository<BOOKING_INFO>,
    @InjectRepository(PAYMENT_INFO)
    private readonly paymentRepository: Repository<PAYMENT_INFO>,
  ) {}

  private calculateDaysBeforeTravel(travelDate: Date): number {
    const today = new Date();
    return (
      (new Date(travelDate).getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  }

  async createBooking(createBookingDto: CreateBookingDto, userId: number) {
    const newBooking = this.bookingRepository.create({
      ...createBookingDto,
      user: { id: userId },
      status: 'pending',
    });

    // The bookingDate will be automatically set by the database.
    return await this.bookingRepository.save(newBooking);
  }

  async updateBooking(
    userId: number,
    bookingId: number,
    updateDto: UpdateBookingDto,
  ) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: { id: userId } },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const daysBeforeTravel = this.calculateDaysBeforeTravel(booking.travelDate);

    if (daysBeforeTravel < 3) {
      throw new BadRequestException(
        'Cannot update booking less than 3 days before travel',
      );
    }

    Object.assign(booking, updateDto);
    return await this.bookingRepository.save(booking);
  }

  async cancelBooking(
    userId: number,
    bookingId: number,
    cancelBookingDto: CancelBookingDto,
  ) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: { id: userId } },
      relations: ['payments'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const daysBeforeTravel = this.calculateDaysBeforeTravel(booking.travelDate);

    if (daysBeforeTravel < 3) {
      throw new BadRequestException(
        'Cannot cancel booking less than 3 days before travel',
      );
    }

    const payment = booking.payments[0];
    if (payment) {
      booking.cancellationFee = Math.floor(0.1 * payment.amount);
      booking.refundAmount = payment.amount - booking.cancellationFee;
    }

    booking.status = 'cancelled';
    return await this.bookingRepository.save(booking);
  }

  async getBookingDetails(userId: number, bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: { id: userId } },
      relations: ['package', 'transport', 'hotel', 'payments'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async updatePaymentStatus(paymentStatusDto: PaymentStatusDto) {
    const booking = await this.bookingRepository.findOne({
      where: { id: paymentStatusDto.bookingId },
      relations: ['payments'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const payment = this.paymentRepository.create({
      ...paymentStatusDto,
      booking: booking,
    });

    await this.paymentRepository.save(payment);
    return { message: 'Payment status updated' };
  }
}
