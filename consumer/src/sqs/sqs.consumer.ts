import 'dotenv/config';
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs"
import { sqsClient } from "./sqs.module";

export const sqsConsumer = async() => {
  const command = new ReceiveMessageCommand({
    QueueUrl: process.env.SQS_URL,
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["unique"],
    WaitTimeSeconds: 3,
  });

  const response = await sqsClient.send(command);
  console.log('response ->', response);
}