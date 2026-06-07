const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveNote: (note) => ipcRenderer.invoke('save-text-file', note),
    loadNote: () => ipcRenderer.invoke('load-text-file'),
    deleteNote: () => ipcRenderer.invoke('delete-text-file')
});