import 'dotenv/config';
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs"
import { sqsClient } from "./sqs.module";
import { sqsDeleteResponseMessage, sqsFailedResponseMessage } from './helpers/delete.message';

const command = new ReceiveMessageCommand({
  QueueUrl: process.env.SQS_URL,
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["unique"],
  WaitTimeSeconds: 10, 
});

export const sqsConsumer = async() => {
  // polling 
  while(true) {
    // SQS 이벤트 수신 
    const response = await sqsClient.send(command);
    try {
      /**
      * Consumer에서 이벤트를 전달 받았을 경우 핸들링 작업(DB, PUSH, Batch..)
      * 이후 표준 대기열에서 이벤트 제거(ACK)
      * */
      if(response.Messages?.length){
        console.log('success');
        const message = response.Messages[0];
        const deleteCompletedMessage = await sqsDeleteResponseMessage(message);
        // sqs 대기열 삭제 
        await sqsClient.send(deleteCompletedMessage);
      } 
    } catch (error) {
      // Nack Message Basic SQS Failed 
      console.error('SQS Conumser RecieveMessage Failed -->', error);
      // TODO:// Refactor
      const message = response.Messages[0];
      const deleteFailedCompletedMessage = await sqsFailedResponseMessage(message);

      await sqsClient.send(deleteFailedCompletedMessage);
    }
  }
}