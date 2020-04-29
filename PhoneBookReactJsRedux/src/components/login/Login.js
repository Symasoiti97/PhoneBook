import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        const redirect = {
            method: this.props.history.push,
            url: '/contacts'
        };
        this.props.loginFetch(user, redirect);
    }

    render() {
        const {isError, errorMessage} = this.props;
        return (
            <div className="main">
                <div className="header">
                    <span className="text">Авторизация</span>
                </div>
                <div className="body login">
                    <div className="error">
                        {isError ? errorMessage : null}
                    </div>
                    <form className="login-form" action="#">
                        <input className="input-line" type="text" placeholder="Email"
                               ref="email"/>
                        <input className="input-line" type="password" placeholder="Password"
                               ref="password"/>
                        <button className="btn" onClick={this.handleSubmit}>Войти</button>
                    </form>
                </div>
                <div className="footer footer-login">
                    <span className="text">перейти к <Link to="/register">регистрации</Link></span>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);