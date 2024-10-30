import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';
import { DefaultProducerDto } from './sqs-producer/dtos/default.producer.dto';
import HttpResponse from './core/http/http-response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  async create(@Res() res: Response, @Body() dto: DefaultProducerDto) {
    await this.appService.setSqs(dto);
    return HttpResponse.created(res);
  }
}
