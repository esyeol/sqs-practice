import 'dotenv/config';
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs"
import { sqsClient } from "./sqs.module";
import { sqsDeleteResponseMessage } from './helpers/delete.message';

export const sqsConsumer = async() => {
  const command = new ReceiveMessageCommand({
    QueueUrl: process.env.SQS_URL,
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["unique"],
    WaitTimeSeconds: 0, 
  });

  const response = await sqsClient.send(command);
  console.log('response ->', response.Messages);
  
  /**
   * Consumer에서 이벤트를 전달 받았을 경우 핸들링 작업(DB, PUSH, Batch..)
   * 이후 표준 대기열에서 이벤트 제거 
   * */ 
  
  if(response.Messages?.length){
    const message = response.Messages[0];
    const deleteCompletedMessage = await sqsDeleteResponseMessage(message);
    // sqs 대기열 삭제 
    await sqsClient.send(deleteCompletedMessage);
  }

  
}