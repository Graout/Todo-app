const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const Store = require("electron-store");
const Settings = new Store({ name: "Settings" });
const fetch = require("electron-fetch").default;

let win;
const mainMenuTemplate = [];
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        minWidth: 1050,
        minHeight: 600,
        resizable: true,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.once("ready-to-show", () => {
        win.show();
    });

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", () => {
    createWindow();
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on("display-app-menu", (_e, arg) => {
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    if (win) {
        mainMenu.popup(win, arg.x, arg.y);
    }
});

ipcMain.on("open:dialog:box", () => {
    dialog
        .showOpenDialog(win, {
            filters: [{ name: "Char", extensions: ["json"] }],
        })
        .then((result) => {
            Settings.set({ char: result.filePaths[0] });
        })
        .catch((err) => {
            console.log(err);
        });
});
mainMenuTemplate.push({
    label: "Settings",
    click(_item, focusedWindow) {
        focusedWindow.webContents.send("test");
    },
});

if (isDev) {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "toggle DevTools",
                accelerator:
                    process.platform === "darwin" ? "Command+I" : "Ctrl+I",
                click(_item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
            },
            {
                role: "reload",
            },
        ],
    });
}
