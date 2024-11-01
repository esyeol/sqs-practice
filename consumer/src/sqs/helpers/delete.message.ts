import 'dotenv/config';
import { DeleteMessageCommand, Message } from "@aws-sdk/client-sqs";

/**
 * Consumer에서 이벤트를 Listen 하고 내용 처리후(DB작업, RPC, PUSH, Batch..) 
 * 다시 SQS로 성공 완료 메시지를 전송해서 대기열 제거
 * 
 * @param message sqs message info
*/
export const sqsDeleteResponseMessage = async(message: Message): Promise<DeleteMessageCommand> => {
  return new DeleteMessageCommand({
    QueueUrl: process.env.SQS_URL,
    ReceiptHandle: message.ReceiptHandle,
  });
}

