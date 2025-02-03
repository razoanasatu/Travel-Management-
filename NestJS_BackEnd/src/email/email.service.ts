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
  // Updated sendEmail method with HTML support
  async sendEmail(to: string, subject: string, text: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Travel Management Suite" <saturazoanasultana@gmail.com>', // sender address
        to: to, // recipient address
        subject: subject, // subject of the email
        text: text, // plain text version (for non-HTML clients)
        html: html, // HTML version of the email
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
