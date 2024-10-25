import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
const sgMail = require('@sendgrid/mail');
const { MailDataRequired } = require('@sendgrid/mail');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDKEYGRID'));
  }
  async sendEmail(emailBody: typeof MailDataRequired) {
    try {
      await sgMail.send(emailBody);
      return true;
    } catch (error) {
      this.logger.error(
        `error sending email to ${emailBody.to} from ${emailBody.from}`,
        error,
      );
      return false;
    }
  }
}
