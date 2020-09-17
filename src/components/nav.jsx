import React from "react";
import { CSS, DynamicCSS } from "electron-css";
import { Link } from "react-router-dom";
import { Dark } from "../ui/theme";
const Theme = DynamicCSS();
Theme.use(Dark.Theme);

const nav = CSS({
    color: Theme.mainTextframbarcolor,
    background: Theme.mainBackgroundframbar,
    "list-style": "none",
    "font-family": "Montserrat",
    "text-decoration": "none",
    display: "flex",
});

const li = CSS({
    onHover: {
        backgroundColor: Theme.onHover,
    },
    "> a": {
        color: Theme.mainTextframbarcolor,
        "text-decoration": "none",
    },
    "> p": {
        "text-decoration": "none",
        "padding-top": "6px",
        "padding-left": "10px",
        "padding-right": "10px",
    },
});

const Nav = () => {
    return (
        <ul className={nav}>
            <li className={li}>
                <Link to="/">
                    <p>Main</p>
                </Link>
            </li>
        </ul>
    );
};

export default Nav;
