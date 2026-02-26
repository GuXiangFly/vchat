

<template>
  <div class="conversation-list">
    <div
        class="item border-gray-300 border-t cursor-pointer bg-white hover:bg-gray-200 p-2"
        v-for="item in items"
        :key="item.id"
    >
      <a @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ item.selectedModel }}</span>
          <span>{{ item.updatedAt }}</span>
        </div>
        <h2 class="font-semibold text-gray-900 truncate"  > {{item.title }}</h2>
      </a>
    </div>
  </div>
</template>


<style scoped>

</style>


<script setup lang="ts">
import { ConversationProps } from '../types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from "@iconify/vue"
const router = useRouter()

defineProps<{ items: ConversationProps[] }>()


const goToConversation = (id: number) => {
  console.log('goToConversation', id)
  router.push({ path: `/conversation/${id}`})
}
</script>
