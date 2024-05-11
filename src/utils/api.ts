import { TRefreshResponse } from "./types";

const baseUrl = 'https://norma.nomoreparties.space/api/';

export const request = async (url: string, options?: RequestInit) => {
  return await fetch(baseUrl + url, options)
}

export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

const refreshToken = () => {
    return fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
    .then(checkResponse<TRefreshResponse>);
};
  
export const fetchWithRefresh = async (url: string, options?: RequestInit) => {
    try {
      const res = await request(url, options);
      return res;
      //throw new Error("jwt expired");
    } catch (err) {
      if (err.message === "jwt expired") {
        const data = await refreshToken(); //обновляем токен
        if (!data.success) {
          return Promise.reject(data);
        }
        localStorage.setItem("refreshToken", data.refreshToken || "");
        localStorage.setItem("accessToken", data.accessToken|| "");

        const headers: HeadersInit = options?.headers ? new Headers(options.headers) : new Headers();
        if (!headers.has("Authorization")) {
            headers.set("Authorization", `${data.accessToken}`);
        }
        const res = await request(url, options); //повторяем запрос
        return res;
      } else {
        return Promise.reject(err);
      }
    }
};

type THeadersType = "auth" | null;

export const headers = (type?: THeadersType): HeadersInit => {

  const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json;charset=utf-8');
  if (type === "auth" && (localStorage.getItem('accessToken') || null)) {
   headers.set("Authorization", localStorage.getItem('accessToken')!);
  }

  return headers;
}


