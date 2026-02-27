<!-- 右侧对话页面 -->
<template>
  <div class="h-[5%] shadow-sm bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="convsersation">
    <h3 class="font-semibold text-gray-900">{{conversation.title}}</h3>
    <span class="text-sm text-gray-500">{{dayjs(conversation.updatedAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
  </div>
  <div class="w-full mx-auto h-[75%] overflow-y-auto pt-2 px-6">
    <MessageList :messages="filteredMessages" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading" />
  </div>
</template>


<script setup lang="ts">

import { useRoute } from 'vue-router'

import {MessageProps, ConversationProps, ProviderProps, MessageListInstance} from '../types'
import {computed, ref, watch} from "vue";
import {messages} from "../testData";
import dayjs from "dayjs"

import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import VkButton from "../components/Button.vue";
import OpenAI from "openai";
import {useMessageStore} from "../stores/message";
import {useConversationStore} from "../stores/conversation";
import {useProviderStore} from "../stores/provider";

const messageListRef = ref<MessageListInstance>()

const route = useRoute()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const provdierStore = useProviderStore()
let conversationId = ref(parseInt(route.params.id as string))


const conversation = computed(() => conversationStore.getConversationById(conversationId.value))

watch(() => route.params.id, async (newVal, oldVal) => {
  console.log("conversation.vue watch conversationId", newVal, oldVal)

  conversationId.value = parseInt(newVal as string)
  await messageStore.fetchMessagesByConversation(conversationId.value)

})

const filteredMessages = computed(() => messages.filter(message => message.conversationId === conversationId.value))

</script>
