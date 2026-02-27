<template>
  <div class="message-input w-full shadow-md border rounded-lg border-gray-300 py-1 px-2 focus-within:border-green-700 transition-colors">
    <div v-if="imagePreview" class="mb-2 relative flex items-center">
      <img :src="imagePreview" alt="Preview" class="h-24 w-24 object-cover rounded">
    </div>
    <div class="flex items-center">
      <input type="file" accept="image/*" ref="fileInput" class="hidden" @change="handleImageUpload">
      <Icon
          icon="radix-icons:image"
          width="24"
          height="24"
          :class="[
          'mr-2',
          disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600'
        ]"
          @click="triggerFileInput"
      />
      <input class="outline-none border-0 flex-1 bg-white focus:ring-0" type="text" v-model="model" :disabled="disabled" :placeholder="t('common.inputPlaceholder')">
      <Button icon-name="radix-icons:paper-plane" @click="onCreate" :disabled="disabled">
        {{ t('common.send') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import Button from './Button.vue'

const { t } = useI18n()

const props = defineProps<{
  disabled?: boolean;
}>()

const emit = defineEmits<{
  create: [value: string, imagePath?: string]
}>()

const model = defineModel<string>()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref('')

//触发上传图片选框
const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click()
  }
}

let selectedImage:File | null = null
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedImage = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string //base64
    }
    reader.readAsDataURL(selectedImage)
  }
}

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    // emit 子组件向父组件传递数据或触发事件，最新版的 File 对象移除了 path属性
    //emit('create', model.value, selectedImage?.path || undefined)
    if (selectedImage) {
      const filePath = window.electronAPI.getFilePath(selectedImage)
      emit('create', model.value, filePath)
    } else {
      emit('create', model.value)
    }
    selectedImage = null
    imagePreview.value = ''
  }
}
</script>
