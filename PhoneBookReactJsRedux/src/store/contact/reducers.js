import {types} from "./actions"

const initialState = {
    contact: {
        notes: []
    }
};

export function contactReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CONTACT_FETCH_SUCCESS:
            return {
                ...state,
                contact: action.payload.data
            };
        case types.UPDATE_CONTACT_FETCH_SUCCESS:
            return {
                ...state
            };
        case types.DELETE_CONTACT_FETCH_SUCCESS:
            return {
                ...state
            };
        case types.ADD_CATEGORY_PHONE_FETCH_SUCCESS:
            return {
                ...state
            };
        case types.DELETE_CATEGORY_PHONE_FETCH_SUCCESS:
            return {
                ...state
            };
        case types.ADD_CATEGORY_ADDRESS_FETCH_SUCCESS:
            return {
                ...state
            };
        case types.DELETE_CATEGORY_ADDRESS_FETCH_SUCCESS:
            return {
                ...state
            };
        default:
            return state;
    }
}