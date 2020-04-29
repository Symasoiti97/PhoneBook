import {types} from './actions'

const initialState = {
    groups: []
};

export function groupsReducer(state = initialState, action) {
    switch (action.type) {
        case types.GROUPS_FETCH_DATA_SUCCESS:
            return {
                ...state,
                groups: action.payload.data
            };
        case types.GROUP_FETCH_ADD_SUCCESS:
            return {
                ...state
            };
        default: return state;
    }
}