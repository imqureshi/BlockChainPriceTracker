import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    create(createAlertDto: CreateAlertDto): Promise<import("./entities/alert.entity").Alert>;
}
