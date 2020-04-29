import React, {Component} from "react";

class ModalWindow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    {this.props.child && this.props.child()}
                </div>
            </div>
        )
    }
}

export default ModalWindow;