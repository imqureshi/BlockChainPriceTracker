declare const MailDataRequired: any;
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    sendEmail(emailBody: typeof MailDataRequired): Promise<boolean>;
}
export {};
