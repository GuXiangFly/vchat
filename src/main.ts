import {app, BrowserWindow} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import * as dotenv from 'dotenv';
import {ChatCompletion,setEnvVariable} from "@baiducloud/qianfan";
import OpenAI from 'openai'

require('dotenv').config();



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit();
}

const createWindow = async () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
        );
    }

    setEnvVariable("QIANFAN_ACCESS_KEY","ALTAKcswQzROKka66rcDbDTzm3")
    setEnvVariable("QIANFAN_SECRET_KEY","247a1fc815c74b0ea710a8956f89e41e")
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // console.log("ChatCompletion_start ")
    //
    // const OpenAI = require('openai');
    //
    // const client = new OpenAI({
    //     apiKey: process.env['ALI_API_KEY'],
    //     baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
    // })
    // const stream = await client.chat.completions.create({
    //     messages: [
    //         { role: 'system', content: '你现在是一只卡通片里面的可爱小狗，请模仿汪汪队长的口吻进行回答' },
    //         { role: 'user', content: '请问队长，老鼠为什么有害呢？' }
    //     ],
    //     model: 'qwen-turbo',
    //     stream: true
    // })
    // for await (const chunk of stream) {
    //     console.log(chunk.choices[0].delta)
    // }
    // console.log("ChatCompletion_end" + JSON.stringify(stream))
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
