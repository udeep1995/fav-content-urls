const {app, BrowserWindow,ipcMain} = require("electron");
const windowStateKeeper = require('electron-window-state');
const readItem = require('./readItem');
let mainWindow;

ipcMain.on("new-item", (e, itemUrl)=> {
  
    readItem(itemUrl, item => {
        e.sender.send("new-item-success", item);
    });
})


function createWindow() {

    let state = windowStateKeeper({
        defaultWidth: 500, defaultHeight: 650
    })
    mainWindow = new BrowserWindow({
        x: state.x, y: state.y,
        width: state.defaultWidth, height: state.defaultHeight,
        minWidth: 350, maxWidth: 650,
        webPreferences: {nodeIntegration: true}
    });  
    mainWindow.loadFile("renderer/main.html");
    
    state.manage(mainWindow);
    
    mainWindow.on("closed", () => {
        mainWindow = null
    })
    mainWindow.webContents.openDevTools();
}

app.on("ready", ()=> {
    createWindow();
});

app.on("window-all-closed", ()=> {
    if(process.platform !== 'darwin') app.quit()
})

app.on("activate", ()=> {
    if(mainWindow === null) createWindow()
})
