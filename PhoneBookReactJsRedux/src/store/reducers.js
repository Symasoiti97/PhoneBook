import {types} from "./acitons";

const initialState = {
    isAuth: true,
    isLoaded: true,
    isValid: false,
    isError: false,
    dataError: {
        message: ""
    },
    dataValid: {
        message: "",
        data: ""
    }
};

export function defReducer(state = initialState, action) {
    switch (action.type) {
        case types.NOT_AUTH:
            return {
                ...state,
                isAuth: action.payload
            };
        case types.AUTH:
            return {
              ...state,
              isAuth: action.payload
            };
        case types.LOADED:
            return {
                ...state,
                isLoaded: action.payload
            };
        case types.NOT_VALID:
            return {
                ...state,
                dataValid: action.payload.data,
                isValid: action.payload.isValid
            };
        case types.ERROR:
            return {
                ...state,
                dataError: action.payload.data,
                isError: action.payload.isError
            };
        default:
            return state;
    }
}