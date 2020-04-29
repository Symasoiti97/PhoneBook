import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteContactFetch, getContactFetch, updateContactFetch} from "../../store/contact/actions";
import {ContactEdit} from "./Elements";
import {addCategoryPhoneFetch, deleteCategoryPhoneFetch, addCategoryAddressFetch, deleteCategoryAddressFetch} from "../../store/contact/actions";

class ContactEditContainer extends Component {

    render() {
        return <ContactEdit contact={this.props.contact}
                            getContactFetch={this.props.getContactFetch}
                            updateContactFetch={this.props.updateContactFetch}
                            deleteContactFetch={this.props.deleteContactFetch}
                            addCategoryPhoneFetch={this.props.addCategoryPhoneFetch}
                            deleteCategoryPhoneFetch={this.props.deleteCategoryPhoneFetch}
                            addCategoryAddressFetch={this.props.addCategoryAddressFetch}
                            deleteCategoryAddressFetch={this.props.deleteCategoryAddressFetch}
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
        getContactFetch: pattern => dispatch(getContactFetch(pattern)),
        updateContactFetch: (contactId, contact) => dispatch(updateContactFetch(contactId, contact)),
        deleteContactFetch: (contactId, redirect) => dispatch(deleteContactFetch(contactId, redirect)),
        addCategoryPhoneFetch: (contactId, name) => dispatch(addCategoryPhoneFetch(contactId, name)),
        deleteCategoryPhoneFetch: (categoryId, contactId) => dispatch(deleteCategoryPhoneFetch(categoryId)),
        addCategoryAddressFetch: (contactId, name) => dispatch(addCategoryAddressFetch(contactId, name)),
        deleteCategoryAddressFetch: (categoryId, contactId) => dispatch(deleteCategoryAddressFetch(categoryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactEditContainer);