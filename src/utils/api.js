const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (url, options) => {
    return await fetch(baseUrl + url, options)
        .then(checkResponse);
}

export const refreshToken = () => {
    return fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkResponse);
};
  
export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await request(url, options);
      return res;
      //throw new Error("jwt expired");
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.Authorization = refreshData.accessToken;
        const res = await request(url, options); //повторяем запрос
        return res;
      } else {
        return Promise.reject(err);
      }
    }
};


