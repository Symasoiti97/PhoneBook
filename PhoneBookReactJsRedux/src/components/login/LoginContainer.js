import React, {Component} from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {loginFetch} from "../../store/login/actions";

class LoginContainer extends Component {
    render() {
        return <Login loginFetch={this.props.loginFetch}
                      isError={this.props.isError}
                      errorMessage={this.props.errorMessage}/>;
    }
}

const mapStateToProps = state => {
    return {
        isError: state.def.isError,
        errorMessage: state.def.dataError.Message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginFetch: (url, redirect) => dispatch(loginFetch(url, redirect))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);