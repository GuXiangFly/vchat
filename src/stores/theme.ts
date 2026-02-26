import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// 主题色配置
const COLOR_THEMES = Object.freeze([
  { name: '蓝色', value: 'blue' },
  { name: '绿色', value: 'emerald' },
  { name: '粉色', value: 'rose' },
  { name: '琥珀色', value: 'amber' }
])

// 默认主题色
const DEFAULT_THEME = 'blue'

export const useThemeStore = defineStore('theme', () => {
  // 状态定义
  const availableThemes = ref([...COLOR_THEMES])
  const currentTheme = ref(DEFAULT_THEME)
  const darkMode = ref(false)

  // 初始化主题
  const initTheme = () => {
    try {
      // 从 localStorage 加载保存的设置
      const savedTheme = localStorage.getItem('theme')
      const savedDarkMode = localStorage.getItem('darkMode')
      
      // 验证并应用主题
      if (savedTheme && COLOR_THEMES.some(t => t.value === savedTheme)) {
        currentTheme.value = savedTheme
      }
      
      // 验证并应用暗黑模式
      darkMode.value = savedDarkMode === 'true'
      
      // 应用初始样式
      applyThemeStyles()
    } catch (error) {
      console.error('初始化主题失败:', error)
      // 使用默认值
      currentTheme.value = DEFAULT_THEME
      darkMode.value = false
    }
  }

  // 应用主题样式到DOM
  const applyThemeStyles = () => {
    try {
      // 设置暗黑模式类
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // 设置主题色属性
      document.documentElement.setAttribute('data-theme', currentTheme.value)
    } catch (error) {
      console.error('应用主题样式失败:', error)
    }
  }

  // 切换暗黑模式
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  // 设置主题色
  const setTheme = (themeValue) => {
    if (!COLOR_THEMES.some(t => t.value === themeValue)) {
      console.warn(`尝试设置无效主题: ${themeValue}`)
      return
    }
    currentTheme.value = themeValue
  }

  // 监听状态变化并持久化
  watch(currentTheme, (newTheme) => {
    try {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    } catch (error) {
      console.error('保存主题设置失败:', error)
    }
  })

  watch(darkMode, (newDarkMode) => {
    try {
      localStorage.setItem('darkMode', newDarkMode)
      if (newDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (error) {
      console.error('保存暗黑模式设置失败:', error)
    }
  })

  // 立即初始化
  initTheme()

  return {
    // 状态
    availableThemes,
    currentTheme,
    darkMode,
    
    // 方法
    toggleDarkMode,
    setTheme
  }
})