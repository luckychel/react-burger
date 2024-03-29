const baseUrl = 'https://norma.nomoreparties.space/api/';

export const getData = (url) => {
  return fetch(baseUrl + url)
      .then(res => {
        if (!res.ok) 
        {
          return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .catch(e => {
        console.error('Error: ' + e.message);
      });
}

export const getOrderNumber = (url, ids) => {
    return fetch(baseUrl + url, 
            { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json;charset=utf-8' }, 
                body: JSON.stringify({ 'ingredients': ids})
            })
            .then(res => {
                if (!res.ok) 
                {
                  return Promise.reject(`Ошибка ${res.status}`);
                }
                return res.json();
            })
            .catch(e => {
                console.error('Error: ' + e.message);
            });
  };