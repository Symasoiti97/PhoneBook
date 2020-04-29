import {types} from './actions'

const initialState = {

};

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_FETCH_SUCCESS:
            return {
                ...state

            };
        default:
            return state;
    }
}