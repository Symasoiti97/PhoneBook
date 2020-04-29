import {DELETE, GET, POST} from "../../helpers/RequestMethods";

export const types = {
    GROUPS_FETCH_DATA_SUCCESS: 'GROUPS_FETCH_DATA_SUCCESS',
    GROUP_FETCH_ADD_SUCCESS: 'GROUP_FETCH_ADD_SUCCESS',
    GROUP_FETCH_DELETE_SUCCESS: 'GROUP_FETCH_DELETE_SUCCESS'
};

export function getGroupsFetchSuccess(data) {
    return {
        type: types.GROUPS_FETCH_DATA_SUCCESS,
        payload: {
            data: data
        }
    }
}

export function addGroupFetchSuccess() {
    return {
        type: types.GROUP_FETCH_ADD_SUCCESS,
        payload: {
        }
    }
}

export function getGroupsFetch() {
    return dispatch => {
        const url = API_HOST + 'api/group';
        const options = {
            ok: getGroupsFetchSuccess,
            dispatch: dispatch
        };
        GET(url, options);
    }
}

export function addGroupFetch(name) {
    return dispatch => {
        const url = API_HOST + 'api/group';
        const options = {
            ok: addGroupFetchSuccess,
            dispatch: dispatch
        };
        const body = {
          name
        };
        POST(url, body, options);
        dispatch(getGroupsFetch());
    }
}

export function deleteGroupFetch(id) {
    return dispatch => {
        const url = API_HOST + 'api/group/' + id;
        const options = {
            ok: addGroupFetchSuccess,
            dispatch: dispatch
        };
        DELETE(url, options);
        dispatch(getGroupsFetch());
    }
}
