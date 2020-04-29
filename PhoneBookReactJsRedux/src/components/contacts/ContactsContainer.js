import React, {Component} from 'react';
import {connect} from "react-redux";
import Contacts from "./Contacts";
import {searchContactsFetch} from "../../store/contacts/actions";
import {openWindowCreateContact} from "../../store/contacts/actions";

class ContactsContainer extends Component {

    render() {
        return <Contacts contacts={this.props.contacts}
                         isOpenWindowCreateContact={this.props.isOpenWindowCreateContact}
                         searchContactsFetch={this.props.searchContactsFetch}
                         openWindowCreateContact={this.props.openWindowCreateContact}/>
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contacts.contacts,
        isOpenWindowCreateContact: state.contacts.isOpenWindowCreateContact
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchContactsFetch: pattern => dispatch(searchContactsFetch(pattern)),
        openWindowCreateContact: () => dispatch(openWindowCreateContact())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);