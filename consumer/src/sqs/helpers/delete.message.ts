import 'dotenv/config';
import { ChangeMessageVisibilityCommand, DeleteMessageCommand, Message } from "@aws-sdk/client-sqs";

/**
 * Consumer에서 이벤트를 Listen 하고 내용 처리후(DB작업, RPC, PUSH, Batch..) 
 * 다시 SQS로 성공 완료 메시지를 전송해서 대기열 제거 -> ACK 
 * 
 * @param message sqs message info
*/
export const sqsDeleteResponseMessage = async(message: Message): Promise<DeleteMessageCommand> => {
  return new DeleteMessageCommand({
    QueueUrl: process.env.SQS_URL,
    ReceiptHandle: message.ReceiptHandle,
  });
}

/**
 * Consumer에서 이벤트 수신에 실패했을 경우 NACK 메시지를 queue로 이벤트 발송
 * 실패 회신 Event -> NACK
*/
export const sqsFailedResponseMessage = async(message: Message): Promise<ChangeMessageVisibilityCommand> => {
  return new ChangeMessageVisibilityCommand({
    QueueUrl: process.env.SQS_URL,
    ReceiptHandle: message.ReceiptHandle,
    VisibilityTimeout: 60, // deafult 30초  
  });
  
}

