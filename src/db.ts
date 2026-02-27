// 使用 Dexie.js (IndexedDB)持久化数据，存储在浏览器的 IndexedDB 数据库
import Dexie, { type EntityTable } from 'dexie'
import {conversations, messages, providers} from './testData'
import { ProviderProps, ConversationProps, MessageProps } from './types'

// 创建了包含 3 个表的数据库实例，EntityTable<T, K> 为每张表绑定 TypeScript 类型
export const db = new Dexie('vChatDatabase') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>;
  conversations: EntityTable<ConversationProps, 'id'>;
  messages: EntityTable<MessageProps,'id'>;
}

// 定义版本1的表结构
db.version(1).stores({
  providers: '++id, name', // 自增ID + 名称索引
  conversations: '++id, providerId', // 主键id，外键索引providerId, 关联provider
  messages: '++id, conversationId' // 主键id，外键索引conversationId, 关联conversation
})

// 初始化加载大模型
export const initProviders = async () => {
  const count = await db.providers.count()

  //文档：https://dexie.org/docs/API-Reference#quick-reference
  //const items = await db.providers.where({ id: 2}).toArray()
  //console.log('items', items)
  //const updatedItem = await db.providers.update(1, { desc: 'updated desc'})
  //console.log('updatedItem', updatedItem)
  //const deletedItem = await db.providers.delete(1)
  //console.log('deletedItem', deletedItem)

  //db.table('providers').clear()
  // db.providers.clear() // 清空表
  if (count === 0) {
    db.providers.bulkAdd(providers)
  }
}

export const initConversations = async () => {
  const count = await db.conversations.count()
  if (count === 0) {
     db.conversations.bulkAdd(conversations)
  }
}

export const initMessages = async () => {
    const count = await db.messages.count()
    if (count === 0){
        db.messages.bulkAdd(messages)
    }

}
