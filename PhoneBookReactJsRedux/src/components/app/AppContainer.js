import {connect} from 'react-redux';
import React, {Component} from 'react';
import App from "./App";
import {isLoaded as changeLoadPage} from "../../store/acitons";

class AppContainer extends Component {
    render() {
        return <App isLoaded={this.props.isLoaded}
                    isAuth={this.props.isAuth}
                    changeLoadPage={this.props.changeLoadPage}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isLoaded: state.def.isLoaded,
        isAuth: state.def.isAuth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLoadPage: flag => dispatch(changeLoadPage(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);