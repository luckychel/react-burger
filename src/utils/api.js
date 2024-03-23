const api = 'https://norma.nomoreparties.space/api/';

export const getData = (url) => {
  return fetch(api + url)
      .then(res => {
        if (!res.ok) 
        {
          return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .catch(e => {
        console.log('Error: ' + e.message);
      });
}
