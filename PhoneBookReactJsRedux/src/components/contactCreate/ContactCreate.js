import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class ContactCreate extends Component {
    constructor(props) {
        super(props);

        this.onCloseWindow = this.onCloseWindow.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onCloseWindow(e) {
        this.props.closeWindowCreateContact();
    }

    onSave(e) {
        const name = this.refs.newContactName.value;
        const redirect = {
            method: this.props.history.push,
            url: '/contacts'
        };
        this.props.createContactFetch(name, redirect);
    }

    render() {
        return (
            <div>
                <input className="" type="text" ref="newContactName"/>
                <button className="" type="submit" value="Отмена" onClick={this.onCloseWindow}>Отмена</button>
                <button className="" type="submit" value="Создать" onClick={this.onSave}>Создать</button>
            </div>
        )
    }
}

export default withRouter(ContactCreate);