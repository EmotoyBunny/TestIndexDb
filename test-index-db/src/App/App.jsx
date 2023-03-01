import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import {Login} from "../_components/Login/Login"

import CssBaseline from '@mui/material/CssBaseline';
import red from "@mui/material/colors/red";
import {history} from "../tools"


/**
 * Компонент главного меню
 * @author EmotoyBunny
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.init();
        this.state = {
            ...this.state,
        };
    }

    init = () => {
        history.push("/");
    };


    render() {
        return (
            <div>
                <CssBaseline/>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}
                >
                    <div
                        id="ClientMainComponent"
                        style={{
                            flexGrow: 1,
                            marginTop: 56
                        }}
                    >
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/" component={Login}/>
                                <Redirect from="*" to="/"/>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {} = state;
    return {};
}

const actionCreators = {};

const
    connectedApp = connect(mapStateToProps, actionCreators)(App);
export {
    connectedApp as App
};

