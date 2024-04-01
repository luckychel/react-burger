const baseUrl = 'https://norma.nomoreparties.space/api/';

export const request = (url, options) => {
    return fetch(baseUrl + url, options)
        .then(checkResponse);
}

export function checkResponse(res) {
    if (!res.ok) 
    {
        return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
}