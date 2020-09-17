import React from "react";
import { CSS, DynamicCSS } from "electron-css";
import { Dark } from "../ui/theme";
const Theme = DynamicCSS();
Theme.use(Dark.Theme);

const Main = CSS({
    color: Theme.mainColor,
    background: Theme.mainBackground,
    display: "flex",
    "justify-content": "center",
    height: "100vh"
});

const Nav = () => {
    return <div className={Main}>settings</div>;
};

export default Nav;
