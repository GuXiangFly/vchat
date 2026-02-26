<template>
  <div class="message-list">
    <div class="message-item mb-3" v-for="message in messages" :key="message.id">
      <div class="flex" :class="{ 'justify-end': message.type === 'question' }">
        <div>
          <div class="text-sm text-gray-500 mb-2" :class="{'text-right': message.type === 'question'}">
            {{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
          </div>
          <div class="message-question bg-green-700 text-white p-2 rounded-md" v-if="message.type === 'question'">
            {{ message.content }}
          </div>
          <div class="message-question bg-gray-200 text-gray-700 p-2 rounded-md" v-else>


            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading"></Icon>
            </template>
            <template v-else>
              {{ message.content }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref} from 'vue'
import dayjs from "dayjs"
import {Icon} from '@iconify/vue'
import VueMarkdown from 'vue-markdown-render'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import {MessageProps} from '../types'

defineProps<{ messages: MessageProps[] }>()
const plugins = [markdownItHighlightjs]
// 创建一个响应式 DOM 元素引用
const _ref = ref<HTMLDivElement>()
// 暴露组件内部的属性或方法 给父组件，这里用于获取高度
defineExpose({
  ref: _ref
})
</script>
