import { MessageId } from "../enums/MessageId";

export interface Message {
  id: MessageId;
  content?: any;
}
