const {remote, shell} = require("electron");

const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add New',
                click: window.newItem,
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: 'Read Item',
                accelerator: 'CmdOrCtrl+O',
                click: window.openItem
            },
             {
                label: 'Open in Browser',
                accelerator: 'CmdOrCtrl+Shift+O',
                click: window.openItemNative
            },
            {
                label: 'Delete Item',
                accelerator: 'CmdOrCtrl+Backspace',
                click: window.deleteItem
            },
            {
                label: 'Search Items',
                accelerator: 'CmdOrCtrl+S',
                click: window.searchItems
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click: () => {shell.openExternal("https://github.com/udeep1995/fav-content-urls.git")}
            }
        ]
    }
];

if(process.platform === 'darwin') {
    template.unshift({
        label: remote.app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services'},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    })
}

const menu = remote.Menu.buildFromTemplate(template);

remote.Menu.setApplicationMenu(menu);