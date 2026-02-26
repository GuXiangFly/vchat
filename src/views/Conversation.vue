<template>
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">


<!--    <vk-button>Click me</vk-button>-->
<!--    <div>{{conversationId}}</div>-->

    <div class="h-[5%] shadow-sm bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
      <h3 class="font-semibold text-gray-900">{{conversation.title}}</h3>
<!--      <span class="text-sm text-gray-500">{{dayjs(conversation.updatedAt).format('YYYY-MM-DD HH:mm:ss')}}</span>-->
    </div>

    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'

import {MessageProps, ConversationProps, ProviderProps, MessageListInstance} from '../types'
import {computed, ref, watch} from "vue";
import {messages} from "../testData";
import {conversations} from "../testData";


import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import VkButton from "../components/Button.vue";
import OpenAI from "openai";

const messageListRef = ref<MessageListInstance>()

const route = useRoute()

// let conversationId = parseInt(route.params.id as string)
//
// console.log(conversationId)
//
// const filteredMessages = ref<MessageProps[]>([])
//
// const conversationFirstString = computed(() => messages[0].content)
//
// filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
//
// watch(() => route.params.id, (newVal, oldVal) => {
//   console.log("conversation.vue watch conversationId", newVal, oldVal)
//   conversationId = parseInt(newVal as string)
//   filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
// })
//
// computed(() => filteredMessages.value)


const conversationId = ref(parseInt(route.params.id as string))

watch(() => route.params.id, (newVal, oldVal) => {
  console.log("conversation.vue watch conversationId", newVal, oldVal)
  conversationId.value = parseInt(newVal as string)


})

const filteredMessages = computed(() => messages.filter(message => message.conversationId === conversationId.value))


const conversation = computed(() => conversations.find(conversation => conversation.id === conversationId.value))

</script>
