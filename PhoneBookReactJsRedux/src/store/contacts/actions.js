import {GET, POST} from "../../helpers/RequestMethods";

export const types = {
    SEARCH_CONTACTS_FETCH_SUCCESS: 'SEARCH_CONTACTS_FETCH_SUCCESS',
    CREATE_CONTACT_FETCH_SUCCESS: 'CREATE_CONTACT_FETCH_SUCCESS',
    OPEN_WINDOW_CREATE_CONTACT: 'OPEN_WINDOW_CREATE_CONTACT',
    CLOSE_WINDOW_CREATE_CONTACT: 'CLOSE_WINDOW_CREATE_CONTACT'
};

export function openWindowCreateContact() {
    return dispatch => dispatch({
        type: types.OPEN_WINDOW_CREATE_CONTACT,
        payload: {
            isOpenWindowCreateContact: true
        }
    });
}

export function closeWindowCreateContact() {
    return dispatch => dispatch({
        type: types.CLOSE_WINDOW_CREATE_CONTACT,
        payload: {
            isOpenWindowCreateContact: false
        }
    });
}


function createContactFetchSuccess(data) {
    return {
        type: types.CREATE_CONTACT_FETCH_SUCCESS,
        payload: {
            data
        }
    }
}

export function searchContactsFetchSuccess(data) {
    return {
        type: types.SEARCH_CONTACTS_FETCH_SUCCESS,
        payload: {
            data: data
        }
    };
}

export function createContactFetch(name, redirect) {
    return dispatch => {
        const url = API_HOST + 'api/contact';
        const body = {
            name
        };
        const options = {
            ok: createContactFetchSuccess,
            dispatch,
            redirect
        };
        POST(url, body, options);
        dispatch(closeWindowCreateContact());
        dispatch(searchContactsFetch());
    }
}

export function searchContactsFetch(pattern) {
    return (dispatch) => {
        const url = API_HOST + 'api/contact' + (pattern ? `?pattern=${pattern}` : '');
        const options = {
            ok: searchContactsFetchSuccess,
            dispatch: dispatch
        };
        GET(url, options);
    }
}