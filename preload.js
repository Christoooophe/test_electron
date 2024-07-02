const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getMeteo: (city) => {
        ipcRenderer.send('get-meteo', city)
    },
    loadMeteo: () => {
        ipcRenderer.send('load-meteo')
    },
    loadedMeteo: (callback) => {
        ipcRenderer.on('meteo-loaded', (event, meteo) => {
            callback(meteo);
        })
    }
})
