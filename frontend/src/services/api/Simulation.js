import { handleFetchError } from "./ErrorHandling";

function requestGetSimCond(auth_token) {
    let url = "http://127.0.0.1:8000/api/version/1/get_conditions"

    return fetch(url + '?' + new URLSearchParams({
        conditions: "all"
    }),
        {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + auth_token
        }
    }).then(handleFetchError).then(res => res.json()).then((data) => {
        return [true, data]
    }).catch((error) => {
        console.error(error)
        return [false, null]
    })
}

export { requestGetSimCond };