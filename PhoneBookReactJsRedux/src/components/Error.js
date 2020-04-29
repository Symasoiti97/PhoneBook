import React, { Component } from "react";

class Error extends Component{
    render() {
        return (
            <p class="errorMessage">{this.props.error}</p>
        )
       }
}

export default Error;