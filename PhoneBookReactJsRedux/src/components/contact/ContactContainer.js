import React, {Component} from 'react';
import {connect} from "react-redux";
import Contact from "./Contact";
import {getContactFetch} from "../../store/contact/actions";

class ContactContainer extends Component {
    render() {
        return <Contact contact={this.props.contact}
                        getContactFetch={this.props.getContactFetch}
                        contactId={this.props.match.params.contactId}/>
    }
}

const mapStateToProps = state => {
    return {
        contact: state.contact.contact,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getContactFetch: pattern => dispatch(getContactFetch(pattern))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);