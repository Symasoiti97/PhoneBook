import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {ItemContact} from "./Elements";

class Contact extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const contactId = this.props.contactId;
        this.props.getContactFetch(contactId);
    }

    render() {
        const {contact} = this.props;
        const linkEdit = `/contact/${contact.id}/edit`;
        return (
            <div className="main">
                <div className="header">
                    <span className="text"><Link to="/contacts">Назад</Link></span>
                    <span className="text"><Link to={linkEdit}>Редактировать</Link></span>
                </div>
                <div className="body content">
                    {contact.id ? <ItemContact contact={contact}/> : null}
                </div>
            </div>
        )
    }
}

export default Contact;