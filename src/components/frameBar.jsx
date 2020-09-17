import React from "react";
import { CSS, DynamicCSS } from "electron-css";
import { defaultLayout, Dark } from "../ui/theme";
import Nav from "../components/nav";
const { remote, ipcRenderer } = window.require("electron");
const Theme = DynamicCSS();
const Layout = DynamicCSS();
Layout.use(defaultLayout.Layout);
Theme.use(Dark.Theme);

const framebar = CSS(
    {
        color: Theme.mainTextframbarcolor,
        background: Theme.mainBackgroundframbar,
        display: Layout.defaultDisplay,
        height: Layout.defaultHeight,
        "justify-content": "space-between",
        overflow: "hidden",
        "-webkit-app-region": "drag",
        position: "fixed",
        top: 0,
        width: "100%",
        "z-index": 1,
        "font-family": "Segoe MDL2 Assets"
    },
    "frame-bar"
);

const btns = CSS(
    {
        "padding-top": "9px",
        "-webkit-app-region": "no-drag",
        "text-decoration": Layout.defaultTextDecoration,
        "list-style": Layout.defaultListStyle,
        "text-align": "center",
        width: "100px",
        cursor: Layout.defaultCursor,
        color: Theme.mainTextframbarcolor,
        onHover: {
            backgroundColor: Theme.onHover
        }
    },
    "frame-bar-btns"
);
const frame_bar_ul = CSS(
    {
        order: 1,
        height: Layout.defaultHeight,
        "font-size": Layout.defaultFontSize,
        display: "flex",
        "justify-content": "space-around",
        width: "150px"
    },
    "frame-bar-ul"
);
const menuPopup = CSS(
    {
        "padding-top": "6px",
        "text-decoration": Layout.defaultTextDecoration,
        "list-style": Layout.defaultListStyle,
        cursor: Layout.defaultCursor,
        "text-align": "center",
        width: "50px",
        color: Theme.mainTextframbarcolor,
        onHover: {
            backgroundColor: Theme.onHover
        }
    },
    "menu-popup"
);
const main = CSS(
    {
        order: 1,
        "-webkit-app-region": "no-drag",
        display: Layout.defaultDisplay,
        "justify-content": "space-around"
    },
    "main"
);

const quitBtn = () => {
    remote.getCurrentWindow().close();
};

const miniMize = () => {
    remote.getCurrentWindow().minimize();
};
const maxiMize = () => {
    const currentWindow = remote.getCurrentWindow();
    if (currentWindow.isMaximized()) {
        currentWindow.unmaximize();
    } else {
        currentWindow.maximize();
    }
};

const openMenu = e => {
    ipcRenderer.send("display-app-menu", {
        x: e.x,
        y: e.y
    });
};

export default function frameBar() {
    return (
        <div className={framebar}>
            <ul className={main}>
                <li className={menuPopup} onClick={openMenu}>
                    <p>&#xE700;</p>
                </li>
                <Nav />
            </ul>
            <ul className={frame_bar_ul}>
                <li className={btns} onClick={miniMize}>
                    <p>&#xE921;</p>
                </li>
                <li className={btns} onClick={maxiMize}>
                    <p>&#xE922;</p>
                </li>
                <li className={btns} onClick={quitBtn}>
                    <p>&#xE8BB;</p>
                </li>
            </ul>
        </div>
    );
}
