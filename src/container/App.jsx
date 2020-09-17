import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import FrameBar from "../components/frameBar";
import Main from "../components/main";
import Settings from "../components/Settings";
import { CSS, DynamicCSS } from "electron-css";
import { Dark } from "../ui/theme";
const Theme = DynamicCSS();
Theme.use(Dark.Theme);

const AppCss = CSS(
    {
        "> ::-webkit-scrollbar": {
            width: "1px"
        },
        "> ::-webkit-scrollbar-track": {
            background: Theme.mainBackgroundframbar
        },
        "> ::-webkit-scrollbar-thumb": {
            background: Theme.mainBackground,
            onHover: {
                background: Theme.onHover
            }
        },

        "margin-top": "30px"
    },
    "App"
);

function App() {
    return (
        <Router>
            <div className={AppCss}>
                <FrameBar />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/Settings" exact component={Settings} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
