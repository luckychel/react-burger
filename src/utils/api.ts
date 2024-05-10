import { IResponse, TTokens } from "./types";
const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response): Promise<any> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (url: string, options?: RequestInit) => {
    return await fetch(baseUrl + url, options)
        .then(checkResponse);
}

export const refreshToken = ():Promise<IResponse<TTokens>> => {
    return fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkResponse);
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


