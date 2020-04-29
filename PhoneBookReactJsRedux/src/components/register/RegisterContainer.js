import React, {Component} from 'react';
import Register from "./Register";
import {connect} from "react-redux";
import {registerFetch} from "../../store/register/actions";
import Login from "../login/Login";

class RegisterContainer extends Component {
    render() {
        return <Register registerFetch={this.props.registerFetch}
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
        registerFetch: (url, redirect) => dispatch(registerFetch(url, redirect))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);