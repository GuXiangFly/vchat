// 定义对话item属性字段及类型
export interface ConversationProps {
  id: number;
  title: string;
  selectedModel: string;
  createdAt: string;
  updatedAt: string;
  providerId: number;
}

// AI大模型平台(提供商)属性
export interface ProviderProps {
  id: number;
  name: string;
  title?: string;
  desc?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  models: string[]; //支持模型
}

// 消息状态机
export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error'

export interface MessageProps {
  id: number;
  content: string;
  type: 'question' | 'answer';
  conversationId: number;
  status?: MessageStatus;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
}

export interface ChatMessageProps {
  role: string; 
  content: string;
  imagePath?: string;
}

// 创建对话属性
export interface CreateChatProps {
  messages: ChatMessageProps[];
  providerName: string;
  selectedModel: string;
  messageId: number;
}

// 流式数据块
export interface UpdatedStreamData {
  messageId: number;
  data: {
    is_end: boolean;
    result: string;
    is_error?: boolean;
  }
}

export type OnUpdatedCallback = (data: UpdatedStreamData) => void;

export interface MessageListInstance {
  ref: HTMLDivElement
}

// 通用流式数据块
export interface UniversalChunkProps {
  is_end: boolean;
  result: string;
}

// 百度专用数据块
export interface BaiduChunkProps {
  is_end: boolean;
  result: string;
}

// 应用配置
export interface AppConfig {
  language: 'zh' | 'en';
  fontSize: number;
  providerConfigs: Record<string, Record<string, string>>
}

// 默认应用配置
export const DEFAULT_CONFIG: AppConfig = {
  language: 'zh',
  fontSize: 14,
  providerConfigs: {}
}

export type ProviderName = keyof AppConfig['providerConfigs']

// 模型列表 item
export interface ModelItem {
  id: string
  object: string
  created?: number
  owned_by: string
}

export interface TestConnectResult { success: boolean; message: string; models: ModelItem[] }