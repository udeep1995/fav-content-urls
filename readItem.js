const {BrowserWindow} = require('electron');

let offscreenWindow;

module.exports = (url, callback) => {
    // console.log("url", url);
    // Create offscreen window
    offscreenWindow = new BrowserWindow({
        width: 1920, 
        height: 1080,
        show: false,
        webPreferences: {
            offscreen: true
        }
    })
    // Load item url
    offscreenWindow.loadURL(url);
    
    // Wait for content to finish loading 
    offscreenWindow.webContents.on('did-finish-load', async e=>{
        // Get page title
        let title = offscreenWindow.getTitle() || "Unkown title"
        let imageCaptured = await offscreenWindow.webContents.capturePage()
        let screenshot = imageCaptured.toDataURL()
        callback({title, screenshot, url})
        offscreenWindow.close()
        offscreenWindow = null
    })

}