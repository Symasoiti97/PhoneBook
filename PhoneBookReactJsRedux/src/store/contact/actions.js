import {DELETE, GET, POST, PUT} from "../../helpers/RequestMethods";

export const types = {
    GET_CONTACT_FETCH_SUCCESS: 'GET_CONTACT_FETCH_SUCCESS',
    UPDATE_CONTACT_FETCH_SUCCESS: 'CONTACT_FETCH_UPDATE_SUCCESS',
    DELETE_CONTACT_FETCH_SUCCESS: 'DELETE_CONTACT_FETCH_SUCCESS',
    ADD_CATEGORY_PHONE_FETCH_SUCCESS: 'ADD_CATEGORY_PHONE_FETCH_SUCCESS',
    DELETE_CATEGORY_PHONE_FETCH_SUCCESS: 'DELETE_CATEGORY_PHONE_FETCH_SUCCESS',
    ADD_CATEGORY_ADDRESS_FETCH_SUCCESS: 'ADD_CATEGORY_ADDRESS_FETCH_SUCCESS',
    DELETE_CATEGORY_ADDRESS_FETCH_SUCCESS: 'DELETE_CATEGORY_ADDRESS_FETCH_SUCCESS'
};

function getContactFetchSuccess(data) {
    return {
        type: types.GET_CONTACT_FETCH_SUCCESS,
        payload: {
            data
        }
    }
}

function addCategoryPhoneFetchSuccess() {
    return {
        type: types.ADD_CATEGORY_PHONE_FETCH_SUCCESS
    }
}

function deleteCategoryPhoneFetchSuccess() {
    return {
        type: types.DELETE_CATEGORY_PHONE_FETCH_SUCCESS
    }
}

function addCategoryAddressFetchSuccess() {
    return {
        type: types.ADD_CATEGORY_ADDRESS_FETCH_SUCCESS
    }
}

function deleteCategoryAddressFetchSuccess() {
    return {
        type: types.DELETE_CATEGORY_ADDRESS_FETCH_SUCCESS
    }
}

function updateContactFetchSuccess() {
    return {
        type: types.UPDATE_CONTACT_FETCH_SUCCESS
    }
}

function deleteContactFetchSuccess() {
    return {
        type: types.DELETE_CONTACT_FETCH_SUCCESS
    }
}

export function getContactFetch(contactId) {
    return (dispatch) => {
        const url = API_HOST + 'api/contact/' + contactId;
        const options = {
            ok: getContactFetchSuccess,
            dispatch
        };
        GET(url, options);
    }
}

export function updateContactFetch(contactId, contact) {
    return dispatch => {
        debugger;
        const url = API_HOST + 'api/contact/' + contactId;
        const body = {
            ...contact
        //     name: contact.name,
        //     gender: contact.gender,
        //     dateOfBirth: contact.dateOfBirth,
        //     email: contact.email,
        //     urlImage: contact.urlImage,
        //     notes: contact.notes,
        //     groupIds: contact.groups ? contact.groups.map(i => i.id) : []
        };
        const options = {
            ok: updateContactFetchSuccess,
            dispatch
        };
        PUT(url, body, options);
    }
}

export function deleteContactFetch(contactId, redirect) {
    return dispatch => {
        const url = API_HOST + 'api/contact/' + contactId;
        const options = {
            ok: deleteContactFetchSuccess,
            dispatch,
            redirect
        };
        DELETE(url, options);
    }
}

export function addCategoryPhoneFetch(contactId, name) {
    return dispatch => {
        const url = API_HOST + 'api/contact/category/phone/' + contactId;
        const body = {
            name
        };
        const options = {
            ok: addCategoryPhoneFetchSuccess,
            dispatch
        };
        POST(url, body, options);
        getContactFetch(contactId)
    }
}

export function addCategoryAddressFetch(contactId, name) {
    return dispatch => {
        const url = API_HOST + 'api/contact/category/address/' + contactId;
        const body = {
            name
        };
        const options = {
            ok: addCategoryAddressFetchSuccess,
            dispatch
        };
        POST(url, body, options);
        getContactFetch(contactId)
    }
}

export function deleteCategoryPhoneFetch(categoryId, contactId) {
    return dispatch => {
        const url = API_HOST + 'api/contact/category/phone/' + categoryId;
        const options = {
            ok: deleteCategoryPhoneFetchSuccess,
            dispatch
        };
        DELETE(url, options);
        getContactFetch(contactId);
    }
}

export function deleteCategoryAddressFetch(categoryId, contactId) {
    return dispatch => {
        const url = API_HOST + 'api/contact/category/address/' + categoryId;
        const options = {
            ok: deleteCategoryAddressFetchSuccess,
            dispatch
        };
        DELETE(url, options);
        getContactFetch(contactId);
    }
}