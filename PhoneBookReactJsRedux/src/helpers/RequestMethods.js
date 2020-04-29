import {auth, error, isLoaded, notAuth, notValid} from "../store/acitons";

export function GET(url, options) {
    const request = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    };
    FETCH(url, request, options);
}

export function POST(url, body, options) {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        credentials: 'include',
        body: JSON.stringify(body)
    };
    FETCH(url, request, options)
}

export function PUT(url, body, options) {
    const request = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        credentials: 'include',
        body: JSON.stringify(body)
    };
    FETCH(url, request, options)
}

export function DELETE(url, options) {
    const request = {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include'
    };
    FETCH(url, request, options);
}

function FETCH(url, request, options) {
    options.dispatch(isLoaded(false));
    fetch(url, request)
        .then(response => {
            if (response.ok) {
                if (response.headers.get('Content-Type') && response.headers.get('Content-Type').includes('json'))
                    response.json().then(data => options.dispatch(options.ok(data)));
                else options.dispatch(options.ok());
                if (url.includes('login') || url.includes('register'))
                    options.dispatch(auth());
                if (options.redirect)
                    options.redirect.method(options.redirect.url);
            } else if (response.status === 401)
                options.dispatch(notAuth(response.statusText));
            else if (response.status === 400)
                response.json().then(data => options.dispatch(notValid(data)));
            else if (response.status === 500)
                response.json().then(data => options.dispatch(error(data)));
            else options.dispatch(error(response.statusText));

            options.dispatch(isLoaded(true));
        });
}

