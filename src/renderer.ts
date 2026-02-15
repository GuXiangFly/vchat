/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { i18n } from './i18n'
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import {createRouter, createMemoryHistory} from "vue-router";
import App from "./App.vue";

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);


import Home from './views/Home.vue';
import Conversation from './views/Conversation.vue';

// 路由配置
const routes = [
    //{ path: '/', component: Conversation },
     { path: '/', component: Home },
    { path: '/conversation/:id', component: Conversation }
]


// 创建路由历史记录
const router = createRouter({
    history: createMemoryHistory(),
    routes
})


// 初始化全局状态管理
const pinia = createPinia()

createApp(App).use(router).use(pinia).use(i18n).mount('#app');
