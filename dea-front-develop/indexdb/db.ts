// db.ts
import Dexie, { Table } from 'dexie';

export interface BotMessage {
  id?: number;
  text: string;
  isReply: boolean;
  type:string;
  userId: string;
  createdAt: Date;
}

// export class DbConfigDexie extends Dexie {
//   // 'friends' is added by dexie when declaring the stores()
//   // We just tell the typing system this is the case
//   BotMessage!: Table<BotMessage>; 

//   constructor() {
//     super('chatbot');
//     this.version(1).stores({
//       friends: '++id, text, isReply, type, userId' // Primary key and indexed props
//     });
//   }
// }

// export const db = new DbConfigDexie();

export const db: any = new Dexie('myDatabase');
db.version(1).stores({
  botMessage: '++id, text, isReply, type, userId, createdAt' // Primary key and indexed props
});