import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.refs.email.value,
            password: this.refs.password.value,
            confirmPassword: this.refs.confirmPassword.value
        };
        const redirect = {
            method: this.props.history.push,
            url: '/contacts'
        };
        this.props.registerFetch(user, redirect);
    }

    render() {
        const {isError, errorMessage} = this.props;

        const errorDiv = (error) => <div className="error">
            {isError ? error : null}
        </div>;

        return (
            <div className="main">
                <div className="header">
                    <span className="text">Регистрация</span>
                </div>
                <div className="body login">
                    {isError ? errorDiv(errorMessage) : null}
                    <form className="login-form">
                        <input className="input-line" ref="email" type="text" placeholder="Email"/>
                        <input className="input-line" ref="password" type="password" placeholder="Password"/>
                        <input className="input-line" ref="confirmPassword" type="password"
                               placeholder="ConfirmPassword"/>
                        <button className="btn" type="submit" onClick={this.handleSubmit}>Зарегистрироваться</button>
                    </form>
                </div>
                <div className="footer">
                    <span className="text">перейти к <Link to="/login">авторизации</Link></span>
                </div>
            </div>
        );
    }
}


export default withRouter(Register);