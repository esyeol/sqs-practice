import { Injectable } from '@nestjs/common';
import { DefaultProducerDto } from './sqs-producer/dtos/default.producer.dto';
import { SqsProducerService } from './sqs-producer/sqs-producer.service';

@Injectable()
export class AppService {
  constructor(private readonly sqsProducerService: SqsProducerService) {}
  async setSqs(dto: DefaultProducerDto) {
    return this.sqsProducerService.sendPushMessage(dto);
  }
}
