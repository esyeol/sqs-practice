import 'dotenv/config';
import { SQSClient } from '@aws-sdk/client-sqs';


/**
 * sqsClient SDK 설정
 * */ 
export const sqsClient = new SQSClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.SQS_AC_KEY,
    secretAccessKey: process.env.SQS_SC_KEY,
  }, 
});
