import * as MessageModel from '../models/message.model';
import { emitToUser } from '../lib/socket';

export const sendMessage = async (senderId: string, recipientId: string, courseSlug: string, subject: string, body: string) => {
  const message = await MessageModel.createMessage({
    senderId,
    recipientId,
    courseSlug,
    subject,
    body
  });
  
  // Real-time notification to recipient
  emitToUser(recipientId, 'new_message', {
    senderId,
    subject,
    body,
    createdAt: message.createdAt
  });
  
  return message;
};

export const getMessages = async (userId: string) => {
  return await MessageModel.getMessagesByUserId(userId);
};
