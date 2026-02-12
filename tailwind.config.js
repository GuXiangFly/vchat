/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ //指定 Tailwind 应该扫描哪些需要样式注入的文件
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // 使用 class 模式实现暗黑主题
  theme: {
    extend: {
      colors: {
        // 定义主题色变量
        'primary': 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        // 具体颜色定义
        'theme-blue': {
          light: '#3b82f6',
          dark: '#1d4ed8'
        },
        'theme-emerald': {
          light: '#10b981',
          dark: '#047857'
        },
        'theme-rose': {
          light: '#f43f5e',
          dark: '#be123c'
        },
        'theme-amber': {
          light: '#f59e0b',
          dark: '#b45309'
        }
      },
    },
  },
    // plugins: [
    //   require('@tailwindcss/typography'),
    //   // 添加插件来处理 data-theme 属性
    //   function({ addVariant }) {
    //     addVariant('data-theme', '&[data-theme]');
    //   }
    // ],
}

