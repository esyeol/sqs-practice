import { Module } from '@nestjs/common';
import { SqsProducerService } from './sqs-producer.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigService } from '@nestjs/config';
import { SQS } from 'src/common/const/env-keys.const';

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          consumers: [],
          producers: [
            {
              name: configService.get<string>(SQS.QUEUE_NAME),
              queueUrl: configService.get<string>(SQS.TARGET_URL),
              region: configService.get<string>(SQS.REGION),
              credentials: {
                accessKeyId: configService.get<string>(SQS.AC_KEY),
                secretAccessKey: configService.get<string>(SQS.SC_KEY),
              },
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SqsProducerService],
  exports: [SqsProducerService],
})
export class SqsProducerModule {}
