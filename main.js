const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const path = require('node:path')

let data = null;
function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 1200,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('get-meteo', async (event, city) => {
    const respone = await fetch("http://api.weatherapi.com/v1/current.json?key=8a1b711c9eeb499bb13124724240207&q="+city+"&aqi=no")
    data = await respone.json();
    console.log(data)
});

ipcMain.on('load-meteo', (event) => {
    event.sender.send('meteo-loaded', data)
})
