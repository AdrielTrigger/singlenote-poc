const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const fs = require('fs');

const dataPath = path.join(app.getPath('userData'), 'saved-note.json');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

ipcMain.handle('save-text-file', async (event, text) => {
  const data = { content: text };
  fs.writeFileSync(dataPath, JSON.stringify(data));
  return { success: true };
});

ipcMain.handle('load-text-file', async () => {
  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath);
    const parsedData = JSON.parse(rawData);
    return parsedData.content;
  }
  return null;
});

ipcMain.handle('delete-text-file', async () => {
  if (fs.existsSync(dataPath)) {
    fs.unlinkSync(dataPath);
    return { success: true };
  }
  return { success: false, error: "File not found!"}
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});