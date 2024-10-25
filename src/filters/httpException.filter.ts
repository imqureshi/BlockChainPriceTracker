import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { StandardResponse } from '../config/types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const standardResponse: StandardResponse<any> = {
      status,
      message: exception.message,
      error: exception.getResponse() as any,
    };

    response.status(status).json(standardResponse);
  }
}
