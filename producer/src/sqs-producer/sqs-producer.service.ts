import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SQSClient } from '@aws-sdk/client-sqs';
import { SqsService } from '@ssut/nestjs-sqs';
import { ConfigService } from '@nestjs/config';
import { SQS } from 'src/common/const/env-keys.const';
import { HttpErrorConstants } from 'src/core/http/http-error-objects';
import { DefaultProducerDto } from './dtos/default.producer.dto';

@Injectable()
export class SqsProducerService {
  private readonly sqsClient: SQSClient;

  constructor(
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {
    this.sqsClient = new SQSClient({
      region: this.configService.get<string>(SQS.REGION),
      credentials: {
        accessKeyId: this.configService.get<string>(SQS.AC_KEY),
        secretAccessKey: this.configService.get<string>(SQS.SC_KEY),
      },
    });
  }

  /**
   * SQS Producer Message
   * */
  async sendPushMessage(body: DefaultProducerDto) {
    const message = JSON.stringify(body);

    try {
      await this.sqsService.send(
        this.configService.get<string>(SQS.QUEUE_NAME),
        {
          id: 'unique',
          body: message,
          // fifo 큐에서만 사용
          // groupId: 'test-group',
          // deduplicationId: 'test-group',
        },
      );
    } catch (err) {
      console.log('error->', err);
      throw new InternalServerErrorException(
        HttpErrorConstants.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
