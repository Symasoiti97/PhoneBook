import {types} from './actions';

const initialState = {
};

export function registerReducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_FETCH_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
}