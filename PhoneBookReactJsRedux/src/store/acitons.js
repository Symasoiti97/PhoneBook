export const types = {
    NOT_AUTH: 'NOT_AUTH',
    NOT_VALID: 'NOT_VALID',
    ERROR: 'ERROR',
    LOADED: 'LOADED',
    AUTH: 'AUTH'
};

export function auth() {
    return {
        type: types.AUTH,
        payload: true
    }
}

export function notAuth() {
    return {
        type: types.NOT_AUTH,
        payload: false
    }
}

export function notValid(data) {
    return {
        type: types.NOT_VALID,
        payload: {
            IsValid: false,
            data: data
        }
    }
}

export function error(data) {
    return {
        type: types.ERROR,
        payload: {
            isError: true,
            data: data
        }
    }
}

export function isLoaded(isLoaded) {
    return dispatch => {
        dispatch({
            type: types.LOADED,
            payload: isLoaded
        });
    }
}