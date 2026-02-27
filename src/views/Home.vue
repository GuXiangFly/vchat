<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="currentProvider"/>
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput @create="createConversation"/>
    </div>
  </div>
</template>


<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {ProviderProps} from '../types'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
import {useProviderStore} from '../stores/provider'
import {useConversationStore} from '../stores/conversation'
import {useMessageStore} from "../stores/message";
import {useRouter} from "vue-router";


const providerStore = useProviderStore()
const conversationStore = useConversationStore()

const messageStore = useMessageStore()
const currentProvider = ref('')

watch(currentProvider, (newValue, oldValue) => {
  console.log('currentProvider changed from', oldValue, 'to', newValue)
})

const providers = computed(() => providerStore.items)

const selectedModel = ref('')

const router = useRouter()

// 注意：代码中使用了 `providers` 变量，但当前片段中未定义，需补充定义


const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split('/')

  console.log('modelInfo ', providerId, " selectedModel ", selectedModel)
  return {
    providerId: parseInt(providerId),
    selectedModel
  }
})


const createConversation = async (question: string, imagePath?: string) => {
  const {providerId, selectedModel} = modelInfo.value
  console.log("modelInfo value", modelInfo.value)

  const currentDate = new Date().toISOString()

  const conversationId = await conversationStore.createConversation({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate
  })


  let copiedImagePath: string | undefined

  const newMessageId = await messageStore.createMessage({
    content: question,
    conversationId,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: 'question',
    ...(copiedImagePath && {imagePath: copiedImagePath})
  })


  conversationStore.selectedId = conversationId
  router.push(`/conversation/${conversationId}?init=${newMessageId}`)

}

</script>
