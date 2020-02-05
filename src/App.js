import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import WODRoller from "./components/WODRoller/WODRoller";
import D20Roller from "./components/D20Roller/D20Roller";
import "./App.css";

function App() {
    return (
        <Fragment>
            <Navbar />
            <main>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/wod-roller" component={WODRoller} />
                    <Route path="/d20-roller" component={D20Roller} />
                    <Route component={Error} />
                </Switch>
            </main>
        </Fragment>
    );
}

export default App;
