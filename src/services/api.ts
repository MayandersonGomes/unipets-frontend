const baseUrl = "http://127.0.0.1:9090/api/"

type HttpMethod = "get" | "post" | "put" | "patch" | "delete"

export const createConfig = (method: HttpMethod, url: string, token?: string | null, data?: any) => {
  return {
    method: method,
    url: baseUrl + url,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: token,
    },
    data: data,
  };
};