import {POST} from "../../helpers/RequestMethods";

export const types = {
    LOGIN_FETCH_SUCCESS: 'LOGIN_FETCH_SUCCESS',
    LOGIN_FETCH_FAIL: 'LOGIN_FETCH_FAIL',
};

export function loginFetchSuccess() {
    return {
        type: types.LOGIN_FETCH_SUCCESS,
        payload: {}
    }
}

export function loginFetch(loginUser, redirect) {
    return (dispatch) => {
        const url = API_HOST + 'api/user/login';
        const options = {
            ok: loginFetchSuccess,
            dispatch: dispatch,
            redirect: redirect
        };
        POST(url, loginUser, options);
    }
}

