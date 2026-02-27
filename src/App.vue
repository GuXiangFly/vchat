
<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <button
            class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >
          <Icon icon="radix-icons:chat-bubble" />
          新建聊天
        </button>
        <button
            class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >
          <Icon icon="radix-icons:gear" />
          应用设置
        </button>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>


<style scoped>

</style>



<script setup lang="ts">
import {ConversationProps, ProviderProps} from './types'
import {Icon} from '@iconify/vue'
import ConversationList from "./components/ConversationList.vue";
import ProviderSelect from "./components/ProviderSelect.vue";
import {onMounted} from "vue";

import {useI18n} from "vue-i18n"
const { t } = useI18n()

import {conversations, providers} from "./testData";
import {db, initConversations, initMessages, initProviders} from "./db";
import {initI18n} from "./i18n";
import { useProviderStore } from './stores/provider'
import { useConversationStore } from "./stores/conversation"

const items =  conversations;
const providerStore = useProviderStore()
const conversationStore = useConversationStore()

onMounted((async ()=>{
  // const inserted = await db.providers.add(providers[0])
  // console.log(inserted)

  await initI18n()
  await initProviders()
  await initConversations()
  await initMessages()
  await conversationStore.fetchConversations()
  await providerStore.fetchProviders()

}))

console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>
