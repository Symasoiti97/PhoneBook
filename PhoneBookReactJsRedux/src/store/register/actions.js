import {POST} from "../../helpers/RequestMethods";

export const types = {
    REGISTER_FETCH_SUCCESS: 'REGISTER_FETCH',
    REGISTER_FETCH_FAIL: 'REGISTER_FETCH_FAIL'
};

export function registerFetchSuccess(data) {
    return {
        type: types.LOGIN_FETCH_SUCCESS,
        data: data
    }
}

export function registerFetchFail(data) {
    return {
        type: types.REGISTER_FETCH_FAIL,
        data: data
    }
}

export function registerFetch(registerUser, redirect) {
    return (dispatch) => {
        const url = API_HOST + 'api/user/register';
        const options = {
            ok: registerFetchSuccess,
            dispatch: dispatch,
            redirect: redirect
        };
        POST(url, registerUser, options);
    }
}

