import {types} from "./actions"

const initialState = {
    contacts: [],
    isOpenWindowCreateContact: false
};

export function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SEARCH_CONTACTS_FETCH_SUCCESS:
            return {
                ...state,
                contacts: action.payload.data
            };
        case types.CREATE_CONTACT_FETCH_SUCCESS:
            return {
                ...state
            };
        case types.OPEN_WINDOW_CREATE_CONTACT:
            return {
                ...state,
                isOpenWindowCreateContact: action.payload.isOpenWindowCreateContact
            };
        case types.CLOSE_WINDOW_CREATE_CONTACT:
            return {
                ...state,
                isOpenWindowCreateContact: action.payload.isOpenWindowCreateContact
            };
        default:
            return state;
    }
}