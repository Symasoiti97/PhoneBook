import React, {Component} from "react";
import {Switch, Route, withRouter} from 'react-router-dom';
import LoginContainer from "../login/LoginContainer";
import RegisterContainer from "../register/RegisterContainer";

class Public extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Switch>
                    <Route exact path="/login" component={LoginContainer}/>
                    <Route exact path="/register" component={RegisterContainer}/>
                </Switch>
        );
    }
}

class NotFound extends Component {
    render() {
        return <h2>Ресурс не найден</h2>;
    }
}

export default Public;