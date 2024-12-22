import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Setup Nodemailer transport (use your actual email credentials)
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred service
      auth: {
        user: 'saturazoanasultana@gmail.com',
        pass: 'dmrs clcc ziwd aezo ',
      },
    });
  }

  // Method to send email
  async sendEmail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Travel Management Suite" <saturazoanasultana@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
