import React, {Component} from 'react';
import {connect} from "react-redux";
import {closeWindowCreateContact, createContactFetch} from "../../store/contacts/actions";
import ContactCreate from "./ContactCreate";

class ContactCreateContainer extends Component {

    render() {
        return <ContactCreate contacts={this.props.contacts}
                              createContactFetch={this.props.createContactFetch}
                              closeWindowCreateContact={this.props.closeWindowCreateContact}/>
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        createContactFetch: (name, redirect) => dispatch(createContactFetch(name, redirect)),
        closeWindowCreateContact: () => dispatch(closeWindowCreateContact())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactCreateContainer);