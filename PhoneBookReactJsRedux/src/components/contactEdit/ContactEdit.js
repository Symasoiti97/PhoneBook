import React, {Component, useRef, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";

class ContactEdit extends Component {
    constructor(props) {
        super(props);

        this.handleInputNameChange = this.handleInputNameChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.onAddNote = this.onAddNote.bind(this);
        this.onRemoveNote = this.onRemoveNote.bind(this);
        this.onSaveContact = this.onSaveContact.bind(this);
        this.onDeleteContact = this.onDeleteContact.bind(this);
    }

    componentDidMount() {
        const contactId = this.props.contactId;
        this.props.getContactFetch(contactId);
        this.setState({item: this.props.contact})
    }

    handleInputNameChange(e) {
        const target = e.target;
        const index = e.target.dataset.index;
        const value = target.value;
        let item = this.state.item;

        item.notes[index] = {
            name: value,
            content: item.notes[index].content
        };

        this.setState({item: item});
    }

    handleInputValueChange(e) {
        const target = e.target;
        const index = target.dataset.index;
        const name = target.name;
        const value = target.value;
        const item = this.state.item;
        if (name === 'name')
            item.name = value;
        if (name === 'email')
            item.email = value;
        else if (name === 'dateOfBirth') {
            item.dateOfBirth = new Date(value).toLocaleDateString();
        } else if (name === 'gender')
            item.gender = value;
        else if (index)
            item.notes[index] = {
                name: name,
                value: value
            };

        this.setState({item: item});
    }

    onAddNote(e) {
        const item = this.state.item;
        const newNote = {
            name: '',
            content: ''
        };

        item.notes.push(newNote);
        this.setState({item: item});
    }

    onRemoveNote(e) {
        const item = this.state.item;
        const index = e.target.dataset.index;
        item.notes.splice(index, 1);

        this.setState({item: item});
    }

    onSaveContact(e) {
        const item = this.state.item;
        this.props.updateContactFetch(item);
    }

    onDeleteContact(e) {
        const redirect = {
            url: '/contacts',
            method: this.props.history.push
        };
        this.props.deleteContactFetch(this.props.contactId, redirect);
    }

    render() {

        const linkSub = `/contact/${item.id}`;

        return (<div className="main">
                <div className="header">
                    <span className="text"><Link to={linkSub}>Отмена</Link></span>
                    <span className="text">
                        <Link to={linkSub} onClick={this.onSaveContact}>Сохранить</Link>
                    </span>
                </div>
                <div className="body content">
                </div>
                <div className="footer">
                <span className="text flex">
                    <Link className="text-red" to={linkSub} onClick={this.onDeleteContact}>Удалить контакт</Link>
                </span>
                </div>
            </div>
        )
    }
}

export default withRouter(ContactEdit);